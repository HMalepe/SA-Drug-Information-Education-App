import type { RegimenItem } from "./companion.js";
import { isValidReminderTime } from "./reminders.js";
import { isIsoDate } from "./refillSchedule.js";

/**
 * Build Spec §6 — Adherence streaks on the personal regimen.
 * Patient-authored taken/skipped marks only. Never invents doses or clinical
 * adherence judgements. Streaks are support habit metrics, not treatment advice.
 */

export type AdherenceStatus = "taken" | "skipped";

export interface AdherenceEvent {
  id: string;
  userId: string;
  moleculeId: string;
  moleculeName: string;
  brandName?: string;
  /** Reminder slot HH:mm — must match a regimen reminder time */
  scheduledTime: string;
  /** Calendar day YYYY-MM-DD in the user's local framing (caller supplies) */
  onDate: string;
  status: AdherenceStatus;
  loggedAt: string;
}

export interface AdherenceDaySummary {
  date: string;
  expectedSlots: number;
  takenSlots: number;
  skippedSlots: number;
  complete: boolean;
}

export interface AdherenceReport {
  asOf: string;
  currentStreakDays: number;
  bestStreakDays: number;
  takenLast7Days: number;
  skippedLast7Days: number;
  expectedLast7Days: number;
  days: AdherenceDaySummary[];
  recent: AdherenceEvent[];
  note: string;
  disclaimer: string;
}

export const ADHERENCE_DISCLAIMER =
  "Adherence marks are yours to log. Materia never invents a dose, never tells you to skip or stop a medicine, and does not judge clinical adherence — speak to your pharmacist or doctor about your regimen.";

function parseUtcDay(iso: string): number {
  const parts = iso.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

function formatUtcDay(dayNumber: number): string {
  const dt = new Date(dayNumber * 86_400_000);
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dt.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Expected reminder slots for a regimen (moleculeId|HH:mm keys). */
export function expectedSlotKeys(regimen: RegimenItem[]): string[] {
  const keys: string[] = [];
  for (const item of regimen) {
    for (const t of item.reminderTimes) {
      if (!isValidReminderTime(t)) continue;
      keys.push(`${item.moleculeId}|${t}`);
    }
  }
  return keys;
}

export function createAdherenceEvent(input: {
  userId: string;
  moleculeId: string;
  moleculeName: string;
  brandName?: string;
  scheduledTime: string;
  onDate: string;
  status: AdherenceStatus;
  loggedAt?: string;
  id?: string;
}): { ok: true; event: AdherenceEvent } | { ok: false; error: string } {
  if (!isValidReminderTime(input.scheduledTime)) {
    return { ok: false, error: "scheduledTime must be HH:mm" };
  }
  if (!isIsoDate(input.onDate)) {
    return { ok: false, error: "onDate must be YYYY-MM-DD" };
  }
  if (input.status !== "taken" && input.status !== "skipped") {
    return { ok: false, error: "status must be taken or skipped" };
  }
  if (!input.moleculeId.trim() || !input.moleculeName.trim()) {
    return { ok: false, error: "moleculeId and moleculeName required" };
  }
  return {
    ok: true,
    event: {
      id: input.id ?? `adh-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      userId: input.userId,
      moleculeId: input.moleculeId,
      moleculeName: input.moleculeName,
      brandName: input.brandName,
      scheduledTime: input.scheduledTime,
      onDate: input.onDate,
      status: input.status,
      loggedAt: input.loggedAt ?? new Date().toISOString(),
    },
  };
}

/**
 * Upsert: one log per molecule+slot+date. Latest write wins.
 * Rejects logs that do not match a regimen reminder slot.
 */
export function appendAdherenceEvent(
  existing: AdherenceEvent[],
  event: AdherenceEvent,
  regimen: RegimenItem[],
): { ok: true; events: AdherenceEvent[] } | { ok: false; error: string } {
  const slotKey = `${event.moleculeId}|${event.scheduledTime}`;
  const allowed = new Set(expectedSlotKeys(regimen));
  if (!allowed.has(slotKey)) {
    return {
      ok: false,
      error: "That reminder slot is not on the saved regimen — Materia will not invent slots.",
    };
  }
  const filtered = existing.filter(
    (e) =>
      !(
        e.moleculeId === event.moleculeId &&
        e.scheduledTime === event.scheduledTime &&
        e.onDate === event.onDate
      ),
  );
  return { ok: true, events: [...filtered, event].slice(-500) };
}

function daySummary(
  date: string,
  regimen: RegimenItem[],
  events: AdherenceEvent[],
): AdherenceDaySummary {
  const expected = expectedSlotKeys(regimen);
  const dayEvents = events.filter((e) => e.onDate === date);
  let takenSlots = 0;
  let skippedSlots = 0;
  for (const key of expected) {
    const [moleculeId, scheduledTime] = key.split("|");
    const hit = dayEvents.find(
      (e) => e.moleculeId === moleculeId && e.scheduledTime === scheduledTime,
    );
    if (hit?.status === "taken") takenSlots += 1;
    else if (hit?.status === "skipped") skippedSlots += 1;
  }
  return {
    date,
    expectedSlots: expected.length,
    takenSlots,
    skippedSlots,
    complete: expected.length > 0 && takenSlots === expected.length,
  };
}

export function buildAdherenceReport(input: {
  regimen: RegimenItem[];
  events: AdherenceEvent[];
  asOf: string;
  lookbackDays?: number;
}): AdherenceReport {
  const asOf = isIsoDate(input.asOf) ? input.asOf : new Date().toISOString().slice(0, 10);
  const lookback = Math.max(1, Math.min(input.lookbackDays ?? 14, 60));
  const asOfDay = parseUtcDay(asOf);
  const days: AdherenceDaySummary[] = [];

  for (let i = lookback - 1; i >= 0; i--) {
    const date = formatUtcDay(asOfDay - i);
    days.push(daySummary(date, input.regimen, input.events));
  }

  const last7 = days.slice(-7);
  const takenLast7Days = last7.reduce((a, d) => a + d.takenSlots, 0);
  const skippedLast7Days = last7.reduce((a, d) => a + d.skippedSlots, 0);
  const expectedLast7Days = last7.reduce((a, d) => a + d.expectedSlots, 0);

  let currentStreakDays = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const d = days[i]!;
    if (d.expectedSlots === 0) continue;
    if (d.complete) currentStreakDays += 1;
    else break;
  }

  let bestStreakDays = 0;
  let run = 0;
  for (const d of days) {
    if (d.expectedSlots === 0) {
      run = 0;
      continue;
    }
    if (d.complete) {
      run += 1;
      if (run > bestStreakDays) bestStreakDays = run;
    } else {
      run = 0;
    }
  }

  const recent = [...input.events]
    .sort((a, b) => b.loggedAt.localeCompare(a.loggedAt))
    .slice(0, 20);

  return {
    asOf,
    currentStreakDays,
    bestStreakDays,
    takenLast7Days,
    skippedLast7Days,
    expectedLast7Days,
    days,
    recent,
    note:
      currentStreakDays > 0
        ? `Current support streak: ${currentStreakDays} day(s) with every saved reminder marked taken.`
        : expectedSlotKeys(input.regimen).length === 0
          ? "Add reminder times on your regimen to start an adherence streak."
          : "No complete taken-days yet in this window — mark reminders as taken to build a streak.",
    disclaimer: ADHERENCE_DISCLAIMER,
  };
}
