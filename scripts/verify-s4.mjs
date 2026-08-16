import { businesses, getAttributionIntegrityReport, getDiscoveryIntegrityReport, mockModel } from "../client/js/data.js";
import { beginBusinessAnalysis, completeBusinessAnalysis, getBusinessIntelligence, getIntelligenceIntegrityReport } from "../client/js/intelligence.js";

const checks = [];
const add = (id, name, pass, detail) => checks.push({ id, name, pass, detail });
const record = (id) => getBusinessIntelligence(id);
const sum = (id) => record(id).dimensions.reduce((total, dimension) => total + dimension.score, 0);
const crmCountsBefore = { leads:mockModel.leads.length, deals:mockModel.deals.length, revenueEvents:mockModel.revenueEvents.length };

const base = getIntelligenceIntegrityReport();
base.checks.forEach((check) => add(check.id, check.name, check.pass, check.detail));

add("P", "No Direct Business Score", businesses.every((business) => !("score" in business) && !("opportunity" in business)), "Business لا تحمل score أو opportunity مكررة");
add("Q", "Two High Opportunities", ["BUS-1042", "BUS-1137"].every((id) => record(id).tier === "high"), "يوجد سجلان بدرجة عالية");
add("R", "Service Mapping", record("BUS-1042").services.map((service) => service.id).includes("SVC-1001") && record("BUS-1042").services.map((service) => service.id).includes("SVC-1003"), "الفجوات المثبتة تقود إلى الخدمات المتوقعة");
add("S", "Not Analyzed Lifecycle", record("BUS-1405").status === "not_analyzed" && record("BUS-1405").score === null, "السجل غير المحلل لا يحمل Score قبل تشغيل المحاكاة");

beginBusinessAnalysis("BUS-1405");
add("T", "Analyzing State", record("BUS-1405").status === "analyzing" && record("BUS-1405").score === null, "حالة التحليل لا تعرض Score مبكرة");
completeBusinessAnalysis("BUS-1405");
add("U", "Analyzed Lifecycle", record("BUS-1405").status === "analyzed" && record("BUS-1405").score === 72 && Boolean(record("BUS-1405").opportunity), "تكتمل المحاكاة بدرجة حتمية وفرصة مرتبطة");
add("V", "Error Retry Lifecycle", record("BUS-1403").status === "analysis_error" && record("BUS-1403").score === null, "خطأ التحليل لا يعرض فرصة أو Score");
beginBusinessAnalysis("BUS-1403");
completeBusinessAnalysis("BUS-1403");
add("W", "Error Recovery", record("BUS-1403").status === "analyzed" && record("BUS-1403").score === sum("BUS-1403"), "إعادة المحاولة تعيد حسابًا حتميًا من Signals نفسها");
add("X", "Insufficient Data", record("BUS-1404").status === "insufficient_data" && record("BUS-1404").score === null && record("BUS-1404").services.length === 0, "unknown لا يعامل كسلبية ولا يقود إلى خدمة");
add("Y", "S3 Regression", getDiscoveryIntegrityReport().pass, "بوابة Results وفلتر اليوم محفوظان");
const attribution = getAttributionIntegrityReport();
add("Z", "S2-FIX Regression", attribution.pass && attribution.attributionTotal === attribution.revenueSummary, "إسناد الإيراد يظل مطابقًا للملخص");
add("AA", "No CRM Mutation", mockModel.leads.length === crmCountsBefore.leads && mockModel.deals.length === crmCountsBefore.deals && mockModel.revenueEvents.length === crmCountsBefore.revenueEvents, "التحليل لا ينشئ Lead أو Deal أو Revenue Event");

for (const check of checks) console.log(`${check.pass ? "PASS" : "FAIL"} ${check.id} — ${check.name}: ${check.detail}`);
const failures = checks.filter((check) => !check.pass);
console.log(`\nS4 integrity: ${checks.length - failures.length}/${checks.length} passed`);
if (failures.length) process.exitCode = 1;
