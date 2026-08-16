// S4 design reminder: Explainable Arabic RTL opportunity intelligence is deterministic, derived from shared signals, and never creates CRM records or calls an AI provider.
import { businesses, getAttributionIntegrityReport, getDiscoveryIntegrityReport, getDiscoveryJob, getDiscoverySource, mockModel, state } from "./data.js";

export const SCORING_VERSION = "S4-MOCK-v1";
export const dimensionContract = [
  { key:"activity", label:"قوة النشاط", max:25 },
  { key:"digitalOpportunity", label:"الفرصة الرقمية", max:30 },
  { key:"reachability", label:"قابلية التواصل", max:20 },
  { key:"serviceFit", label:"ملاءمة الخدمة", max:15 },
  { key:"dataQuality", label:"جودة البيانات", max:10 }
];

export const analysisStatusLabels = { not_analyzed:"لم تُحلل", analyzing:"جارٍ التحليل", analyzed:"تم التحليل", analysis_error:"تعذر التحليل", insufficient_data:"بيانات غير كافية" };
export const tierLabels = { high:"فرصة عالية", good:"فرصة جيدة", medium:"فرصة متوسطة", low:"فرصة منخفضة" };
export const intelligenceProcessingStages = [
  "قراءة بيانات النشاط",
  "تحليل السمعة والتقييمات",
  "فحص الحضور الرقمي",
  "تحليل قابلية التواصل",
  "اكتشاف فجوات النمو",
  "مطابقة الخدمات المناسبة",
  "حساب درجة الفرصة"
];

const byId = (items, id) => items.find((item) => item.id === id);
const duplicateIds = (items) => items.map((item) => item.id).filter((id, index, values) => values.indexOf(id) !== index);
const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

export function getOpportunityTier(score) {
  if (score >= 80) return "high";
  if (score >= 65) return "good";
  if (score >= 40) return "medium";
  return "low";
}

export function getBusinessSignals(businessId) { return mockModel.signals.filter((signal) => signal.businessId === businessId); }
export function getOpportunityAnalysis(businessId) { return mockModel.opportunityAnalyses.find((analysis) => analysis.businessId === businessId); }
export function getOpportunity(businessId) { return mockModel.opportunities.find((opportunity) => opportunity.businessId === businessId); }
export function getIntelligenceStatus(businessId) { return getOpportunityAnalysis(businessId)?.status || "not_analyzed"; }

function dimensionsFor(signals) {
  return dimensionContract.map((dimension) => ({ ...dimension, score:signals.filter((signal) => signal.dimension === dimension.key).reduce((total, signal) => total + signal.points, 0) }));
}

function servicesFor(signals) {
  const gaps = new Set(signals.filter((signal) => signal.polarity === "gap" && signal.gapCode).map((signal) => signal.gapCode));
  return mockModel.serviceCatalog.filter((service) => service.gapCodes.some((gapCode) => gaps.has(gapCode))).map((service) => ({ ...service, signalIds:signals.filter((signal) => service.gapCodes.includes(signal.gapCode)).map((signal) => signal.id) }));
}

function reasonText(signal) {
  if (signal.polarity === "gap") return `فجوة: ${signal.value}`;
  if (signal.polarity === "positive") return `إشارة داعمة: ${signal.value}`;
  if (signal.polarity === "unknown") return `إشارة غير مكتملة: ${signal.value}`;
  return signal.value;
}

function approachFor(services, signals) {
  const gaps = new Set(signals.filter((signal) => signal.polarity === "gap").map((signal) => signal.gapCode));
  if (gaps.has("manual_booking") || gaps.has("missing_whatsapp") || gaps.has("appointment_friction")) return "ابدأ بمناقشة تقليل زمن الاستجابة وتحويل الاستفسارات إلى حجز ومتابعة أوضح، بدل تقديم الحل كأداة منفصلة.";
  if (gaps.has("weak_website")) return "ابدأ بمناقشة تحويل زوار الموقع إلى طلبات واضحة، ثم اربط الحاجة بتحسين تجربة الموقع.";
  if (gaps.has("weak_visibility")) return "ابدأ بسؤال عن أثر الظهور الرقمي على الطلبات الحالية، ثم اربط الحل بمصدر قياس واضح.";
  if (!services.length) return "لا تبدأ بعرض خدمة محددة؛ لا توجد فجوة مثبتة تستدعي أولوية مبيعات أعلى.";
  return "ابدأ بفهم أثر الفجوة التشغيلية قبل ربطها بالخدمة المقترحة.";
}

export function getBusinessIntelligence(businessId) {
  const business = byId(businesses, businessId);
  if (!business) return null;
  const analysis = getOpportunityAnalysis(businessId);
  const signals = getBusinessSignals(businessId);
  const status = analysis?.status || "not_analyzed";
  const dimensions = dimensionsFor(signals);
  const score = status === "analyzed" ? dimensions.reduce((total, dimension) => total + dimension.score, 0) : null;
  const tier = score === null ? null : getOpportunityTier(score);
  const opportunity = getOpportunity(businessId);
  const services = status === "analyzed" ? servicesFor(signals) : [];
  const job = getDiscoveryJob(business.discoveryJobId);
  const source = job && getDiscoverySource(job.sourceId);
  const reasonSignals = opportunity?.reasonSignalIds?.map((id) => byId(mockModel.signals, id)).filter(Boolean) || signals.filter((signal) => signal.polarity === "gap");
  return {
    business, analysis, opportunity, signals, dimensions, score, tier, status, confidence:analysis?.confidence ?? 0,
    services, reasons:reasonSignals.map((signal) => ({ ...signal, text:reasonText(signal) })),
    positives:signals.filter((signal) => signal.polarity === "positive"),
    salesApproach:opportunity?.salesApproach || approachFor(services, signals), job, source,
    provenance:[source?.id, job?.id, business.id, ...(signals.map((signal) => signal.id)), analysis?.id, opportunity?.id].filter(Boolean)
  };
}

