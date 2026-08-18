// S10 Design reminder: analytics is a read-only derived layer over S0–S9 operational truth. No selector in this module mutates entities or creates operational records.
import { businesses, conversations, getDealProbability, jobs, mockModel } from "./data.js";
import { getBusinessIntelligence, getOpportunityTier } from "./intelligence.js";

export const ANALYTICS_REFERENCE_DATE = "2026-08-15";
export const analyticsDefaultContext = { dateRange:"all", customStart:"", customEnd:"", sourceId:"all", jobId:"all", ownerId:"all", city:"all", opportunityTier:"all", leadStatus:"all", dealStageId:"all", channel:"all", automationRuleId:"all" };

export const analyticsMetricDefinitions = [
  { id:"businesses_discovered", label:"الشركات المكتشفة", entity:"Business", aggregation:"unique_count", timestampField:"DiscoveryJob.completedAt", definition:"عدد Business الفريدة التي تعود إلى عمليات اكتشاف مطابقة." },
  { id:"businesses_enriched", label:"الشركات المُثرّاة", entity:"OpportunityAnalysis", aggregation:"unique_count", timestampField:"OpportunityAnalysis.analyzedAt", definition:"Business ذات تحليل Intelligence غير not_analyzed." },
  { id:"high_opportunity_businesses", label:"الفرص العالية", entity:"Business", aggregation:"unique_count", timestampField:"OpportunityAnalysis.analyzedAt", definition:"Business ذات Opportunity Tier = high؛ ليست درجة Deal." },
  { id:"leads_created", label:"العملاء المحتملون", entity:"Lead", aggregation:"unique_count", timestampField:"Lead.createdAt", definition:"Lead فريدة بحسب createdAt." },
  { id:"leads_contacted", label:"تم التواصل", entity:"Lead", aggregation:"unique_count", timestampField:"Lead.updatedAt", definition:"Lead حالتها contacted أو qualified أو nurturing." },
  { id:"qualified_leads", label:"عملاء مؤهلون", entity:"Lead", aggregation:"unique_count", timestampField:"Lead.updatedAt", definition:"Lead حالتها qualified." },
  { id:"open_deals", label:"الصفقات المفتوحة", entity:"Deal", aggregation:"unique_count", timestampField:"Deal.createdAt", definition:"Deal حالتها open." },
  { id:"open_pipeline", label:"قيمة Pipeline المفتوحة", entity:"Deal", aggregation:"sum", field:"value", timestampField:"Deal.createdAt", currency:"SAR", definition:"Σ قيم Deals المفتوحة المطابقة." },
  { id:"weighted_pipeline", label:"Pipeline المرجحة", entity:"Deal", aggregation:"weighted_sum", field:"value × probability", timestampField:"Deal.createdAt", currency:"SAR", definition:"Σ قيمة Deal المفتوحة × احتمالها التجاري؛ Score ≠ Probability." },
  { id:"won_deals", label:"الصفقات الرابحة", entity:"Deal", aggregation:"unique_count", timestampField:"Deal.wonAt/closedAt", definition:"Deal حالتها won." },
  { id:"revenue_total", label:"الإيراد", entity:"RevenueEvent", aggregation:"sum", field:"amount", timestampField:"RevenueEvent.recognizedAt", currency:"SAR", definition:"Σ RevenueEvent recognized؛ لا يستخدم Deal value." },
  { id:"attributed_revenue", label:"الإيراد المنسوب", entity:"RevenueEvent + AttributionTouchpoint", aggregation:"weighted_sum", field:"amount × touchpoint.weight", timestampField:"RevenueEvent.recognizedAt", currency:"SAR", definition:"Σ مبالغ الإسناد الصالحة مع المحافظة على عدم تجاوز مبلغ RevenueEvent." },
  { id:"ai_influenced_revenue", label:"إيراد متأثر بالذكاء", entity:"RevenueEvent", aggregation:"sum", field:"amount", timestampField:"RevenueEvent.recognizedAt", currency:"SAR", definition:"إيراد recognized لLead تحمل Intelligence reviewed activity؛ وصف ارتباطي لا سببي." },
  { id:"appointments", label:"المواعيد", entity:"Appointment", aggregation:"unique_count", timestampField:"Appointment.startsAt", definition:"Appointments المطابقة بحسب startsAt." },
  { id:"automation_executions", label:"تنفيذات الأتمتة", entity:"AutomationActionExecution", aggregation:"unique_count", timestampField:"AutomationActionExecution.executedAt", definition:"إجراءات Automation المنفذة، وليست مبيعات ناجحة." }
];

