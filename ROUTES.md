# ROUTES — S0 Navigation Contract

**صيغة التنقل:** Hash Router  
**اللغة:** Arabic RTL native  
**قاعدة S0:** كل route معروف يعرض إما شاشة S0 منفذة أو Placeholder يوضح الشحنة اللاحقة؛ لا توجد dead links.

## 1. المسارات الحالية والمخططة

| Route | الحالة في S0 | الهدف | نوع العرض |
|---|---:|---|---|
| `#/` | منفذ | الصفحة التعريفية | Public |
| `#/login` | منفذ | الدخول التجريبي | Public |
| `#/onboarding` | منفذ | إعداد مساحة العمل التجريبية | Public |
| `#/dashboard` | منفذ | الرئيسية | App Shell |
| `#/ui-kit` | منفذ في S0 | نظام التصميم الداخلي | App Shell |
| `#/discovery` | منفذ في S3 | طلب اكتشاف | App Shell |
| `#/discovery/jobs` | منفذ في S3 | سجل عمليات الاكتشاف | App Shell |
| `#/discovery/jobs/:id` | منفذ في S3 | تفاصيل عملية اكتشاف | App Shell |
| `#/discovery/results` | منفذ في S3 | نتائج الاكتشاف التجريبية | App Shell |
| `#/intelligence?business=BUS-####` | منفذ في S4 | ملف ذكاء Business قابل للتفسير | App Shell |
| `#/lead-profile` | alias محدود في S4 | يفتح Intelligence للسجل المختار ولا ينشئ Lead | App Shell |
| `#/leads` | موجود كمرجع واجهة | العملاء المحتملون | App Shell |
| `#/contacts` | Placeholder | جهات الاتصال | App Shell |
| `#/companies` | Placeholder | الشركات | App Shell |
| `#/pipeline` | موجود كمرجع واجهة | Pipeline | App Shell |
| `#/deals` | موجود كمرجع واجهة | الصفقات | App Shell |
| `#/tasks` | موجود كمرجع واجهة | المهام | App Shell |
| `#/appointments` | Placeholder | المواعيد | App Shell |
| `#/inbox` | موجود كمرجع واجهة | صندوق الوارد | App Shell |
| `#/whatsapp` | Placeholder | WhatsApp | App Shell |
| `#/calls` | Placeholder | المكالمات | App Shell |
| `#/copilot` | Placeholder | Sales Copilot | App Shell |
| `#/agent` | موجود كمرجع واجهة | AI Sales Agent | App Shell |
| `#/automation` | موجود كمرجع واجهة | الأتمتة | App Shell |
| `#/analytics` | موجود كمرجع واجهة | التحليلات | App Shell |
| `#/integrations` | موجود كمرجع واجهة | التكاملات | App Shell |
| `#/billing` | موجود كمرجع واجهة | الفوترة | App Shell |
| `#/settings` | موجود كمرجع واجهة | الإعدادات | App Shell |

## 2. قواعد سلوك التنقل

| الحالة | السلوك المطلوب |
|---|---|
| اختيار عنصر Sidebar | تحديث hash، Active state، وBreadcrumb فورًا. |
| فتح Business من Results | حفظ `selectedBusinessId` ثم فتح `#/intelligence?business=BUS-####` للسجل نفسه. |
| فتح محادثة | حفظ `selectedConversationId` ثم إعادة رسم Inbox بالرسائل والسياق الصحيحين. |
| Browser Back/Forward | الاستماع إلى `hashchange` وإعادة رسم route دون كسر الحالة المشتركة. |
| route مستقبلية | Placeholder واضح باسم الشاشة ورقم الشحنة المستهدفة، مع مسار عودة. |
| شاشة عامة | لا يظهر App Shell في Landing أو Login أو Onboarding. |
| شاشة داخلية | تظهر Sidebar وTopbar ومنطقة الإشعارات وسياق المستخدم. |

## 3. Breadcrumb Contract

صيغة الـBreadcrumb في S0 هي: **مساحة العمل › الوحدة › الشاشة**. لا يفرض S0 Breadcrumb متعدد المستويات لكل كيان، لكنه يضمن أن عنوان الشاشة وحالة Active navigation متسقان مع route الحالي.

## 4. Back Behavior

1. يمنع S0 الروابط الميتة عبر تحويل كل هدف غير منفذ إلى Placeholder ذي معنى.  
2. الروابط الكيانية تستخدم route واضحًا مع الحالة الحالية في الذاكرة؛ في الإنتاج ستتحول إلى معرفات داخل URL.  
3. لا تُبنى deep-link semantics نهائية قبل اعتماد نموذج المصادقة والـtenant في الشحنات اللاحقة.

## 5. إضافات S3

تستخدم S3 المسارات الأربعة أعلاه كعقود Canonical. تبقى المسارات التاريخية `#/discovery-jobs` و`#/job` و`#/results` aliases محلية إلى المسارات الجديدة كي لا تنتج روابط ميتة. لا تفتح S3 أي مسار Intelligence أو CRM أو Sales من نتائج الاكتشاف؛ تعرض هذه العناصر فقط كمرحلة لاحقة غير منفذة.

## 6. إضافات S4

تستخدم S4 `#/intelligence?business=BUS-####` كـdeep link لملف Intelligence. يقرأ التطبيق `business` من Hash ويحفظه في `selectedBusinessId` قبل الرسم. تبقى `#/lead-profile` alias لسطح Intelligence فقط، ولا ينشئ هذا المسار Lead أو CRM أو Deal أو Pipeline mutation.
