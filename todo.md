# مسار التنفيذ الداخلي S0–S12

## S0 — Product Foundation & Architecture

- [x] إكمال مراجعة مواصفات S0 واعتماد عناصر القبول قبل أي شحنة لاحقة.
- [x] إنشاء `SCREEN_MAP.md` لجميع الشاشات المخطط لها حتى S12.
- [x] إنشاء وثيقة نموذج الكيانات وقواعد المنتج والربط بين الكيانات.
- [x] تثبيت Arabic Only وRTL native، وإزالة Language Toggle من تجربة المستخدم.
- [x] تثبيت CSS Tokens ومكتبة المكونات المشتركة ومقياس المسافات والكتابة.
- [x] تثبيت Application Shell والتنقل والـSidebar وTopbar ومسارات placeholders.
- [x] إضافة صفحة UI Kit داخلية للمراجعة فقط.
- [x] مراجعة بناء S0 وسجل الحالة الداخلي، من دون بدء S1 أو تسليم نسخة المشروع.

## S1 — Landing + Login + Onboarding

- [x] استكمال مراجعة مواصفات S1 وعناصر قبولها قبل تعديل الواجهة العامة.
- [x] بناء Landing عربية كاملة تشرح رحلة المصدر إلى الإيراد وتفاضل المنتج عن scraper أو CRM منفصل.
- [x] بناء Hero Product Preview وأقسام workflow والاكتشاف والذكاء وCRM والمساعد وPipeline والإسناد والتكاملات.
- [x] تثبيت Login عربية بسيطة وواضحة مع حالات الإدخال والانتقال التجريبي.
- [x] بناء Onboarding متعدد الخطوات يشرح ما يحدث بعد التسجيل وينتهي بمساحة العمل.
- [x] فحص رحلة Landing → Login → Onboarding → Dashboard على Desktop وMobile وRTL.
- [x] إعداد تقرير S1 والتوقف قبل S2 بانتظار قرار CTO.
- [x] تشغيل النظام بعد التنفيذ وفحص مسار Landing → Login → Onboarding → Dashboard على Desktop وMobile.

## تشغيل المعاينة

- [x] إعادة تشغيل النظام والتحقق من ظهور المعاينة العامة.
- [x] تسليم رابط فحص مباشر للمستخدم بعد نجاح التشغيل.

## مزامنة GitHub

- [x] فحص حالة Git وربط المشروع بالمستودع المحدد.
- [x] إنشاء commit للحالة الحالية ودفعه إلى الفرع البعيد.
- [x] التحقق من الـcommit الظاهر على GitHub وتسجيل مرجعه.

## S2 — Executive Dashboard

- [x] استكمال مراجعة مواصفات S2 وتثبيت ترتيب Dashboard ومعايير القبول.
- [x] توسيع نموذج البيانات المركزي بـKPIs والقمع وPipeline والتنبيهات والإسناد من دون كائنات متناقضة.
- [x] تطوير `#/dashboard` كسطح قيادة مبيعات: Header و8 KPIs ومركز الانتباه وتوصيات AI وقمع التحويل.
- [x] إضافة Pipeline Summary والصفقات القريبة من الإغلاق وأداء الاكتشاف والمتابعات والمحادثات والإيراد والإسناد.
- [x] تفعيل فلتر وقت Mock وروابط الإجراءات الرسمية وstates التحميل والفراغ والخطأ.
- [x] فحص Desktop وTablet وMobile وRTL والحسابات والاستجابة وتشغيل البناء.
- [x] إعداد تقرير S2 والتوقف قبل S3 بانتظار قرار CTO.

> S2 مغلقة بانتظار مراجعة CTO. لا يبدأ S3 إلا بعد GO صريح.

## S2-FIX — Attribution & Data Integrity Closure