const byId = (items, id) => items.find((item) => item.id === id) || null;
const uniq = (items) => [...new Set(items.filter(Boolean))];
const round = (number, digits = 1) => Number.isFinite(number) ? Number(number.toFixed(digits)) : null;
const inRange = (value, ctx) => {
  if (!value || ctx.dateRange === "all") return true;
  const date = String(value).slice(0,10);
  const end = ANALYTICS_REFERENCE_DATE;
  const startByPreset = { today:"2026-08-15", last7:"2026-08-09", last30:"2026-07-17", month:"2026-08-01" };
  const start = ctx.dateRange === "custom" ? ctx.customStart : startByPreset[ctx.dateRange];
  const upper = ctx.dateRange === "custom" ? (ctx.customEnd || end) : end;
  return Boolean(start && date >= start && date <= upper);
};
const dateLabel = (ctx) => ({ all:"كل الفترة التجريبية", today:"اليوم", last7:"آخر 7 أيام", last30:"آخر 30 يومًا", month:"هذا الشهر", custom:ctx.customStart && ctx.customEnd ? `${ctx.customStart} إلى ${ctx.customEnd}` : "نطاق مخصص" }[ctx.dateRange] || "كل الفترة التجريبية");
const percentage = (numerator, denominator) => denominator ? round(numerator / denominator * 100) : null;
const amount = (value) => Math.round(Number(value || 0));

export function normalizeAnalyticsContext(partial = {}) {
  const next = { ...analyticsDefaultContext, ...partial };
  if (next.dateRange === "custom" && (!next.customStart || !next.customEnd || next.customStart > next.customEnd)) next.dateRange = "all";
  return next;
}

function intelligenceForBusiness(businessId) { return getBusinessIntelligence(businessId); }
function tierForBusiness(businessId) { const result = intelligenceForBusiness(businessId); return result?.tier || (result?.score === null ? "unknown" : getOpportunityTier(result?.score || 0)); }
function jobForBusiness(business) { return business && byId(jobs, business.discoveryJobId); }
function sourceForJob(job) { return job && byId(mockModel.discoverySources || [], job.sourceId); }
function leadForDeal(deal) { return deal && byId(mockModel.leads, deal.leadId); }
function businessForLead(lead) { return lead && byId(businesses, lead.businessId); }
function businessForDeal(deal) { return businessForLead(leadForDeal(deal)); }
function ownerForDeal(deal) { return deal?.ownerId || leadForDeal(deal)?.ownerId || null; }
function traceForRevenue(event) {
  const deal = byId(mockModel.deals, event.dealId);
  const lead = deal && leadForDeal(deal);
  const business = lead && businessForLead(lead);
  const touchpoints = mockModel.attributionTouchpoints.filter((item) => item.revenueEventId === event.id);
  const traceTouchpoints = touchpoints.length ? touchpoints.map((touchpoint) => {
    const job = byId(jobs, touchpoint.discoveryJobId);
    const source = job && sourceForJob(job);
    const missingRefs = [!deal && "Deal", !lead && "Lead", !business && "Business", !job && "DiscoveryJob", !source && "DiscoverySource"].filter(Boolean);
    return { touchpoint, job, source, attributedAmount:amount(event.amount * Number(touchpoint.weight ?? 1)), complete:missingRefs.length === 0, missingRefs };
  }) : [{ touchpoint:null, job:null, source:null, attributedAmount:0, complete:false, missingRefs:["AttributionTouchpoint"] }];
  return { event, deal, lead, business, touchpoints:traceTouchpoints };
}
function matchesDimensions({ business=null, job=null, lead=null, deal=null, ownerId=null, channel=null, automationRuleId=null, timestamp=null }, ctx) {
  const sourceId = job?.sourceId || jobForBusiness(business)?.sourceId;
  const effectiveJobId = job?.id || jobForBusiness(business)?.id || lead?.sourceJobId;
  const effectiveOwnerId = ownerId || deal?.ownerId || lead?.ownerId;
  const tier = business ? tierForBusiness(business.id) : null;
  return inRange(timestamp, ctx)
    && (ctx.sourceId === "all" || sourceId === ctx.sourceId)
    && (ctx.jobId === "all" || effectiveJobId === ctx.jobId)
    && (ctx.ownerId === "all" || effectiveOwnerId === ctx.ownerId)
    && (ctx.city === "all" || business?.city === ctx.city)
    && (ctx.opportunityTier === "all" || tier === ctx.opportunityTier)
    && (ctx.leadStatus === "all" || lead?.status === ctx.leadStatus)
    && (ctx.dealStageId === "all" || deal?.stageId === ctx.dealStageId)
    && (ctx.channel === "all" || channel === ctx.channel)
    && (ctx.automationRuleId === "all" || automationRuleId === ctx.automationRuleId);
}

