import {
  approveAutomationAction, canAutomationExecute, createAutomationRule, evaluateAutomationRule, getAppointment, getAutomationIntegrityReport,
  getAutomationRunActionExecutions, getAutomationRuns, getLead, getTasksWorkspace, mockModel, rejectAutomationAction, runAutomationNow,
  setAutomationRuleStatus, testAutomationRule, updateAutomationRule
} from "../client/js/data.js";

const checks = [];
const check = (id, name, pass, detail) => { checks.push({ id, name, pass, detail }); if (!pass) throw new Error(`${id} — ${name}: ${detail}`); };
const count = (items) => items.length;
const messageCountBefore = count(mockModel.messages);
const dealSnapshot = mockModel.deals.map((deal) => ({ id:deal.id, value:deal.value, probability:deal.probability, stageId:deal.stageId, status:deal.status }));
const revenueSnapshot = JSON.stringify(mockModel.revenueEvents);
const attributionSnapshot = JSON.stringify(mockModel.attributionTouchpoints);

const leadEvent = { type:"lead_created", entityType:"lead", entityId:"LEAD-1042", triggeredAt:"2026-08-15T14:00:00", origin:"user_event" };
const dryRunCount = count(mockModel.automationRuns);
const dryRun = testAutomationRule("AUTO-1001", leadEvent);
check("A", "Dry-run لا ينشئ Run", dryRun.dryRun && count(mockModel.automationRuns) === dryRunCount, "محاكاة الاختبار لا تغير state");
check("B", "Fixture عالي الأولوية يطابق الشرط", dryRun.triggerMatched && dryRun.conditionResult.matched, "LEAD-1042 ذات priority عالية");

const taskCountBefore = count(mockModel.tasks);
const autoRun = evaluateAutomationRule("AUTO-1001", leadEvent);
check("C", "Rule مفعلة تنشئ Run منفذ", autoRun.kind === "executed" && autoRun.run.status === "executed", "create_followup_task آمن تلقائيًا");
const createdTask = mockModel.tasks.at(-1);
check("D", "Task تستخدم عقد S5", count(mockModel.tasks) === taskCountBefore + 1 && createdTask.createdByAutomationRunId === autoRun.run.id && createdTask.leadId === "LEAD-1042", "Task تحمل provenance للـRun");
const duplicate = evaluateAutomationRule("AUTO-1001", leadEvent);
check("E", "Idempotency تمنع التكرار", duplicate.kind === "duplicate" && count(mockModel.tasks) === taskCountBefore + 1, "event نفسه لا ينشئ Task ثانية");

const appointmentRule = createAutomationRule({ name:"اختبار موعد خاضع للموافقة", triggerType:"lead_created", actionIds:["AUTOACT-1003"], approvalPolicy:"approval_required", status:"enabled", conditions:[{ field:"lead.priority", operator:"equals", value:"high" }] });
check("F", "Rule Builder ينشئ عقدًا صالحًا", Boolean(appointmentRule?.id && appointmentRule.conditionGroupId), "Rule/ConditionGroup مركزيان");
const appointmentCountBefore = count(mockModel.appointments);
const appointmentRun = evaluateAutomationRule(appointmentRule.id, { ...leadEvent, triggeredAt:"2026-08-15T14:01:00" });
const appointmentExecution = getAutomationRunActionExecutions(appointmentRun.run.id)[0];
check("G", "Action حساسة تنتظر Approval", appointmentRun.kind === "awaiting_approval" && appointmentExecution.status === "awaiting_approval" && count(mockModel.appointments) === appointmentCountBefore, "لا Appointment قبل الموافقة");
const approved = approveAutomationAction(appointmentExecution.id);
check("H", "Approval تنشئ Appointment مرة واحدة", approved.kind === "executed" && count(mockModel.appointments) === appointmentCountBefore + 1, "تم التنفيذ عبر Domain Function");
const appointment = getAppointment(approved.execution.resultEntityId);
check("I", "Appointment عقدها آمن", appointment?.leadId === "LEAD-1042" && new Date(appointment.endsAt) > new Date(appointment.startsAt) && appointment.createdByAutomationRunId === appointmentRun.run.id, "Lead/time/provenance محفوظة");
const doubleApprove = approveAutomationAction(appointmentExecution.id);
check("J", "Double Approve no-op", doubleApprove.kind === "no_op" && count(mockModel.appointments) === appointmentCountBefore + 1, "لا موعد مكرر");

