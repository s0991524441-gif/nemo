/* S7 design reminder: «مدار سماوي» يشكّل مساحة تشغيل عربية؛ المحادثة قرار بشري محلي، وWhatsApp ظاهر دائمًا بوصفه وضعًا تجريبيًا لا تكاملًا حيًا. */
import {
  conversationStatusLabels,
  getConversation,
  getConversationActivities,
  getConversationBusiness,
  getConversationContact,
  getConversationContext,
  getConversationLatestMessage,
  getConversationMessages,
  getConversationNeedsReply,
  getConversationUnreadCount,
  getInboxConversations,
  getInboxSummary,
  getLeadActivitySummary,
  getLeadOwner,
  getDealProbability,
  getDealStage,
  leadPriorityLabels,
  leadStatusLabels,
  messageDeliveryLabels,
  mockModel,
  state,
} from "./data.js";
import { getBusinessIntelligence, tierLabels } from "./intelligence.js";

const fmt = (value) => new Intl.NumberFormat("ar-SA").format(value || 0);
const money = (value) => `${fmt(value)} ر.س`;
const mono = (value) => `<span class="mono">${value || "—"}</span>`;
const s7Action = (label, action, attrs = "", cls = "button") => `<button type="button" class="${cls}" data-s7-action="${action}" ${attrs}>${label}</button>`;

function timeLabel(value) { return value ? new Intl.DateTimeFormat("ar-SA", { hour:"2-digit", minute:"2-digit" }).format(new Date(value)) : "—"; }
function dayLabel(value) { const date = String(value || "").slice(0,10); if (date === "2026-08-15") return "اليوم"; if (date === "2026-08-14") return "أمس"; return date ? new Intl.DateTimeFormat("ar-SA", { year:"numeric", month:"long", day:"numeric" }).format(new Date(`${date}T12:00:00`)) : "تاريخ غير معروف"; }
function ownerName(ownerId) { return mockModel.users.find((user) => user.id === ownerId)?.name || "غير مسند"; }
function channelLabel(channel) { return channel === "whatsapp" ? "واتساب — وضع تجريبي" : channel; }
function messagePreview(message) { if (!message) return "لا توجد رسائل بعد"; if (message.type === "image") return "صورة تجريبية مرفقة"; if (message.type === "document") return "مستند تجريبي مرفق"; return message.body || "رسالة بلا نص"; }

function inboxRail() {
  return `<section class="decision-rail s7-decision-rail" aria-label="سكة قرار التواصل"><div class="decision-brand"><img src="/manus-storage/leadflow-orbit-mark_f6c27956.png" alt="نمو"/>سكة القرار</div><div class="decision-steps"><span class="done"><i>١</i><b>اكتشاف</b></span><span class="done"><i>٢</i><b>فهم</b></span><span class="done"><i>٣</i><b>CRM</b></span><span class="active"><i>٤</i><b>تواصل</b></span><span><i>٥</i><b>صفقة</b></span></div><small>رسائل بشرية محلية فقط</small></section>`;
}

function summaryCards() {
  const summary = getInboxSummary();
  return `<section class="s7-summary" aria-label="ملخص صندوق الوارد"><article><span>مفتوحة</span><b>${fmt(summary.open)}</b><small>من مصدر المحادثات</small></article><article><span>غير مقروءة</span><b>${fmt(summary.unread)}</b><small>رسائل واردة فقط</small></article><article><span>تحتاج ردًا</span><b>${fmt(summary.needsReply)}</b><small>آخر رسالة واردة</small></article><article><span>مغلقة</span><b>${fmt(summary.closed)}</b><small>سجل محفوظ محليًا</small></article></section>`;
}

function inboxFilters() {
  const filters = state.inboxFilters;
  const options = [["all","كل المحادثات"],["unread","غير المقروءة"],["needs_reply","تحتاج ردًا"],["open","مفتوحة"],["closed","مغلقة"]];
  return `<section class="s7-filters" aria-label="فلاتر صندوق الوارد"><label class="s7-search"><span>⌕</span><input data-s7-filter="search" value="${filters.search}" placeholder="ابحث بالشركة أو جهة الاتصال أو الهاتف أو معرف العميل أو المحادثة"/></label><label><span>الحالة</span><select data-s7-filter="filter">${options.map(([value,label]) => `<option value="${value}" ${filters.filter===value?"selected":""}>${label}</option>`).join("")}</select></label><label><span>المسؤول</span><select data-s7-filter="ownerId"><option value="all">كل المسؤولين</option>${mockModel.users.map((user)=>`<option value="${user.id}" ${filters.ownerId===user.id?"selected":""}>${user.name}</option>`).join("")}</select></label><label><span>الترتيب</span><select data-s7-filter="sort"><option value="latest" ${filters.sort==="latest"?"selected":""}>الأحدث نشاطًا</option><option value="oldest_waiting" ${filters.sort==="oldest_waiting"?"selected":""}>الأطول انتظارًا</option><option value="unread" ${filters.sort==="unread"?"selected":""}>غير المقروءة أولًا</option></select></label></section>`;
}