export function getAnalyticsOptions() {
  return {
    sources: mockModel.discoverySources.map((item) => ({ id:item.id, label:item.name })),
    jobs: jobs.map((item) => ({ id:item.id, label:item.name })),
    owners: mockModel.users.map((item) => ({ id:item.id, label:item.name })),
    cities: uniq(businesses.map((item) => item.city)).map((id) => ({ id, label:id })),
    tiers: [{ id:"high", label:"عالية" }, { id:"good", label:"جيدة" }, { id:"medium", label:"متوسطة" }, { id:"low", label:"منخفضة" }, { id:"unknown", label:"غير معروفة" }],
    leadStatuses: uniq(mockModel.leads.map((item) => item.status)).map((id) => ({ id, label:id })),
    stages: mockModel.pipelineStages.map((item) => ({ id:item.id, label:item.name })),
    channels: uniq(conversations.map((item) => item.channel)).map((id) => ({ id, label:id })),
    automationRules: (mockModel.automationRules || []).map((item) => ({ id:item.id, label:item.name }))
  };
}

function baseCollections(context) {
  const ctx = normalizeAnalyticsContext(context);
  const filteredBusinesses = businesses.filter((business) => matchesDimensions({ business, job:jobForBusiness(business), timestamp:jobForBusiness(business)?.completedAt || jobForBusiness(business)?.createdAt }, ctx));
  const businessIds = new Set(filteredBusinesses.map((item) => item.id));
  const leads = mockModel.leads.filter((lead) => businessIds.has(lead.businessId) && matchesDimensions({ business:businessForLead(lead), lead, timestamp:lead.createdAt }, ctx));
  const leadIds = new Set(leads.map((item) => item.id));
  const deals = mockModel.deals.filter((deal) => leadIds.has(deal.leadId) && matchesDimensions({ business:businessForDeal(deal), lead:leadForDeal(deal), deal, timestamp:deal.createdAt }, ctx));
  const events = mockModel.revenueEvents.filter((event) => {
    const trace = traceForRevenue(event); const representative = trace.touchpoints[0];
    return event.status === "recognized" && matchesDimensions({ business:trace.business, lead:trace.lead, deal:trace.deal, job:representative?.job, timestamp:event.recognizedAt }, ctx);
  });
  const conversationRows = conversations.filter((conversation) => { const lead = byId(mockModel.leads, conversation.leadId); return lead && matchesDimensions({ business:businessForLead(lead), lead, channel:conversation.channel, timestamp:conversation.lastMessageAt || conversation.createdAt }, ctx); });
  const appointmentRows = mockModel.appointments.filter((appointment) => { const lead = byId(mockModel.leads, appointment.leadId); return lead && matchesDimensions({ business:businessForLead(lead), lead, deal:byId(mockModel.deals, appointment.dealId), ownerId:appointment.ownerId, timestamp:appointment.startsAt }, ctx); });
  const taskRows = mockModel.tasks.filter((task) => { const lead = byId(mockModel.leads, task.leadId); return lead && matchesDimensions({ business:businessForLead(lead), lead, ownerId:task.ownerId, timestamp:task.createdAt }, ctx); });
  const automationRuns = (mockModel.automationRuns || []).filter((run) => matchesDimensions({ automationRuleId:run.ruleId, timestamp:run.triggeredAt || run.createdAt }, ctx));
  return { ctx, businesses:filteredBusinesses, leads, deals, events, conversationRows, appointmentRows, taskRows, automationRuns };
}