export function getIntelligenceSummary(businessIds) {
  const records = businessIds.map(getBusinessIntelligence).filter(Boolean);
  return {
    total:records.length,
    analyzed:records.filter((record) => record.status === "analyzed").length,
    high:records.filter((record) => record.tier === "high").length,
    good:records.filter((record) => record.tier === "good").length,
    insufficient:records.filter((record) => record.status === "insufficient_data").length
  };
}

export function beginBusinessAnalysis(businessId) {
  const analysis = getOpportunityAnalysis(businessId);
  if (!analysis || analysis.status === "insufficient_data") return null;
  analysis.status = "analyzing";
  return analysis;
}

export function completeBusinessAnalysis(businessId) {
  const analysis = getOpportunityAnalysis(businessId);
  if (!analysis || analysis.status === "insufficient_data") return null;
  analysis.status = "analyzed";
  analysis.scoringVersion = SCORING_VERSION;
  analysis.analyzedAt = "2026-08-15T12:25:00";
  if (!getOpportunity(businessId)) {
    const numericId = businessId.split("-")[1];
    const signals = getBusinessSignals(businessId);
    const services = servicesFor(signals);
    mockModel.opportunities.push({ id:`OPP-${numericId}`, analysisId:analysis.id, businessId, status:"open", reasonSignalIds:signals.filter((signal) => signal.polarity === "gap").map((signal) => signal.id), salesApproach:approachFor(services, signals) });
  }
  return getBusinessIntelligence(businessId);
}

export function getIntelligenceIntegrityReport() {
  const checks = [];
  const add = (id, name, pass, detail) => checks.push({ id, name, pass, detail });
  const analyses = mockModel.opportunityAnalyses;
  const signals = mockModel.signals;
  const opportunities = mockModel.opportunities;
  add("A", "Signal Ownership", signals.every((signal) => Boolean(byId(businesses, signal.businessId))), "كل Signal تشير إلى Business موجودة");
  add("B", "Analysis Ownership", analyses.every((analysis) => Boolean(byId(businesses, analysis.businessId))), "كل Analysis تشير إلى Business موجودة");
  add("C", "Signal References", analyses.every((analysis) => analysis.signalIds.every((id) => { const signal = byId(signals, id); return signal && signal.businessId === analysis.businessId; })), "كل signalIds تعود لنفس Business");
  add("D", "Score Math", analyses.filter((analysis) => analysis.status === "analyzed").every((analysis) => { const record = getBusinessIntelligence(analysis.businessId); return record.dimensions.reduce((sum, dimension) => sum + dimension.score, 0) === record.score; }), "مجموع dimensions يساوي Score");
  add("E", "Score Bounds", analyses.filter((analysis) => analysis.status === "analyzed").every((analysis) => { const score = getBusinessIntelligence(analysis.businessId).score; return score >= 0 && score <= 100; }), "كل Score ضمن 0–100");
  add("F", "Tier Mapping", analyses.filter((analysis) => analysis.status === "analyzed").every((analysis) => { const record = getBusinessIntelligence(analysis.businessId); return record.tier === getOpportunityTier(record.score); }), "Tier مشتقة من Score");
  add("G", "Confidence Bounds", analyses.every((analysis) => analysis.confidence >= 0 && analysis.confidence <= 1), "Confidence ضمن 0–1");
  add("H", "Unknown Handling", analyses.filter((analysis) => analysis.status === "insufficient_data").every((analysis) => { const record = getBusinessIntelligence(analysis.businessId); return record.score === null && record.signals.every((signal) => signal.polarity === "unknown" || signal.points === 0); }), "Unknown لا تتحول إلى negative score");
  add("I", "Service Evidence", opportunities.every((opportunity) => { const record = getBusinessIntelligence(opportunity.businessId); return record.services.every((service) => service.signalIds.length > 0); }), "كل خدمة مشتقة من Gap Signal");
  add("J", "Discovery Provenance", analyses.every((analysis) => { const business = byId(businesses, analysis.businessId); const job = business && getDiscoveryJob(business.discoveryJobId); return Boolean(job && getDiscoverySource(job.sourceId)); }), "Business → Job → Source موجودة");
  add("K", "Analysis Stability", analyses.filter((analysis) => analysis.status === "analyzed").every((analysis) => { const first = getBusinessIntelligence(analysis.businessId); const second = getBusinessIntelligence(analysis.businessId); return first.score === second.score && first.tier === second.tier && JSON.stringify(first.reasons.map((reason) => reason.id)) === JSON.stringify(second.reasons.map((reason) => reason.id)); }), "نفس المدخلات تعطي النتيجة نفسها");
  add("L", "S3 Lifecycle Regression", getDiscoveryIntegrityReport().pass, "Results lifecycle محفوظة");
  add("M", "S3 Date Regression", ["JOB-1028","JOB-1030"].every((id) => getDiscoveryJob(id)?.createdAt?.startsWith("2026-08-15")), "Jobs اليوم تبقى قابلة للتطابق بالـmachine date");
  const attribution = getAttributionIntegrityReport();
  add("N", "S2 Attribution Regression", attribution.pass && attribution.attributionTotal - attribution.revenueSummary === 0, "Attributed Revenue − Revenue Summary = 0");
  add("O", "Unique IDs", [signals, analyses, opportunities].every((items) => duplicateIds(items).length === 0), "Signal / Analysis / Opportunity IDs فريدة");
  return { pass:checks.every((check) => check.pass), checks };
}

