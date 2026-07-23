import type { DueReminder, ReminderChannel } from "./reminders.js";

export interface OutboundMessage {
  channel: ReminderChannel;
  to: string;
  body: string;
  /** Correlation only — no clinical free text beyond support reminder */
  meta: {
    userId: string;
    moleculeId: string;
    scheduledTime: string;
    kind: "medication_reminder";
  };
}

export interface SendResult {
  channel: ReminderChannel;
  provider: "stub" | "resend" | "twilio";
  status: "queued" | "sent_stub" | "skipped" | "failed";
  to: string;
  detail: string;
}

/**
 * POPIA-minded envelope: destination + short support copy only.
 * Never attach ID numbers, diagnosis, or dose calculations.
 */
export function toOutboundMessage(
  reminder: DueReminder,
  destination: { email?: string; phoneE164?: string },
): OutboundMessage | null {
  if (reminder.channel === "in_app") {
    return {
      channel: "in_app",
      to: reminder.userId,
      body: reminder.body,
      meta: {
        userId: reminder.userId,
        moleculeId: reminder.moleculeId,
        scheduledTime: reminder.scheduledTime,
        kind: "medication_reminder",
      },
    };
  }
  if (reminder.channel === "email") {
    if (!destination.email) return null;
    return {
      channel: "email",
      to: destination.email,
      body: reminder.body,
      meta: {
        userId: reminder.userId,
        moleculeId: reminder.moleculeId,
        scheduledTime: reminder.scheduledTime,
        kind: "medication_reminder",
      },
    };
  }
  if (reminder.channel === "sms" || reminder.channel === "whatsapp") {
    if (!destination.phoneE164) return null;
    return {
      channel: reminder.channel,
      to: destination.phoneE164,
      body: reminder.body,
      meta: {
        userId: reminder.userId,
        moleculeId: reminder.moleculeId,
        scheduledTime: reminder.scheduledTime,
        kind: "medication_reminder",
      },
    };
  }
  return null;
}