export function getAnalyticsFunnel(context = {}) {
  const data = baseCollections(context);
  const businessIds = data.businesses.map((item) => item.id);
  const enriched = data.businesses.filter((business) => { const analysis = byId(mockModel.opportunityAnalyses, mockModel.opportunityAnalyses.find((item) => item.businessId === business.id)?.id); return analysis && analysis.status !== "not_analyzed"; }).map((item) => item.id);
  const high = data.businesses.filter((business) => tierForBusiness(business.id) === "high").map((item) => item.id);
  const within = (ids, prior) => uniq(ids).filter((id) => prior.includes(id));
  const highFromEnriched = within(high, enriched);
  const leadBusinesses = within(data.leads.map((lead) => lead.businessId), highFromEnriched);
  const contacted = within(data.leads.filter((lead) => ["contacted","qualified","nurturing"].includes(lead.status)).map((lead) => lead.businessId), leadBusinesses);
  const qualified = within(data.leads.filter((lead) => lead.status === "qualified").map((lead) => lead.businessId), contacted);
  const dealBusinesses = within(data.deals.map((deal) => businessForDeal(deal)?.id), qualified);
  const wonBusinesses = within(data.deals.filter((deal) => deal.status === "won").map((deal) => businessForDeal(deal)?.id), dealBusinesses);
  const revenueBusinesses = within(data.events.map((event) => traceForRevenue(event).business?.id), wonBusinesses);
  const stages = [
    ["discovered","مكتشف",businessIds,"Business من Job completedAt"], ["enriched","مُثرى",within(enriched,businessIds),"Business ذات Intelligence analysis"], ["high","فرصة عالية",highFromEnriched,"Business Tier = high ضمن المُثرى"], ["lead","CRM Lead",leadBusinesses,"Business عالية ذات Lead"], ["contacted","تم التواصل",contacted,"Business Lead متصلة ضمن cohort القمع"], ["qualified","مؤهل",qualified,"Business Lead مؤهلة ضمن cohort القمع"], ["deal","صفقة",dealBusinesses,"Business مؤهلة ذات Deal"], ["won","رابح",wonBusinesses,"Business Deal رابحة ضمن cohort القمع"], ["revenue","إيراد",revenueBusinesses,"Business رابحة ذات RevenueEvent recognized"]
  ].map(([id,label,entityIds,definition], index, all) => ({ id, label, entityIds:uniq(entityIds), count:uniq(entityIds).length, definition, conversion: index ? percentage(uniq(entityIds).length, all[index-1][2].length) : null, denominator:index ? all[index-1][2].length : null }));
  return { stages, context:data.ctx };
}

export function getAttributionTraces(context = {}) {
  const data = baseCollections(context);
  return data.events.map((event) => {
    const trace = traceForRevenue(event); const attributed = trace.touchpoints.filter((item) => item.touchpoint && item.complete).reduce((sum, item) => sum + item.attributedAmount, 0);
    return { ...trace, attributed, unattributed:Math.max(0, amount(event.amount) - attributed), overAttributed:Math.max(0, attributed - amount(event.amount)), complete:trace.touchpoints.some((item) => item.complete) };
  });
}