function conversationRow(row, selectedId) {
  const { conversation, business, contact, latest, needsReply } = row;
  const selected = conversation.id === selectedId;
  const displayName = contact?.name || business?.name || "جهة اتصال غير محددة";
  return `<button type="button" class="s7-conversation-row ${selected?"selected":""}" data-s7-action="open-conversation" data-conversation="${conversation.id}" aria-current="${selected?"true":"false"}"><div class="s7-row-avatar">${displayName.slice(0,1)}</div><div class="s7-row-copy"><div><b>${displayName}</b><small>${business?.short || business?.name || "شركة غير معروفة"}</small></div><p>${messagePreview(latest)}</p><footer><span class="s7-channel">واتساب</span>${needsReply?`<span class="s7-needs-reply">تحتاج ردًا</span>`:""}<time>${timeLabel(conversation.lastMessageAt)}</time></footer></div><div class="s7-row-meta"><span class="s7-assignee">${ownerName(conversation.assignedTo).split(" ")[0]}</span>${conversation.unreadCount?`<b class="s7-unread" aria-label="${conversation.unreadCount} رسائل غير مقروءة">${fmt(conversation.unreadCount)}</b>`:""}<small>${conversationStatusLabels[conversation.status]}</small></div></button>`;
}

function messageBubble(message) {
  const outgoing = message.direction === "outbound";
  const attachment = message.attachment ? `<div class="s7-attachment"><i>${message.type === "image" ? "▧" : "▤"}</i><span><b>${message.attachment.name}</b><small>${message.attachment.size} · تجريبي</small></span></div>` : "";
  const delivery = outgoing ? `<span class="s7-delivery ${message.status}">${messageDeliveryLabels[message.status] || "حالة تجريبية"}</span>` : "";
  const retry = outgoing && message.status === "failed" ? s7Action("إعادة المحاولة", "retry-message", `data-message="${message.id}"`, "button danger compact") : "";
  return `<article class="s7-message ${outgoing?"outgoing":"incoming"}"><div class="s7-message-body">${message.body ? `<p>${message.body}</p>` : ""}${attachment}</div><footer><time>${timeLabel(message.createdAt)}</time>${delivery}${retry}</footer></article>`;
}

function messagesThread(conversation) {
  const messages = getConversationMessages(conversation.id); let lastDay = "";
  if (!messages.length) return `<div class="s7-thread-empty"><i>◌</i><b>لا توجد رسائل بعد</b><p>يمكن كتابة رد بشري تجريبي عند الحاجة.</p></div>`;
  return `<div class="s7-messages" aria-label="رسائل المحادثة">${messages.map((message) => { const currentDay = String(message.createdAt).slice(0,10); const separator = currentDay !== lastDay ? `<div class="s7-day-separator"><span>${dayLabel(message.createdAt)}</span></div>` : ""; lastDay=currentDay; return `${separator}${messageBubble(message)}`; }).join("")}</div>`;
}

function composer(conversation) {
  const draft = state.inboxDrafts[conversation.id] || "";
  const attachment = state.inboxAttachment;
  return `<section class="s7-composer-shell"><div class="s7-templates" aria-label="ردود سريعة ثابتة">${mockModel.quickReplyTemplates.map((template) => s7Action(template.title, "insert-template", `data-template="${template.id}"`, "button ghost compact")).join("")}</div><form class="s7-composer" data-s7-form="send-message" data-conversation="${conversation.id}"><label for="messageComposer" class="sr-only">اكتب ردًا بشريًا</label><textarea id="messageComposer" name="body" rows="3" placeholder="اكتب ردًا بشريًا…" ${conversation.status !== "open"?"disabled":""}>${draft}</textarea><div class="s7-composer-actions"><div>${s7Action("إرفاق وصف تجريبي", "toggle-attachment", "", "button ghost compact")}${attachment?`<span class="s7-attachment-chip">${attachment.name}<button type="button" data-s7-action="remove-attachment" aria-label="إزالة المرفق">×</button></span>`:""}</div><div><small>إرسال محلي تجريبي فقط</small><button type="submit" class="button primary" ${conversation.status !== "open"?"disabled":""}>إرسال بشري</button></div></div></form></section>`;
}