export function openIntelligenceBusiness(businessId) {
  state.selectedBusinessId = businessId;
  return getBusinessIntelligence(businessId);
}

const fmt = (value) => new Intl.NumberFormat("ar-SA").format(value ?? 0);
const percent = (value) => `${Math.round((value || 0) * 100)}%`;
const statusTone = (status) => ({ analyzed:"success", analyzing:"info", not_analyzed:"neutral", analysis_error:"danger", insufficient_data:"warning" }[status] || "neutral");
const tierTone = (tier) => ({ high:"success", good:"info", medium:"warning", low:"neutral" }[tier] || "neutral");
const mono = (value) => `<span class="mono ltr">${value}</span>`;

function statusBadge(status) { return `<span class="status s4-analysis-status ${statusTone(status)}">${analysisStatusLabels[status] || status}</span>`; }
function scoreDisplay(record) { return record.score === null ? `<span class="score-missing">—<small>غير متاح</small></span>` : `<span class="score-cell ${record.tier}"><b>${record.score}</b><small>${tierLabels[record.tier]}</small></span>`; }
function decisionRail(stage, job, source) { const current = stage === "results" ? 1 : 2; const steps=[{label:"بحث",detail:"طلب ومصدر"},{label:"نتائج",detail:"سجلات مكتشفة"},{label:"ذكاء",detail:"دليل وقرار"},{label:"وجهة",detail:"Excel أو CRM"}]; return `<section class="s4-decision-rail" aria-label="سكة قرار نمو"><div class="s4-rail-brand"><span class="s4-orbit-mark"><i></i><i></i><i></i></span><span><b>نمو</b><small>سكة القرار</small></span></div><ol>${steps.map((item,index)=>`<li class="${index < current ? "done" : ""} ${index === current ? "active" : ""}"><i>${String(index+1).padStart(2,"0")}</i><span><b>${item.label}</b><small>${item.detail}</small></span></li>`).join("")}</ol><div class="s4-rail-context"><span>السجل الحالي</span><b>${mono(job?.id || "—")}${source ? ` · ${source.name}` : ""}</b></div></section>`; }

function filteredRecords(jobId) {
  const filters = state.resultFilters;
  const job = getDiscoveryJob(jobId);
  const records = (job?.resultBusinessIds || []).map(getBusinessIntelligence).filter(Boolean);
  const rows = records.filter((record) => {
    const business = record.business;
    const text = `${business.name} ${business.category} ${business.city}`;
    const hasGap = record.signals.some((signal) => signal.gapCode === filters.gap);
    return (!filters.search || text.includes(filters.search))
      && (filters.category === "all" || business.category === filters.category)
      && (filters.city === "all" || business.city === filters.city)
      && (filters.rating === "all" || (business.rating ?? 0) >= Number(filters.rating))
      && (filters.reviews === "all" || (business.reviews ?? 0) >= Number(filters.reviews))
      && (filters.website === "all" || (filters.website === "yes" ? Boolean(business.website) : !business.website))
      && (filters.phone === "all" || (filters.phone === "yes" ? Boolean(business.phone) : !business.phone))
      && (filters.opportunityTier === "all" || (filters.opportunityTier === "not_analyzed" ? ["not_analyzed","insufficient_data"].includes(record.status) : record.tier === filters.opportunityTier))
      && (filters.minScore === "all" || (record.score !== null && record.score >= Number(filters.minScore)))
      && (filters.confidence === "all" || record.confidence >= Number(filters.confidence))
      && (filters.gap === "all" || hasGap)
      && (filters.intelligenceStatus === "all" || record.status === filters.intelligenceStatus)
      && (!filters.highOpportunity || record.score >= 80);
  });
  const sorters = {
    score:(a,b) => (b.score ?? -1) - (a.score ?? -1),
    confidence:(a,b) => b.confidence - a.confidence,
    reviews:(a,b) => (b.business.reviews ?? -1) - (a.business.reviews ?? -1),
    rating:(a,b) => (b.business.rating ?? -1) - (a.business.rating ?? -1),
    name:(a,b) => a.business.name.localeCompare(b.business.name, "ar"),
    newest:() => 0
  };
  return [...rows].sort(sorters[filters.sort] || sorters.newest);
}