function revenueSummary(context) {
  const traces = getAttributionTraces(context); const revenue = traces.reduce((sum, trace) => sum + amount(trace.event.amount), 0); const attributed = traces.reduce((sum, trace) => sum + trace.attributed, 0); const unattributed = traces.reduce((sum, trace) => sum + trace.unattributed, 0); const overAttributed = traces.reduce((sum, trace) => sum + trace.overAttributed, 0);
  return { revenue, attributed, unattributed, overAttributed, traces };
}

export function getAnalyticsOverview(context = {}) {
  const data = baseCollections(context); const revenue = revenueSummary(data.ctx); const funnel = getAnalyticsFunnel(data.ctx); const openDeals = data.deals.filter((deal) => deal.status === "open"); const wonDeals = data.deals.filter((deal) => deal.status === "won"); const lostDeals = data.deals.filter((deal) => deal.status === "lost");
  const contacted = data.leads.filter((lead) => ["contacted","qualified","nurturing"].includes(lead.status)); const qualified = data.leads.filter((lead) => lead.status === "qualified");
  const aiInfluencedEvents = data.events.filter((event) => { const trace = traceForRevenue(event); return mockModel.activities.some((activity) => activity.leadId === trace.lead?.id && activity.type === "intelligence_reviewed"); });
  const metrics = {
    businessesDiscovered:{ value:data.businesses.length, entityIds:data.businesses.map((item) => item.id) }, businessesEnriched:{ value:funnel.stages.find((item) => item.id === "enriched").count, entityIds:funnel.stages.find((item) => item.id === "enriched").entityIds }, highOpportunityBusinesses:{ value:funnel.stages.find((item) => item.id === "high").count, entityIds:funnel.stages.find((item) => item.id === "high").entityIds },
    leadsCreated:{ value:data.leads.length, entityIds:data.leads.map((item) => item.id) }, leadsContacted:{ value:contacted.length, entityIds:contacted.map((item) => item.id) }, qualifiedLeads:{ value:qualified.length, entityIds:qualified.map((item) => item.id) },
    openDeals:{ value:openDeals.length, entityIds:openDeals.map((item) => item.id) }, openPipeline:{ value:openDeals.reduce((sum, deal) => sum + amount(deal.value), 0), entityIds:openDeals.map((item) => item.id) }, weightedPipeline:{ value:openDeals.reduce((sum, deal) => sum + deal.value * getDealProbability(deal) / 100, 0), entityIds:openDeals.map((item) => item.id) },
    wonDeals:{ value:wonDeals.length, entityIds:wonDeals.map((item) => item.id) }, revenue:{ value:revenue.revenue, entityIds:data.events.map((item) => item.id) }, attributedRevenue:{ value:revenue.attributed, entityIds:revenue.traces.filter((item) => item.attributed).map((item) => item.event.id) }, aiInfluencedRevenue:{ value:aiInfluencedEvents.reduce((sum, item) => sum + amount(item.amount), 0), entityIds:aiInfluencedEvents.map((item) => item.id) },
    appointments:{ value:data.appointmentRows.length, entityIds:data.appointmentRows.map((item) => item.id) }, automationExecutions:{ value:(mockModel.automationActionExecutions || []).filter((item) => item.status === "executed" && data.automationRuns.some((run) => run.id === item.runId)).length, entityIds:(mockModel.automationActionExecutions || []).filter((item) => item.status === "executed" && data.automationRuns.some((run) => run.id === item.runId)).map((item) => item.id) }
  };
  return { context:data.ctx, metrics, funnel, revenue, sales:{ openDeals, wonDeals, lostDeals, winRate:percentage(wonDeals.length, wonDeals.length + lostDeals.length), averageDealValue:wonDeals.length ? round(wonDeals.reduce((sum, deal) => sum + deal.value, 0) / wonDeals.length,0) : null, averageSalesCycle:null, reason:"لا تتوفر تواريخ دورة بيع مكتملة لكل Deals؛ لا تُعرض قيمة مصطنعة." } };
}

