import fs from "node:fs";
import path from "node:path";
import { jobs, mockModel, scraperCrmPackages, scraperExportColumns, getJobResults, convertBusinessToLead } from "../client/js/data.js";

const root = path.resolve(import.meta.dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const checks = [];
const add = (id, name, pass, detail) => checks.push({ id, name, pass, detail });
const unique = (items) => new Set(items).size === items.length;

const dataSource = read("client/js/data.js");
const appSource = read("client/js/app.js");
const intelligenceSource = read("client/js/intelligence.js");
const landingSource = read("client/js/landing-truth.js");
const cssSource = read("client/css/scraper-crm.css");
const dataVisibilityCss = read("client/css/scraper-data-visibility.css");
const job = jobs.find((item) => item.id === "JOB-1028");
const exportRows = getJobResults("JOB-1028");
const revenueSnapshot = JSON.stringify(mockModel.revenueEvents);
const attributionSnapshot = JSON.stringify(mockModel.attributionTouchpoints);
const leadSnapshot = mockModel.leads.length;
const existingBusinessId = "BUS-1042";
const newBusinessId = exportRows.find((business) => !mockModel.leads.some((lead) => lead.businessId === business.id))?.id;
const duplicate = convertBusinessToLead(existingBusinessId, { status:"new", priority:"medium", tags:["فحص Scraper أو CRM"] });
const created = newBusinessId ? convertBusinessToLead(newBusinessId, { status:"new", priority:"medium", tags:["فحص Scraper أو CRM"] }) : null;

add("A", "Separate Package IDs", scraperCrmPackages.scraper.id !== scraperCrmPackages.crm.id && scraperCrmPackages.scraper.label !== scraperCrmPackages.crm.label, "Scraper وCRM معرفان كباقتين منفصلتين");
add("B", "Scraper Is Export-Only", scraperCrmPackages.scraper.features.some((item) => item.includes("Excel")) && !scraperCrmPackages.scraper.features.some((item) => item.includes("Pipeline")), "باقة Scraper تعرض التصدير ولا تدعي مزايا CRM");
add("C", "CRM Value Is Explicit", scraperCrmPackages.crm.features.some((item) => item.includes("Leads")) && scraperCrmPackages.crm.features.some((item) => item.includes("Inbox")), "باقة CRM تشرح قيمة إدارة المبيعات");
add("D", "Completed Job Only", job?.status === "completed" && exportRows.length === job.resultBusinessIds.length, "التصدير يتغذى من نتائج Job مكتملة فقط");
add("E", "Local CSV Export", appSource.includes("new Blob") && appSource.includes("text/csv") && appSource.includes("nomo-scraper-"), "Excel التجريبي تنزيل CSV محلي واضح");
add("F", "No Network Export", !appSource.includes("fetch(") && !appSource.includes("XMLHttpRequest") && !appSource.includes("navigator.sendBeacon"), "مسار التصدير لا ينفذ طلب شبكة");
add("G", "Decision Gate In Actual Results", intelligenceSource.includes("Excel أو CRM نمو") && intelligenceSource.includes("CRM اختياري"), "البوابة موجودة في renderer النتائج الفعلي S4");
add("H", "Landing Defers Package Decision", landingSource.includes("لا تقرر الباقة الآن") && landingSource.includes("Excel فقط أو CRM نمو") && landingSource.includes("الخطوة ١ من ٤"), "Landing تبدأ بالاستخراج وتؤجل قرار الباقة حتى النتائج");
add("I", "Modal Choice Disclosure", read("client/js/discovery.js").includes("كل الخيارات محلية وتجريبية فقط"), "Modal يعلن أن المسارين محليان وتجريبيان");
add("J", "Duplicate Protection", duplicate?.kind === "duplicate" && duplicate?.lead?.businessId === existingBusinessId, "Business القائمة لا تنشئ Lead مكررة");
add("K", "CRM Conversion Is Guarded", Boolean(created?.lead?.id) && created.kind === "created" && mockModel.leads.length === leadSnapshot + 1, "Business الجديدة فقط تتحول إلى Lead محلية");
add("L", "Financial Truth Unchanged", revenueSnapshot === JSON.stringify(mockModel.revenueEvents) && attributionSnapshot === JSON.stringify(mockModel.attributionTouchpoints), "التصدير والتحويل لا يغيران Revenue أو Attribution");
add("M", "No Provider Or Payment Claims", !dataSource.includes("GOOGLE_MAPS_API_KEY") && !appSource.includes("paymentIntent") && !appSource.includes("oauth"), "لا مزود استخراج أو دفع أو OAuth ضمن الشحنة");
add("N", "Mobile Decision Layout", cssSource.includes("@media(max-width:540px)") && cssSource.includes("landing-package-paths"), "بطاقات القرار تتحول إلى عمود واحد على الجوال");
add("O", "Unique Package Features", unique(scraperCrmPackages.scraper.features) && unique(scraperCrmPackages.crm.features), "قائمة مزايا كل باقة خالية من التكرار");
add("P", "Export Column Contract", scraperExportColumns.some((column) => column.id === "phone") && scraperExportColumns.some((column) => column.id === "email") && scraperExportColumns.some((column) => column.id === "website") && scraperExportColumns.some((column) => column.id === "instagram"), "كتالوج Excel يعلن حقول الاتصال والحضور الرقمي");
add("Q", "Actual Results Data Visibility", intelligenceSource.includes("بيانات Scraper قابلة للتحديد والتصدير") && intelligenceSource.includes("data-scraper-export-column") && intelligenceSource.includes("واتساب"), "سطح النتائج الفعلي يشرح الحقول القابلة للتصدير قبل قرار CRM");
add("R", "Selected Columns Drive Local Export", appSource.includes("selectedScraperExportColumns") && appSource.includes("scraperExportColumns.filter") && appSource.includes("data-scraper-export-column"), "التنزيل المحلي يقرأ الأعمدة المختارة بدل قائمة ثابتة");
add("S", "Responsive Export Panel", dataVisibilityCss.includes("scraper-availability-grid") && dataVisibilityCss.includes("@media(max-width:540px)"), "لوحة أعمدة Excel تتكدس بوضوح على الجوال");

// This process-local fixture mutation is only to prove guarded conversion; nothing is persisted to the project or runtime session.
console.table(checks.map((check) => ({ Check: check.id, Name: check.name, Result: check.pass ? "PASS" : "FAIL", Detail: check.detail })));
const passed = checks.filter((check) => check.pass).length;
console.log(`SCRAPER-OR-CRM verification: ${passed}/${checks.length} checks passed`);
if (passed !== checks.length) process.exitCode = 1;
