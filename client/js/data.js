// Data reminder: Shared mock entities intentionally reappear across discovery, intelligence, CRM, inbox, deals, and analytics to demonstrate one linked sales workflow.
export const state = {
  theme: "light", signedIn: false, onboardingDone: false, sidebarCollapsed: false,
  selectedBusinessId: "BUS-1042", selectedConversationId: "CONV-3042", selectedLeadId: "LEAD-1042",
  discoveryStatus: "idle", discoveryProgress: 0, crmAdded: ["LEAD-1042"], notifications: 3,
  loginErrors: {}, onboardingStep: 1, onboardingErrors: {},
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

export const jobs = [{ id:"JOB-1028", keyword:"عيادات أسنان", location:"الرياض", total:2000, current:1248, created:"اليوم، 09:24", status:"processing" }, { id:"JOB-1023", keyword:"مطاعم", location:"جدة", total:1500, current:1500, created:"أمس", status:"completed" }];
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

export const mockModel = {
  sources: [{ id:"SRC-1001", name:"خرائط الأعمال", type:"business_directory", status:"active" }],
  signals: [{ id:"SIG-1042", businessId:"BUS-1042", type:"website_quality", value:"weak", sentiment:"positive" }],
  opportunities: [{ id:"OPP-1042", businessId:"BUS-1042", score:92, status:"open", recommendedAction:"مراجعة مسار الحجز قبل المتابعة" }],
  leads: [{ id:"LEAD-1042", businessId:"BUS-1042", companyId:"CMP-1042", ownerId:"USR-1001", stage:"new", sourceJobId:"JOB-1028" }],
  contacts: [{ id:"CON-1042", leadId:"LEAD-1042", companyId:"CMP-1042", name:"د. محمد السبيعي", phone:"+966114568201", status:"active" }],
  companies: [{ id:"CMP-1042", businessId:"BUS-1042", name:"عيادات الحياة لطب الأسنان", status:"active" }],
  messages: [{ id:"MSG-3042", conversationId:"CON-01", direction:"inbound", status:"received" }],
  tasks: [{ id:"TSK-1042", leadId:"LEAD-1042", status:"pending", ownerId:"USR-1001" }],
  appointments: [{ id:"APT-1042", leadId:"LEAD-1042", status:"scheduled" }],
  deals: [{ id:"DEAL-4042", leadId:"LEAD-1042", pipelineId:"PIPE-1001", stageId:"STG-1003", status:"open", value:85000 }],
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