export function getSourcePerformance(context = {}) {
  const data = baseCollections(context); const ids = uniq(data.businesses.map((business) => jobForBusiness(business)?.sourceId));
  return ids.map((sourceId) => { const source = byId(mockModel.discoverySources, sourceId); const rows = data.businesses.filter((business) => jobForBusiness(business)?.sourceId === sourceId); const rowIds = new Set(rows.map((item) => item.id)); const leads = data.leads.filter((lead) => rowIds.has(lead.businessId)); const deals = data.deals.filter((deal) => rowIds.has(businessForDeal(deal)?.id)); const revenue = data.events.filter((event) => getAttributionTraces(data.ctx).find((trace) => trace.event.id === event.id)?.touchpoints.some((touch) => touch.source?.id === sourceId)); const attributed = getAttributionTraces(data.ctx).filter((trace) => trace.touchpoints.some((touch) => touch.source?.id === sourceId)).reduce((sum, trace) => sum + trace.touchpoints.filter((touch) => touch.source?.id === sourceId).reduce((inside, touch) => inside + touch.attributedAmount, 0), 0); return { sourceId, sourceName:source?.name || sourceId, businesses:rows.length, highOpportunity:rows.filter((business) => tierForBusiness(business.id) === "high").length, leads:leads.length, leadConversion:percentage(leads.length, rows.length), deals:deals.length, won:deals.filter((deal) => deal.status === "won").length, revenue:revenue.reduce((sum, event) => sum + amount(event.amount), 0), attributedRevenue:attributed, revenuePerLead:leads.length ? round(revenue.reduce((sum,event)=>sum+amount(event.amount),0)/leads.length,0) : null }; });
}

export function getJobPerformance(context = {}) { const data = baseCollections(context); return uniq(data.businesses.map((business) => business.discoveryJobId)).map((jobId) => { const job = byId(jobs, jobId); const source = job && sourceForJob(job); const rows = data.businesses.filter((business) => business.discoveryJobId === jobId); const ids = new Set(rows.map((item) => item.id)); const leads = data.leads.filter((lead) => ids.has(lead.businessId)); const deals = data.deals.filter((deal) => ids.has(businessForDeal(deal)?.id)); const traces = getAttributionTraces(data.ctx).filter((trace) => trace.touchpoints.some((touch) => touch.job?.id === jobId)); return { jobId, jobName:job?.name || jobId, sourceName:source?.name || "غير مكتمل", discovered:rows.length, deduplicated:job?.deduplicatedCount ?? null, highOpportunity:rows.filter((item) => tierForBusiness(item.id) === "high").length, leads:leads.length, deals:deals.length, revenue:traces.reduce((sum, trace) => sum + amount(trace.event.amount), 0) }; }); }

export function getIntelligenceAnalytics(context = {}) {
  const data = baseCollections(context); const records = data.businesses.map((business) => ({ business, intelligence:intelligenceForBusiness(business.id) })).filter((item) => item.intelligence); const analyzed = records.filter((item) => item.intelligence.status === "analyzed"); const signals = analyzed.flatMap((item) => item.intelligence.signals || []); const services = analyzed.flatMap((item) => item.intelligence.services || []); const tierDistribution = ["high","good","medium","low","unknown"].map((tier) => ({ tier, count:records.filter((item) => tierForBusiness(item.business.id) === tier).length })); const tierRows = tierDistribution.map((row) => { const businessIds = new Set(records.filter((item) => tierForBusiness(item.business.id) === row.tier).map((item) => item.business.id)); const leads = data.leads.filter((lead) => businessIds.has(lead.businessId)); const deals = data.deals.filter((deal) => businessIds.has(businessForDeal(deal)?.id)); const revenue = data.events.filter((event) => businessIds.has(traceForRevenue(event).business?.id)).reduce((sum,event)=>sum+amount(event.amount),0); return { ...row, leadConversion:percentage(leads.length, businessIds.size), dealConversion:percentage(deals.length, leads.length), revenue }; }); return { tierRows, averageScore:analyzed.length ? round(analyzed.reduce((sum,item)=>sum+(item.intelligence.score || 0),0)/analyzed.length) : null, averageConfidence:analyzed.length ? round(analyzed.reduce((sum,item)=>sum+(item.intelligence.confidence || 0),0)/analyzed.length*100) : null, topGapSignals:Object.entries(signals.filter((signal)=>signal.polarity === "gap").reduce((acc,signal)=>{acc[signal.key]=(acc[signal.key]||0)+1;return acc;},{})).map(([key,count])=>({key,count})).sort((a,b)=>b.count-a.count), recommendedServices:Object.entries(services.reduce((acc,service)=>{acc[service.name]=(acc[service.name]||0)+1;return acc;},{})).map(([name,count])=>({name,count})).sort((a,b)=>b.count-a.count), failed:records.filter((item)=>item.intelligence.status === "analysis_error").length, unknown:records.filter((item)=>["insufficient_data","not_analyzed"].includes(item.intelligence.status)).length }; }