function conversationActions(conversation) {
  const statusAction = conversation.status === "open" ? s7Action("إغلاق المحادثة", "close-conversation", `data-conversation="${conversation.id}"`, "button ghost compact") : s7Action("إعادة فتح", "reopen-conversation", `data-conversation="${conversation.id}"`, "button primary compact");
  return `<div class="s7-thread-actions">${statusAction}${s7Action("السياق", "toggle-context", "", "button ghost compact")}</div>`;
}

function conversationHeader(conversation) {
  const contact = getConversationContact(conversation); const business = getConversationBusiness(conversation); const needsReply = getConversationNeedsReply(conversation);
  return `<header class="s7-thread-head"><div><span class="s7-wa-label">واتساب — وضع تجريبي</span><h2>${contact?.name || business?.name || "جهة اتصال غير محددة"}</h2><p>${mono(conversation.id)} · ${conversationStatusLabels[conversation.status]}${needsReply?" · تحتاج ردًا":""}</p></div><div class="s7-thread-head-controls">${s7Action("كل المحادثات", "back-to-inbox", "", "button ghost compact s7-mobile-back")}${conversationActions(conversation)}</div></header>`;
}

function contextPanel(conversation) {
  const { lead, business, contact, deals, job, source } = getConversationContext(conversation.id); const leadActivity = lead ? getLeadActivitySummary(lead.id) : null; const intelligence = business ? getBusinessIntelligence(business.id) : null;
  return `<aside class="s7-context ${state.inboxContextOpen?"open":""}" aria-label="سياق العميل"><header><div><p class="eyebrow">سياق CRM</p><h2>العميل والفرصة</h2></div>${s7Action("إغلاق السياق", "toggle-context", "", "button ghost compact")}</header><article class="s7-context-card"><span>جهة الاتصال</span><b>${contact?.name || "جهة اتصال غير محددة"}</b><p>${contact?.title || "لا يوجد منصب مسجل"}</p><small dir="ltr">${contact?.phone || business?.phone || "لا يوجد هاتف"}</small><small>${contact?.email || business?.email || "لا يوجد بريد"}</small></article><article class="s7-context-card"><span>Lead</span><b>${business?.name || lead?.id || "—"}</b><dl><div><dt>المعرف</dt><dd>${mono(lead?.id)}</dd></div><div><dt>الحالة</dt><dd>${leadStatusLabels[lead?.status] || "—"}</dd></div><div><dt>الأولوية</dt><dd>${leadPriorityLabels[lead?.priority] || "—"}</dd></div><div><dt>المالك</dt><dd>${getLeadOwner(lead)?.name || "—"}</dd></div><div><dt>آخر نشاط</dt><dd>${leadActivity?.lastActivityAt ? timeLabel(leadActivity.lastActivityAt) : "—"}</dd></div><div><dt>التالي</dt><dd>${leadActivity?.nextTask?.title || "لا توجد مهمة"}</dd></div></dl><button type="button" class="button ghost compact" data-route="crm/leads/${lead?.id}">فتح Lead 360</button></article><article class="s7-context-card"><span>مسؤول المحادثة</span><label class="s7-owner-select"><span>يختلف عن مالك Lead عند الحاجة</span><select data-s7-owner="${conversation.id}" aria-label="مسؤول المحادثة">${mockModel.users.map((user)=>`<option value="${user.id}" ${conversation.assignedTo===user.id?"selected":""}>${user.name}</option>`).join("")}</select></label></article><article class="s7-context-card"><span>ذكاء الفرص — قراءة فقط</span><b>${intelligence?.score ?? "—"}${intelligence?.score !== undefined && intelligence?.score !== null ? "/100" : ""}</b><p>${intelligence?.tier ? tierLabels[intelligence.tier] : "بيانات غير كافية"} · ثقة ${fmt(Math.round((intelligence?.confidence || 0)*100))}%</p><small><strong>الفجوة:</strong> ${intelligence?.reasons?.[0]?.value || "لا توجد فجوة مثبتة"}</small><small><strong>الخدمة:</strong> ${intelligence?.services?.[0]?.name || "لا توجد خدمة مقترحة"}</small><small><strong>النهج:</strong> ${intelligence?.salesApproach || "لا يوجد نهج مقترح"}</small></article><article class="s7-context-card"><span>الصفقات المرتبطة — قراءة فقط</span>${deals.length?`<div class="s7-deal-context-list">${deals.map((deal)=>{const stage=getDealStage(deal);return `<button type="button" data-route="deals/${deal.id}"><b>${deal.title}</b><small>${stage?.name || "—"} · ${money(deal.value)} · ${getDealProbability(deal)}% · ${deal.expectedCloseAt || "—"}</small></button>`;}).join("")}</div>`:"<p>لا توجد صفقات مرتبطة.</p>"}</article><article class="s7-context-card s7-provenance"><span>الأصل والسياق</span><p>${mono(source?.id)} ← ${mono(job?.id)} ← ${mono(business?.id)} ← ${mono(lead?.id)} ← ${mono(conversation.id)}</p><small>سلسلة مرجعية للعرض فقط.</small></article></aside>`;
}

