// Data reminder: Shared mock entities intentionally reappear across discovery, intelligence, CRM, inbox, deals, and analytics to demonstrate one linked sales workflow.
export const state = {
  theme: "light", signedIn: false, onboardingDone: false, sidebarCollapsed: false,
  selectedBusinessId: "BUS-1042", selectedConversationId: "CONV-3042", selectedLeadId: "LEAD-1042",
  discoveryStatus: "idle", discoveryProgress: 0, crmAdded: ["LEAD-1042"], notifications: 3,
  loginErrors: {}, onboardingStep: 1, onboardingErrors: {}, dashboardTimeframe: "اليوم", dashboardView: "ready", completedTaskIds: [],
  workspace: { companyName: "", industry: "", city: "", teamSize: "", goals: [], sources: [], pipeline: "", monthlyLeads: "", averageDealValue: "", aiPreferences: [] }
};

export const businesses = [
  { id:"BUS-1042", name:"عيادات الحياة لطب الأسنان", short:"عيادات الحياة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 456 8201", email:"hello@hayatdental.sa", website:"hayatdental.sa", instagram:"@hayatdental", rating:4.7, reviews:863, score:92, status:"فرصة عالية", source:"خرائط الأعمال", owner:"سارة العمري", opportunity:"تحديث الموقع وأتمتة واتساب", stage:"New", value:85000, websiteQuality:"ضعيف", whatsapp:true, lastActivity:"منذ ساعتين" },
  { id:"BUS-1137", name:"مركز ابتسامة الطبي", short:"ابتسامة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 284 4502", email:"info@ibtisama.med", website:"ibtisama.med", instagram:"@ibtisama.med", rating:4.5, reviews:510, score:86, status:"فرصة عالية", source:"خرائط الأعمال", owner:"فهد الحربي", opportunity:"تحسين الظهور وحجز المواعيد", stage:"Contacted", value:56000, websiteQuality:"متوسط", whatsapp:true, lastActivity:"منذ يوم" },
  { id:"BUS-1198", name:"مجمع رؤية الطبي", short:"رؤية", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 11 279 6005", email:"", website:"roya-clinic.com", instagram:"@royaclinics", rating:4.6, reviews:724, score:79, status:"فرصة", source:"خرائط الأعمال", owner:"سارة العمري", opportunity:"تحسين التحويل", stage:"New", value:42000, websiteQuality:"ضعيف", whatsapp:false, lastActivity:"منذ 3 أيام" },
  { id:"BUS-1220", name:"شركة المدار للمقاولات", short:"المدار", category:"مقاولات", city:"الرياض", country:"السعودية", phone:"+966 11 210 9370", email:"business@almadar.sa", website:"almadar.sa", instagram:"", rating:4.4, reviews:192, score:74, status:"فرصة", source:"موقع إلكتروني", owner:"خالد السالم", opportunity:"إدارة العملاء والتسويق", stage:"Proposal", value:120000, websiteQuality:"متوسط", whatsapp:true, lastActivity:"منذ 4 أيام" },
  { id:"BUS-1301", name:"عيادات النخبة للأسنان", short:"النخبة", category:"عيادات أسنان", city:"الرياض", country:"السعودية", phone:"+966 50 920 1440", email:"contact@elite-dental.sa", website:"", instagram:"@elitedental", rating:4.3, reviews:388, score:68, status:"فرصة", source:"استيراد ملف", owner:"فهد الحربي", opportunity:"موقع وهوية", stage:"New", value:38000, websiteQuality:"غير متوفر", whatsapp:true, lastActivity:"منذ أسبوع" },
  { id:"BUS-1375", name:"مؤسسة ابتكار للتسويق", short:"ابتكار", category:"تسويق رقمي", city:"جدة", country:"السعودية", phone:"+966 12 654 1893", email:"team@ebtikar.agency", website:"ebtikar.agency", instagram:"@ebtikar.agency", rating:4.8, reviews:98, score:71, status:"فرصة", source:"إحالة", owner:"خالد السالم", opportunity:"أتمتة المبيعات", stage:"Meeting", value:67000, websiteQuality:"جيد", whatsapp:true, lastActivity:"منذ يومين" },
];

export const conversations = [
  { id:"CONV-3042", businessId:"BUS-1042", channel:"واتساب", contact:"د. محمد السبيعي", preview:"أهلًا، أرسلوا لنا تفاصيل الحل المقترح...", time:"10:42", unread:2, messages:[{from:"them",text:"أهلًا، مهتمون بتحسين حجز المواعيد لدينا."},{from:"us",text:"يسعدنا ذلك. لاحظنا فرصة واضحة في الموقع ومسار الواتساب."},{from:"them",text:"أرسلوا لنا تفاصيل الحل المقترح والتكلفة المبدئية."}] },
  { id:"CONV-3043", businessId:"BUS-1137", channel:"إنستغرام", contact:"مركز ابتسامة", preview:"هل يدعم النظام التذكير بالمواعيد؟", time:"أمس", unread:0, messages:[{from:"them",text:"هل يدعم النظام التذكير بالمواعيد؟"}] },
  { id:"CONV-3044", businessId:"BUS-1220", channel:"دردشة الموقع", contact:"شركة المدار", preview:"نحتاج عرضًا للمشروع قبل نهاية الأسبوع.", time:"الأحد", unread:0, messages:[{from:"them",text:"نحتاج عرضًا للمشروع قبل نهاية الأسبوع."}] },
];

export const jobs = [
  { id:"JOB-1028", keyword:"عيادات أسنان", location:"الرياض", source:"خرائط الأعمال", total:1240, current:1240, highScore:184, crmAdded:92, qualified:31, created:"اليوم، 09:24", status:"completed" },
  { id:"JOB-1029", keyword:"شركات مقاولات", location:"الدمام", source:"مواقع الشركات", total:860, current:860, highScore:122, crmAdded:74, qualified:18, created:"أمس، 14:10", status:"completed" },
  { id:"JOB-1030", keyword:"مطاعم", location:"جدة", source:"خرائط الأعمال", total:2040, current:1412, highScore:210, crmAdded:128, qualified:22, created:"اليوم، 10:42", status:"processing" },
  { id:"JOB-1031", keyword:"شركات تقنية", location:"الرياض", source:"استيراد ملف", total:540, current:540, highScore:96, crmAdded:61, qualified:48, created:"الأحد، 09:00", status:"completed" }
];
export const activities = [{type:"WhatsApp", title:"رسالة متابعة مقترحة", when:"اليوم، 11:30", businessId:"BUS-1042"},{type:"Call",title:"اتصال مع مركز ابتسامة",when:"اليوم، 14:00",businessId:"BUS-1137"},{type:"Meeting",title:"عرض تقني مع شركة المدار",when:"غدًا، 10:00",businessId:"BUS-1220"}];
export const navItems = [
  {id:"dashboard",label:"الرئيسية",icon:"⌂",group:""},
  {id:"discovery",label:"اكتشاف العملاء",icon:"⌕",group:"الاكتشاف"},{id:"discovery-jobs",label:"عمليات البحث",icon:"◷",group:""},{id:"results",label:"النتائج",icon:"▤",group:""},
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
    { id:"revenue", label:"الإيراد المحقق", value:382000, format:"sar", trend:"+18.6% عن الفترة السابقة", tone:"success", note:"هذا الشهر" },
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
    { key:"discovered", label:"تم الاكتشاف", value:12480, rate:null },
    { key:"enriched", label:"تم الإثراء", value:10250, rate:82 },
    { key:"crm", label:"أضيف إلى إدارة العملاء", value:6420, rate:63 },
    { key:"contacted", label:"تم التواصل", value:3842, rate:60 },
    { key:"qualified", label:"مؤهل", value:920, rate:24 },
    { key:"deals", label:"صفقة", value:164, rate:18 },
    { key:"won", label:"رابح", value:48, rate:29 }
  ],
  pipelineSummary: [
    { stage:"جديد", count:31, value:320000, share:17, route:"pipeline" },
    { stage:"تم التواصل", count:37, value:430000, share:23, route:"pipeline" },
    { stage:"مؤهل", count:42, value:510000, share:28, route:"pipeline" },
    { stage:"اجتماع", count:18, value:240000, share:13, route:"pipeline" },
    { stage:"عرض", count:20, value:255000, share:14, route:"pipeline" },
    { stage:"تفاوض", count:16, value:85000, share:5, route:"pipeline" }
  ],
  nearClosingDeals: [
    { id:"DEAL-4042", businessId:"BUS-1042", stage:"عرض", value:85000, probability:82, lastActivity:"منذ ساعتين", nextAction:"مراجعة العرض" },
    { id:"DEAL-4051", businessId:"BUS-1220", stage:"تفاوض", value:120000, probability:76, lastActivity:"أمس", nextAction:"تحديث العرض" },
    { id:"DEAL-4052", businessId:"BUS-1137", stage:"اجتماع", value:56000, probability:68, lastActivity:"اليوم", nextAction:"تأكيد الاجتماع" }
  ],
  sourcePerformance: [
    { source:"خرائط الأعمال ومصادر الشركات", value:54, tone:"info" },
    { source:"الموقع الإلكتروني", value:18, tone:"success" },
    { source:"واتساب", value:12, tone:"info" },
    { source:"استيراد ملف", value:9, tone:"warning" },
    { source:"إحالة", value:7, tone:"info" }
  ],
  upcomingActivities: [
    { id:"TSK-1042", type:"اتصال", businessId:"BUS-1220", title:"مراجعة العرض", when:"11:30", status:"متأخر", route:"lead-profile" },
    { id:"TSK-1043", type:"متابعة واتساب", businessId:"BUS-1042", title:"تأكيد احتياج الحجز", when:"13:00", status:"اليوم", route:"inbox" },
    { id:"TSK-1044", type:"اجتماع", businessId:"BUS-1137", title:"عرض توضيحي", when:"15:30", status:"اليوم", route:"lead-profile" },
    { id:"TSK-1045", type:"عرض", businessId:"BUS-1375", title:"إرسال مقترح الخدمة", when:"غدًا", status:"قادم", route:"deals" }
  ],
  revenueSummary: { revenue:382000, pipeline:1840000, averageDeal:47750, winRate:29, averageCycle:"18 يومًا" },
  attributionSummary: [
    { jobId:"JOB-1028", label:"عيادات أسنان — الرياض", discovered:1240, qualified:84, won:11, revenue:428000 },
    { jobId:"JOB-1029", label:"شركات مقاولات — الدمام", discovered:860, qualified:52, won:7, revenue:315000 },
    { jobId:"JOB-1031", label:"شركات تقنية — الرياض", discovered:540, qualified:48, won:9, revenue:390000 }
  ]
};

