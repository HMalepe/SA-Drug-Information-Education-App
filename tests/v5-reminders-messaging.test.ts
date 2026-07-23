import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  dueRemindersAt,
  isValidReminderTime,
  previewUpcoming,
  reminderBody,
  toOutboundMessage,
  type ReminderPreferences,
  type RegimenItem,
} from "@materia/shared";

const regimen: RegimenItem[] = [
  {
    moleculeId: "mol-amox",
    moleculeName: "Amoxicillin",
    brandName: "Amoxil",
    reminderTimes: ["08:00", "20:00"],
  },
];

const prefs: ReminderPreferences = {
  userId: "u1",
  channels: ["in_app", "email"],
  email: "u1@test.za",
  timezone: "Africa/Johannesburg",
  popiaMessagingConsentAt: "2026-07-23T00:00:00.000Z",
};

describe("v5 companion reminders", () => {
  it("validates HH:mm and requires consent", () => {
    assert.equal(isValidReminderTime("08:00"), true);
    assert.equal(isValidReminderTime("25:00"), false);
    const none = dueRemindersAt({
      userId: "u1",
      regimen,
      prefs: { ...prefs, popiaMessagingConsentAt: undefined },
      nowHhmm: "08:00",
    });
    assert.equal(none.length, 0);
  });

  it("emits due reminders at matching clock without dose advice", () => {
    const due = dueRemindersAt({ userId: "u1", regimen, prefs, nowHhmm: "08:00" });
    assert.equal(due.length, 2);
    assert.match(due[0]!.body, /never changes your dose/i);
    assert.doesNotMatch(reminderBody(regimen[0]!, "sms"), /\d+\s*mg/i);
  });

  it("previews upcoming slots", () => {
    const upcoming = previewUpcoming({ regimen, fromHhmm: "07:00", hoursAhead: 24 });
    assert.ok(upcoming.some((u) => u.time === "08:00"));
  });

  it("builds POPIA-minded outbound envelopes", () => {
    const due = dueRemindersAt({ userId: "u1", regimen, prefs, nowHhmm: "08:00" });
    const emailMsg = toOutboundMessage(due.find((d) => d.channel === "email")!, {
      email: "u1@test.za",
    });
    assert.ok(emailMsg);
    assert.equal(emailMsg!.to, "u1@test.za");
    assert.equal(emailMsg!.meta.kind, "medication_reminder");
    const smsMissing = toOutboundMessage(
      { ...due[0]!, channel: "whatsapp" },
      { email: "u1@test.za" },
    );
    assert.equal(smsMissing, null);
  });
});