- [x] بناء مصدر حقيقة واحد لسلسلة Attribution بثلاثة مسارات مكتملة من المصدر إلى الإيراد ونقطة الإسناد.
- [x] اشتقاق بطاقات Attribution وRevenue Summary من Revenue Events مع فحص تطابق مجموع الفترة.
- [x] توحيد حقيقة `TSK-1042` وربط المتابعات بسجلات المهام المركزية.
- [x] تصحيح دلالة فلتر الوقت وحالة المحادثات وتحسين النص التشغيلي الأساسي على الهاتف.
- [x] تشغيل اختبارات النزاهة A–E والبناء والانحدار والاستجابة، وإعداد تقرير S2-FIX.
- [x] إنشاء commit واحد لـS2-FIX ورفعه إلى `main` ثم التوقف قبل S3.

> S2-FIX نطاق إصلاحي محدود. لا يبدأ S3 إلا بعد GO صريح من CTO.

## S3 — Discovery + Jobs

- [x] مراجعة تنفيذ S3 وعقود المسارات والبيانات المعتمدة من commit `562c130` قبل التعديل.
- [x] توحيد عقد DiscoveryJob ومصادر الاكتشاف وحالات العملية وبيانات النتائج التجريبية.
- [x] بناء `#/discovery` كنقطة بدء تتضمن كلمات ومواقع متعددة وفلاتر ومعاينة مجموعات البحث.
- [x] بناء قائمة العمليات وتفاصيل العملية ومسار المعالجة المحلي على Routes المعتمدة.
- [x] بناء نتائج الاكتشاف المحلية والفرز والفلاتر وحالات UI من دون CRM أو AI أو Scraping حقيقي.
- [x] فحص S3 على Desktop وTablet وMobile وRTL والبناء والانحدار وإعداد التقرير.
- [x] إنشاء commit واحد لـS3 ورفعه إلى `main` ثم التوقف قبل S4.

> S3 ينفذ مساحة اكتشاف وعمليات تجريبية فقط. لا يبدأ S4 أو أي مسار CRM/AI/Sales/Outreach من دون GO صريح من CTO.

## S3-FIX — Results Lifecycle & Date Filtering

- [x] تثبيت عقد Results المتاح فقط عند `job.status === "completed"` لكل Routes والإجراءات المباشرة.
- [x] بناء حالات pending وprocessing وfailed وcancelled من دون Table أو فلاتر أو إجراءات نتائج.
- [x] منع Sidebar وJobs History وJob Detail من توجيه المستخدم إلى Results غير مكتملة.
- [x] فصل قيمة تاريخ Job الآلية عن قيمة العرض أو توحيد helper واحد لفلتر «اليوم».
- [x] اختبار مصفوفة دورة الحياة 5/5 وفلتر «اليوم» والـDirect Route والبناء والانحدار.
- [x] إعداد تقرير S3-FIX وإنشاء commit واحد ورفعه إلى `main` ثم التوقف قبل S4.

> S3-FIX يغلق فقط CTO-S3-01 وCTO-S3-02. لا يبدأ S4 إلا بعد GO صريح جديد من CTO.

## S4 — Results + AI Lead Intelligence

- [x] مراجعة عقود S4 وBaseline `70c059f` وملفات التنفيذ المعتمدة قبل تعديل Architecture.
- [x] بناء مصدر حقيقة مركزي لـBusinessSignal وOpportunityAnalysis وOpportunity وReason وService Catalog من دون نسخ Business.
- [x] توثيق Score حتمي قابل للتفسير وDimensions وTiers وConfidence وEvidence وقاعدة unknown ≠ no.
- [x] تطوير قائمة نتائج الاكتشاف بفرز وفلاتر Score وConfidence وTier ووجود Opportunity من دون إنشاء Lead أو CRM.
- [x] تطوير ملف Intelligence للـBusiness يوضح الإشارات والـEvidence والـScore Breakdown والأسباب والخدمات والنهج المقترح.
- [x] بناء حالات Loading وEmpty وError ومحاكاة تحليل تجريبية وأفعال محجوبة للشحنات اللاحقة.
- [x] تشغيل فحوص نزاهة S4 والبناء والانحدار وDesktop/Tablet/Mobile/RTL وإعداد التقرير.
- [x] إنشاء commit واحد لـS4 ورفعه إلى `main` ثم التوقف قبل S5.