function intelligenceFilterControls(jobId, records) {
  const filters = state.resultFilters;
  const categories = [...new Set(records.map((record) => record.business.category))];
  const cities = [...new Set(records.map((record) => record.business.city))];
  return `<div class="results-filter-grid s4-filter-grid"><label class="search-field"><span>⌕</span><input data-result-filter="search" value="${filters.search}" placeholder="ابحث في الشركة أو النشاط أو المدينة"/></label><select data-result-filter="opportunityTier"><option value="all">كل مستويات الفرصة</option><option value="high">فرصة عالية</option><option value="good">فرصة جيدة</option><option value="medium">فرصة متوسطة</option><option value="low">فرصة منخفضة</option><option value="not_analyzed">غير محللة / غير كافية</option></select><select data-result-filter="minScore"><option value="all">أي درجة</option><option value="80">80+ نقطة</option><option value="65">65+ نقطة</option><option value="40">40+ نقطة</option></select><select data-result-filter="confidence"><option value="all">أي ثقة</option><option value="0.8">80%+ ثقة</option><option value="0.7">70%+ ثقة</option><option value="0.5">50%+ ثقة</option></select><select data-result-filter="gap"><option value="all">كل الفجوات</option><option value="weak_website">الموقع</option><option value="weak_visibility">الظهور</option><option value="manual_booking">الحجز اليدوي</option><option value="missing_whatsapp">واتساب</option></select><select data-result-filter="intelligenceStatus"><option value="all">كل حالات التحليل</option><option value="analyzed">تم التحليل</option><option value="not_analyzed">لم تُحلل</option><option value="analyzing">جارٍ التحليل</option><option value="insufficient_data">بيانات غير كافية</option></select><select data-result-filter="sort"><option value="newest">الأحدث اكتشافًا</option><option value="score">أعلى درجة فرصة</option><option value="confidence">أعلى ثقة</option><option value="reviews">الأكثر مراجعات</option><option value="rating">الأعلى تقييمًا</option><option value="name">الاسم</option></select></div><div class="s4-secondary-filter-row"><button type="button" class="button ${filters.highOpportunity ? "primary" : "ghost"}" data-intelligence-action="toggle-high-opportunity">أفضل الفرص <span>80+ نقطة</span></button><select data-result-filter="category"><option value="all">كل الأنشطة</option>${categories.map((category) => `<option value="${category}" ${filters.category === category ? "selected" : ""}>${category}</option>`).join("")}</select><select data-result-filter="city"><option value="all">كل المدن</option>${cities.map((city) => `<option value="${city}" ${filters.city === city ? "selected" : ""}>${city}</option>`).join("")}</select><small>الفلاتر تخص العينة المحمّلة فقط من ${mono(jobId)}.</small></div>`;
}

function summaryCards(job, records) {
  const summary = getIntelligenceSummary(records.map((record) => record.business.id));
  return `<section class="s4-opportunity-summary" aria-label="ملخص ذكاء النتائج"><article><span>ملخص Job</span><b>${fmt(job.deduplicatedCount)}</b><small>نتيجة نهائية في العملية</small></article><article><span>العينة المحمّلة</span><b>${fmt(summary.total)}</b><small>سجلات Business ظاهرة</small></article><article><span>تم تحليلها</span><b>${fmt(summary.analyzed)}</b><small>تحليل حتمي محلي</small></article><article><span>فرص عالية</span><b>${fmt(summary.high)}</b><small>درجة 80 فأعلى</small></article><article><span>فرص جيدة</span><b>${fmt(summary.good)}</b><small>درجة 65–79</small></article><article><span>بيانات غير كافية</span><b>${fmt(summary.insufficient)}</b><small>بلا درجة مضللة</small></article></section>`;
}

function analysisAction(record) {
  const id = record.business.id;
  if (record.status === "analyzing") return `<button type="button" class="button compact" disabled>جارٍ التحليل…</button>`;
  if (["not_analyzed","analysis_error"].includes(record.status)) return `<button type="button" class="button compact primary" data-intelligence-action="analyze-one" data-business="${id}">${record.status === "analysis_error" ? "إعادة محاولة التحليل" : "تحليل الفرصة"}</button>`;
  if (record.status === "insufficient_data") return `<button type="button" class="button compact" data-route="intelligence?business=${id}" data-business="${id}">عرض سبب عدم الكفاية</button>`;
  return `<div class="s5-results-actions"><button type="button" class="button compact" data-route="intelligence?business=${id}" data-business="${id}">فتح الذكاء</button><button type="button" class="button compact ghost" data-crm-action="open-conversion" data-business="${id}">إضافة إلى CRM</button></div>`;
}