const leadBeforeReject = { ...getLead("LEAD-1042") };
const priorityRule = createAutomationRule({ name:"اختبار رفض أولوية", triggerType:"lead_created", actionIds:["AUTOACT-1004"], approvalPolicy:"approval_required", status:"enabled", conditions:[{ field:"lead.priority", operator:"equals", value:"high" }] });
const priorityRun = evaluateAutomationRule(priorityRule.id, { ...leadEvent, triggeredAt:"2026-08-15T14:02:00" });
const priorityExecution = getAutomationRunActionExecutions(priorityRun.run.id)[0];
const rejected = rejectAutomationAction(priorityExecution.id);
check("K", "Reject لا يغير Lead", rejected.kind === "rejected" && getLead("LEAD-1042").priority === leadBeforeReject.priority, "رفض = no mutation");

const loop = evaluateAutomationRule("AUTO-1001", { ...leadEvent, triggeredAt:"2026-08-15T14:03:00", origin:"automation" });
check("L", "Loop guard يمنع إعادة التشغيل", loop.kind === "loop_guard" && loop.run.status === "skipped", "Automation output لا يعيد Trigger القاعدة");
check("M", "Disabled Rule لا تعمل", setAutomationRuleStatus("AUTO-1005", "disabled")?.status === "disabled" && evaluateAutomationRule("AUTO-1005", leadEvent).kind === "inactive", "disabled لا تنشئ Run");
check("N", "Draft Rule لا تعمل", evaluateAutomationRule("AUTO-1006", { type:"conversation_needs_reply", entityType:"conversation", entityId:"CONV-3042", triggeredAt:"2026-08-15T14:04:00" }).kind === "inactive", "draft لا تنشئ Run");
check("O", "Policy تمنع الإرسال والمال", !canAutomationExecute("send_message", "approval_required") && !canAutomationExecute("change_deal_value", "approval_required") && !canAutomationExecute("create_revenue", "auto_safe"), "الممنوعات مركزية");

const manualRun = runAutomationNow("AUTO-1007");
check("P", "Run Now يدعم manual فقط", manualRun.kind === "executed" && manualRun.run.triggerEventType === "manual", "تشغيل يدوي محلي مسجل");
const oldVersion = appointmentRule.version;
const updatedRule = updateAutomationRule(appointmentRule.id, { actionIds:["AUTOACT-1003", "AUTOACT-1008"] });
check("Q", "تعديل Rule يزيد version", updatedRule.version === oldVersion + 1, "Run يحتفظ بنسخة snapshot مستقلة");
check("R", "Tasks selector يعرض provenance", getTasksWorkspace({ search:"", status:"all", ownerId:"all", due:"all", origin:"automation", leadId:"all", sort:"due" }).some((task) => task.createdByAutomationRunId === autoRun.run.id), "Workspace يقرأ Task المركزية");
check("S", "لا Message من Automation", count(mockModel.messages) === messageCountBefore && mockModel.messages.every((message) => message.senderType !== "automation"), "Human Send في S7 لم يتغير");
check("T", "Deal boundary محفوظ", JSON.stringify(mockModel.deals.map((deal) => ({ id:deal.id, value:deal.value, probability:deal.probability, stageId:deal.stageId, status:deal.status }))) === JSON.stringify(dealSnapshot), "0 stage/value/probability/close mutation");
check("U", "Revenue/Attribution محفوظة", JSON.stringify(mockModel.revenueEvents) === revenueSnapshot && JSON.stringify(mockModel.attributionTouchpoints) === attributionSnapshot, "0 Revenue أو Attribution mutation");
const integrity = getAutomationIntegrityReport();
check("V", "Automation integrity report", integrity.pass, integrity.checks.filter((item) => !item.pass).map((item) => item.id).join(",") || "A–V pass");

console.log(`S9 verification: ${checks.length}/22 PASS`);
checks.forEach((item) => console.log(`${item.id}. PASS — ${item.name}`));