> S4 يفسر فرص Business المكتشفة فقط. لا ينشئ Lead أو Company أو Deal أو CRM ولا يبدأ S5 إلا بعد GO صريح من CTO.

## S4-UX — AI Intelligence Processing Animations

- [x] مراجعة عقد S4-UX وBaseline `1e6fd7e` وتثبيت عدم تغيير Scores أو Signals أو Entity Model.
- [x] تصميم حالة معالجة حتمية من سبع مراحل للفرد والدفعة مرتبطة بنتائج Intelligence Engine نفسها.
- [x] تنفيذ Process Panel للفرد مع Score وConfidence وDimensions وSignals وRecommendations reveal متدرج.
- [x] تنفيذ Batch Processing Panel وRow statuses وملخص مشتق من النتائج الفعلية.
- [x] دعم Error وinsufficient_data وRe-analysis وReduced Motion من دون خلق Score أو Recommendation مصطنعة.
- [x] تشغيل فحوص S4 وS3 وS2-FIX والبناء والاستجابة وإعداد تقرير S4-UX.
- [x] إنشاء commit واحد لـS4-UX ورفعه إلى `main` ثم التوقف قبل S5.

> S4-UX طبقة تجربة فوق Intelligence الحالية فقط؛ لا تغيّر Scoring أو Signals أو Recommendations ولا تنشئ CRM أو تبدأ S5.

## S4-FIX — Counterexample Fixture Contract Alignment

- [x] مراجعة جميع مراجع Fixtures وتحديد النصوص أو الاختبارات التي تخالف عقد CTO المعتمد.
- [x] تثبيت BUS-1042 كفرصة عالية، وBUS-1402 كـStrong Business / Not High Opportunity، وBUS-1404 كـinsufficient_data، وBUS-1403 كـerror/retry في الاختبارات فقط.
- [x] تحديث التوثيق والتقارير المتعارضة دون تغيير scores أو signals أو evidence أو Business data أو Entity IDs.
- [x] إنشاء وتشغيل مصفوفة CTO النهائية 20/20 مع اختبارات S4-UX وS4 وS3 وS2-FIX والبناء.
- [x] إعداد تقرير S4-FIX وإنشاء commit واحد ورفعه إلى `main` ثم التوقف قبل S5.

> S4-FIX مواءمة عقد وتوثيق واختبارات فقط؛ لا تغير بيانات أو منطق S4 ولا تبدأ S5.

## S5 — Lead 360 + CRM

- [x] مراجعة مواصفات S5 وBaseline `6533996` وعقود المشروع قبل تعديل Architecture.
- [x] توسيع نموذج Lead وعقود التحويل والـOwners وLead lifecycle من دون نسخ Business أو Opportunity.
- [x] تنفيذ Conversion Preview وتأكيد الإضافة إلى CRM مع حماية `businessId` من Lead مكررة.
- [x] تنفيذ `#/crm` مع Lead summary والبحث والفلاتر والترتيب وإجراءات bulk المحلية فقط.
- [x] تنفيذ Lead 360 وربطه بالـBusiness وOpportunity وAnalysis وSignals والمصدر والأنشطة والمحادثات والمهام.
- [x] تنفيذ حالات Loading/Empty/Error ومشاهد insufficient data وduplicate lead وCRM value pass-through.
- [x] تشغيل فحوص S5 والبناء والانحدار والاستجابة وإعداد التقرير.
- [x] إنشاء commit واحد لـS5 ورفعه إلى `main` ثم التوقف قبل S6.

> S5 ينشئ Leads CRM بإجراء مستخدم صريح فقط؛ لا يبدأ S6 Pipeline أو Deals أو أي تكامل خارجي من دون GO صريح من CTO.