export function getConversationAnalytics(context = {}) { const data = baseCollections(context); const ids = new Set(data.conversationRows.map((item) => item.id)); const messages = (mockModel.messages || []).filter((message) => ids.has(message.conversationId)); const inbound = messages.filter((message) => message.direction === "inbound"); const humanOutbound = messages.filter((message) => message.direction === "outbound" && message.senderType === "user"); const needsReply = data.conversationRows.filter((conversation) => { const rows=messages.filter((message)=>message.conversationId===conversation.id).sort((a,b)=>String(a.createdAt).localeCompare(String(b.createdAt))); return conversation.status === "open" && rows.at(-1)?.direction === "inbound"; }); return { total:data.conversationRows.length, open:data.conversationRows.filter((item)=>item.status==="open").length, closed:data.conversationRows.filter((item)=>item.status==="closed").length, needsReply:needsReply.length, inbound:inbound.length, humanOutbound:humanOutbound.length, responseRate:percentage(uniq(humanOutbound.map((message)=>message.conversationId)).length, uniq(inbound.map((message)=>message.conversationId)).length), entityIds:data.conversationRows.map((item)=>item.id) }; }

export function getAutomationAnalytics(context = {}) { const data = baseCollections(context); const runs=data.automationRuns; const actions=(mockModel.automationActionExecutions||[]).filter((action)=>runs.some((run)=>run.id===action.runId)); const terminal=actions.filter((action)=>["executed","rejected"].includes(action.status)); return { rulesEnabled:(mockModel.automationRules||[]).filter((rule)=>rule.status==="enabled").length, runs:runs.length, matched:runs.filter((run)=>run.status!=="skipped" && run.conditionResult?.matched).length, awaitingApproval:actions.filter((item)=>item.status==="awaiting_approval").length, executed:actions.filter((item)=>item.status==="executed").length, failed:actions.filter((item)=>item.status==="failed").length, rejected:actions.filter((item)=>item.status==="rejected").length, approvalRate:percentage(actions.filter((item)=>item.status==="executed").length, terminal.length), tasksCreated:actions.filter((item)=>item.resultEntityType==="Task").length, appointmentsCreated:actions.filter((item)=>item.resultEntityType==="Appointment").length }; }

export function getAppointmentAnalytics(context = {}) { const data=baseCollections(context); const rows=data.appointmentRows; return { scheduled:rows.filter((item)=>item.status==="scheduled").length, completed:rows.filter((item)=>item.status==="completed").length, cancelled:rows.filter((item)=>item.status==="cancelled").length, noShow:rows.filter((item)=>item.status==="no_show").length, byOwner:mockModel.users.map((user)=>({ ownerId:user.id, name:user.name, count:rows.filter((item)=>item.ownerId===user.id).length })).filter((item)=>item.count) }; }
export function getTaskAnalytics(context = {}) { const data=baseCollections(context); const rows=data.taskRows; return { open:rows.filter((item)=>item.status!=="completed").length, dueToday:rows.filter((item)=>String(item.dueAt||"").slice(0,10)===ANALYTICS_REFERENCE_DATE).length, overdue:rows.filter((item)=>item.status==="overdue").length, completed:rows.filter((item)=>item.status==="completed").length, automationCreated:rows.filter((item)=>item.createdByAutomationRunId).length, humanCreated:rows.filter((item)=>!item.createdByAutomationRunId).length }; }

