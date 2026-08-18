/* S8-FIX runtime smoke: render Inbox through its real module boundary; no browser, network, or external channel is used. */
import assert from "node:assert/strict";

globalThis.window = {
  matchMedia: () => ({ matches: false }),
  addEventListener: () => {},
  dispatchEvent: () => true,
};
globalThis.document = {
  addEventListener: () => {},
  querySelector: () => null,
};

const { renderInbox } = await import("../client/js/inbox.js");
const { getConversationMessages, sendMockMessage, state } = await import("../client/js/data.js");
const { runCopilotAnalysis, useSuggestedReply } = await import("../client/js/sales-ai.js");

const ctx = {
  button: (label, action, cls = "button") => `<button type="button" class="${cls}" data-action="${action}">${label}</button>`,
  pageHead: (eyebrow, title, copy, actions = "") => `<header data-smoke-page-head><span>${eyebrow}</span><h1>${title}</h1><p>${copy}</p>${actions}</header>`,
};
const passes = [];
const check = (label, condition) => {
  assert.equal(Boolean(condition), true, label);
  passes.push(label);
};

state.selectedConversationId = "CONV-3042";
state.inboxContextOpen = true;
state.inboxContextView = "context";
state.inboxDrafts = {};
state.inboxAssistance = null;

const inboxMarkup = renderInbox(ctx);
check("Fresh Inbox render completes", inboxMarkup.includes("s7-inbox-layout"));
check("Conversation list renders", inboxMarkup.includes("s7-conversation-list"));
check("Copilot context controls render", inboxMarkup.includes("s8-context-switch") && inboxMarkup.includes("show-copilot-context"));

const conversationMarkup = renderInbox(ctx, "CONV-3042");
check("Direct conversation route renders", conversationMarkup.includes("CONV-3042"));
check("Composer renders", conversationMarkup.includes("messageComposer") && conversationMarkup.includes("إرسال بشري"));
check("No unresolved s8Action symbol reaches markup", !conversationMarkup.includes("s8Action("));

const messagesBeforeInsert = getConversationMessages("CONV-3042").length;
const analysis = runCopilotAnalysis("LEAD-1042", "CONV-3042");
const reply = analysis.records.find((record) => record.outputType === "suggested_reply");
check("Copilot produces a suggested reply", Boolean(reply));
const inserted = useSuggestedReply(reply.id);
check("Use suggested reply inserts a draft", inserted && state.inboxDrafts["CONV-3042"] === reply.payload.text);
check("Insert-only does not create a message", getConversationMessages("CONV-3042").length === messagesBeforeInsert);

const sent = sendMockMessage("CONV-3042", state.inboxDrafts["CONV-3042"], { assistance: state.inboxAssistance });
check("Human send creates one outbound message", sent?.direction === "outbound" && sent?.senderType === "user");
check("Human send increases count once", getConversationMessages("CONV-3042").length === messagesBeforeInsert + 1);

console.log(`S8 runtime smoke: ${passes.length}/${passes.length} PASS`);
passes.forEach((item, index) => console.log(`PASS ${index + 1} — ${item}`));
