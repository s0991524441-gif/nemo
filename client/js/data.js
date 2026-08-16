// S2-FIX data reminder: one Arabic RTL prototype source of truth links discovery source → job → business → lead → deal → revenue event → attribution touchpoint.
export const state = {
  theme: "light", signedIn: false, onboardingDone: false, sidebarCollapsed: false,
  selectedBusinessId: "BUS-1042", selectedConversationId: "CONV-3042", selectedLeadId: "LEAD-1042",
  discoveryStatus: "idle", discoveryProgress: 0, selectedJobId: "JOB-1028", selectedResultIds: [], discoveryModal: null, intelligenceModal: null, intelligenceProcessing: null, discoveryListFilters: { search:"", status:"all", sourceId:"all", date:"all", sort:"newest" }, resultFilters: { search:"", category:"all", city:"all", rating:"all", reviews:"all", website:"all", phone:"all", opportunityTier:"all", minScore:"all", confidence:"all", gap:"all", intelligenceStatus:"all", highOpportunity:false, sort:"newest" }, discoveryDraft: { keywords:["عيادات أسنان"], locations:["الرياض"], sourceId:"SRC-1004", filters:{ minRating:"4", minReviews:"50", website:"any", phone:true, email:false, whatsapp:false, instagram:false, activity:"any", limit:"2000" }, showCombinations:false }, crmAdded: ["LEAD-1042"], notifications: 3,
  loginErrors: {}, onboardingStep: 1, onboardingErrors: {}, dashboardTimeframe: "اليوم", dashboardView: "ready", completedTaskIds: [],
  workspace: { companyName: "", industry: "", city: "", teamSize: "", goals: [], sources: [], pipeline: "", monthlyLeads: "", averageDealValue: "", aiPreferences: [] },
  crmModal: null, crmView: "ready", selectedLeadIds: [],
  crmFilters: { search:"", ownerId:"all", status:"all", priority:"all", sourceJobId:"all", city:"all", tier:"all", tag:"all", minScore:"all", sort:"updated" },
  selectedDealId: "DEAL-4042", pipelineView: "ready", dealModal: null, selectedDealIds: [],
  dealFilters: { search:"", pipelineId:"PIPE-1001", stageId:"all", ownerId:"all", status:"open", minValue:"all", probability:"all", sourceJobId:"all", sort:"updated" }
};

