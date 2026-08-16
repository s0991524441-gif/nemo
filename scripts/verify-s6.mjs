import {
  closeDealAsLost,
  closeDealAsWon,
  createDeal,
  getDealIntegrityReport,
  getOpenDealForLead,
  getPipelineMetrics,
  mockModel,
  moveDealStage,
  updateDeal,
} from "../client/js/data.js";

const failures = [];
function check(condition, label, detail = "") {
  if (!condition) failures.push({ label, detail });
  console.log(`${condition ? "PASS" : "FAIL"} · ${label}${detail ? ` · ${detail}` : ""}`);
}

const baselineRevenueEvents = mockModel.revenueEvents.length;
const baselineAttribution = JSON.stringify(mockModel.attributionTouchpoints);
const baseline = getDealIntegrityReport();
baseline.checks.forEach((item) => check(item.pass, `A–H / ${item.id}: ${item.name}`, item.detail));

const lead = mockModel.leads.find((item) => !getOpenDealForLead(item.id));
check(Boolean(lead), "Lead متاحة لاختبار الإنشاء", lead?.id || "لا توجد");

if (lead) {
  const created = createDeal(lead.id, { name:"فحص S6 — صفقة اختبار", value:42000, stageId:"STG-1001", probability:"20", ownerId:lead.ownerId, expectedCloseAt:"2026-08-31" });
  check(created.kind === "created", "إنشاء صفقة بقيمة موجبة وSAR", created.deal?.id || "غير متاحة");
  const duplicate = createDeal(lead.id, { name:"نسخة غير مسموحة", value:1 });
  check(duplicate.kind === "duplicate" && duplicate.deal?.id === created.deal?.id, "حماية صفقة مفتوحة واحدة لكل Lead");
  const invalidUpdate = updateDeal(created.deal?.id, { value:0 });
  check(invalidUpdate === null, "رفض قيمة Deal غير موجبة");
  const updated = updateDeal(created.deal?.id, { value:47000, probability:"70", ownerId:lead.ownerId, expectedCloseAt:"2026-08-29" });
  check(updated?.value === 47000, "تحديث القيمة والاحتمال محليًا");
  const moved = moveDealStage(created.deal?.id, "STG-1004");
  check(moved?.stageId === "STG-1004", "نقل Deal بين مراحل Pipeline المفتوحة");
  const lostWithoutReason = closeDealAsLost(created.deal?.id, "", true);
  check(lostWithoutReason === null, "رفض الإغلاق كخاسرة بلا سبب");
  const lost = closeDealAsLost(created.deal?.id, "تأجيل القرار", true);
  check(lost?.status === "lost" && lost.lossReason === "تأجيل القرار", "الإغلاق كخاسرة بسبب واضح");
  const second = createDeal(lead.id, { name:"فحص S6 — إغلاق رابح", value:51000, stageId:"STG-1005", probability:"80", ownerId:lead.ownerId, expectedCloseAt:"2026-08-30" });
  check(second.kind === "created", "إنشاء صفقة جديدة بعد إغلاق السابقة");
  const won = closeDealAsWon(second.deal?.id, true);
  check(won?.status === "won", "الإغلاق كرابحة يتطلب تأكيدًا صريحًا");
}

check(mockModel.revenueEvents.length === baselineRevenueEvents, "S6 لا تنشئ RevenueEvent عند الإغلاق");
check(JSON.stringify(mockModel.attributionTouchpoints) === baselineAttribution, "S6 لا تغيّر AttributionTouchpoint");
const metrics = getPipelineMetrics();
check(metrics.totalValue === mockModel.deals.filter((deal) => deal.status === "open").reduce((sum, deal) => sum + deal.value, 0), "مجموع Pipeline مشتق من Deals المفتوحة");
const finalReport = getDealIntegrityReport();
finalReport.checks.forEach((item) => check(item.pass, `بعد التغييرات / ${item.id}: ${item.name}`, item.detail));

if (failures.length) {
  console.error(`\nفشل ${failures.length} من اختبارات S6.`);
  process.exit(1);
}
console.log("\nنجح فحص S6: عقد Deal وحماية المال والإسناد متسقان ضمن الذاكرة المحلية.");