function emptyThread() { return `<section class="s7-thread-empty"><i>⌕</i><b>اختر محادثة لعرض التفاصيل</b><p>تتغير الرسائل والسياق حسب المحادثة المختارة من القائمة.</p></section>`; }

export function renderInbox(ctx, conversationId = null) {
  const { button, pageHead } = ctx; const rows = getInboxConversations(); const explicit = conversationId !== null; const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 720px)").matches; const selectedId = explicit ? conversationId : (mobile ? null : state.selectedConversationId); const conversation = selectedId ? getConversation(selectedId) : null;
  if (explicit && !conversation) return `${pageHead("صندوق الوارد", "لم نجد المحادثة", "قد يكون رابط المحادثة غير صحيح أو لا يوجد ضمن بيانات الجلسة التجريبية.", button("العودة إلى صندوق الوارد", "route-inbox", "button primary"))}<section class="s7-not-found"><i>!</i><h2>المحادثة غير متاحة</h2><p>تحقق من المعرّف أو افتح محادثة من القائمة المحلية.</p></section>`;
  const visibleSelected = rows.some((row) => row.conversation.id === conversation?.id) ? conversation : null;
  return `${pageHead("التواصل", "صندوق الوارد", "إدارة رسائل بشرية داخل قناة واتساب تجريبية محلية؛ لا توجد API أو رسالة خارجية أو رد آلي.", `<span class="s7-wa-label large">واتساب — وضع تجريبي</span>`)}${inboxRail()}${summaryCards()}${inboxFilters()}<section class="s7-inbox-layout ${visibleSelected?"has-selected":""}"><aside class="s7-list-panel"><header><div><b>${fmt(rows.length)} محادثات</b><small>القائمة مشتقة من Conversations</small></div></header><div class="s7-conversation-list">${rows.length?rows.map((row)=>conversationRow(row, visibleSelected?.id)).join(""):`<div class="s7-list-empty"><b>لا توجد محادثات بعد</b><p>غيّر البحث أو الفلاتر؛ لا ينشئ S7 محادثة وهمية تلقائيًا.</p></div>`}</div></aside><main class="s7-thread-panel">${visibleSelected?`${conversationHeader(visibleSelected)}${messagesThread(visibleSelected)}${composer(visibleSelected)}`:emptyThread()}</main>${visibleSelected?contextPanel(visibleSelected):""}</section>`;
}

if (typeof document !== "undefined") {
  document.addEventListener("click", (event) => { const trigger = event.target.closest("[data-s7-action]"); if (!trigger || trigger.disabled) return; event.preventDefault(); window.dispatchEvent(new CustomEvent("nomo-s7-action", { detail:{ action:trigger.dataset.s7Action, conversationId:trigger.dataset.conversation || "", messageId:trigger.dataset.message || "", templateId:trigger.dataset.template || "" } })); });
  document.addEventListener("submit", (event) => { const form = event.target.closest("[data-s7-form]"); if (!form) return; event.preventDefault(); window.dispatchEvent(new CustomEvent("nomo-s7-action", { detail:{ action:form.dataset.s7Form, conversationId:form.dataset.conversation || "", values:Object.fromEntries(new FormData(form)) } })); });
}
