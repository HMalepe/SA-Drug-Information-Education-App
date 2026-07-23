import type { RegimenItem } from "./companion.js";

export type ReminderChannel = "in_app" | "email" | "sms" | "whatsapp";

export interface ReminderPreferences {
  userId: string;
  channels: ReminderChannel[];
  /** E.164 optional — only stored when user consents; never sent to AI providers */
  phoneE164?: string;
  email?: string;
  timezone: string;
  popiaMessagingConsentAt?: string;
}

export interface DueReminder {
  userId: string;
  moleculeId: string;
  moleculeName: string;
  brandName?: string;
  scheduledTime: string;
  channel: ReminderChannel;
  /** Support-only copy — never includes calculated doses */
  body: string;
}

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function isValidReminderTime(hhmm: string): boolean {
  return TIME_RE.test(hhmm);
}

/**
 * Build due reminders for a clock tick.
 * `nowHhmm` is local wall-clock HH:mm in the user's timezone (caller converts).
 */
export function dueRemindersAt(input: {
  userId: string;
  regimen: RegimenItem[];
  prefs: ReminderPreferences;
  nowHhmm: string;
}): DueReminder[] {
  if (!input.prefs.popiaMessagingConsentAt) return [];
  const channels = input.prefs.channels.length ? input.prefs.channels : (["in_app"] as ReminderChannel[]);
  const due: DueReminder[] = [];

  for (const item of input.regimen) {
    for (const t of item.reminderTimes) {
      if (!isValidReminderTime(t) || t !== input.nowHhmm) continue;
      for (const channel of channels) {
        due.push({
          userId: input.userId,
          moleculeId: item.moleculeId,
          moleculeName: item.moleculeName,
          brandName: item.brandName,
          scheduledTime: t,
          channel,
          body: reminderBody(item, channel),
        });
      }
    }
  }
  return due;
}

export function reminderBody(item: RegimenItem, channel: ReminderChannel): string {
  const label = item.brandName ? `${item.moleculeName} (${item.brandName})` : item.moleculeName;
  const base = `Materia reminder: time for ${label}. Take only as labelled / prescribed — Materia never changes your dose.`;
  if (channel === "sms") {
    return `Materia: reminder for ${label}. Follow your label. Not medical advice.`;
  }
  return base;
}

/** Upcoming reminder slots for the next N hours (preview only). */
export function previewUpcoming(input: {
  regimen: RegimenItem[];
  fromHhmm: string;
  hoursAhead?: number;
}): Array<{ moleculeName: string; brandName?: string; time: string }> {
  const hours = input.hoursAhead ?? 24;
  const fromMins = hhmmToMinutes(input.fromHhmm);
  if (fromMins == null) return [];
  const out: Array<{ moleculeName: string; brandName?: string; time: string }> = [];
  for (const item of input.regimen) {
    for (const t of item.reminderTimes) {
      const mins = hhmmToMinutes(t);
      if (mins == null) continue;
      let delta = mins - fromMins;
      if (delta < 0) delta += 24 * 60;
      if (delta <= hours * 60) {
        out.push({ moleculeName: item.moleculeName, brandName: item.brandName, time: t });
      }
    }
  }
  return out.sort((a, b) => (hhmmToMinutes(a.time) ?? 0) - (hhmmToMinutes(b.time) ?? 0));
}

function hhmmToMinutes(hhmm: string): number | null {
  if (!isValidReminderTime(hhmm)) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return h! * 60 + m!;
}