export function getDataQuality(context = {}) { const data=baseCollections(context); const traces=getAttributionTraces(data.ctx); const brokenAttribution=traces.filter((trace)=>!trace.complete).length; const revenueWithoutAttribution=traces.filter((trace)=>!trace.touchpoints.some((item)=>item.touchpoint)).length; const brokenLeadBusiness=data.leads.filter((lead)=>!businessForLead(lead)).length; const brokenDealLead=data.deals.filter((deal)=>!leadForDeal(deal)).length; const intelligence=getIntelligenceAnalytics(data.ctx); const severity = brokenAttribution || brokenLeadBusiness || brokenDealLead ? "warning" : "ok"; return { severity, brokenAttribution, revenueWithoutAttribution, brokenLeadBusiness, brokenDealLead, unknownIntelligence:intelligence.unknown, failedIntelligence:intelligence.failed, overAttributed:traces.filter((trace)=>trace.overAttributed>0).length, rows:traces.filter((trace)=>!trace.complete).map((trace)=>({ id:trace.event.id, missing:trace.touchpoints.flatMap((item)=>item.missingRefs) })) }; }

export function getMetricDrilldown(metricId, context = {}) { const overview=getAnalyticsOverview(context); const map={ businesses_discovered:overview.metrics.businessesDiscovered.entityIds, businesses_enriched:overview.metrics.businessesEnriched.entityIds, high_opportunity_businesses:overview.metrics.highOpportunityBusinesses.entityIds, leads_created:overview.metrics.leadsCreated.entityIds, leads_contacted:overview.metrics.leadsContacted.entityIds, qualified_leads:overview.metrics.qualifiedLeads.entityIds, open_deals:overview.metrics.openDeals.entityIds, open_pipeline:overview.metrics.openPipeline.entityIds, weighted_pipeline:overview.metrics.weightedPipeline.entityIds, won_deals:overview.metrics.wonDeals.entityIds, revenue_total:overview.metrics.revenue.entityIds, attributed_revenue:overview.metrics.attributedRevenue.entityIds, ai_influenced_revenue:overview.metrics.aiInfluencedRevenue.entityIds, appointments:overview.metrics.appointments.entityIds, automation_executions:overview.metrics.automationExecutions.entityIds }; const definition=analyticsMetricDefinitions.find((item)=>item.id===metricId); const ids=map[metricId]||[]; return { definition, ids, period:dateLabel(overview.context), filters:activeAnalyticsFilters(overview.context) }; }
export function activeAnalyticsFilters(context = {}) { const ctx=normalizeAnalyticsContext(context); const options=getAnalyticsOptions(); const labels={ sourceId:"المصدر", jobId:"العملية", ownerId:"المالك", city:"المدينة", opportunityTier:"الفرصة", leadStatus:"حالة Lead", dealStageId:"مرحلة الصفقة", channel:"القناة", automationRuleId:"قاعدة الأتمتة" }; return Object.entries(labels).flatMap(([key,label])=>{if(ctx[key]==="all")return [];const group=key==="sourceId"?options.sources:key==="jobId"?options.jobs:key==="ownerId"?options.owners:key==="city"?options.cities:key==="opportunityTier"?options.tiers:key==="leadStatus"?options.leadStatuses:key==="dealStageId"?options.stages:key==="channel"?options.channels:options.automationRules;return [{key,label,value:group.find((item)=>item.id===ctx[key])?.label||ctx[key]}];}); }
export function getAnalyticsExportRows(context = {}) { return getAttributionTraces(context).map((trace)=>({ revenueEventId:trace.event.id, recognizedAt:trace.event.recognizedAt, revenue:amount(trace.event.amount), attributed:trace.attributed, unattributed:trace.unattributed, dealId:trace.deal?.id||"", leadId:trace.lead?.id||"", businessId:trace.business?.id||"", jobId:trace.touchpoints[0]?.job?.id||"", sourceId:trace.touchpoints[0]?.source?.id||"", traceStatus:trace.complete?"complete":"broken" })); }
