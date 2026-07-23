import type { ScheduleCode } from "./types.js";

/** Essentials safe to cache for load-shedding / offline read (Pro offline core). */
export interface OfflineEssential {
  moleculeId: string;
  slug: string;
  innName: string;
  className: string;
  scheduleHints: ScheduleCode[];
  counsellingEn: string[];
  overdoseFirstAid: string[];
  cachedAt: string;
  disclaimer: string;
}

export const OFFLINE_DISCLAIMER =
  "Offline cache — verify online when connectivity returns. Reference tool only; not emergency treatment.";

export function buildOfflineEssential(input: {
  moleculeId: string;
  slug: string;
  innName: string;
  className: string;
  scheduleHints: ScheduleCode[];
  counsellingEn: string[];
}): OfflineEssential {
  return {
    ...input,
    overdoseFirstAid: [
      "Call emergency services / poison information centre immediately if overdose is suspected.",
      "Do not induce vomiting unless a clinician instructs you to.",
      "Take the medicine packaging with you.",
      "Materia offline mode stops at first aid.",
    ],
    cachedAt: new Date().toISOString(),
    disclaimer: OFFLINE_DISCLAIMER,
  };
}
