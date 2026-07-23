import type { Cohort, Course, Molecule, Organization, Product, Seat } from "./types.js";
import {
  buildLeaderboard,
  type LeaderboardUser,
  type LeaderboardView,
} from "./leaderboard.js";
import type { ProgressLike } from "./gamification.js";

export interface CohortAnalytics {
  cohortId: string;
  name: string;
  memberCount: number;
  avgCompletionPercent: number;
  totalQuizAttempts: number;
  totalQuizCorrect: number;
}

export interface InstitutionLeaderboardBundle {
  orgId: string;
  orgName: string;
  orgBoard: LeaderboardView;
  cohortBoards: Array<{ cohortId: string; cohortName: string; board: LeaderboardView }>;
  note: string;
  disclaimer: string;
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

/**
 * Build Spec §7.2 / §11 — Institution console XP boards.
 * Org board = all seat holders; cohort boards = class/group subsets.
 * POPIA labels only — never emails.
 */
export function buildInstitutionLeaderboardBundle(input: {
  org: Pick<Organization, "id" | "name">;
  seats: Array<Pick<Seat, "orgId" | "userId">>;
  cohorts: Array<Pick<Cohort, "id" | "orgId" | "name" | "memberUserIds">>;
  progress: ProgressLike[];
  users: LeaderboardUser[];
  courses: Array<
    Pick<Course, "id" | "moleculeId" | "title"> & {
      lessons?: Array<{ id: string }>;
      lessonCount?: number;
    }
  >;
  molecules: Array<Pick<Molecule, "id" | "therapeuticArea">>;
  products?: Array<Pick<Product, "moleculeId" | "publishState">>;
  viewerUserId?: string;
  limit?: number;
}): InstitutionLeaderboardBundle {
  const seatUserIds = [
    ...new Set(input.seats.filter((s) => s.orgId === input.org.id).map((s) => s.userId)),
  ];
  const orgCohorts = input.cohorts.filter((c) => c.orgId === input.org.id);

  const orgBoard = buildLeaderboard({
    progress: input.progress,
    users: input.users,
    courses: input.courses,
    molecules: input.molecules,
    products: input.products,
    memberUserIds: seatUserIds,
    viewerUserId: input.viewerUserId,
    limit: input.limit,
    scope: "institution",
    scopeLabel: input.org.name,
  });

  const cohortBoards = orgCohorts.map((cohort) => ({
    cohortId: cohort.id,
    cohortName: cohort.name,
    board: buildLeaderboard({
      progress: input.progress,
      users: input.users,
      courses: input.courses,
      molecules: input.molecules,
      products: input.products,
      memberUserIds: cohort.memberUserIds,
      viewerUserId: input.viewerUserId,
      limit: input.limit,
      scope: "cohort",
      scopeLabel: cohort.name,
    }),
  }));

  return {
    orgId: input.org.id,
    orgName: input.org.name,
    orgBoard,
    cohortBoards,
    note: "Institution XP boards for seat holders and named cohorts. Completion analytics stay on /analytics.",
    disclaimer: orgBoard.disclaimer,
  };
}
