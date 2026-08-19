/* Reference-alignment: Arabic local-only scraper scenario, inspired by a query → job → export flow. */
import { state } from "./data.js";

const sampleLines = "عيادات أسنان | الرياض\nمراكز علاج طبيعي | جدة\nمراكز عناية | الخبر";

export function renderReferenceScraperScenario(surface) {
  if (surface === "landing") return `<section class="reference-scraper-hero" aria-label="سيناريو استخراج الشركات"><div class="reference-scraper-copy"><p class="eyebrow">سيناريو باقة Scraper</p><h2>اكتب ما تبحث عنه، سطر لكل بحث</h2><p>ابحث عن شركات من خرائط الأعمال بكلمات ومدن متعددة، ثم راقب العملية ونزّل ملفك المنظم. كل ذلك محاكاة محلية في هذا النموذج.</p><ul><li>استعلامات متعددة في عملية واحدة</li><li>تقدم ونتائج قابلة للتتبع</li><li>هاتف وبريد وموقع وروابط اجتماعية عند التوفر</li></ul></div><div class="reference-query-console"><div class="reference-console-head"><span>استعلامات الاستخراج</span><b>3 / 100</b></div><textarea data-reference-query-preview dir="rtl" readonly>${sampleLines}</textarea><div class="reference-console-footer"><span><i></i>رصيد تجريبي متاح</span><button type="button" class="button primary" data-action="route-discovery">ابدأ استخراجًا تجريبيًا</button></div><small>بعد اكتمال النتائج: نزّل Excel ضمن باقة Scraper أو اختر CRM نمو كترقية مستقلة.</small></div></section>`;
  return `<section class="reference-discovery-import" aria-label="إدخال استعلامات الاستخراج"><header><div><p class="eyebrow">مسار الاستخراج</p><h3>استعلامات متعددة، سطر لكل بحث</h3><p>اكتب النشاط والمدينة بينهما <b>|</b>؛ ستتحول إلى كلمات ومواقع ضمن عملية واحدة قابلة للمتابعة.</p></div><span class="reference-flow-badge">بحث → تشغيل → نتائج → Excel</span></header><textarea data-reference-query-input dir="rtl" aria-label="استعلامات متعددة">${sampleLines}</textarea><footer><small>محاكاة محلية: لا تتصل هذه الشاشة بخرائط الأعمال أو بأي مصدر خارجي.</small><button type="button" class="button" data-reference-query-import>إضافة الاستعلامات</button></footer></section>`;
}

export function bindReferenceScraperScenario(render, toast) {
  const button = document.querySelector("[data-reference-query-import]");
  if (!button) return;
  button.addEventListener("click", () => {
    const value = document.querySelector("[data-reference-query-input]")?.value || "";
    const lines = value.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    const parsed = lines.map((line) => line.split("|").map((piece) => piece.trim())).filter(([keyword, location]) => keyword && location);
    if (!parsed.length) { toast("اكتب استعلامًا واحدًا على الأقل بالشكل: نشاط | مدينة.", "error"); return; }
    parsed.forEach(([keyword, location]) => { if (!state.discoveryDraft.keywords.includes(keyword)) state.discoveryDraft.keywords.push(keyword); if (!state.discoveryDraft.locations.includes(location)) state.discoveryDraft.locations.push(location); });
    toast(`أُضيفت ${parsed.length} استعلامات محلية إلى عملية الاكتشاف.`, "success");
    render();
  });
}
