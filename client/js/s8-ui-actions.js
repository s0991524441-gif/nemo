/* S8-FIX UI reminder: this module owns only shared S8 action-button markup; it never executes Copilot, Agent, CRM, or messaging logic. */
export const s8Action = (label, action, attrs = "", cls = "button") => `<button type="button" class="${cls}" data-s8-action="${action}" ${attrs}>${label}</button>`;