export const mockModel = {
  sources: [{ id:"SRC-1001", name:"خرائط الأعمال", type:"business_directory", status:"active" }],
  signals: [{ id:"SIG-1042", businessId:"BUS-1042", type:"website_quality", value:"weak", sentiment:"positive" }],
  opportunities: [{ id:"OPP-1042", businessId:"BUS-1042", score:92, status:"open", recommendedAction:"مراجعة مسار الحجز قبل المتابعة" }],
  leads: [{ id:"LEAD-1042", businessId:"BUS-1042", companyId:"CMP-1042", ownerId:"USR-1001", stage:"new", sourceJobId:"JOB-1028" }, { id:"LEAD-1137", businessId:"BUS-1137", companyId:"CMP-1137", ownerId:"USR-1001", stage:"meeting", sourceJobId:"JOB-1028" }, { id:"LEAD-1220", businessId:"BUS-1220", companyId:"CMP-1220", ownerId:"USR-1001", stage:"negotiation", sourceJobId:"JOB-1029" }],
  contacts: [{ id:"CON-1042", leadId:"LEAD-1042", companyId:"CMP-1042", name:"د. محمد السبيعي", phone:"+966114568201", status:"active" }],
  companies: [{ id:"CMP-1042", businessId:"BUS-1042", name:"عيادات الحياة لطب الأسنان", status:"active" }, { id:"CMP-1137", businessId:"BUS-1137", name:"مركز ابتسامة الطبي", status:"active" }, { id:"CMP-1220", businessId:"BUS-1220", name:"شركة المدار للمقاولات", status:"active" }],
  messages: [{ id:"MSG-3042", conversationId:"CON-01", direction:"inbound", status:"received" }],
  tasks: [{ id:"TSK-1042", leadId:"LEAD-1042", status:"pending", ownerId:"USR-1001" }],
  appointments: [{ id:"APT-1042", leadId:"LEAD-1042", status:"scheduled" }],
  deals: [{ id:"DEAL-4042", leadId:"LEAD-1042", pipelineId:"PIPE-1001", stageId:"STG-1003", status:"open", value:85000 }, { id:"DEAL-4051", leadId:"LEAD-1220", pipelineId:"PIPE-1001", stageId:"STG-1005", status:"open", value:120000 }, { id:"DEAL-4052", leadId:"LEAD-1137", pipelineId:"PIPE-1001", stageId:"STG-1004", status:"open", value:56000 }],
  pipelines: [{ id:"PIPE-1001", name:"مسار المبيعات الرئيسي", status:"active" }],
  pipelineStages: [{ id:"STG-1003", pipelineId:"PIPE-1001", name:"عرض", order:3 }],
  automations: [{ id:"AUTO-1001", name:"متابعة بعد الإشارة", status:"draft" }],
  agents: [{ id:"AGT-1001", name:"وكيل المتابعة", status:"paused" }],
  recommendations: [{ id:"AIR-1042", leadId:"LEAD-1042", status:"pending", confidence:92 }],
  revenueEvents: [{ id:"REV-4042", dealId:"DEAL-4042", status:"pending", amount:85000 }],
  attributionTouchpoints: [{ id:"ATT-4042", revenueEventId:"REV-4042", discoveryJobId:"JOB-1028", type:"first_touch" }],
  users: [{ id:"USR-1001", name:"سارة العمري", role:"مسؤولة النمو", teamId:"TEAM-1001", status:"active" }],
  teams: [{ id:"TEAM-1001", name:"وكالة نمو الرقمية", status:"active" }]
};
