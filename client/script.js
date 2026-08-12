/* Design reminder: the JavaScript only moves a detailed visual story between its phases; it does not simulate a scraper, CRM, or external service. */
const timeline = document.getElementById("timeline");
const stageContent = document.getElementById("stageContent");
const stageIndex = document.getElementById("stageIndex");
const stageCount = document.getElementById("stageCount");
const stageLabel = document.getElementById("stageLabel");
const previousButton = document.getElementById("prevStage");
const nextButton = document.getElementById("nextStage");
const resetButton = document.getElementById("resetScenario");

const stages = [
  {
    nav: "طلب العميل",
    micro: "ما الذي يريده؟",
    type: "المشهد 01 · نقطة البداية",
    title: "العميل لا يطلب «بحثًا عامًا». يطلب شريحة أعمال محددة.",
    description: "مثالنا: وكالة تسويق لديها عميل يقدم خدمات صيانة منزلية في الرياض. العميل يريد قائمة شركات مناسبة ليبدأ فريق المبيعات بالتواصل معها، وليس مجرد أسماء عشوائية.",
    badge: "الطرف: العميل",
    html: `
      <div class="stage-layout">
        <section class="panel request-panel">
          <div class="panel-title"><i></i> ما يحدده العميل قبل العمل <em class="chip">مدخلات واضحة</em></div>
          <div class="request-row"><span>القطاع المطلوب</span><div class="fake-input">شركات صيانة منزلية</div></div>
          <div class="request-row"><span>الموقع</span><div class="fake-input">الرياض — السعودية</div></div>
          <div class="request-row"><span>الحجم المستهدف</span><div class="fake-input">حتى 200 شركة</div></div>
          <div class="request-row"><span>الحقول المطلوبة</span><b>اسم الشركة، الهاتف، الموقع، البريد المعلن، المدينة</b></div>
          <div class="request-row"><span>الغرض</span><b>تسليم قائمة مبيعات لفريق العميل</b></div>
        </section>
        <aside class="actor-panel">
          <p class="eyebrow">من يفعل ماذا؟</p><h3>الوكالة تستقبل طلب العميل وتحوّله إلى مهمة بيانات.</h3><p>الوكالة لا تحتاج إلى CRM جديد كي تبدأ. دورها في البداية هو تحديد الشريحة التي تشتريها للعميل وتسليم نتيجة قابلة للاستخدام.</p>
          <div class="actor-flow">
            <div class="actor-step"><span>1</span><div><b>العميل يحدد جمهوره</b><small>قطاع + مدينة + حجم + حقول</small></div></div>
            <div class="actor-step"><span>2</span><div><b>الوكالة تنشئ طلب البيانات</b><small>مشروع منفصل باسم العميل النهائي</small></div></div>
            <div class="actor-step"><span>3</span><div><b>منصة «نمو» تستلم المهمة</b><small>تبدأ رحلة تجهيز البيانات فقط</small></div></div>
          </div>
        </aside>
      </div>`,
  },
  {
    nav: "إنشاء المهمة",
    micro: "كيف يبدأ العمل؟",
    type: "المشهد 02 · تحويل الطلب إلى مهمة",
    title: "منصة «نمو» تحوّل الطلب إلى مهمة قابلة للمتابعة، لا إلى عملية مجهولة.",
    description: "المستخدم يرى رقم المهمة، عدد النتائج المستهدف، الحقول، وحالة العمل. هذا مهم للوكالة كي تعرف بالضبط ما ستسلّمه لعميلها، وللعميل كي يعرف ما الذي طلبه بالفعل.",
    badge: "الطرف: المنصة",
    html: `
      <div class="stage-layout">
        <section class="panel process-panel">
          <div class="panel-title"><i></i> مسار المهمة داخل المنصة</div>
          <div class="process-line">
            <div class="process-node"><div class="icon-box">01</div><b>طلب العميل</b><small>قطاع، موقع، حجم وحقول</small></div>
            <span class="process-arrow">←</span>
            <div class="process-node"><div class="icon-box">02</div><b>مهمة بيانات</b><small>معرّف واضح وحالة عمل</small></div>
            <span class="process-arrow">←</span>
            <div class="process-node"><div class="icon-box">03</div><b>نتائج للمراجعة</b><small>لا تُسلّم قبل التنظيم</small></div>
          </div>
          <div class="delivery-note"><i></i> المهمة مرتبطة بمشروع العميل؛ لذلك لا تختلط قوائم وكالتين أو عميلين.</div>
        </section>
        <section class="panel quality-panel">
          <div class="panel-title"><i></i> ما الذي يظهر للوكالة أثناء العمل؟</div>
          <div class="quality-grid">
            <div class="quality-item"><i>✓</i><div><b>رقم المهمة</b><small>LEAD-2418</small></div></div>
            <div class="quality-item"><i>✓</i><div><b>الهدف</b><small>200 شركة مستهدفة</small></div></div>
            <div class="quality-item"><i>✓</i><div><b>الحالة</b><small>قيد التجهيز</small></div></div>
            <div class="quality-item"><i>✓</i><div><b>النتيجة</b><small>تظهر قبل التسليم</small></div></div>
          </div>
        </section>
      </div>`,
  },
  {
    nav: "تجهيز البيانات",
    micro: "ما الذي يحدث للنتائج؟",
    type: "المشهد 03 · ضمان قابلية الاستخدام",
    title: "القيمة ليست في العدد وحده؛ بل في تحويل النتائج إلى قائمة قابلة للعمل.",
    description: "قبل أن يصل أي ملف إلى العميل، تمر النتائج على خطوات توضيحية: تنظيم الحقول، استبعاد السجلات المتكررة، التأكد من اكتمال الملف، ثم وضع علامة على الحقول التي تحتاج مراجعة. هذه هي نقطة الفرق بين قائمة خام وقائمة مبيعات.",
    badge: "الطرف: منصة نمو",
    html: `
      <div class="stage-layout">
        <section class="panel process-panel">
          <div class="panel-title"><i></i> من نتائج أولية إلى ملف منظم</div>
          <div class="process-line">
            <div class="process-node"><div class="icon-box">A</div><b>قائمة أولية</b><small>أسماء وحقول متفاوتة</small></div>
            <span class="process-arrow">←</span>
            <div class="process-node"><div class="icon-box">B</div><b>تنظيم الحقول</b><small>هاتف، موقع، مدينة، اتصال</small></div>
            <span class="process-arrow">←</span>
            <div class="process-node"><div class="icon-box">C</div><b>قائمة تسليم</b><small>سجلات منظمة وقابلة للمراجعة</small></div>
          </div>
        </section>
        <section class="panel quality-panel">
          <div class="panel-title"><i></i> ما الذي يُراجع قبل التسليم؟</div>
          <div class="quality-grid">
            <div class="quality-item"><i>✓</i><div><b>التكرار</b><small>لا نكرر الشركة نفسها</small></div></div>
            <div class="quality-item"><i>✓</i><div><b>تنسيق الهاتف</b><small>صيغة موحدة</small></div></div>
            <div class="quality-item"><i>✓</i><div><b>الموقع والبريد</b><small>يفصل المتاح عن الناقص</small></div></div>
            <div class="quality-item"><i>✓</i><div><b>الأولوية</b><small>تمييز الملف الأكثر اكتمالًا</small></div></div>
          </div>
        </section>
      </div>`,
  },
  {
    nav: "تسليم Excel",
    micro: "ما الذي يستلمه العميل؟",
    type: "المشهد 04 · المنتج الأول المستقل",
    title: "تسليم Excel هو قيمة مكتملة بحد ذاتها، وليس شاشة إجبارية قبل CRM.",
    description: "عند اكتمال المهمة، تستلم الوكالة أو العميل النهائي ملفًا منظمًا. يمكنه استخدامه مباشرة، إرساله إلى فريقه، أو رفعه يدويًا في أي نظام يعمل به. هذه هي لحظة التسليم التجاري الفعلية.",
    badge: "المخرج: ملف Excel",
    html: `
      <div class="excel-wrap">
        <section class="excel-info"><div class="excel-icon">XLSX</div><h3>ملف جاهز للتسليم</h3><p>تُصدّر الأعمدة التي طلبها العميل فقط. لا يحتاج العميل إلى إنشاء حساب CRM أو نقل طريقة عمله حتى يحصل على نتيجة البحث.</p><div class="excel-meta"><span>اسم الملف <b>riyadh-home-services.xlsx</b></span><span>عدد السجلات <b>184 شركة</b></span><span>حالة الملف <b>منظم للمراجعة</b></span></div></section>
        <section><div class="sheet"><div class="sheet-head"><b>riyadh-home-services.xlsx</b><span>جاهز للتسليم</span></div><table><thead><tr><th>اسم الشركة</th><th>الهاتف</th><th>الموقع</th><th>المدينة</th><th>الحالة</th></tr></thead><tbody><tr><td>آفاق للصيانة المنزلية</td><td>+966 11 240 8811</td><td>afaq-service.sa</td><td>الرياض</td><td>مكتمل</td></tr><tr><td>أساس للنظافة المتكاملة</td><td>+966 11 256 9042</td><td>asas-clean.sa</td><td>الرياض</td><td>مكتمل</td></tr><tr><td>دار التشغيل الذكي</td><td>+966 11 246 7312</td><td>dar-smart.co</td><td>الرياض</td><td>مراجعة</td></tr><tr><td>بداية للمقاولات</td><td>+966 50 603 1901</td><td>bedaya-build.com</td><td>الرياض</td><td>مكتمل</td></tr></tbody></table></div><div class="delivery-note"><i></i> بعد هذه النقطة، يصبح السؤال: أين سيعمل العميل بهذه الأسماء؟</div></section>
      </div>`,
  },
  {
    nav: "قرار CRM",
    micro: "ماذا بعد الملف؟",
    type: "المشهد 05 · قرار العميل وليس قرار المنصة",
    title: "بعد استلام Excel، العميل يختار المسار الذي يناسب طريقة عمله.",
    description: "المنصة لا تفترض أن الجميع يريد نقل فريقه إلى نظام جديد. العميل الذي يريد ملفًا فقط ينتهي هنا. العميل الذي يريد متابعة منظمة يختار CRM «نمو». والعميل الذي لديه CRM قائم يرسل الملف أو بياناته إليه.",
    badge: "نقطة الاختيار",
    html: `
      <div class="decision-layout">
        <article class="decision-card internal"><span class="decision-label">المسار A · اشتراك اختياري</span><h3>يختار CRM «نمو»</h3><p>هذا العميل يريد أن تتحول القائمة إلى عمل يومي: توزيع سجلات، تذكيرات، مراحل مبيعات، ومسار واضح للفريق.</p><ul class="decision-list"><li><i>✓</i> تنقل السجلات إلى قائمة داخل المنصة</li><li><i>✓</i> يعين مالكًا ومهمة متابعة لكل سجل</li><li><i>✓</i> يبدأ الفريق بالعمل من دون إعادة رفع ملف</li></ul><div class="transfer-bar">Excel ← CRM نمو</div></article>
        <article class="decision-card external"><span class="decision-label">المسار B · يبقى على نظامه</span><h3>يستخدم CRM خارجيًا</h3><p>هذا العميل لديه نظام عمل قائم. يحتاج فقط إلى ملف مرتب أو قالب حقول مناسب ليأخذ النتائج إلى CRM الذي يستخدمه فعلًا.</p><ul class="decision-list"><li><i>✓</i> يحصل على قالب أعمدة مناسب للنظام</li><li><i>✓</i> يرفع الملف أو يرسله إلى فريقه</li><li><i>✓</i> لا يغير CRM ولا يلتزم باشتراك جديد</li></ul><div class="transfer-bar">Excel ← CRM خارجي</div></article>
      </div>`,
  },
  {
    nav: "النتيجة النهائية",
    micro: "كيف تصبح البيانات عملًا؟",
    type: "المشهد 06 · نهاية القصة وبداية المبيعات",
    title: "المساران مختلفان، لكن القيمة واحدة: تحويل ملف البيانات إلى متابعة فعلية.",
    description: "في CRM «نمو»، تنتقل القائمة مباشرة إلى مراحل متابعة ومهام للفريق. وفي CRM خارجي، تنتقل القائمة المنظّمة إلى النظام القائم للعميل. في الحالتين، يبقى منتج الاستخراج هو نقطة البداية التي أنشأت قيمة تجارية للعميل.",
    badge: "المخرج: تشغيل المبيعات",
    html: `
      <div class="outcome-layout">
        <section class="outcome-summary"><p class="eyebrow">نهاية السيناريو</p><h3>البيانات تنتقل من «قائمة» إلى «قرار متابعة».</h3><p>هذا هو سبب فصل المنتج إلى استخراج مستقل وCRM اختياري: لا نخسر عميل الملف، ولا نخسر فرصة مساعدة العميل الذي يحتاج متابعة أعمق.</p><div class="score"><b>01</b><span>منتج استخراج قابل للبيع وحده</span></div></section>
        <section class="outcome-map"><article class="outcome-card"><span class="mini-number">CRM نمو</span><h4>قائمة دائمة</h4><p>تظهر السجلات داخل مشروع العميل، مع المصدر والدرجة والوسوم.</p></article><article class="outcome-card"><span class="mini-number">CRM نمو</span><h4>توزيع المتابعة</h4><p>يتحول كل سجل إلى مالك ومهمة ومرحلة واضحة للفريق.</p></article><article class="outcome-card"><span class="mini-number">CRM خارجي</span><h4>قالب متوافق</h4><p>يستلم العميل حقولًا منظمة جاهزة للرفع في نظامه الحالي.</p></article><article class="outcome-card"><span class="mini-number">الوكالة</span><h4>تسليم قابل للقياس</h4><p>تعرف الوكالة ما تم تسليمه، وأي عميل اختار الترقية لاحقًا.</p></article></section>
      </div>`,
  },
];