export function renderIntelligenceResults(ctx, jobId) {
  const { button, pageHead } = ctx;
  const job = getDiscoveryJob(jobId);
  if (!job) return `${pageHead("نتائج الاكتشاف", "لا توجد نتائج بعد", "ابدأ عملية اكتشاف مكتملة لعرض العينة التجريبية.", button("بدء عملية جديدة", "route-discovery", "button primary"))}`;
  if (job.status !== "completed") return `<section class="card discovery-results-blocked"><span class="status warning">${job.status === "processing" ? "قيد المعالجة" : "النتائج غير متاحة"}</span><h2>نتائج الذكاء غير جاهزة لهذه العملية</h2><p>يظل تحليل الفرص مرتبطًا فقط بنتائج Job مكتملة. عد إلى تفاصيل العملية لمتابعة الحالة.</p>${button("العودة إلى تفاصيل العملية", `route-discovery/jobs/${job.id}`, "button primary")}</section>`;
  const allRecords = job.resultBusinessIds.map(getBusinessIntelligence).filter(Boolean);
  const rows = filteredRecords(job.id);
  const selected = state.selectedResultIds.filter((id) => rows.some((record) => record.business.id === id));
  return `${pageHead("نتائج + ذكاء الفرص", job.name, `عينة Business مرتبطة بـ${mono(job.id)}؛ التحليل حتمي ومفسّر، ولا ينشئ سجلات CRM.`, `${button("عودة للعملية", `route-discovery/jobs/${job.id}`, "button")}${button("بدء اكتشاف جديد", "route-discovery", "button primary")}`)}
  <div class="prototype-notice discovery-notice"><b>محاكاة Intelligence</b><span>الدرجة والثقة والإشارات تُشتق من بيانات العرض المحلية والإصدار ${SCORING_VERSION} فقط؛ لا يوجد AI API أو Enrichment.</span></div>
  ${decisionRail("results", job, getDiscoverySource(job.sourceId))}${summaryCards(job, allRecords)}
  <section class="card">${intelligenceFilterControls(job.id, allRecords)}<div class="results-selection-bar"><label class="check"><input type="checkbox" data-select-all-results ${rows.length && selected.length === rows.length ? "checked" : ""}/> تحديد النتائج الظاهرة</label><span>${fmt(selected.length)} محدد من ${fmt(rows.length)} ظاهرة</span><div><button type="button" class="button" data-intelligence-action="analyze-selected" data-business-ids="${selected.join(",")}" ${selected.length ? "" : "disabled"}>تحليل المحدد</button><button type="button" class="button ghost" data-intelligence-action="analyze-results" data-business-ids="${rows.map((record) => record.business.id).join(",")}">تحليل النتائج الظاهرة</button></div></div><div class="table-wrap"><table class="data-table discovery-results-table s4-results-table"><thead><tr><th><span class="sr-only">تحديد</span></th><th>الشركة</th><th>النشاط</th><th>المدينة</th><th class="s4-optional-col">التقييم</th><th>الفرصة</th><th>الثقة</th><th class="s4-optional-col">أهم فجوة</th><th>حالة الذكاء</th><th></th></tr></thead><tbody>${rows.length ? rows.map((record) => { const b = record.business; const topGap = record.reasons[0]?.value || "لا توجد فجوة مثبتة"; return `<tr class="${selected.includes(b.id) ? "selected" : ""}"><td><input aria-label="تحديد ${b.name}" type="checkbox" data-select-result="${b.id}" ${selected.includes(b.id) ? "checked" : ""}/></td><td><button type="button" class="row-link company-cell" data-route="intelligence?business=${b.id}" data-business="${b.id}"><i class="company-mark">${b.short.slice(0,1)}</i><span><b>${b.name}</b><small class="mono ltr">${b.id}</small></span></button></td><td>${b.category}</td><td>${b.city}</td><td class="s4-optional-col">${b.rating === null ? "غير معروف" : `<span class="rating-value">★ ${b.rating}</span>`}</td><td>${scoreDisplay(record)}</td><td><b class="confidence-value">${record.status === "insufficient_data" ? "—" : percent(record.confidence)}</b></td><td class="s4-optional-col"><small>${topGap}</small></td><td>${statusBadge(record.status)}</td><td>${analysisAction(record)}</td></tr>`; }).join("") : `<tr><td colspan="10"><div class="table-empty"><b>لم نجد سجلات تطابق هذه المعايير.</b><span>عدّل فلاتر Intelligence أو أزل عرض أفضل الفرص.</span></div></td></tr>`}</tbody></table></div></section>`;
}

function dimensionRows(record) { return record.dimensions.map((dimension) => `<div><span>${dimension.label}</span><b>${dimension.score} <small>/ ${dimension.max}</small></b></div>`).join(""); }
function signalCard(signal) { const tone = signal.polarity === "gap" ? "gap" : signal.polarity === "positive" ? "positive" : signal.polarity === "unknown" ? "unknown" : "neutral"; return `<article class="s4-signal-card ${tone}"><header><span>${signal.polarity === "gap" ? "فجوة مثبتة" : signal.polarity === "positive" ? "إشارة داعمة" : signal.polarity === "unknown" ? "بيانات غير معروفة" : "سياق محايد"}</span><b>${signal.value}</b></header><p>${signal.key.replaceAll("_", " ")}</p><button type="button" class="button ghost compact" data-intelligence-action="open-evidence" data-signal="${signal.id}">عرض الدليل</button></article>`; }

