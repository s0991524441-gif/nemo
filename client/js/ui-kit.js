export function renderUiKit(ctx) {
  const { button, pageHead } = ctx;
  return `${pageHead("نظام التصميم", "مكتبة الواجهة الداخلية", "مرجع S0 لمراجعة المكونات والحالات قبل تنفيذ الشحنات اللاحقة.", button("العودة للرئيسية", "route-dashboard", "button"))}
  <section class="ui-kit-grid">
    <article class="card pad"><p class="eyebrow">الأزرار</p><h2>إجراءات متسقة</h2><div class="component-row">${button("إجراء رئيسي", "show-ui-toast", "button primary")}${button("إجراء ثانوي", "show-ui-toast", "button")}${button("إجراء نصي", "show-ui-toast", "button ghost")}</div></article>
    <article class="card pad"><p class="eyebrow">الحالة</p><h2>ألوان دلالية فقط</h2><div class="component-row"><span class="status qualified">مكتمل</span><span class="status contact">قيد المتابعة</span><span class="status pending">بانتظار</span><span class="status danger">متأخر</span></div></article>
    <article class="card pad"><p class="eyebrow">الإدخال</p><h2>حقول ومرشحات</h2><div class="ui-form"><label>اسم الشركة<input value="عيادات الحياة لطب الأسنان" /></label><label>القطاع<select><option>عيادات أسنان</option><option>خدمات أعمال</option></select></label></div></article>
    <article class="card pad"><p class="eyebrow">البيانات</p><h2>مؤشر العميل</h2><div class="entity-sample"><span class="avatar">ح</span><div><b>عيادات الحياة لطب الأسنان</b><small class="mono">BUS-1042</small></div><span class="score high">92</span></div></article>
    <article class="card pad"><p class="eyebrow">التحميل</p><h2>حالة معالجة</h2><div class="progress-sample"><div><span>تجهيز قائمة النتائج</span><b>68%</b></div><i><b></b></i></div></article>
    <article class="card pad"><p class="eyebrow">توصية ذكية</p><h2>خطوة مقترحة</h2><div class="recommendation"><span>توصية</span><b>راجع سجل الحجز قبل إرسال المتابعة.</b><small>الثقة: 92% · مراجعة بشرية مطلوبة</small></div></article>
  </section>`;
}
