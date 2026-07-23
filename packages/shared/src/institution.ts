import type { Cohort, Organization, Seat } from "./types.js";

export interface CohortAnalytics {
  cohortId: string;
  name: string;
  memberCount: number;
  avgCompletionPercent: number;
  totalQuizAttempts: number;
  totalQuizCorrect: number;
}

export function createOrganisation(
  name: string,
  kind: Organization["kind"],
  seatLimit = 50,
): Organization & { seatLimit: number } {
  return {
    id: `org-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24)}-${Date.now().toString(36)}`,
    name,
    kind,
    seatLimit,
  };
}

export function canAddSeat(org: { id: string; seatLimit?: number }, seats: Seat[]): boolean {
  const limit = org.seatLimit ?? 50;
  return seats.filter((s) => s.orgId === org.id).length < limit;
}

export function computeCohortAnalytics(
  cohort: Cohort,
  progress: Array<{
    userId: string;
    completionPercent: number;
    quizAttempts: number;
    quizCorrect: number;
  }>,
): CohortAnalytics {
  const memberProgress = progress.filter((p) => cohort.memberUserIds.includes(p.userId));
  const avg =
    memberProgress.length === 0
      ? 0
      : memberProgress.reduce((acc, p) => acc + p.completionPercent, 0) / memberProgress.length;
  return {
    cohortId: cohort.id,
    name: cohort.name,
    memberCount: cohort.memberUserIds.length,
    avgCompletionPercent: Math.round(avg),
    totalQuizAttempts: memberProgress.reduce((a, p) => a + p.quizAttempts, 0),
    totalQuizCorrect: memberProgress.reduce((a, p) => a + p.quizCorrect, 0),
  };
}