let activeStage = 0;

function renderTimeline() {
  timeline.innerHTML = stages.map((stage, index) => `
    <button type="button" class="${index === activeStage ? "active" : ""} ${index < activeStage ? "done" : ""}" data-stage="${index}" aria-current="${index === activeStage ? "step" : "false"}">
      <span class="node">${String(index + 1).padStart(2, "0")}</span>
      <b>${stage.nav}</b>
      <small>${stage.micro}</small>
    </button>`).join("");
  timeline.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => setStage(Number(button.dataset.stage))));
}

function renderStage() {
  const stage = stages[activeStage];
  stageIndex.textContent = String(activeStage + 1).padStart(2, "0");
  stageCount.textContent = `${activeStage + 1} / ${stages.length}`;
  stageLabel.textContent = stage.nav;
  const miniRail = stages.map((item, index) => `<span class="${index === activeStage ? "active" : ""} ${index < activeStage ? "done" : ""}"><i>${String(index + 1).padStart(2, "0")}</i><b>${item.nav}</b></span>`).join("");
  stageContent.innerHTML = `
    <article class="stage-card">
      <header class="stage-top">
        <div><span class="stage-type">${stage.type}</span><h2>${stage.title}</h2><p>${stage.description}</p></div>
        <span class="stage-badge"><b>${stage.badge}</b>شرح الدور والنتيجة</span>
      </header>
      <div class="stage-rail" aria-label="موضع هذه المرحلة في مسار القرار">${miniRail}</div>
      <div class="stage-body">${stage.html}</div>
    </article>`;
  previousButton.disabled = activeStage === 0;
  nextButton.innerHTML = activeStage === stages.length - 1 ? `العودة للبداية <span>↺</span>` : `التالي <span>←</span>`;
  renderTimeline();
}

function setStage(index) {
  activeStage = Math.max(0, Math.min(index, stages.length - 1));
  renderStage();
  document.querySelector(".stage-area").scrollIntoView({ behavior: "smooth", block: "start" });
}

previousButton.addEventListener("click", () => setStage(activeStage - 1));
nextButton.addEventListener("click", () => setStage(activeStage === stages.length - 1 ? 0 : activeStage + 1));
resetButton.addEventListener("click", () => setStage(0));
renderStage();
