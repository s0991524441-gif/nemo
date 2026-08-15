// S2-FIX data reminder: one Arabic RTL prototype source of truth links discovery source → job → business → lead → deal → revenue event → attribution touchpoint.
export const state = {
  theme: "light", signedIn: false, onboardingDone: false, sidebarCollapsed: false,
  selectedBusinessId: "BUS-1042", selectedConversationId: "CONV-3042", selectedLeadId: "LEAD-1042",
  discoveryStatus: "idle", discoveryProgress: 0, selectedJobId: "JOB-1028", selectedResultIds: [], discoveryModal: null, discoveryListFilters: { search:"", status:"all", sourceId:"all", date:"all", sort:"newest" }, resultFilters: { search:"", category:"all", city:"all", rating:"all", reviews:"all", website:"all", phone:"all", sort:"newest" }, discoveryDraft: { keywords:["عيادات أسنان"], locations:["الرياض"], sourceId:"SRC-1004", filters:{ minRating:"4", minReviews:"50", website:"any", phone:true, email:false, whatsapp:false, instagram:false, activity:"any", limit:"2000" }, showCombinations:false }, crmAdded: ["LEAD-1042"], notifications: 3,
  loginErrors: {}, onboardingStep: 1, onboardingErrors: {}, dashboardTimeframe: "اليوم", dashboardView: "ready", completedTaskIds: [],
  workspace: { companyName: "", industry: "", city: "", teamSize: "", goals: [], sources: [], pipeline: "", monthlyLeads: "", averageDealValue: "", aiPreferences: [] }
};