export function renderIntelligence(ctx, businessId = state.selectedBusinessId) {
  const { button, pageHead } = ctx;
  const record = getBusinessIntelligence(businessId);
  if (!record) return `${pageHead("ذكاء العملاء", "لم نجد سجل Business", "اختر نتيجة مكتملة من مساحة الاكتشاف لعرض تحليلها.", button("فتح النتائج", "route-discovery/results", "button primary"))}`;
  const { business, analysis, job, source } = record;
  const scoreArea = record.score === null ? `<div class="s4-score-panel insufficient"><b>—</b><span>لا توجد درجة</span></div>` : `<div class="s4-score-panel ${record.tier}"><b>${record.score}</b><span>من 100</span><small>${tierLabels[record.tier]}</small></div>`;
  const analysisAction = record.status === "analyzing" ? `<button class="button primary" disabled>جارٍ التحليل…</button>` : record.status === "insufficient_data" ? "" : record.status === "not_analyzed" ? `<button class="button primary" data-intelligence-action="analyze-one" data-business="${business.id}">تحليل الفرصة</button>` : `<button class="button" data-intelligence-action="re-analyze" data-business="${business.id}">إعادة التحليل</button>`;
  if (record.status === "insufficient_data") return `${pageHead("ذكاء العملاء", business.name, "لا يمكن تقييم الفرصة بثقة قبل توفر إشارات إضافية.", `${button("العودة إلى النتائج", `route-discovery/results?job=${job?.id || state.selectedJobId}`, "button")}<button type="button" class="button" data-intelligence-action="check-completeness" data-business="${business.id}">فحص اكتمال البيانات</button>`)}${decisionRail("intelligence", job, source)}<section class="s4-insufficient-state card"><span class="status warning">بيانات غير كافية</span><h2>نحتاج إشارات إضافية قبل تقييم الفرصة بثقة.</h2><p>لا يعامل النظام التقييم أو الموقع أو بيانات الاتصال غير المعروفة كإشارات سلبية، ولذلك لا يمنح هذا السجل درجة رقمية مصطنعة.</p><div class="s4-provenance-line">${mono(source?.id || "—")} <i>←</i> ${mono(job?.id || "—")} <i>←</i> ${mono(business.id)}</div><div class="s4-signal-grid">${record.signals.map(signalCard).join("")}</div></section>`;
  if (record.status === "analysis_error") return `${pageHead("ذكاء العملاء", business.name, "تعذر إكمال التحليل التجريبي لهذه Business، ولم تُعرض درجة أو خدمة كحقيقة.", `${button("العودة إلى النتائج", `route-discovery/results?job=${job?.id || state.selectedJobId}`, "button")}<button type="button" class="button primary" data-intelligence-action="analyze-one" data-business="${business.id}">إعادة محاولة التحليل</button>`)}${decisionRail("intelligence", job, source)}<section class="s4-insufficient-state card s4-error-state"><span class="status danger">تعذر التحليل</span><h2>لا نعرض نتيجة غير مكتملة على أنها فرصة.</h2><p>أعد المحاولة محليًا لإعادة بناء التحليل من Signals نفسها. لا ينتج هذا الإجراء Lead أو CRM أو أي اتصال خارجي.</p><div class="s4-provenance-line">${mono(source?.id || "—")} <i>←</i> ${mono(job?.id || "—")} <i>←</i> ${mono(business.id)}</div></section>`;
  return `${pageHead("ذكاء العملاء", business.name, "ملف Opportunity تفسيري مبني على Signals محلية ثابتة؛ يمكن بدء مراجعة تحويل CRM صريحة بعد التحليل، ولا ينشئ Deal.", `${button("العودة إلى النتائج", `route-discovery/results?job=${job?.id || state.selectedJobId}`, "button")}${analysisAction}`)}
  <div class="prototype-notice discovery-notice"><b>محاكاة Intelligence</b><span>Scoring version: ${mono(analysis?.scoringVersion || SCORING_VERSION)}. التحليل ثابت لنفس البيانات ولا يتصل بأي مزود ذكاء اصطناعي.</span></div>${decisionRail("intelligence", job, source)}
  <section class="s4-intelligence-hero card"><div class="s4-business-facts"><div><span>النشاط</span><b>${business.category}</b></div><div><span>المدينة</span><b>${business.city}</b></div><div><span>التقييم</span><b>${business.rating === null ? "غير معروف" : `★ ${business.rating} · ${fmt(business.reviews)} مراجعة`}</b></div><div><span>المصدر</span><b>${source?.name || "—"} · ${mono(job?.id || "—")}</b></div></div>${scoreArea}<div class="s4-opportunity-head"><span>${statusBadge(record.status)}</span><b>${record.score === null ? "لا توجد فرصة مقيمة" : tierLabels[record.tier]}</b><small>ثقة ${percent(record.confidence)} · آخر تحليل ${analysis?.analyzedAt ? "اليوم، 09:42" : "لم يتم بعد"}</small>${record.status === "analyzing" ? `<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="45" aria-label="تقدم تحليل الفرصة"><i style="width:45%"></i></div>` : ""}</div></section>
  <section class="s4-detail-grid"><article class="card s4-breakdown-card"><header class="card-head"><div><h2>كيف حُسبت الدرجة؟</h2><p>مجموع أبعاد قابلة للمراجعة، لا درجة سحرية.</p></div><button type="button" class="button ghost" data-intelligence-action="open-score-breakdown" data-business="${business.id}">عرض المعادلة</button></header><div class="s4-dimension-list">${dimensionRows(record)}</div><footer><span>الإجمالي</span><b>${record.score ?? "—"} / 100</b></footer></article><article class="card s4-reasons-card"><header class="card-head"><div><h2>لماذا هذه فرصة؟</h2><p>أسباب مرتبطة بإشارات قابلة للعرض.</p></div></header>${record.reasons.length ? `<div class="s4-reason-list">${record.reasons.map((reason) => `<div><i>!</i><span>${reason.text}</span></div>`).join("")}</div>` : `<div class="s4-empty-note">لا توجد فجوة مثبتة، لذلك لا تحصل الشركة القوية رقميًا على أولوية عالية تلقائيًا.</div>`}</article></section>
  <section class="card"><header class="card-head"><div><h2>إشارات Business والأدلة</h2><p>كل إشارة تعود إلى نفس السجل وتوضح ما نعرفه وما لا نعرفه.</p></div></header><div class="s4-signal-grid">${record.signals.map(signalCard).join("")}</div></section>
  <section class="s4-detail-grid"><article class="card"><header class="card-head"><div><h2>الفجوات والخدمات المقترحة</h2><p>لا تعرض الخدمة إلا عندما ترتبط بفجوة مثبتة.</p></div></header>${record.services.length ? `<div class="s4-service-list">${record.services.map((service) => `<article><b>${service.name}</b><p>${service.description}</p><small>مبني على ${service.signalIds.map(mono).join("، ")}</small></article>`).join("")}</div>` : `<div class="s4-empty-note">لا توجد خدمة مقترحة؛ لا تظهر فجوة قابلة للتحويل إلى توصية خدمية.</div>`}</article><article class="card s4-approach-card"><header class="card-head"><div><h2>أسلوب التواصل المقترح</h2><p>توصية Mock مرتبطة بالإشارات، لا رسالة مرسلة.</p></div></header><p>${record.salesApproach}</p><div class="future-action-note"><b>إضافة إلى CRM</b><span>تفتح معاينة تحويل تحفظ المصدر وسياق Intelligence، ولا تنشئ Deal أو رسالة.</span><button type="button" class="button primary" data-crm-action="open-conversion" data-business="${business.id}">مراجعة الإضافة إلى CRM</button></div></article></section>
  <section class="s4-provenance card"><header><span>سلسلة الثقة</span><b>المصدر ← Job ← Business ← Signals ← Analysis ← Opportunity</b></header><div>${mono(source?.id || "—")}<i>←</i>${mono(job?.id || "—")}<i>←</i>${mono(business.id)}<i>←</i><span>${record.signals.map((signal) => mono(signal.id)).join(" ")}</span><i>←</i>${mono(analysis?.id || "—")}<i>←</i>${mono(record.opportunity?.id || "—")}</div></section>`;
}

