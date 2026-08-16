import {
  addLeadNote, addLeadTask, assignLeadOwner, completeLeadTask, convertBusinessToLead,
  getLead, getLeadByBusinessId, getLeadIntegrityReport, mockModel, updateLeadPriority,
  updateLeadStatus
} from "../client/js/data.js";
import { getBusinessIntelligence } from "../client/js/intelligence.js";

const checks = [];
const check = (id, name, pass, detail) => checks.push({ id, name, pass, detail });
const beforeDeals = mockModel.deals.length;
const beforeLeads = mockModel.leads.length;
const integrity = getLeadIntegrityReport();
integrity.checks.forEach((item) => check(`A-${item.id}`, item.name, item.pass, item.detail));

const existing = getLead("LEAD-1042");
const existingIntelligence = getBusinessIntelligence(existing.businessId);
check("B", "Business is not copied into Lead", !Object.hasOwn(existing, "score") && !Object.hasOwn(existing, "signals") && existing.businessId === "BUS-1042", "Lead references BUS-1042 only");
check("C", "Opportunity pass-through", existingIntelligence.score === 92 && existingIntelligence.opportunity?.businessId === existing.businessId, "Score and Opportunity remain in S4");
check("D", "Existing Lead task context", mockModel.tasks.some((task) => task.leadId === "LEAD-1042"), "Lead 1042 has CRM task context");

const conversion = convertBusinessToLead("BUS-1405", { ownerId:"USR-1002", priority:"high" });
const createdLead = conversion.lead;
check("E", "Explicit conversion creates one Lead", conversion.kind === "created" && mockModel.leads.length === beforeLeads + 1 && createdLead.businessId === "BUS-1405", "Created CRM Lead for Business 1405");
check("F", "Conversion preserves discovery source", createdLead?.sourceJobId === "JOB-1028" && getLeadByBusinessId("BUS-1405")?.id === createdLead.id, "Lead references original Job");
const duplicate = convertBusinessToLead("BUS-1405", { ownerId:"USR-1003" });
check("G", "Duplicate protection", duplicate.kind === "duplicate" && duplicate.lead.id === createdLead.id && mockModel.leads.length === beforeLeads + 1, "No second Lead for one Business");
const ownerUpdated = assignLeadOwner(createdLead.id, "USR-1003");
const statusUpdated = updateLeadStatus(createdLead.id, "qualified");
const priorityUpdated = updateLeadPriority(createdLead.id, "medium");
check("H", "Lead field updates", ownerUpdated?.ownerId === "USR-1003" && statusUpdated?.status === "qualified" && priorityUpdated?.priority === "medium", "Owner, status, priority remain valid");
const note = addLeadNote(createdLead.id, "ملاحظة تحقق S5");
const task = addLeadTask(createdLead.id, { title:"متابعة تحقق S5", type:"اتصال" });
const completed = completeLeadTask(task.id);
check("I", "Notes and tasks link to Lead", Boolean(note?.leadId === createdLead.id && completed?.status === "completed" && completed.completedAt), "Note and completed task are traceable");
check("J", "No S6 deal creation", mockModel.deals.length === beforeDeals, "S5 does not create Deal or Pipeline mutation");
check("K", "Activity timeline", mockModel.activities.filter((activity) => activity.leadId === createdLead.id).length >= 5, "Conversion and field/task/note changes log activities");
check("L", "Fixture contract preserved", getBusinessIntelligence("BUS-1042").score === 92 && getBusinessIntelligence("BUS-1402").score === 51 && getBusinessIntelligence("BUS-1404").status === "insufficient_data", "S4 fixtures remain unchanged");

console.table(checks);
const failed = checks.filter((item) => !item.pass);
console.log(`S5 integrity: ${checks.length - failed.length}/${checks.length} PASS`);
if (failed.length) process.exitCode = 1;