export const businesses = [
  { id:"BUS-1042", discoveryJobId:"JOB-1028", name:"عيادات الحياة لطب الأسنان", short:"عيادات الحياة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 456 8201", email:"hello@hayatdental.sa", website:"hayatdental.sa", instagram:"@hayatdental", rating:4.7, reviews:863, score:92, status:"فرصة عالية", source:"خرائط الأعمال", owner:"سارة العمري", opportunity:"تحديث الموقع وأتمتة واتساب", stage:"New", value:85000, websiteQuality:"ضعيف", whatsapp:true, lastActivity:"منذ ساعتين" },
  { id:"BUS-1137", discoveryJobId:"JOB-1028", name:"مركز ابتسامة الطبي", short:"ابتسامة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 284 4502", email:"info@ibtisama.med", website:"ibtisama.med", instagram:"@ibtisama.med", rating:4.5, reviews:510, score:86, status:"فرصة عالية", source:"خرائط الأعمال", owner:"فهد الحربي", opportunity:"تحسين الظهور وحجز المواعيد", stage:"Contacted", value:56000, websiteQuality:"متوسط", whatsapp:true, lastActivity:"منذ يوم" },
  { id:"BUS-1198", discoveryJobId:"JOB-1028", name:"مجمع رؤية الطبي", short:"رؤية", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 279 6005", email:"", website:"roya-clinic.com", instagram:"@royaclinics", rating:4.6, reviews:724, score:79, status:"فرصة", source:"خرائط الأعمال", owner:"سارة العمري", opportunity:"تحسين التحويل", stage:"New", value:42000, websiteQuality:"ضعيف", whatsapp:false, lastActivity:"منذ 3 أيام" },
  { id:"BUS-1220", discoveryJobId:"JOB-1029", name:"شركة المدار للمقاولات", short:"المدار", category:"مقاولات", city:"الرياض", country:"السعودية", phone:"+966 11 210 9370", email:"business@almadar.sa", website:"almadar.sa", instagram:"", rating:4.4, reviews:192, score:74, status:"فرصة", source:"مواقع الشركات", owner:"خالد السالم", opportunity:"إدارة العملاء والتسويق", stage:"Proposal", value:120000, websiteQuality:"متوسط", whatsapp:true, lastActivity:"منذ 4 أيام" },
  { id:"BUS-1301", discoveryJobId:"JOB-1031", name:"عيادات النخبة للأسنان", short:"النخبة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 50 920 1440", email:"contact@elite-dental.sa", website:"", instagram:"@elitedental", rating:4.3, reviews:388, score:68, status:"فرصة", source:"استيراد ملف", owner:"فهد الحربي", opportunity:"موقع وهوية", stage:"New", value:38000, websiteQuality:"غير متوفر", whatsapp:true, lastActivity:"منذ أسبوع" },
  { id:"BUS-1375", discoveryJobId:"JOB-1030", name:"مؤسسة ابتكار للتسويق", short:"ابتكار", category:"تسويق رقمي", city:"جدة", country:"السعودية", phone:"+966 12 654 1893", email:"team@ebtikar.agency", website:"ebtikar.agency", instagram:"@ebtikar.agency", rating:4.8, reviews:98, score:71, status:"فرصة", source:"خرائط الأعمال", owner:"خالد السالم", opportunity:"أتمتة المبيعات", stage:"Meeting", value:67000, websiteQuality:"جيد", whatsapp:true, lastActivity:"منذ يومين" },
  { id:"BUS-1381", discoveryJobId:"JOB-1027", name:"مركز تقويم الصفوة", short:"الصفوة", category:"مراكز تقويم", city:"جدة", country:"السعودية", address:"حي الروضة، جدة", phone:"+966 12 614 2208", email:"", website:"safwa-ortho.sa", instagram:"", rating:4.6, reviews:208, source:"دليل أعمال", status:"مكتشف", stage:"New", value:0, lastActivity:"—" },
  { id:"BUS-1382", discoveryJobId:"JOB-1027", name:"عيادات ابتسامة البحر", short:"ابتسامة البحر", category:"مراكز تقويم", city:"جدة", country:"السعودية", address:"حي الشاطئ، جدة", phone:"+966 12 682 9034", email:"", website:"", instagram:"@bahrsmile", rating:4.3, reviews:117, source:"دليل أعمال", status:"مكتشف", stage:"New", value:0, lastActivity:"—" }
];

export const conversations = [
  { id:"CONV-3042", businessId:"BUS-1042", channel:"واتساب", contact:"د. محمد السبيعي", preview:"أهلًا، أرسلوا لنا تفاصيل الحل المقترح...", time:"10:42", status:"بانتظار الرد", unread:2, messages:[{from:"them",text:"أهلًا، مهتمون بتحسين حجز المواعيد لدينا."},{from:"us",text:"يسعدنا ذلك. لاحظنا فرصة واضحة في الموقع ومسار الواتساب."},{from:"them",text:"أرسلوا لنا تفاصيل الحل المقترح والتكلفة المبدئية."}] },
  { id:"CONV-3043", businessId:"BUS-1137", channel:"إنستغرام", contact:"مركز ابتسامة", preview:"هل يدعم النظام التذكير بالمواعيد؟", time:"أمس", status:"فرصة", unread:0, messages:[{from:"them",text:"هل يدعم النظام التذكير بالمواعيد؟"}] },
  { id:"CONV-3044", businessId:"BUS-1220", channel:"دردشة الموقع", contact:"شركة المدار", preview:"نحتاج عرضًا للمشروع قبل نهاية الأسبوع.", time:"الأحد", status:"تحتاج تدخل", unread:0, messages:[{from:"them",text:"نحتاج عرضًا للمشروع قبل نهاية الأسبوع."}] }
];

export const jobs = [
  { id:"JOB-1028", sourceId:"SRC-1001", name:"عيادات أسنان — الرياض", keyword:"عيادات أسنان", location:"الرياض", keywords:["عيادات أسنان"], locations:["الرياض"], source:"خرائط الأعمال", filters:{minRating:"4",minReviews:"50",website:"any",phone:true,email:false,whatsapp:false,instagram:false,activity:"any",limit:"2000"}, combinationCount:1, status:"completed", created:"اليوم، 09:24", createdAt:"2026-08-15T09:24:00", startedAt:"2026-08-15T09:24:01", completedAt:"2026-08-15T09:24:13", progress:100, foundCount:1420, duplicateCount:172, deduplicatedCount:1248, discoveredCount:1420, total:1240, current:1240, highScore:184, crmAdded:92, qualified:31, resultBusinessIds:["BUS-1042","BUS-1137","BUS-1198"] },
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
  {id:"leads",label:"العملاء المحتملون",icon:"◉",group:"العملاء"},{id:"contacts",label:"جهات الاتصال",icon:"⌘",group:""},{id:"companies",label:"الشركات",icon:"◫",group:""},
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
  signals: [{ id:"SIG-1042", businessId:"BUS-1042", type:"website_quality", value:"weak", sentiment:"positive" }],
  opportunities: [{ id:"OPP-1042", businessId:"BUS-1042", score:92, status:"open", recommendedAction:"مراجعة مسار الحجز قبل المتابعة" }],
  leads: [
    { id:"LEAD-1042", businessId:"BUS-1042", companyId:"CMP-1042", ownerId:"USR-1001", stage:"new", sourceJobId:"JOB-1028" },
    { id:"LEAD-1137", businessId:"BUS-1137", companyId:"CMP-1137", ownerId:"USR-1001", stage:"meeting", sourceJobId:"JOB-1028" },
    { id:"LEAD-1220", businessId:"BUS-1220", companyId:"CMP-1220", ownerId:"USR-1001", stage:"negotiation", sourceJobId:"JOB-1029" },
    { id:"LEAD-1301", businessId:"BUS-1301", companyId:"CMP-1301", ownerId:"USR-1001", stage:"won", sourceJobId:"JOB-1031" },
    { id:"LEAD-1375", businessId:"BUS-1375", companyId:"CMP-1375", ownerId:"USR-1001", stage:"proposal", sourceJobId:"JOB-1030" }
  ],
  contacts: [{ id:"CON-1042", leadId:"LEAD-1042", companyId:"CMP-1042", name:"د. محمد السبيعي", phone:"+966114568201", status:"active" }],
  companies: [
    { id:"CMP-1042", businessId:"BUS-1042", name:"عيادات الحياة لطب الأسنان", status:"active" }, { id:"CMP-1137", businessId:"BUS-1137", name:"مركز ابتسامة الطبي", status:"active" }, { id:"CMP-1220", businessId:"BUS-1220", name:"شركة المدار للمقاولات", status:"active" }, { id:"CMP-1301", businessId:"BUS-1301", name:"عيادات النخبة للأسنان", status:"active" }, { id:"CMP-1375", businessId:"BUS-1375", name:"مؤسسة ابتكار للتسويق", status:"active" }
  ],
  messages: [{ id:"MSG-3042", conversationId:"CONV-3042", direction:"inbound", status:"received" }],
  tasks: [
    { id:"TSK-1042", leadId:"LEAD-1220", status:"pending", ownerId:"USR-1001", type:"اتصال", title:"مراجعة العرض", when:"11:30", scheduleStatus:"متأخر", route:"lead-profile" },
    { id:"TSK-1043", leadId:"LEAD-1042", status:"pending", ownerId:"USR-1001", type:"متابعة واتساب", title:"تأكيد احتياج الحجز", when:"13:00", scheduleStatus:"اليوم", route:"inbox" },
    { id:"TSK-1044", leadId:"LEAD-1137", status:"pending", ownerId:"USR-1001", type:"اجتماع", title:"عرض توضيحي", when:"15:30", scheduleStatus:"اليوم", route:"lead-profile" },
    { id:"TSK-1045", leadId:"LEAD-1375", status:"pending", ownerId:"USR-1001", type:"عرض", title:"إرسال مقترح الخدمة", when:"غدًا", scheduleStatus:"قادم", route:"deals" }
  ],
  appointments: [{ id:"APT-1042", leadId:"LEAD-1042", status:"scheduled" }],
  deals: [
    { id:"DEAL-4042", leadId:"LEAD-1042", pipelineId:"PIPE-1001", stageId:"STG-1005", status:"open", value:85000 },
    { id:"DEAL-4051", leadId:"LEAD-1220", pipelineId:"PIPE-1001", stageId:"STG-1006", status:"open", value:120000 },
    { id:"DEAL-4052", leadId:"LEAD-1137", pipelineId:"PIPE-1001", stageId:"STG-1004", status:"open", value:56000 },
    { id:"DEAL-4061", leadId:"LEAD-1042", pipelineId:"PIPE-1001", stageId:"STG-1007", status:"won", value:150000 },
    { id:"DEAL-4062", leadId:"LEAD-1220", pipelineId:"PIPE-1001", stageId:"STG-1007", status:"won", value:132000 },
    { id:"DEAL-4063", leadId:"LEAD-1301", pipelineId:"PIPE-1001", stageId:"STG-1007", status:"won", value:100000 }
  ],
  pipelines: [{ id:"PIPE-1001", name:"مسار المبيعات الرئيسي", status:"active" }],
  pipelineStages: [
    { id:"STG-1001", pipelineId:"PIPE-1001", name:"جديد", order:1 }, { id:"STG-1002", pipelineId:"PIPE-1001", name:"تم التواصل", order:2 }, { id:"STG-1003", pipelineId:"PIPE-1001", name:"مؤهل", order:3 }, { id:"STG-1004", pipelineId:"PIPE-1001", name:"اجتماع", order:4 }, { id:"STG-1005", pipelineId:"PIPE-1001", name:"عرض", order:5 }, { id:"STG-1006", pipelineId:"PIPE-1001", name:"تفاوض", order:6 }, { id:"STG-1007", pipelineId:"PIPE-1001", name:"رابح", order:7 }
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
  users: [{ id:"USR-1001", name:"سارة العمري", role:"مسؤولة النمو", teamId:"TEAM-1001", status:"active" }],
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