export function renderIntelligenceModal(ctx) {
  const processing = renderIntelligenceProcessing(ctx);
  if (processing) return processing;
  const modal = state.intelligenceModal;
  if (!modal) return "";
  const { button } = ctx;
  if (modal.type === "breakdown") { const record = getBusinessIntelligence(modal.businessId); if (!record) return ""; return `<div class="modal-backdrop" data-intelligence-action="close-modal"><section class="modal s4-explain-modal" role="dialog" aria-modal="true" aria-labelledby="scoreExplainTitle"><header class="modal-head"><div><p class="eyebrow">تفسير الدرجة</p><h2 id="scoreExplainTitle">كيف حُسبت درجة ${record.business.name}؟</h2></div><button class="modal-close" type="button" aria-label="إغلاق" data-intelligence-action="close-modal">×</button></header><div class="s4-dimension-list">${dimensionRows(record)}</div><footer class="modal-footer"><span>الإجمالي: <b>${record.score} / 100</b></span><button type="button" class="button" data-intelligence-action="close-intelligence-modal">إغلاق</button></footer></section></div>`; }
  if (modal.type === "evidence") { const signal = byId(mockModel.signals, modal.signalId); const business = signal && byId(businesses, signal.businessId); if (!signal) return ""; return `<div class="modal-backdrop" data-intelligence-action="close-modal"><section class="modal s4-evidence-modal" role="dialog" aria-modal="true" aria-labelledby="evidenceTitle"><header class="modal-head"><div><p class="eyebrow">دليل الإشارة</p><h2 id="evidenceTitle">${business?.name || signal.businessId}</h2></div><button class="modal-close" type="button" aria-label="إغلاق" data-intelligence-action="close-modal">×</button></header><dl class="business-preview-detail"><div><dt>الإشارة</dt><dd>${signal.value}</dd></div><div><dt>النوع</dt><dd>${signal.polarity}</dd></div><div><dt>المعرف</dt><dd class="mono ltr">${signal.id}</dd></div><div><dt>المصدر</dt><dd>Business fixture محلي</dd></div></dl><p class="s4-evidence-copy">${signal.evidence}</p><div class="modal-footer"><button type="button" class="button" data-intelligence-action="close-intelligence-modal">إغلاق</button></div></section></div>`; }
  return "";
}

function processingStageList(processing) {
  return `<ol class="s4-processing-stage-list">${processing.stages.map((label, index) => {
    const phase = index < processing.stageIndex ? "completed" : index === processing.stageIndex && processing.phase === "stages" ? "processing" : "pending";
    const mark = phase === "completed" ? "✓" : phase === "processing" ? "◉" : "○";
    return `<li class="${phase}"><i>${mark}</i><span>${label}</span><small>${phase === "completed" ? "مكتملة" : phase === "processing" ? "جارٍ التحليل" : "بانتظار الدور"}</small></li>`;
  }).join("")}</ol>`;
}

function processingBatchList(processing) {
  if (processing.mode !== "batch") return "";
  return `<section class="s4-batch-list"><header><b>تحليل ${fmt(processing.ids.length)} شركات</b><span>${fmt(processing.completedIds.length)} / ${fmt(processing.ids.length)} مكتملة</span></header><div>${processing.ids.map((id) => {
    const record = getBusinessIntelligence(id);
    const phase = processing.insufficientIds.includes(id) ? "insufficient" : processing.completedIds.includes(id) ? "completed" : processing.currentId === id ? "processing" : "pending";
    const label = phase === "completed" ? "مكتملة" : phase === "processing" ? "جارٍ التحليل" : phase === "insufficient" ? "بيانات غير كافية" : "بانتظار الدور";
    return `<article class="${phase}"><i>${phase === "completed" ? "✓" : phase === "processing" ? "◉" : phase === "insufficient" ? "?" : "○"}</i><span>${record?.business.name || id}</span><small>${label}</small></article>`;
  }).join("")}</div></section>`;
}