export const businesses = [
  { id:"BUS-1042", discoveryJobId:"JOB-1028", name:"عيادات الحياة لطب الأسنان", short:"عيادات الحياة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 456 8201", email:"hello@hayatdental.sa", website:"hayatdental.sa", instagram:"@hayatdental", rating:4.7, reviews:863, source:"خرائط الأعمال", owner:"سارة العمري", stage:"New", value:85000, websiteQuality:"ضعيف", whatsapp:true, lastActivity:"منذ ساعتين" },
  { id:"BUS-1137", discoveryJobId:"JOB-1028", name:"مركز ابتسامة الطبي", short:"ابتسامة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 284 4502", email:"info@ibtisama.med", website:"ibtisama.med", instagram:"@ibtisama.med", rating:4.5, reviews:510, source:"خرائط الأعمال", owner:"فهد الحربي", stage:"Contacted", value:56000, websiteQuality:"متوسط", whatsapp:true, lastActivity:"منذ يوم" },
  { id:"BUS-1198", discoveryJobId:"JOB-1028", name:"مجمع رؤية الطبي", short:"رؤية", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 279 6005", email:"", website:"roya-clinic.com", instagram:"@royaclinics", rating:4.6, reviews:724, source:"خرائط الأعمال", owner:"سارة العمري", stage:"New", value:42000, websiteQuality:"ضعيف", whatsapp:false, lastActivity:"منذ 3 أيام" },
  { id:"BUS-1220", discoveryJobId:"JOB-1029", name:"شركة المدار للمقاولات", short:"المدار", category:"مقاولات", city:"الرياض", country:"السعودية", phone:"+966 11 210 9370", email:"business@almadar.sa", website:"almadar.sa", instagram:"", rating:4.4, reviews:192, source:"مواقع الشركات", owner:"خالد السالم", stage:"Proposal", value:120000, websiteQuality:"متوسط", whatsapp:true, lastActivity:"منذ 4 أيام" },
  { id:"BUS-1301", discoveryJobId:"JOB-1031", name:"عيادات النخبة للأسنان", short:"النخبة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 50 920 1440", email:"contact@elite-dental.sa", website:"", instagram:"@elitedental", rating:4.3, reviews:388, source:"استيراد ملف", owner:"فهد الحربي", stage:"New", value:38000, websiteQuality:"غير متوفر", whatsapp:true, lastActivity:"منذ أسبوع" },
  { id:"BUS-1375", discoveryJobId:"JOB-1030", name:"مؤسسة ابتكار للتسويق", short:"ابتكار", category:"تسويق رقمي", city:"جدة", country:"السعودية", phone:"+966 12 654 1893", email:"team@ebtikar.agency", website:"ebtikar.agency", instagram:"@ebtikar.agency", rating:4.8, reviews:98, source:"خرائط الأعمال", owner:"خالد السالم", stage:"Meeting", value:67000, websiteQuality:"جيد", whatsapp:true, lastActivity:"منذ يومين" },
  { id:"BUS-1381", discoveryJobId:"JOB-1027", name:"مركز تقويم الصفوة", short:"الصفوة", category:"مراكز تقويم", city:"جدة", country:"السعودية", address:"حي الروضة، جدة", phone:"+966 12 614 2208", email:"", website:"safwa-ortho.sa", instagram:"", rating:4.6, reviews:208, source:"دليل أعمال", status:"مكتشف", stage:"New", value:0, lastActivity:"—" },
  { id:"BUS-1382", discoveryJobId:"JOB-1027", name:"عيادات ابتسامة البحر", short:"ابتسامة البحر", category:"مراكز تقويم", city:"جدة", country:"السعودية", address:"حي الشاطئ، جدة", phone:"+966 12 682 9034", email:"", website:"", instagram:"@bahrsmile", rating:4.3, reviews:117, source:"دليل أعمال", status:"مكتشف", stage:"New", value:0, lastActivity:"—" },
  { id:"BUS-1402", discoveryJobId:"JOB-1028", name:"أكاديمية أفق الابتكار", short:"أفق الابتكار", category:"تدريب مهني", city:"الرياض", country:"السعودية", address:"حي المروج، الرياض", phone:"+966 11 590 6300", email:"hello@afaqacademy.sa", website:"afaqacademy.sa", instagram:"@afaqacademy", rating:4.9, reviews:640, source:"خرائط الأعمال", lastActivity:"—" },
  { id:"BUS-1403", discoveryJobId:"JOB-1028", name:"مركز بداية للعناية", short:"بداية", category:"مركز عناية", city:"الرياض", country:"السعودية", address:"حي العليا، الرياض", phone:"+966 11 322 4410", email:"", website:"bidaya-care.sa", instagram:"", rating:4.1, reviews:34, source:"خرائط الأعمال", lastActivity:"—" },
  { id:"BUS-1404", discoveryJobId:"JOB-1028", name:"مجمع مسار الصحة", short:"مسار الصحة", category:"مركز صحي", city:"الرياض", country:"السعودية", address:"الرياض", phone:"", email:"", website:"", instagram:"", rating:null, reviews:null, source:"خرائط الأعمال", lastActivity:"—" },
  { id:"BUS-1405", discoveryJobId:"JOB-1028", name:"عيادات صفاء العلاجية", short:"صفاء", category:"عيادات علاج طبيعي", city:"الرياض", country:"السعودية", address:"حي الصحافة، الرياض", phone:"+966 11 721 0640", email:"care@safa-clinic.sa", website:"safa-clinic.sa", instagram:"@safaclinic", rating:4.5, reviews:265, source:"خرائط الأعمال", lastActivity:"—" }
];

export const conversations = [
  { id:"CONV-3042", businessId:"BUS-1042", channel:"واتساب", contact:"د. محمد السبيعي", preview:"أهلًا، أرسلوا لنا تفاصيل الحل المقترح...", time:"10:42", status:"بانتظار الرد", unread:2, messages:[{from:"them",text:"أهلًا، مهتمون بتحسين حجز المواعيد لدينا."},{from:"us",text:"يسعدنا ذلك. لاحظنا فرصة واضحة في الموقع ومسار الواتساب."},{from:"them",text:"أرسلوا لنا تفاصيل الحل المقترح والتكلفة المبدئية."}] },
  { id:"CONV-3043", businessId:"BUS-1137", channel:"إنستغرام", contact:"مركز ابتسامة", preview:"هل يدعم النظام التذكير بالمواعيد؟", time:"أمس", status:"فرصة", unread:0, messages:[{from:"them",text:"هل يدعم النظام التذكير بالمواعيد؟"}] },
  { id:"CONV-3044", businessId:"BUS-1220", channel:"دردشة الموقع", contact:"شركة المدار", preview:"نحتاج عرضًا للمشروع قبل نهاية الأسبوع.", time:"الأحد", status:"تحتاج تدخل", unread:0, messages:[{from:"them",text:"نحتاج عرضًا للمشروع قبل نهاية الأسبوع."}] }
];

export const jobs = [
  { id:"JOB-1028", sourceId:"SRC-1001", name:"عيادات أسنان — الرياض", keyword:"عيادات أسنان", location:"الرياض", keywords:["عيادات أسنان"], locations:["الرياض"], source:"خرائط الأعمال", filters:{minRating:"4",minReviews:"50",website:"any",phone:true,email:false,whatsapp:false,instagram:false,activity:"any",limit:"2000"}, combinationCount:1, status:"completed", created:"اليوم، 09:24", createdAt:"2026-08-15T09:24:00", startedAt:"2026-08-15T09:24:01", completedAt:"2026-08-15T09:24:13", progress:100, foundCount:1420, duplicateCount:172, deduplicatedCount:1248, discoveredCount:1420, total:1240, current:1240, highScore:184, crmAdded:92, qualified:31, resultBusinessIds:["BUS-1042","BUS-1137","BUS-1198","BUS-1402","BUS-1403","BUS-1404","BUS-1405"] },
  { id:"JOB-1029", sourceId:"SRC-1002", name:"شركات مقاولات — الدمام", keyword:"شركات مقاولات", location:"الدمام", keywords:["شركات مقاولات"], locations:["الدمام"], source:"مواقع الشركات", filters:{minRating:"4",minReviews:"50",website:"any",phone:true,email:false,whatsapp:false,instagram:false,activity:"any",limit:"1000"}, combinationCount:1, status:"completed", created:"أمس، 14:10", createdAt:"2026-08-14T14:10:00", startedAt:"2026-08-14T14:10:01", completedAt:"2026-08-14T14:10:12", progress:100, foundCount:932, duplicateCount:72, deduplicatedCount:860, discoveredCount:932, total:860, current:860, highScore:122, crmAdded:74, qualified:18, resultBusinessIds:["BUS-1220"] },
  { id:"JOB-1030", sourceId:"SRC-1001", name:"مطاعم — جدة", keyword:"مطاعم", location:"جدة", keywords:["مطاعم"], locations:["جدة"], source:"خرائط الأعمال", filters:{minRating:"4",minReviews:"50",website:"any",phone:true,email:false,whatsapp:false,instagram:false,activity:"any",limit:"2000"}, combinationCount:1, status:"processing", created:"اليوم، 10:42", createdAt:"2026-08-15T10:42:00", startedAt:"2026-08-15T10:42:02", completedAt:null, progress:67, foundCount:1412, duplicateCount:0, deduplicatedCount:0, discoveredCount:1412, total:2040, current:1412, highScore:210, crmAdded:128, qualified:22, resultBusinessIds:["BUS-1375"] },
  { id:"JOB-1031", sourceId:"SRC-1003", name:"شركات تقنية — الرياض", keyword:"شركات تقنية", location:"الرياض", keywords:["شركات تقنية"], locations:["الرياض"], source:"استيراد ملف", filters:{minRating:"4",minReviews:"50",website:"any",phone:true,email:false,whatsapp:false,instagram:false,activity:"any",limit:"1000"}, combinationCount:1, status:"completed", created:"الأحد، 09:00", createdAt:"2026-08-11T09:00:00", startedAt:"2026-08-11T09:00:01", completedAt:"2026-08-11T09:00:11", progress:100, foundCount:588, duplicateCount:48, deduplicatedCount:540, discoveredCount:588, total:540, current:540, highScore:96, crmAdded:61, qualified:48, resultBusinessIds:["BUS-1301"] },
  { id:"JOB-1027", sourceId:"SRC-1006", name:"مراكز تقويم — جدة", keyword:"مراكز تقويم", location:"جدة", keywords:["مراكز تقويم"], locations:["جدة"], source:"دليل أعمال", filters:{minRating:"4",minReviews:"50",website:"any",phone:true,email:false,whatsapp:false,instagram:false,activity:"any",limit:"1000"}, combinationCount:1, status:"failed", created:"الأحد، 08:12", createdAt:"2026-08-11T08:12:00", startedAt:"2026-08-11T08:12:01", completedAt:null, progress:46, foundCount:0, duplicateCount:0, deduplicatedCount:0, discoveredCount:0, total:0, current:0, highScore:0, crmAdded:0, qualified:0, failureMessage:"تعذر إكمال عملية الاكتشاف التجريبية. لم يتم فقد أي بيانات محفوظة.", retryScenario:{foundCount:642,duplicateCount:64,deduplicatedCount:578}, resultBusinessIds:["BUS-1381","BUS-1382"] }
];

export const discoverySourceOptions = [
  { id:"SRC-1004", name:"مصادر الأعمال العامة", type:"public_business_sources", status:"active" },
  { id:"SRC-1005", name:"Google Maps", type:"planned_map_source", status:"mock" },
  { id:"SRC-1006", name:"دليل أعمال", type:"business_directory", status:"active" },
  { id:"SRC-1007", name:"مصدر مخصص", type:"custom_source", status:"mock" }
];
export const discoveryStatusLabels = { pending:"في الانتظار", processing:"قيد المعالجة", completed:"مكتمل", failed:"فشل", cancelled:"ملغي" };
export const DISCOVERY_REFERENCE_DATE = "2026-08-15";
const arabicWeekdays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

export const activities = [{type:"WhatsApp", title:"رسالة متابعة مقترحة", when:"اليوم، 11:30", businessId:"BUS-1042"},{type:"Call",title:"اتصال مع مركز ابتسامة",when:"اليوم، 14:00",businessId:"BUS-1137"},{type:"Meeting",title:"عرض تقني مع شركة المدار",when:"غدًا، 10:00",businessId:"BUS-1220"}];
export const navItems = [
  {id:"dashboard",label:"الرئيسية",icon:"⌂",group:""},
  {id:"discovery",label:"اكتشاف العملاء",icon:"⌕",group:"الاكتشاف"},{id:"discovery/jobs",label:"عمليات البحث",icon:"◷",group:""},{id:"discovery/results",label:"النتائج",icon:"▤",group:""},
  {id:"crm",label:"إدارة العملاء",icon:"◉",group:"العملاء"},{id:"contacts",label:"جهات الاتصال",icon:"⌘",group:""},{id:"companies",label:"الشركات",icon:"◫",group:""},
  {id:"pipeline",label:"مسار المبيعات",icon:"≋",group:"المبيعات"},{id:"deals",label:"الصفقات",icon:"◇",group:""},{id:"tasks",label:"المهام",icon:"◷",group:""},{id:"appointments",label:"المواعيد",icon:"◌",group:""},
  {id:"inbox",label:"صندوق الوارد",icon:"◌",group:"التواصل"},{id:"whatsapp",label:"واتساب",icon:"◈",group:""},{id:"calls",label:"المكالمات",icon:"⌁",group:""},
  {id:"intelligence",label:"ذكاء العملاء",icon:"✦",group:"الذكاء الاصطناعي"},{id:"copilot",label:"مساعد المبيعات",icon:"✧",group:""},{id:"agent",label:"وكيل المبيعات الذكي",icon:"✦",group:""},
  {id:"automation",label:"الأتمتة",icon:"⌘",group:"الأتمتة"},{id:"analytics",label:"التحليلات",icon:"▥",group:"التحليلات"},{id:"integrations",label:"التكاملات",icon:"⊞",group:"التكاملات"},{id:"settings",label:"الإعدادات",icon:"⚙",group:"الإعدادات"}
];

export const metrics = { totalLeads:12480, highOpportunity:1240, contacted:3842, qualified:920, openDeals:164, pipelineValue:1840000, wonMonth:382000, aiRevenue:146000 };

export const dashboardData = {
  dashboardMetrics: [
    { id:"totalLeads", label:"العملاء المحتملون", value:12480, trend:"+8.4% عن الفترة السابقة", tone:"info", note:"من مصادر الاكتشاف" },
    { id:"highOpportunity", label:"فرص عالية الجودة", value:1240, trend:"Score ≥ 80", tone:"success", note:"تحتاج مراجعة أولوية" },
    { id:"contacted", label:"تم التواصل", value:3842, trend:"30.8% من الإجمالي", tone:"info", note:"متابعة مستمرة" },
    { id:"qualified", label:"العملاء المؤهلون", value:920, trend:"+8.1% هذا الأسبوع", tone:"success", note:"جاهزون للمرحلة التالية" },
    { id:"openDeals", label:"الصفقات المفتوحة", value:164, trend:"ضمن 6 مراحل", tone:"info", note:"مراجعة قيمة المراحل" },
    { id:"pipelineValue", label:"قيمة Pipeline", value:1840000, format:"sar", trend:"16 صفقة تفاوض", tone:"info", note:"قيمة متوقعة" },
    { id:"revenue", label:"الإيراد المحقق", value:382000, format:"sar", trend:"+18.6% عن الفترة السابقة", tone:"success", note:"إيراد معترف به تجريبيًا" },
    { id:"aiRevenue", label:"إيراد متأثر بالذكاء الاصطناعي", value:146000, format:"sar", trend:"38% من الإيراد", tone:"info", note:"بيانات Mock" }
  ],
  attentionItems: [
    { id:"ATTN-1001", tone:"danger", title:"12 متابعة متأخرة", description:"هناك 12 عميلًا عالي الأولوية لم تتم متابعتهم في الموعد.", action:"عرض المتابعات", route:"tasks" },
    { id:"ATTN-1002", tone:"warning", title:"4 صفقات عالية الاحتمال", description:"قيمة إجمالية 185,000 ر.س وقريبة من الإغلاق.", action:"عرض الصفقات", route:"deals" },
    { id:"ATTN-1003", tone:"success", title:"18 فرصة جديدة بدرجة أعلى من 85", description:"تحتاج مراجعة وتوزيع قبل انتهاء اليوم.", action:"مراجعة الفرص", route:"leads" },
    { id:"ATTN-1004", tone:"info", title:"3 محادثات تحتاج تدخلًا بشريًا", description:"آخر رسالة وصلت وتنتظر الرد من الفريق.", action:"فتح صندوق الوارد", route:"inbox" }
  ],
  aiRecommendations: [
    { id:"AIR-1042", kind:"فرصة اليوم", businessId:"BUS-1042", title:"عيادات الحياة لطب الأسنان", score:92, reason:"نشاط تجاري قوي مع فجوة واضحة في الحضور الرقمي ومسار الحجز.", action:"بدء تواصل استشاري حول تطوير الموقع وأتمتة المتابعة.", primary:"فتح العميل", primaryRoute:"lead-profile", secondary:"إنشاء متابعة", secondaryAction:"create-followup" },
    { id:"AIR-2002", kind:"مخاطرة في Pipeline", businessId:"BUS-1220", title:"6 صفقات بلا نشاط", score:null, reason:"قيمة تقديرية 240,000 ر.س لم تسجل نشاطًا منذ 5 أيام.", action:"راجع الصفقات الراكدة قبل نهاية اليوم.", primary:"مراجعة الصفقات", primaryRoute:"deals" },
    { id:"AIR-2003", kind:"إشارة اكتشاف", businessId:"BUS-1137", title:"قطاع العيادات في الرياض", score:null, reason:"يحقق معدل تأهيل أعلى من قطاع المطاعم بـ18%.", action:"راجع تحليل المصدر وارفع أولوية هذا القطاع.", primary:"عرض التحليل", primaryRoute:"analytics" }
  ],
  funnelMetrics: [
    { key:"discovered", label:"تم الاكتشاف", value:12480, rate:null }, { key:"enriched", label:"تم الإثراء", value:10250, rate:82 }, { key:"crm", label:"أضيف إلى إدارة العملاء", value:6420, rate:63 }, { key:"contacted", label:"تم التواصل", value:3842, rate:60 }, { key:"qualified", label:"مؤهل", value:920, rate:24 }, { key:"deals", label:"صفقة", value:164, rate:18 }, { key:"won", label:"رابح", value:48, rate:29 }
  ],
  pipelineSummary: [
    { stage:"جديد", count:31, value:320000, share:17, route:"pipeline" }, { stage:"تم التواصل", count:37, value:430000, share:23, route:"pipeline" }, { stage:"مؤهل", count:42, value:510000, share:28, route:"pipeline" }, { stage:"اجتماع", count:18, value:240000, share:13, route:"pipeline" }, { stage:"عرض", count:20, value:255000, share:14, route:"pipeline" }, { stage:"تفاوض", count:16, value:85000, share:5, route:"pipeline" }
  ],
  nearClosingDeals: [
    { id:"DEAL-4042", businessId:"BUS-1042", stage:"عرض", value:85000, probability:82, lastActivity:"منذ ساعتين", nextAction:"مراجعة العرض" }, { id:"DEAL-4051", businessId:"BUS-1220", stage:"تفاوض", value:120000, probability:76, lastActivity:"أمس", nextAction:"تحديث العرض" }, { id:"DEAL-4052", businessId:"BUS-1137", stage:"اجتماع", value:56000, probability:68, lastActivity:"اليوم", nextAction:"تأكيد الاجتماع" }
  ],
  sourcePerformance: [
    { source:"خرائط الأعمال ومصادر الشركات", value:54, tone:"info" }, { source:"الموقع الإلكتروني", value:18, tone:"success" }, { source:"واتساب", value:12, tone:"info" }, { source:"استيراد ملف", value:9, tone:"warning" }, { source:"إحالة", value:7, tone:"info" }
  ]
};

export const mockModel = {
  discoverySources: [
    { id:"SRC-1001", name:"خرائط الأعمال", type:"business_directory", status:"active" },
    { id:"SRC-1002", name:"مواقع الشركات", type:"web_directory", status:"active" },
    { id:"SRC-1003", name:"استيراد ملف", type:"file_import", status:"active" },
    ...discoverySourceOptions
  ],
  signals: [
    { id:"SIG-1042-A", businessId:"BUS-1042", key:"strong_demand", dimension:"activity", points:23, polarity:"positive", value:"4.7 / 5 و863 مراجعة", evidence:"تقييم 4.7 من 5 و863 مراجعة في سجل Business fixture." },
    { id:"SIG-1042-B", businessId:"BUS-1042", key:"weak_website", dimension:"digitalOpportunity", points:18, polarity:"gap", gapCode:"weak_website", value:"موقع يحتاج تحديثًا", evidence:"حقل websiteQuality في بيانات العرض يصف تجربة الموقع بأنها ضعيفة." },
    { id:"SIG-1042-C", businessId:"BUS-1042", key:"manual_booking", dimension:"digitalOpportunity", points:10, polarity:"gap", gapCode:"manual_booking", value:"مسار الحجز غير مؤتمت", evidence:"لا تظهر أتمتة حجز أو متابعة في بيانات Business fixture." },
    { id:"SIG-1042-D", businessId:"BUS-1042", key:"reachable_contact", dimension:"reachability", points:18, polarity:"positive", value:"هاتف وبريد وواتساب", evidence:"توجد بيانات هاتف وبريد وقناة واتساب في السجل." },
    { id:"SIG-1042-E", businessId:"BUS-1042", key:"service_fit", dimension:"serviceFit", points:14, polarity:"positive", value:"فجوات مناسبة لخدمات التحويل", evidence:"تتقاطع فجوتا الموقع والحجز مع خدمات تطوير الموقع وأتمتة المحادثات." },
    { id:"SIG-1042-F", businessId:"BUS-1042", key:"complete_profile", dimension:"dataQuality", points:9, polarity:"positive", value:"ملف مكتمل بدرجة جيدة", evidence:"التقييم والمراجعات والموقع والاتصال متاحة." },
    { id:"SIG-1137-A", businessId:"BUS-1137", key:"steady_demand", dimension:"activity", points:22, polarity:"positive", value:"4.5 / 5 و510 مراجعة", evidence:"التقييم والمراجعات مثبتان في Business fixture." },
    { id:"SIG-1137-B", businessId:"BUS-1137", key:"weak_visibility", dimension:"digitalOpportunity", points:18, polarity:"gap", gapCode:"weak_visibility", value:"ظهور رقمي يحتاج تحسينًا", evidence:"سياق الاكتشاف يحدد تحسين الظهور كفجوة تشغيلية." },
    { id:"SIG-1137-C", businessId:"BUS-1137", key:"appointment_friction", dimension:"digitalOpportunity", points:10, polarity:"gap", gapCode:"appointment_friction", value:"حجز المواعيد يحتاج تبسيطًا", evidence:"الاحتياج المسجل هو تحسين حجز المواعيد." },
    { id:"SIG-1137-D", businessId:"BUS-1137", key:"reachable_contact", dimension:"reachability", points:17, polarity:"positive", value:"هاتف وبريد وواتساب", evidence:"توجد ثلاث وسائل تواصل في السجل." },
    { id:"SIG-1137-E", businessId:"BUS-1137", key:"service_fit", dimension:"serviceFit", points:8, polarity:"positive", value:"ملاءمة متوسطة للخدمات", evidence:"فجوات الظهور والحجز قابلة لمعالجة خدمية مباشرة." },
    { id:"SIG-1137-F", businessId:"BUS-1137", key:"complete_profile", dimension:"dataQuality", points:9, polarity:"positive", value:"بيانات كافية للتحليل", evidence:"بيانات النشاط والتواصل والمراجعات متاحة." },
    { id:"SIG-1198-A", businessId:"BUS-1198", key:"moderate_demand", dimension:"activity", points:15, polarity:"positive", value:"4.6 / 5 و724 مراجعة", evidence:"التقييم والمراجعات متاحة في السجل." },
    { id:"SIG-1198-B", businessId:"BUS-1198", key:"weak_website", dimension:"digitalOpportunity", points:7, polarity:"gap", gapCode:"weak_website", value:"موقع يحتاج تحسين تحويل", evidence:"سياق Business يذكر تحسين التحويل." },
    { id:"SIG-1198-C", businessId:"BUS-1198", key:"missing_whatsapp", dimension:"digitalOpportunity", points:11, polarity:"gap", gapCode:"missing_whatsapp", value:"لا توجد قناة واتساب", evidence:"حقل whatsapp في Business fixture يساوي false." },
    { id:"SIG-1198-D", businessId:"BUS-1198", key:"limited_reachability", dimension:"reachability", points:11, polarity:"neutral", value:"هاتف وموقع فقط", evidence:"لا يوجد بريد إلكتروني أو واتساب في السجل." },
    { id:"SIG-1198-E", businessId:"BUS-1198", key:"partial_service_fit", dimension:"serviceFit", points:5, polarity:"positive", value:"ملاءمة أولية", evidence:"فجوة التحويل يمكن ربطها بخدمة الموقع فقط." },
    { id:"SIG-1198-F", businessId:"BUS-1198", key:"partial_profile", dimension:"dataQuality", points:3, polarity:"neutral", value:"بيانات جزئية", evidence:"بعض بيانات التواصل غير متاحة لكن لا تعد إشارة سلبية." },
    { id:"SIG-1402-A", businessId:"BUS-1402", key:"strong_demand", dimension:"activity", points:23, polarity:"positive", value:"4.9 / 5 و640 مراجعة", evidence:"نشاط رقمي قوي مثبت في Business fixture." },
    { id:"SIG-1402-B", businessId:"BUS-1402", key:"strong_digital_presence", dimension:"digitalOpportunity", points:0, polarity:"neutral", value:"موقع وحضور اجتماعي قويان", evidence:"الموقع والبريد والهاتف وInstagram متاحة ولا تظهر فجوة رقمية محددة." },
    { id:"SIG-1402-C", businessId:"BUS-1402", key:"reachable_contact", dimension:"reachability", points:18, polarity:"positive", value:"بيانات اتصال مكتملة", evidence:"الهاتف والبريد والموقع متاحة." },
    { id:"SIG-1402-D", businessId:"BUS-1402", key:"no_clear_service_gap", dimension:"serviceFit", points:0, polarity:"neutral", value:"لا توجد فجوة خدمية واضحة", evidence:"لا توجد إشارة Gap تربط السجل بخدمة محددة." },
    { id:"SIG-1402-E", businessId:"BUS-1402", key:"complete_profile", dimension:"dataQuality", points:10, polarity:"positive", value:"ملف مكتمل", evidence:"جميع حقول النشاط والاتصال الأساسية معروفة." },
    { id:"SIG-1403-A", businessId:"BUS-1403", key:"limited_demand", dimension:"activity", points:7, polarity:"neutral", value:"4.1 / 5 و34 مراجعة", evidence:"النشاط موجود لكنه محدود مقارنة بسجلات العرض الأخرى." },
    { id:"SIG-1403-B", businessId:"BUS-1403", key:"weak_website", dimension:"digitalOpportunity", points:8, polarity:"gap", gapCode:"weak_website", value:"موقع بسيط يحتاج تحسينًا", evidence:"الموقع موجود لكن لا توجد إشارات تحويل أو حجز ضمن السجل." },
    { id:"SIG-1403-C", businessId:"BUS-1403", key:"limited_reachability", dimension:"reachability", points:5, polarity:"neutral", value:"رقم هاتف فقط", evidence:"البريد والحضور الاجتماعي غير متاحين؛ وهي بيانات محدودة لا إشارة سلبية." },
    { id:"SIG-1403-D", businessId:"BUS-1403", key:"partial_service_fit", dimension:"serviceFit", points:4, polarity:"positive", value:"ملاءمة أولية لخدمة الموقع", evidence:"الفجوة المحددة ترتبط بخدمة واحدة فقط." },
    { id:"SIG-1403-E", businessId:"BUS-1403", key:"partial_profile", dimension:"dataQuality", points:4, polarity:"neutral", value:"ملف جزئي", evidence:"توجد بيانات كافية محدودة للتقييم التجريبي." },
    { id:"SIG-1404-A", businessId:"BUS-1404", key:"unknown_rating", dimension:"activity", points:0, polarity:"unknown", value:"غير معروف", evidence:"التقييم وعدد المراجعات غير متاحين في Business fixture." },
    { id:"SIG-1404-B", businessId:"BUS-1404", key:"unknown_digital_presence", dimension:"digitalOpportunity", points:0, polarity:"unknown", value:"غير معروف", evidence:"الموقع والحضور الاجتماعي غير متاحين في Business fixture." },
    { id:"SIG-1404-C", businessId:"BUS-1404", key:"limited_contact_data", dimension:"reachability", points:0, polarity:"unknown", value:"غير معروف", evidence:"لا يوجد هاتف أو بريد إلكتروني قابل للاستخدام في السجل." },
    { id:"SIG-1405-A", businessId:"BUS-1405", key:"steady_demand", dimension:"activity", points:17, polarity:"positive", value:"4.5 / 5 و265 مراجعة", evidence:"التقييم والمراجعات متاحة في Business fixture." },
    { id:"SIG-1405-B", businessId:"BUS-1405", key:"manual_booking", dimension:"digitalOpportunity", points:20, polarity:"gap", gapCode:"manual_booking", value:"حجز ومتابعة يدويان", evidence:"لا تظهر أتمتة الحجز في بيانات العرض." },
    { id:"SIG-1405-C", businessId:"BUS-1405", key:"reachable_contact", dimension:"reachability", points:14, polarity:"positive", value:"هاتف وبريد متاحان", evidence:"وسيلتا اتصال متاحتان في السجل." },
    { id:"SIG-1405-D", businessId:"BUS-1405", key:"service_fit", dimension:"serviceFit", points:12, polarity:"positive", value:"ملاءمة لأتمتة المتابعة", evidence:"فجوة الحجز اليدوي ترتبط بخدمة أتمتة واتساب." },
    { id:"SIG-1405-E", businessId:"BUS-1405", key:"complete_profile", dimension:"dataQuality", points:9, polarity:"positive", value:"بيانات كافية للتحليل", evidence:"بيانات النشاط والتواصل والموقع متاحة." }
  ],
  serviceCatalog: [
    { id:"SVC-1001", name:"تطوير الموقع", gapCodes:["weak_website"], description:"تحسين تجربة الموقع ومسار التحويل من الزيارة إلى الطلب." },
    { id:"SVC-1002", name:"تحسين الظهور الرقمي", gapCodes:["weak_visibility"], description:"رفع قابلية الظهور أمام الباحثين عن الخدمة." },
    { id:"SVC-1003", name:"أتمتة واتساب والحجز", gapCodes:["manual_booking","missing_whatsapp","appointment_friction"], description:"تحويل الاستفسارات إلى مسار متابعة وحجز أوضح." },
    { id:"SVC-1004", name:"إدارة المحتوى الاجتماعي", gapCodes:["inactive_social"], description:"معالجة فجوة الحضور الاجتماعي بمحتوى تشغيلي منظم." },
    { id:"SVC-1005", name:"تهيئة CRM", gapCodes:["no_crm_context"], description:"تنظيم سياق العملاء قبل النقل إلى CRM في المرحلة التالية." }
  ],
  opportunityAnalyses: [
    { id:"ANL-1042", businessId:"BUS-1042", status:"analyzed", signalIds:["SIG-1042-A","SIG-1042-B","SIG-1042-C","SIG-1042-D","SIG-1042-E","SIG-1042-F"], confidence:0.92, scoringVersion:"S4-MOCK-v1", analyzedAt:"2026-08-15T09:42:00" },
    { id:"ANL-1137", businessId:"BUS-1137", status:"analyzed", signalIds:["SIG-1137-A","SIG-1137-B","SIG-1137-C","SIG-1137-D","SIG-1137-E","SIG-1137-F"], confidence:0.86, scoringVersion:"S4-MOCK-v1", analyzedAt:"2026-08-15T09:35:00" },
    { id:"ANL-1198", businessId:"BUS-1198", status:"analyzed", signalIds:["SIG-1198-A","SIG-1198-B","SIG-1198-C","SIG-1198-D","SIG-1198-E","SIG-1198-F"], confidence:0.63, scoringVersion:"S4-MOCK-v1", analyzedAt:"2026-08-15T09:18:00" },
    { id:"ANL-1402", businessId:"BUS-1402", status:"analyzed", signalIds:["SIG-1402-A","SIG-1402-B","SIG-1402-C","SIG-1402-D","SIG-1402-E"], confidence:0.95, scoringVersion:"S4-MOCK-v1", analyzedAt:"2026-08-15T09:10:00" },
    { id:"ANL-1403", businessId:"BUS-1403", status:"analysis_error", signalIds:["SIG-1403-A","SIG-1403-B","SIG-1403-C","SIG-1403-D","SIG-1403-E"], confidence:0.54, scoringVersion:"S4-MOCK-v1", analyzedAt:"2026-08-15T08:58:00" },
    { id:"ANL-1404", businessId:"BUS-1404", status:"insufficient_data", signalIds:["SIG-1404-A","SIG-1404-B","SIG-1404-C"], confidence:0, scoringVersion:"S4-MOCK-v1", analyzedAt:"2026-08-15T08:50:00" },
    { id:"ANL-1405", businessId:"BUS-1405", status:"not_analyzed", signalIds:["SIG-1405-A","SIG-1405-B","SIG-1405-C","SIG-1405-D","SIG-1405-E"], confidence:0.84, scoringVersion:"S4-MOCK-v1", analyzedAt:null }
  ],
  opportunities: [
    { id:"OPP-1042", analysisId:"ANL-1042", businessId:"BUS-1042", status:"open", reasonSignalIds:["SIG-1042-B","SIG-1042-C"], salesApproach:"ابدأ بمناقشة تحسين تحويل زوار الموقع إلى حجوزات ومحادثات متابعة بدل بيع إعادة تصميم الموقع مباشرة." },
    { id:"OPP-1137", analysisId:"ANL-1137", businessId:"BUS-1137", status:"open", reasonSignalIds:["SIG-1137-B","SIG-1137-C"], salesApproach:"ابدأ بسؤال عن أثر الظهور وحجز المواعيد على وقت الاستقبال، ثم اربط الحل بقياس واضح." },
    { id:"OPP-1198", analysisId:"ANL-1198", businessId:"BUS-1198", status:"open", reasonSignalIds:["SIG-1198-B","SIG-1198-C"], salesApproach:"ابدأ بمراجعة مسار التحويل الحالي قبل اقتراح أتمتة واتساب أو تطوير الموقع." },
    { id:"OPP-1402", analysisId:"ANL-1402", businessId:"BUS-1402", status:"open", reasonSignalIds:[], salesApproach:"لا تبدأ بعرض خدمة محددة؛ السجل قوي رقميًا ولا توجد فجوة مثبتة تستدعي أولوية عالية." },
  ],
  leads: [
    { id:"LEAD-1042", businessId:"BUS-1042", companyId:"CMP-1042", ownerId:"USR-1001", status:"qualified", priority:"high", tags:["عيادات","حجز"], sourceJobId:"JOB-1028", createdAt:"2026-08-12T09:30:00", updatedAt:"2026-08-15T10:35:00", lastActivityAt:"2026-08-15T10:35:00", nextActivityAt:"2026-08-15T13:00:00", convertedAt:"2026-08-12T09:30:00" },
    { id:"LEAD-1137", businessId:"BUS-1137", companyId:"CMP-1137", ownerId:"USR-1002", status:"contacted", priority:"high", tags:["عيادات","عرض"], sourceJobId:"JOB-1028", createdAt:"2026-08-13T10:12:00", updatedAt:"2026-08-14T12:20:00", lastActivityAt:"2026-08-14T12:20:00", nextActivityAt:"2026-08-15T15:30:00", convertedAt:"2026-08-13T10:12:00" },
    { id:"LEAD-1220", businessId:"BUS-1220", companyId:"CMP-1220", ownerId:"USR-1003", status:"qualified", priority:"medium", tags:["مقاولات"], sourceJobId:"JOB-1029", createdAt:"2026-08-11T13:20:00", updatedAt:"2026-08-13T10:00:00", lastActivityAt:"2026-08-13T10:00:00", nextActivityAt:"2026-08-14T11:30:00", convertedAt:"2026-08-11T13:20:00" },
    { id:"LEAD-1301", businessId:"BUS-1301", companyId:"CMP-1301", ownerId:"USR-1002", status:"nurturing", priority:"medium", tags:["عيادات","متابعة"], sourceJobId:"JOB-1031", createdAt:"2026-08-10T11:40:00", updatedAt:"2026-08-10T11:40:00", lastActivityAt:"2026-08-10T11:40:00", nextActivityAt:null, convertedAt:"2026-08-10T11:40:00" },
    { id:"LEAD-1375", businessId:"BUS-1375", companyId:"CMP-1375", ownerId:"USR-1003", status:"new", priority:"low", tags:["تسويق"], sourceJobId:"JOB-1030", createdAt:"2026-08-15T10:42:00", updatedAt:"2026-08-15T10:42:00", lastActivityAt:"2026-08-15T10:42:00", nextActivityAt:"2026-08-16T10:00:00", convertedAt:"2026-08-15T10:42:00" }
  ],
  contacts: [{ id:"CON-1042", leadId:"LEAD-1042", companyId:"CMP-1042", businessId:"BUS-1042", name:"د. محمد السبيعي", title:"مدير العيادات", phone:"+966114568201", email:"hello@hayatdental.sa", status:"active", createdAt:"2026-08-12T09:30:00" }, { id:"CON-1137", leadId:"LEAD-1137", companyId:"CMP-1137", businessId:"BUS-1137", name:"مركز ابتسامة", title:"فريق الاستقبال", phone:"+966112844502", email:"info@ibtisama.med", status:"active", createdAt:"2026-08-13T10:12:00" }],
  companies: [
    { id:"CMP-1042", businessId:"BUS-1042", name:"عيادات الحياة لطب الأسنان", status:"active" }, { id:"CMP-1137", businessId:"BUS-1137", name:"مركز ابتسامة الطبي", status:"active" }, { id:"CMP-1220", businessId:"BUS-1220", name:"شركة المدار للمقاولات", status:"active" }, { id:"CMP-1301", businessId:"BUS-1301", name:"عيادات النخبة للأسنان", status:"active" }, { id:"CMP-1375", businessId:"BUS-1375", name:"مؤسسة ابتكار للتسويق", status:"active" }
  ],
  messages: [{ id:"MSG-3042", conversationId:"CONV-3042", direction:"inbound", status:"received" }],
  tasks: [
    { id:"TSK-1042", leadId:"LEAD-1220", status:"overdue", ownerId:"USR-1003", priority:"high", type:"اتصال", title:"مراجعة العرض", when:"11:30", dueAt:"2026-08-14T11:30:00", createdAt:"2026-08-13T10:00:00", completedAt:null, scheduleStatus:"متأخر", route:"crm/leads/LEAD-1220" },
    { id:"TSK-1043", leadId:"LEAD-1042", status:"pending", ownerId:"USR-1001", priority:"high", type:"متابعة واتساب", title:"تأكيد احتياج الحجز", when:"13:00", dueAt:"2026-08-15T13:00:00", createdAt:"2026-08-14T11:20:00", completedAt:null, scheduleStatus:"اليوم", route:"crm/leads/LEAD-1042" },
    { id:"TSK-1044", leadId:"LEAD-1137", status:"pending", ownerId:"USR-1002", priority:"medium", type:"اجتماع", title:"عرض توضيحي", when:"15:30", dueAt:"2026-08-15T15:30:00", createdAt:"2026-08-14T12:20:00", completedAt:null, scheduleStatus:"اليوم", route:"crm/leads/LEAD-1137" },
    { id:"TSK-1045", leadId:"LEAD-1375", status:"pending", ownerId:"USR-1003", priority:"low", type:"عرض", title:"إرسال مقترح الخدمة", when:"غدًا", dueAt:"2026-08-16T10:00:00", createdAt:"2026-08-15T10:42:00", completedAt:null, scheduleStatus:"قادم", route:"crm/leads/LEAD-1375" }
  ],
  notes: [{ id:"NOTE-1042", leadId:"LEAD-1042", authorId:"USR-1001", body:"يركز اللقاء القادم على تحويل زيارات الموقع إلى حجوزات ومتابعات واضحة.", createdAt:"2026-08-15T10:35:00" }],
  activities: [
    { id:"ACT-1042-1", leadId:"LEAD-1042", type:"conversion", actorId:"USR-1001", title:"أضيفت Business إلى CRM", detail:"تم تحويل BUS-1042 مع الاحتفاظ بمصدر الاكتشاف وسياق Intelligence.", metadata:{businessId:"BUS-1042",companyId:"CMP-1042",sourceJobId:"JOB-1028"}, createdAt:"2026-08-12T09:30:00" },
    { id:"ACT-1042-2", leadId:"LEAD-1042", type:"intelligence_reviewed", actorId:"USR-1001", title:"تمت مراجعة فرصة عالية", detail:"Score 92 وEvidence مرتبطة بفجوات الموقع والحجز.", metadata:{analysisId:"ANL-1042",opportunityId:"OPP-1042"}, createdAt:"2026-08-15T09:42:00" },
    { id:"ACT-1042-3", leadId:"LEAD-1042", type:"task_created", actorId:"USR-1001", title:"أُنشئت متابعة الحجز", detail:"TSK-1043 مستحقة اليوم.", metadata:{taskId:"TSK-1043"}, createdAt:"2026-08-14T11:20:00" },
    { id:"ACT-1042-4", leadId:"LEAD-1042", type:"note_added", actorId:"USR-1001", title:"أضيفت ملاحظة", detail:"يركز اللقاء القادم على تحويل زيارات الموقع إلى حجوزات ومتابعات واضحة.", metadata:{noteId:"NOTE-1042"}, createdAt:"2026-08-15T10:35:00" },
    { id:"ACT-1137-1", leadId:"LEAD-1137", type:"conversion", actorId:"USR-1002", title:"أضيفت Business إلى CRM", detail:"تم تحويل BUS-1137 مع الاحتفاظ بسياق المصدر.", metadata:{businessId:"BUS-1137",companyId:"CMP-1137",sourceJobId:"JOB-1028"}, createdAt:"2026-08-13T10:12:00" },
    { id:"ACT-1137-2", leadId:"LEAD-1137", type:"task_created", actorId:"USR-1002", title:"أُنشئ عرض توضيحي", detail:"TSK-1044 مستحقة اليوم.", metadata:{taskId:"TSK-1044"}, createdAt:"2026-08-14T12:20:00" },
    { id:"ACT-1220-1", leadId:"LEAD-1220", type:"conversion", actorId:"USR-1003", title:"أضيفت Business إلى CRM", detail:"تم تحويل BUS-1220 مع الاحتفاظ بسياق المصدر.", metadata:{businessId:"BUS-1220",companyId:"CMP-1220",sourceJobId:"JOB-1029"}, createdAt:"2026-08-11T13:20:00" },
    { id:"ACT-1220-2", leadId:"LEAD-1220", type:"task_created", actorId:"USR-1003", title:"أُنشئت مراجعة العرض", detail:"TSK-1042 مستحقة للمراجعة.", metadata:{taskId:"TSK-1042"}, createdAt:"2026-08-13T10:00:00" },
    { id:"ACT-1301-1", leadId:"LEAD-1301", type:"conversion", actorId:"USR-1002", title:"أضيفت Business إلى CRM", detail:"تم تحويل BUS-1301 مع الاحتفاظ بسياق المصدر.", metadata:{businessId:"BUS-1301",companyId:"CMP-1301",sourceJobId:"JOB-1031"}, createdAt:"2026-08-10T11:40:00" },
    { id:"ACT-1375-1", leadId:"LEAD-1375", type:"conversion", actorId:"USR-1003", title:"أضيفت Business إلى CRM", detail:"تم تحويل BUS-1375 مع الاحتفاظ بسياق المصدر.", metadata:{businessId:"BUS-1375",companyId:"CMP-1375",sourceJobId:"JOB-1030"}, createdAt:"2026-08-15T10:42:00" }
  ],
  appointments: [{ id:"APT-1042", leadId:"LEAD-1042", status:"scheduled" }],
  deals: [
    { id:"DEAL-4042", leadId:"LEAD-1042", pipelineId:"PIPE-1001", stageId:"STG-1005", status:"open", name:"تطوير موقع وحجز عيادات الحياة", value:85000, currency:"SAR", probabilityOverride:82, ownerId:"USR-1001", expectedCloseAt:"2026-08-22", createdAt:"2026-08-12T10:00:00", updatedAt:"2026-08-15T10:35:00", closedAt:null, lossReason:null },
    { id:"DEAL-4051", leadId:"LEAD-1220", pipelineId:"PIPE-1001", stageId:"STG-1006", status:"open", name:"منصة متابعة شركة المدار", value:120000, currency:"SAR", probabilityOverride:76, ownerId:"USR-1003", expectedCloseAt:"2026-08-20", createdAt:"2026-08-11T13:30:00", updatedAt:"2026-08-14T11:10:00", closedAt:null, lossReason:null },
    { id:"DEAL-4052", leadId:"LEAD-1137", pipelineId:"PIPE-1001", stageId:"STG-1004", status:"open", name:"تحسين حجز مركز ابتسامة", value:56000, currency:"SAR", probabilityOverride:68, ownerId:"USR-1002", expectedCloseAt:"2026-08-25", createdAt:"2026-08-13T10:30:00", updatedAt:"2026-08-14T12:20:00", closedAt:null, lossReason:null },
    { id:"DEAL-4061", leadId:"LEAD-1042", pipelineId:"PIPE-1001", stageId:"STG-1007", status:"won", name:"عقد نمو عيادات الحياة", value:150000, currency:"SAR", probabilityOverride:null, ownerId:"USR-1001", expectedCloseAt:"2026-08-01", createdAt:"2026-07-12T10:00:00", updatedAt:"2026-08-01T13:10:00", closedAt:"2026-08-01T13:10:00", lossReason:null },
    { id:"DEAL-4062", leadId:"LEAD-1220", pipelineId:"PIPE-1001", stageId:"STG-1007", status:"won", name:"عقد التحول الرقمي للمدار", value:132000, currency:"SAR", probabilityOverride:null, ownerId:"USR-1003", expectedCloseAt:"2026-08-05", createdAt:"2026-07-15T12:00:00", updatedAt:"2026-08-05T15:30:00", closedAt:"2026-08-05T15:30:00", lossReason:null },
    { id:"DEAL-4063", leadId:"LEAD-1301", pipelineId:"PIPE-1001", stageId:"STG-1007", status:"won", name:"برنامج نمو عيادات النخبة", value:100000, currency:"SAR", probabilityOverride:null, ownerId:"USR-1002", expectedCloseAt:"2026-08-09", createdAt:"2026-07-20T09:00:00", updatedAt:"2026-08-09T14:20:00", closedAt:"2026-08-09T14:20:00", lossReason:null }
  ],
  pipelines: [{ id:"PIPE-1001", name:"مسار المبيعات الرئيسي", status:"active" }],
  pipelineStages: [
    { id:"STG-1001", pipelineId:"PIPE-1001", name:"جديد", order:1, defaultProbability:10, kind:"open" }, { id:"STG-1002", pipelineId:"PIPE-1001", name:"تم التواصل", order:2, defaultProbability:25, kind:"open" }, { id:"STG-1003", pipelineId:"PIPE-1001", name:"مؤهل", order:3, defaultProbability:40, kind:"open" }, { id:"STG-1004", pipelineId:"PIPE-1001", name:"اجتماع", order:4, defaultProbability:55, kind:"open" }, { id:"STG-1005", pipelineId:"PIPE-1001", name:"عرض", order:5, defaultProbability:70, kind:"open" }, { id:"STG-1006", pipelineId:"PIPE-1001", name:"تفاوض", order:6, defaultProbability:85, kind:"open" }, { id:"STG-1007", pipelineId:"PIPE-1001", name:"رابح", order:7, defaultProbability:100, kind:"won" }, { id:"STG-1008", pipelineId:"PIPE-1001", name:"خاسر", order:8, defaultProbability:0, kind:"lost" }
  ],
  automations: [{ id:"AUTO-1001", name:"متابعة بعد الإشارة", status:"draft" }],
  agents: [{ id:"AGT-1001", name:"وكيل المتابعة", status:"paused" }],
  recommendations: [{ id:"AIR-1042", leadId:"LEAD-1042", status:"pending", confidence:92 }],
  revenueEvents: [
    { id:"REV-4061", dealId:"DEAL-4061", status:"recognized", amount:150000, recognizedAt:"2026-08-01", period:"عرض تجريبي ثابت" },
    { id:"REV-4062", dealId:"DEAL-4062", status:"recognized", amount:132000, recognizedAt:"2026-08-05", period:"عرض تجريبي ثابت" },
    { id:"REV-4063", dealId:"DEAL-4063", status:"recognized", amount:100000, recognizedAt:"2026-08-09", period:"عرض تجريبي ثابت" }
  ],
  attributionTouchpoints: [
    { id:"ATT-4061", revenueEventId:"REV-4061", discoveryJobId:"JOB-1028", type:"first_touch" }, { id:"ATT-4062", revenueEventId:"REV-4062", discoveryJobId:"JOB-1029", type:"first_touch" }, { id:"ATT-4063", revenueEventId:"REV-4063", discoveryJobId:"JOB-1031", type:"first_touch" }
  ],
  users: [{ id:"USR-1001", name:"سارة العمري", role:"مسؤولة النمو", teamId:"TEAM-1001", status:"active" }, { id:"USR-1002", name:"فهد الحربي", role:"مدير مبيعات", teamId:"TEAM-1001", status:"active" }, { id:"USR-1003", name:"خالد السالم", role:"مستشار نمو", teamId:"TEAM-1001", status:"active" }],
  teams: [{ id:"TEAM-1001", name:"وكالة نمو الرقمية", status:"active" }]
};

const findById = (items, id) => items.find((item) => item.id === id);
const duplicateIds = (items) => items.map((item) => item.id).filter((id, index, all) => all.indexOf(id) !== index);

export function getUpcomingActivities() {
  return mockModel.tasks.map((task) => {
    const lead = findById(mockModel.leads, task.leadId);
    return { id:task.id, businessId:lead?.businessId, type:task.type, title:task.title, when:task.when, status:task.scheduleStatus, route:task.route };
  });
}

export function getRevenueAttribution() {
  const recognized = mockModel.revenueEvents.filter((event) => event.status === "recognized");
  const byJob = new Map();
  recognized.forEach((event) => {
    const deal = findById(mockModel.deals, event.dealId);
    const lead = deal && findById(mockModel.leads, deal.leadId);
    const business = lead && findById(businesses, lead.businessId);
    const touchpoint = mockModel.attributionTouchpoints.find((item) => item.revenueEventId === event.id);
    const job = touchpoint && findById(jobs, touchpoint.discoveryJobId);
    const source = job && findById(mockModel.discoverySources, job.sourceId);
    if (!deal || !lead || !business || !touchpoint || !job || !source) return;
    const card = byJob.get(job.id) || { jobId:job.id, sourceId:source.id, sourceName:source.name, label:`${job.keyword} — ${job.location}`, discovered:job.current, qualified:job.qualified, won:0, revenue:0, revenueEventIds:[], dealIds:[] };
    card.won += 1;
    card.revenue += event.amount;
    card.revenueEventIds.push(event.id);
    card.dealIds.push(deal.id);
    byJob.set(job.id, card);
  });
  return [...byJob.values()];
}

export function getRevenueSummary() {
  const attribution = getRevenueAttribution();
  const revenue = attribution.reduce((total, item) => total + item.revenue, 0);
  const wonEvents = attribution.reduce((total, item) => total + item.won, 0);
  return { revenue, pipeline:metrics.pipelineValue, averageDeal:wonEvents ? Math.round(revenue / wonEvents) : 0, winRate:Math.round(dashboardData.funnelMetrics[6].value / dashboardData.funnelMetrics[5].value * 100), averageCycle:"18 يومًا", periodLabel:"بيانات تجريبية ثابتة للعرض" };
}

export function getDashboardMetrics() {
  const revenue = getRevenueSummary().revenue;
  return dashboardData.dashboardMetrics.map((metric) => metric.id === "revenue" ? { ...metric, value:revenue } : metric);
}

export function getAttributionIntegrityReport() {
  const checks = { attributionChains:[], revenueReconciliation:[], uniqueIds:[], referenceIntegrity:[], taskIntegrity:[] };
  const addCheck = (group, name, pass, detail) => checks[group].push({ name, pass, detail });
  const entities = { businesses, jobs, discoverySources:mockModel.discoverySources, leads:mockModel.leads, companies:mockModel.companies, deals:mockModel.deals, revenueEvents:mockModel.revenueEvents, attributionTouchpoints:mockModel.attributionTouchpoints, tasks:mockModel.tasks, conversations };
  Object.entries(entities).forEach(([name, items]) => { const duplicates = duplicateIds(items); addCheck("uniqueIds", `تفرد ${name}`, duplicates.length === 0, duplicates.length ? `معرفات مكررة: ${duplicates.join(", ")}` : "لا توجد معرفات مكررة"); });
  jobs.forEach((job) => addCheck("referenceIntegrity", `${job.id} → sourceId`, Boolean(findById(mockModel.discoverySources, job.sourceId)), job.sourceId));
  businesses.forEach((business) => addCheck("referenceIntegrity", `${business.id} → discoveryJobId`, Boolean(findById(jobs, business.discoveryJobId)), business.discoveryJobId));
  mockModel.leads.forEach((lead) => { addCheck("referenceIntegrity", `${lead.id} → businessId`, Boolean(findById(businesses, lead.businessId)), lead.businessId); addCheck("referenceIntegrity", `${lead.id} → companyId`, Boolean(findById(mockModel.companies, lead.companyId)), lead.companyId); addCheck("referenceIntegrity", `${lead.id} → sourceJobId`, Boolean(findById(jobs, lead.sourceJobId)), lead.sourceJobId); });
  mockModel.deals.forEach((deal) => addCheck("referenceIntegrity", `${deal.id} → leadId`, Boolean(findById(mockModel.leads, deal.leadId)), deal.leadId));
  mockModel.revenueEvents.forEach((event) => addCheck("referenceIntegrity", `${event.id} → dealId`, Boolean(findById(mockModel.deals, event.dealId)), event.dealId));
  mockModel.attributionTouchpoints.forEach((touchpoint) => { addCheck("referenceIntegrity", `${touchpoint.id} → revenueEventId`, Boolean(findById(mockModel.revenueEvents, touchpoint.revenueEventId)), touchpoint.revenueEventId); addCheck("referenceIntegrity", `${touchpoint.id} → discoveryJobId`, Boolean(findById(jobs, touchpoint.discoveryJobId)), touchpoint.discoveryJobId); });
  mockModel.tasks.forEach((task) => addCheck("referenceIntegrity", `${task.id} → leadId`, Boolean(findById(mockModel.leads, task.leadId)), task.leadId));
  const recognized = mockModel.revenueEvents.filter((event) => event.status === "recognized");
  recognized.forEach((event) => {
    const deal = findById(mockModel.deals, event.dealId);
    const lead = deal && findById(mockModel.leads, deal.leadId);
    const business = lead && findById(businesses, lead.businessId);
    const touchpoint = mockModel.attributionTouchpoints.find((item) => item.revenueEventId === event.id);
    const job = touchpoint && findById(jobs, touchpoint.discoveryJobId);
    const source = job && findById(mockModel.discoverySources, job.sourceId);
    const pass = Boolean(deal && lead && business && touchpoint && job && source && business.discoveryJobId === job.id && lead.sourceJobId === job.id && deal.status === "won");
    addCheck("attributionChains", `سلسلة ${event.id}`, pass, pass ? `${source.id} → ${job.id} → ${business.id} → ${lead.id} → ${deal.id} → ${event.id} → ${touchpoint.id}` : "سلسلة إسناد ناقصة أو متعارضة");
  });
  const attributionTotal = getRevenueAttribution().reduce((total, item) => total + item.revenue, 0);
  const revenueSummary = getRevenueSummary().revenue;
  addCheck("revenueReconciliation", "إجمالي الإسناد = إيراد الفترة التجريبية", attributionTotal === revenueSummary, `${attributionTotal} = ${revenueSummary}`);
  const task1042 = mockModel.tasks.filter((task) => task.id === "TSK-1042");
  const taskLead = task1042[0] && findById(mockModel.leads, task1042[0].leadId);
  addCheck("taskIntegrity", "TSK-1042 حقيقة واحدة", task1042.length === 1 && taskLead?.businessId === "BUS-1220", task1042.length === 1 ? `مرتبط بـ${taskLead?.businessId}` : "معرف مكرر أو غير موجود");
  const pass = Object.values(checks).flat().every((check) => check.pass) && checks.attributionChains.length >= 3;
  return { pass, checks, attributionTotal, revenueSummary, attribution:getRevenueAttribution() };
}

export function getDiscoveryJob(jobId = state.selectedJobId) { return findById(jobs, jobId); }
export function getDiscoverySource(sourceId) { return findById(mockModel.discoverySources, sourceId); }
export function isDiscoveryResultsAvailable(job) { return job?.status === "completed"; }
export function isDiscoveryJobToday(job) { return Boolean(job?.createdAt?.startsWith(`${DISCOVERY_REFERENCE_DATE}T`)); }
export function isDiscoveryJobRecent(job) { return Boolean(job?.createdAt?.slice(0, 10) >= "2026-08-14"); }
export function formatDiscoveryJobCreatedAt(job) {
  if (!job?.createdAt) return job?.created || "—";
  const [date, rawTime] = job.createdAt.split("T");
  const time = rawTime?.slice(0, 5) || "—";
  if (date === DISCOVERY_REFERENCE_DATE) return `اليوم، ${time}`;
  if (date === "2026-08-14") return `أمس، ${time}`;
  const weekday = arabicWeekdays[new Date(`${date}T00:00:00Z`).getUTCDay()];
  return `${weekday}، ${time}`;
}
export function getJobResults(jobId) { const job = getDiscoveryJob(jobId); return isDiscoveryResultsAvailable(job) ? businesses.filter((business) => job.resultBusinessIds.includes(business.id)) : []; }
export function getDiscoveryCombinations(keywords, locations) { return keywords.flatMap((keyword) => locations.map((location) => ({ keyword, location, id:`${keyword}__${location}` }))); }
export function getNextDiscoveryJobId() { return `JOB-${Math.max(...jobs.map((job) => Number(job.id.split("-")[1]))) + 1}`; }
export function getNextBusinessId(offset = 0) { return `BUS-${Math.max(...businesses.map((business) => Number(business.id.split("-")[1]))) + 1 + offset}`; }
export function getJobStatusLabel(status) { return discoveryStatusLabels[status] || status; }

const createdJobBusinessTemplates = [
  { name:"عيادات الندى للأسنان", short:"الندى", category:"عيادات أسنان", city:"الرياض", country:"السعودية", address:"حي النخيل، الرياض", phone:"+966 11 540 1920", website:"alnada-dental.sa", rating:4.6, reviews:241, source:"مصادر الأعمال العامة" },
  { name:"مركز ابتكار لطب الأسنان", short:"ابتكار", category:"عيادات أسنان", city:"الرياض", country:"السعودية", address:"حي الورود، الرياض", phone:"+966 11 401 5283", website:"ibtikar-dental.sa", rating:4.4, reviews:186, source:"مصادر الأعمال العامة" },
  { name:"مجمع السحاب الطبي", short:"السحاب", category:"مركز طبي", city:"الرياض", country:"السعودية", address:"حي الياسمين، الرياض", phone:"+966 11 668 2305", website:"", rating:4.2, reviews:95, source:"مصادر الأعمال العامة" }
];

export function createDiscoveryJob(config) {
  const id = getNextDiscoveryJobId();
  const source = getDiscoverySource(config.sourceId);
  const keywords = [...config.keywords];
  const locations = [...config.locations];
  const name = `${keywords[0]} — ${locations[0]}${keywords.length * locations.length > 1 ? ` + ${keywords.length * locations.length - 1} مجموعات` : ""}`;
  const templates = createdJobBusinessTemplates.map((template, index) => ({ ...template, id:getNextBusinessId(index), discoveryJobId:id, category:keywords[0], city:locations[index % locations.length], source:source?.name || "مصادر الأعمال العامة", reviewCount:template.reviews }));
  templates.forEach((business) => businesses.push(business));
  const foundCount = 1420;
  const duplicateCount = 172;
  const job = { id, sourceId:config.sourceId, name, keyword:keywords[0], location:locations[0], keywords, locations, source:source?.name || "مصادر الأعمال العامة", filters:{ ...config.filters }, combinationCount:keywords.length * locations.length, status:"pending", created:"الآن", createdAt:"2026-08-15T12:15:00", startedAt:null, completedAt:null, progress:0, foundCount:0, duplicateCount:0, deduplicatedCount:0, discoveredCount:0, total:0, current:0, highScore:0, crmAdded:0, qualified:0, finalScenario:{ foundCount, duplicateCount, deduplicatedCount:foundCount - duplicateCount }, resultBusinessIds:templates.map((business) => business.id) };
  jobs.push(job);
  state.selectedJobId = id;
  state.selectedResultIds = [];
  return job;
}

export function startDiscoveryJob(jobId) { const job = getDiscoveryJob(jobId); if (!job) return null; job.status="processing"; job.progress=Math.max(job.progress || 0, 8); job.startedAt="2026-08-15T12:15:01"; job.failureMessage=""; return job; }
export function progressDiscoveryJob(jobId, step = 12) { const job = getDiscoveryJob(jobId); if (!job || job.status !== "processing") return job; job.progress=Math.min(100, job.progress + step); job.current=Math.round((job.finalScenario?.deduplicatedCount || job.total || 1248) * job.progress / 100); if (job.progress >= 100) return completeDiscoveryJob(jobId); return job; }
export function completeDiscoveryJob(jobId) { const job = getDiscoveryJob(jobId); if (!job) return null; const scenario = job.finalScenario || job.retryScenario || { foundCount:job.foundCount || 1420, duplicateCount:job.duplicateCount || 172, deduplicatedCount:job.deduplicatedCount || 1248 }; job.status="completed"; job.progress=100; job.foundCount=scenario.foundCount; job.duplicateCount=scenario.duplicateCount; job.deduplicatedCount=scenario.deduplicatedCount; job.discoveredCount=scenario.foundCount; job.total=scenario.deduplicatedCount; job.current=scenario.deduplicatedCount; job.completedAt="2026-08-15T12:15:12"; return job; }
export function cancelDiscoveryJob(jobId) { const job = getDiscoveryJob(jobId); if (!job) return null; job.status="cancelled"; job.completedAt=null; return job; }
export function retryDiscoveryJob(jobId) { const job = getDiscoveryJob(jobId); if (!job) return null; job.progress=0; job.foundCount=0; job.duplicateCount=0; job.deduplicatedCount=0; job.discoveredCount=0; job.current=0; return startDiscoveryJob(jobId); }

export function getDiscoveryIntegrityReport() {
  const checks = { sourceIntegrity:[], businessIntegrity:[], combinationIntegrity:[], countIntegrity:[], uniqueIds:[], statusContract:[], resultsOwnership:[] };
  const add = (group, name, pass, detail) => checks[group].push({ name, pass, detail });
  jobs.forEach((job) => {
    add("sourceIntegrity", `${job.id} → sourceId`, Boolean(getDiscoverySource(job.sourceId)), job.sourceId);
    add("combinationIntegrity", `${job.id} combinations`, job.combinationCount === job.keywords.length * job.locations.length, `${job.keywords.length} × ${job.locations.length} = ${job.combinationCount}`);
    if (job.status === "completed") add("countIntegrity", `${job.id} counts`, job.foundCount >= job.deduplicatedCount && job.foundCount - job.duplicateCount === job.deduplicatedCount, `${job.foundCount} - ${job.duplicateCount} = ${job.deduplicatedCount}`);
    add("statusContract", `${job.id} status`, ["pending","processing","completed","failed","cancelled"].includes(job.status), job.status);
    getJobResults(job.id).forEach((business) => add("resultsOwnership", `${business.id} → ${job.id}`, business.discoveryJobId === job.id, business.discoveryJobId));
  });
  businesses.forEach((business) => add("businessIntegrity", `${business.id} → discoveryJobId`, Boolean(getDiscoveryJob(business.discoveryJobId)), business.discoveryJobId));
  const duplicates = [...duplicateIds(jobs), ...duplicateIds(businesses), ...duplicateIds(mockModel.discoverySources)];
  add("uniqueIds", "تفرد معرفات Job وBusiness وSource", duplicates.length === 0, duplicates.length ? duplicates.join(", ") : "لا توجد معرفات مكررة");
  const pass = Object.values(checks).flat().every((check) => check.pass);
  return { pass, checks };
}

export const leadStatusLabels = { new:"جديد", contacted:"تم التواصل", qualified:"مؤهل", unqualified:"غير مؤهل", nurturing:"متابعة تدريجية" };
export const leadPriorityLabels = { high:"عالية", medium:"متوسطة", low:"منخفضة" };
export const CRM_REFERENCE_TIME = "2026-08-15T12:40:00";
export const CRM_ACTOR_ID = "USR-1001";
let crmMutationTick = 0;

export function getLead(leadId = state.selectedLeadId) { return findById(mockModel.leads, leadId); }
export function getLeadByBusinessId(businessId) { return mockModel.leads.find((lead) => lead.businessId === businessId); }
export function getLeadOwner(lead) { return lead && findById(mockModel.users, lead.ownerId); }
export function getLeadCompany(lead) { return lead && findById(mockModel.companies, lead.companyId); }
export function getLeadContacts(leadId) { return mockModel.contacts.filter((contact) => contact.leadId === leadId); }
export function getLeadNotes(leadId) { return mockModel.notes.filter((note) => note.leadId === leadId).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
export function getLeadTasks(leadId) { return mockModel.tasks.filter((task) => task.leadId === leadId).sort((a,b) => a.dueAt.localeCompare(b.dueAt)); }
export function getLeadActivities(leadId) { return mockModel.activities.filter((activity) => activity.leadId === leadId).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
export function getLeadActivitySummary(leadId) { const activities = getLeadActivities(leadId); const openTasks = getLeadTasks(leadId).filter((task) => task.status !== "completed"); return { latestActivity:activities[0] || null, nextTask:openTasks[0] || null, lastActivityAt:activities[0]?.createdAt || null, nextActivityAt:openTasks[0]?.dueAt || null }; }
export function getLeadDeals(leadId) { return mockModel.deals.filter((deal) => deal.leadId === leadId); }
export function getLeadConversations(leadId) { const lead = getLead(leadId); return lead ? conversations.filter((conversation) => conversation.businessId === lead.businessId) : []; }

function nextNumericId(prefix, items) { return `${prefix}-${Math.max(1000, ...items.map((item) => Number(String(item.id).split("-")[1]) || 0)) + 1}`; }
function nextCrmTimestamp() { crmMutationTick += 1; return `2026-08-15T12:40:${String(crmMutationTick).padStart(2, "0")}`; }
function isOpenTask(task) { return task.status !== "completed"; }
export function refreshLeadActivityDates(leadId) {
  const lead = getLead(leadId);
  if (!lead) return null;
  const { latestActivity, nextTask } = getLeadActivitySummary(leadId);
  lead.lastActivityAt = latestActivity?.createdAt || lead.convertedAt || lead.createdAt;
  lead.nextActivityAt = nextTask?.dueAt || null;
  lead.updatedAt = lead.lastActivityAt;
  return lead;
}
function logLeadActivity(leadId, { type, title, detail, actorId = CRM_ACTOR_ID, metadata = {}, createdAt = nextCrmTimestamp() }) {
  const item = { id:nextNumericId("ACT", mockModel.activities), leadId, type, actorId, title, detail, metadata, createdAt };
  mockModel.activities.push(item);
  refreshLeadActivityDates(leadId);
  return item;
}

export function getCrmSummary() {
  const leads = mockModel.leads;
  const tasks = mockModel.tasks;
  return {
    total:leads.length,
    new:leads.filter((lead) => lead.status === "new").length,
    contacted:leads.filter((lead) => lead.status === "contacted").length,
    qualified:leads.filter((lead) => lead.status === "qualified").length,
    highPriority:leads.filter((lead) => lead.priority === "high").length,
    overdueTasks:tasks.filter((task) => task.status === "overdue").length,
    todayTasks:tasks.filter((task) => task.status === "pending" && task.dueAt.startsWith("2026-08-15")).length
  };
}

export function convertBusinessToLead(businessId, options = {}) {
  const business = findById(businesses, businessId);
  if (!business) return { kind:"missing", lead:null };
  const existing = getLeadByBusinessId(businessId);
  if (existing) { state.selectedLeadId = existing.id; return { kind:"duplicate", lead:existing }; }
  const job = getDiscoveryJob(business.discoveryJobId);
  if (!job) return { kind:"missing", lead:null };
  const company = { id:nextNumericId("CMP", mockModel.companies), businessId, name:business.name, status:"active", createdAt:CRM_REFERENCE_TIME };
  const lead = { id:nextNumericId("LEAD", mockModel.leads), businessId, companyId:company.id, ownerId:options.ownerId || "USR-1001", status:options.status || "new", priority:options.priority || "medium", tags:options.tags || [], sourceJobId:job.id, createdAt:CRM_REFERENCE_TIME, updatedAt:CRM_REFERENCE_TIME, lastActivityAt:CRM_REFERENCE_TIME, nextActivityAt:null, convertedAt:CRM_REFERENCE_TIME };
  mockModel.companies.push(company);
  mockModel.leads.push(lead);
  if (business.phone || business.email) mockModel.contacts.push({ id:nextNumericId("CON", mockModel.contacts), leadId:lead.id, companyId:company.id, businessId, name:business.name, title:"جهة اتصال رئيسية", phone:business.phone || "", email:business.email || "", status:"active", createdAt:CRM_REFERENCE_TIME });
  logLeadActivity(lead.id, { type:"conversion", title:"أضيفت Business إلى CRM", detail:`تم تحويل ${business.id} مع حفظ ${job.id} ومصدر الاكتشاف.`, actorId:options.actorId || CRM_ACTOR_ID, metadata:{ businessId, companyId:company.id, sourceJobId:job.id } });
  state.crmAdded = [...new Set([...state.crmAdded, lead.id])];
  state.selectedLeadId = lead.id;
  state.selectedBusinessId = businessId;
  return { kind:"created", lead };
}

export function assignLeadOwner(leadId, ownerId) {
  const lead = getLead(leadId); const owner = findById(mockModel.users, ownerId);
  if (!lead || !owner) return null;
  const fromOwnerId = lead.ownerId;
  lead.ownerId = ownerId;
  logLeadActivity(leadId, { type:"owner_changed", title:"تم تغيير المالك", detail:`أصبح المالك ${owner.name}.`, metadata:{ fromOwnerId, toOwnerId:ownerId } }); return lead;
}

export function updateLeadStatus(leadId, status) {
  const lead = getLead(leadId);
  if (!lead || !Object.hasOwn(leadStatusLabels, status)) return null;
  const fromStatus = lead.status;
  lead.status = status;
  logLeadActivity(leadId, { type:"status_changed", title:"تم تحديث حالة Lead", detail:`الحالة الحالية: ${leadStatusLabels[status]}.`, metadata:{ fromStatus, toStatus:status } }); return lead;
}

export function updateLeadPriority(leadId, priority) {
  const lead = getLead(leadId);
  if (!lead || !Object.hasOwn(leadPriorityLabels, priority)) return null;
  const fromPriority = lead.priority;
  lead.priority = priority;
  logLeadActivity(leadId, { type:"priority_changed", title:"تم تحديث أولوية Lead", detail:`الأولوية الحالية: ${leadPriorityLabels[priority]}.`, metadata:{ fromPriority, toPriority:priority } }); return lead;
}

export function addLeadNote(leadId, body, authorId = "USR-1001") {
  const lead = getLead(leadId); if (!lead || !body?.trim()) return null;
  const note = { id:nextNumericId("NOTE", mockModel.notes), leadId, authorId, body:body.trim(), createdAt:CRM_REFERENCE_TIME };
  mockModel.notes.push(note); logLeadActivity(leadId, { type:"note_added", actorId:authorId, title:"أضيفت ملاحظة", detail:note.body, metadata:{ noteId:note.id } }); return note;
}

export function addLeadTask(leadId, values = {}) {
  const lead = getLead(leadId); if (!lead) return null;
  const dueAt = values.dueAt || "2026-08-16T10:00:00";
  const task = { id:nextNumericId("TSK", mockModel.tasks), leadId, status:"pending", ownerId:values.ownerId || lead.ownerId, priority:values.priority || lead.priority, type:values.type || "متابعة", title:values.title?.trim() || "متابعة جديدة", when:values.when || dueAt.slice(11,16), dueAt, createdAt:CRM_REFERENCE_TIME, completedAt:null, scheduleStatus:"قادم", route:`crm/leads/${leadId}` };
  mockModel.tasks.push(task); logLeadActivity(leadId, { type:"task_created", title:"أُنشئت مهمة", detail:`${task.title} · ${task.when}`, metadata:{ taskId:task.id, dueAt:task.dueAt, ownerId:task.ownerId } }); return task;
}

export function completeLeadTask(taskId) {
  const task = findById(mockModel.tasks, taskId); if (!task || task.status === "completed") return task || null;
  task.status = "completed"; task.completedAt = CRM_REFERENCE_TIME; task.scheduleStatus = "مكتملة";
  logLeadActivity(task.leadId, { type:"task_completed", title:"أُنجزت مهمة", detail:task.title, metadata:{ taskId:task.id, completedAt:task.completedAt } }); state.completedTaskIds = [...new Set([...state.completedTaskIds, task.id])]; return task;
}

export function getLeadIntegrityReport() {
  const checks = [];
  const add = (id, name, pass, detail) => checks.push({ id, name, pass, detail });
  const leads = mockModel.leads;
  add("A", "Business ≠ Lead", leads.every((lead) => findById(businesses, lead.businessId) && lead.id !== lead.businessId), "Lead تشير إلى Business ولا تكررها");
  add("B", "Duplicate Protection", new Set(leads.map((lead) => lead.businessId)).size === leads.length, "Business واحدة لا تملك Lead مكررة");
  add("C", "Lead References", leads.every((lead) => findById(mockModel.companies, lead.companyId) && findById(mockModel.users, lead.ownerId) && getDiscoveryJob(lead.sourceJobId)), "Business / Company / Owner / Job موجودة");
  add("D", "Lead Status", leads.every((lead) => Object.hasOwn(leadStatusLabels, lead.status)), "الحالات ضمن عقد S5");
  add("E", "Lead Priority", leads.every((lead) => Object.hasOwn(leadPriorityLabels, lead.priority)), "الأولوية ضمن عقد S5");
  add("F", "Timestamp ISO", [...leads, ...mockModel.tasks, ...mockModel.notes, ...mockModel.activities].every((item) => !item.createdAt || /^\d{4}-\d{2}-\d{2}T/.test(item.createdAt)), "الطوابع الزمنية ISO");
  add("G", "Contact References", mockModel.contacts.every((contact) => { const lead = getLead(contact.leadId); return lead && findById(mockModel.companies, contact.companyId) && contact.businessId === lead.businessId; }), "Contacts مرتبطة بـLead وCompany وBusiness");
  add("H", "Task References", mockModel.tasks.every((task) => getLead(task.leadId) && findById(mockModel.users, task.ownerId)), "Tasks مرتبطة بـLead وOwner");
  add("I", "Activity Contract", mockModel.activities.every((activity) => getLead(activity.leadId) && findById(mockModel.users, activity.actorId) && activity.metadata && typeof activity.metadata === "object"), "Timeline تحمل Lead وActor وMetadata");
  add("J", "Existing Lead", Boolean(getLead("LEAD-1042")?.businessId === "BUS-1042"), "LEAD-1042 محفوظة");
  add("L", "Activity Lifecycle", leads.every((lead) => { const summary = getLeadActivitySummary(lead.id); return lead.lastActivityAt === (summary.lastActivityAt || lead.convertedAt) && lead.nextActivityAt === summary.nextActivityAt; }), "last/next activity مشتقة من Timeline والمهام المفتوحة");
  const attribution = getAttributionIntegrityReport();
  add("K", "Revenue Regression", attribution.pass && attribution.attributionTotal === attribution.revenueSummary, `${attribution.attributionTotal} = ${attribution.revenueSummary}`);
  return { pass:checks.every((check) => check.pass), checks };
}

// S6 source-of-truth helpers: Deals own money, stage, probability and close state; Revenue/Attribution remain read-only from S2.
export const dealStatusLabels = { open:"مفتوحة", won:"رابحة", lost:"خاسرة" };
export const dealLossReasons = ["الميزانية غير متاحة", "اختيار مزود آخر", "تأجيل القرار", "عدم ملاءمة الاحتياج", "أخرى"];

export function getPipeline(pipelineId = "PIPE-1001") { return findById(mockModel.pipelines, pipelineId); }
export function getPipelineStages(pipelineId = "PIPE-1001") { return mockModel.pipelineStages.filter((stage) => stage.pipelineId === pipelineId).sort((a,b) => a.order - b.order); }
export function getDeal(dealId = state.selectedDealId) { return findById(mockModel.deals, dealId); }
export function getDealStage(deal) { return deal && findById(mockModel.pipelineStages, deal.stageId); }
export function getDealProbability(deal) { const stage = getDealStage(deal); return Number.isFinite(deal?.probabilityOverride) ? deal.probabilityOverride : (stage?.defaultProbability ?? 0); }
export function getOpenDealForLead(leadId) { return mockModel.deals.find((deal) => deal.leadId === leadId && deal.status === "open"); }
export function getDealLead(deal) { return deal && getLead(deal.leadId); }
export function getDealBusiness(deal) { const lead = getDealLead(deal); return lead && findById(businesses, lead.businessId); }
export function getDealActivities(dealId) { return mockModel.activities.filter((activity) => activity.metadata?.dealId === dealId).sort((a,b) => b.createdAt.localeCompare(a.createdAt)); }
export function getDealTasks(dealId) { return mockModel.tasks.filter((task) => task.dealId === dealId).sort((a,b) => a.dueAt.localeCompare(b.dueAt)); }

function nextDealTimestamp() { crmMutationTick += 1; return `2026-08-15T13:10:${String(crmMutationTick).padStart(2, "0")}`; }
function logDealActivity(deal, { type, title, detail, actorId = CRM_ACTOR_ID, metadata = {} }) {
  const item = { id:nextNumericId("ACT", mockModel.activities), leadId:deal.leadId, actorId, type, title, detail, metadata:{ ...metadata, dealId:deal.id }, createdAt:nextDealTimestamp() };
  mockModel.activities.push(item);
  refreshLeadActivityDates(deal.leadId);
  deal.updatedAt = item.createdAt;
  return item;
}

export function getPipelineMetrics(pipelineId = "PIPE-1001") {
  const deals = mockModel.deals.filter((deal) => deal.pipelineId === pipelineId && deal.status === "open");
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = deals.reduce((sum, deal) => sum + deal.value * getDealProbability(deal) / 100, 0);
  return { dealCount:deals.length, totalValue, weightedValue, averageProbability:deals.length ? Math.round(deals.reduce((sum, deal) => sum + getDealProbability(deal), 0) / deals.length) : 0 };
}

export function getPipelineStageSummary(pipelineId = "PIPE-1001") {
  return getPipelineStages(pipelineId).map((stage) => {
    const deals = mockModel.deals.filter((deal) => deal.pipelineId === pipelineId && deal.stageId === stage.id && deal.status === "open");
    const value = deals.reduce((sum, deal) => sum + deal.value, 0);
    const weightedValue = deals.reduce((sum, deal) => sum + deal.value * getDealProbability(deal) / 100, 0);
    return { stage, deals, count:deals.length, value, weightedValue };
  });
}

function validateDealValue(value) { const parsed = Number(value); return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed) : null; }
function resolveDealProbability(value) { if (value === "" || value === null || value === undefined || value === "default") return null; const parsed = Number(value); return Number.isFinite(parsed) && parsed >= 0 && parsed <= 100 ? Math.round(parsed) : null; }

export function createDeal(leadId, values = {}) {
  const lead = getLead(leadId); const pipelineId = values.pipelineId || "PIPE-1001"; const stageId = values.stageId || "STG-1001"; const stage = findById(mockModel.pipelineStages, stageId); const amount = validateDealValue(values.value);
  if (!lead || !getPipeline(pipelineId) || !stage || stage.pipelineId !== pipelineId || !amount) return { kind:"invalid", deal:null };
  const existing = getOpenDealForLead(leadId); if (existing) { state.selectedDealId = existing.id; return { kind:"duplicate", deal:existing }; }
  const deal = { id:nextNumericId("DEAL", mockModel.deals), leadId, pipelineId, stageId, status:"open", name:values.name?.trim() || `فرصة ${getDealBusiness({leadId})?.short || lead.id}`, value:amount, currency:"SAR", probabilityOverride:resolveDealProbability(values.probability), ownerId:values.ownerId || lead.ownerId, expectedCloseAt:values.expectedCloseAt || "2026-08-31", createdAt:nextDealTimestamp(), updatedAt:CRM_REFERENCE_TIME, closedAt:null, lossReason:null };
  mockModel.deals.push(deal);
  logDealActivity(deal, { type:"deal_created", title:"أُنشئت صفقة", detail:`${deal.name} بقيمة ${deal.value} ر.س.`, metadata:{ stageId:deal.stageId, value:deal.value, probability:getDealProbability(deal) } });
  state.selectedDealId = deal.id;
  return { kind:"created", deal };
}

export function updateDeal(dealId, values = {}) {
  const deal = getDeal(dealId); if (!deal || deal.status !== "open") return null;
  const nextValue = values.value === undefined ? deal.value : validateDealValue(values.value); const nextProbability = values.probability === undefined ? deal.probabilityOverride : resolveDealProbability(values.probability);
  if (!nextValue) return null;
  const valueChanged = nextValue !== deal.value; const probabilityChanged = nextProbability !== deal.probabilityOverride;
  deal.name = values.name?.trim() || deal.name; deal.value = nextValue; deal.probabilityOverride = nextProbability; deal.ownerId = values.ownerId || deal.ownerId; deal.expectedCloseAt = values.expectedCloseAt || deal.expectedCloseAt;
  if (valueChanged) logDealActivity(deal, { type:"deal_value_updated", title:"تغيرت قيمة الصفقة", detail:`القيمة الجديدة ${deal.value} ر.س.`, metadata:{ value:deal.value } });
  if (probabilityChanged) logDealActivity(deal, { type:"deal_probability_updated", title:"تغير احتمال الصفقة", detail:`الاحتمال الحالي ${getDealProbability(deal)}%.`, metadata:{ probability:getDealProbability(deal) } });
  if (!valueChanged && !probabilityChanged) { deal.updatedAt = nextDealTimestamp(); }
  return deal;
}

export function moveDealStage(dealId, stageId) {
  const deal = getDeal(dealId); const stage = findById(mockModel.pipelineStages, stageId); if (!deal || !stage || deal.status !== "open" || stage.pipelineId !== deal.pipelineId || stage.kind !== "open") return null;
  const fromStageId = deal.stageId; deal.stageId = stage.id;
  logDealActivity(deal, { type:"deal_stage_changed", title:"انتقلت الصفقة إلى مرحلة جديدة", detail:`المرحلة الحالية: ${stage.name}.`, metadata:{ fromStageId, toStageId:stage.id } });
  return deal;
}

export function closeDealAsWon(dealId, confirmed = false) {
  const deal = getDeal(dealId); const wonStage = mockModel.pipelineStages.find((stage) => stage.pipelineId === deal?.pipelineId && stage.kind === "won"); if (!deal || !wonStage || deal.status !== "open" || !confirmed) return null;
  deal.status="won"; deal.stageId=wonStage.id; deal.closedAt=nextDealTimestamp(); deal.updatedAt=deal.closedAt;
  logDealActivity(deal, { type:"deal_won", title:"أُغلقت الصفقة كرابحة", detail:"لم يُنشأ RevenueEvent في S6؛ الإغلاق حالة CRM فقط.", metadata:{ stageId:wonStage.id, closedAt:deal.closedAt } });
  return deal;
}

export function closeDealAsLost(dealId, lossReason, confirmed = false) {
  const deal = getDeal(dealId); const lostStage = mockModel.pipelineStages.find((stage) => stage.pipelineId === deal?.pipelineId && stage.kind === "lost"); if (!deal || !lostStage || deal.status !== "open" || !confirmed || !lossReason) return null;
  deal.status="lost"; deal.stageId=lostStage.id; deal.lossReason=lossReason; deal.closedAt=nextDealTimestamp(); deal.updatedAt=deal.closedAt;
  logDealActivity(deal, { type:"deal_lost", title:"أُغلقت الصفقة كخاسرة", detail:`سبب الخسارة: ${lossReason}.`, metadata:{ stageId:lostStage.id, lossReason, closedAt:deal.closedAt } });
  return deal;
}

export function getDealIntegrityReport() {
  const checks=[]; const add=(id, name, pass, detail)=>checks.push({ id, name, pass, detail }); const deals=mockModel.deals;
  add("A", "تفرد Deals", duplicateIds(deals).length === 0, "لا توجد معرفات Deals مكررة");
  add("B", "مراجع Deal", deals.every((deal) => getLead(deal.leadId) && getPipeline(deal.pipelineId) && getDealStage(deal) && findById(mockModel.users, deal.ownerId)), "Lead/Pipeline/Stage/Owner موجودة");
  add("C", "قيمة مالية آمنة", deals.every((deal) => Number.isFinite(deal.value) && deal.value > 0 && deal.currency === "SAR"), "القيمة موجبة والعملة SAR");
  add("D", "احتمال صحيح", deals.every((deal) => getDealProbability(deal) >= 0 && getDealProbability(deal) <= 100), "الاحتمال ضمن 0–100");
  add("E", "مرحلة وحالة متسقتان", deals.every((deal) => { const stage=getDealStage(deal); return stage && (deal.status === "open" ? stage.kind === "open" : stage.kind === deal.status); }), "الحالة تطابق stage terminal/open");
  add("F", "Won لا تنشئ Revenue", mockModel.revenueEvents.every((event) => deals.some((deal) => deal.id === event.dealId && deal.status === "won")), "Revenue baseline فقط مرتبطة بصفقات won");
  add("G", "إسناد S2 محفوظ", getAttributionIntegrityReport().pass, "Revenue attribution unchanged");
  add("H", "Pipeline totals مشتقة", getPipelineMetrics().totalValue === mockModel.deals.filter((deal) => deal.status === "open").reduce((sum, deal) => sum + deal.value, 0), "قيمة pipeline من Deals المفتوحة");
  return { pass:checks.every((check) => check.pass), checks };
}