function processingReveal(processing) {
  const record = getBusinessIntelligence(processing.primaryId);
  if (processing.mode === "batch" && ["recommendations", "complete"].includes(processing.phase)) {
    const records = processing.ids.map(getBusinessIntelligence).filter(Boolean);
    const count = (predicate) => records.filter(predicate).length;
    return `<section class="s4-processing-outcome batch-complete"><span class="status success">اكتمل التحليل</span><h3>${fmt(processing.ids.length)} شركات تم تحليلها أو فحصها ضمن الدفعة.</h3><div class="s4-batch-summary"><span><b>${fmt(count((item) => item.tier === "high"))}</b> فرص عالية</span><span><b>${fmt(count((item) => item.tier === "good"))}</b> فرص جيدة</span><span><b>${fmt(count((item) => item.tier === "medium"))}</b> فرص متوسطة</span><span><b>${fmt(count((item) => item.tier === "low"))}</b> فرص منخفضة</span><span><b>${fmt(count((item) => item.status === "insufficient_data"))}</b> بيانات غير كافية</span></div><p>جميع الأعداد مشتقة من Business الظاهرة ونتائج Intelligence الحالية، وليست أرقام عرض مستقلة.</p></section>`;
  }
  if (!record || processing.outcome === "insufficient") return `<section class="s4-processing-outcome insufficient"><span class="status warning">بيانات غير كافية</span><h3>فحص اكتمال البيانات لم يجد أدلة كافية لمنح درجة.</h3><p>لم تتغير Signals أو Score؛ تظهر البيانات غير المعروفة بصفتها غير معروفة فقط.</p></section>`;
  if (processing.phase === "stages") return "";
  const score = Math.round((record.score || 0) * (processing.revealScore ?? 0));
  const confidence = Math.round((record.confidence || 0) * 100 * (processing.revealConfidence ?? 0));
  const showTier = ["tier", "confidence", "signals", "recommendations", "complete"].includes(processing.phase);
  const showConfidence = ["confidence", "signals", "recommendations", "complete"].includes(processing.phase);
  const signalCount = processing.phase === "signals" ? processing.revealedSignals || 1 : ["recommendations", "complete"].includes(processing.phase) ? record.signals.length : 0;
  const showRecommendations = ["recommendations", "complete"].includes(processing.phase);
  return `<section class="s4-processing-reveal" aria-label="كشف نتيجة التحليل"><div class="s4-processing-score"><b>${score}</b><span>من 100</span></div><div class="s4-processing-result-copy">${showTier ? `<strong>${tierLabels[record.tier]}</strong>` : `<strong>حساب الدرجة من الإشارات</strong>`}${showConfidence ? `<span>الثقة ${confidence}%</span>` : `<span>النتيجة مشتقة من Intelligence Engine</span>`}</div>${signalCount ? `<div class="s4-reveal-signals">${record.signals.slice(0, signalCount).map((signal) => `<span class="${signal.polarity}">${signal.polarity === "gap" ? "!" : signal.polarity === "positive" ? "✓" : "?"} ${signal.value}</span>`).join("")}</div>` : ""}${showRecommendations ? `<div class="s4-reveal-recommendations"><span>الفجوة الرئيسية: <b>${record.reasons[0]?.value || "لا توجد فجوة مثبتة"}</b></span><span>الخدمة المقترحة: <b>${record.services[0]?.name || "لا توجد خدمة مقترحة"}</b></span><span>أسلوب التواصل جاهز للمراجعة</span></div>` : ""}</section>`;
}

export function renderIntelligenceProcessing() {
  const processing = state.intelligenceProcessing;
  if (!processing) return "";
  const stageLabel = processing.phase === "stages" ? processing.stages[processing.stageIndex] : processing.outcome === "insufficient" ? "فحص اكتمال البيانات" : "كشف النتيجة التفسيرية";
  const percent = processing.phase === "stages" ? Math.round(((processing.stageIndex + 1) / processing.stages.length) * 72) : processing.phase === "complete" ? 100 : 86;
  const title = processing.mode === "batch" ? "تحليل فرص متعددة" : "تحليل فرصة Business";
  return `<div class="modal-backdrop s4-processing-backdrop"><section class="modal s4-processing-panel" role="dialog" aria-modal="true" aria-labelledby="processingTitle"><header class="modal-head"><div><p class="eyebrow">محاكاة Intelligence</p><h2 id="processingTitle">${title}</h2><p class="s4-processing-disclosure">محاكاة تحليل لأغراض تجربة المنتج؛ لا يوجد اتصال بنموذج AI خارجي.</p></div><span class="status info">${percent}%</span></header><div class="s4-processing-live" aria-live="polite" aria-atomic="true">${processing.phase === "stages" ? `جارٍ التنفيذ: ${stageLabel}` : processing.phase === "complete" ? "اكتمل التحليل" : `جارٍ كشف النتيجة: ${stageLabel}`}</div><div class="s4-processing-progress" role="progressbar" aria-label="تقدم معالجة Intelligence" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><i style="width:${percent}%"></i></div>${processing.mode === "single" ? processingStageList(processing) : `${processingBatchList(processing)}${processingStageList(processing)}`}${processingReveal(processing)}</section></div>`;
}

if (typeof document !== "undefined") {
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-intelligence-action]");
    if (!trigger || trigger.disabled) return;
    event.preventDefault();
    window.dispatchEvent(new CustomEvent("nomo-s4-action", { detail:{ action:trigger.dataset.intelligenceAction, businessId:trigger.dataset.business || "", businessIds:trigger.dataset.businessIds || "", signalId:trigger.dataset.signal || "" } }));
  });
}
