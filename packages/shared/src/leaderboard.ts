import { computeXp, evaluateBadges, type ProgressLike } from "./gamification.js";
import type { Course, Molecule, Product } from "./types.js";

/**
 * Build Spec §7.2 — Leaderboards (individual + institution/class cohorts).
 * Ranks educational XP only. POPIA-minimised labels — never email/phone.
 */

export interface LeaderboardUser {
  id: string;
  displayName?: string;
}

export interface LeaderboardRow {
  rank: number;
  userId: string;
  /** POPIA-safe public label */
  displayLabel: string;
  xp: number;
  bestStreak: number;
  lessonsCompleted: number;
  badgesEarned: number;
  isViewer: boolean;
}

export interface LeaderboardView {
  scope: "individual" | "cohort" | "institution";
  scopeLabel: string;
  rows: LeaderboardRow[];
  viewerRank: number | null;
  viewerUserId?: string;
  note: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Leaderboards rank Materia Academy learning activity (XP). They are not clinical credentials, CPD, or a public health scoreboard.";

function hashLabel(userId: string): string {
  let h = 2166136261;
  for (let i = 0; i < userId.length; i++) {
    h ^= userId.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `Learner ${(h >>> 0).toString(16).slice(0, 4).toUpperCase()}`;
}

/** Safe public handle — prefers displayName, never raw email. */
export function leaderboardDisplayLabel(
  user: LeaderboardUser | undefined,
  userId: string,
): string {
  const name = user?.displayName?.trim();
  if (name && name.length >= 2 && !/@/.test(name) && !/\d{6,}/.test(name)) {
    return name.slice(0, 40);
  }
  return hashLabel(userId);
}

function aggregateUser(input: {
  userId: string;
  progress: ProgressLike[];
  courses: Array<
    Pick<Course, "id" | "moleculeId" | "title"> & {
      lessons?: Array<{ id: string }>;
      lessonCount?: number;
    }
  >;
  molecules: Array<Pick<Molecule, "id" | "therapeuticArea">>;
  products?: Array<Pick<Product, "moleculeId" | "publishState">>;
}): {
  userId: string;
  xp: number;
  bestStreak: number;
  lessonsCompleted: number;
  badgesEarned: number;
} {
  const mine = input.progress.filter((p) => p.userId === input.userId);
  const report = evaluateBadges({
    userId: input.userId,
    progress: mine,
    courses: input.courses,
    molecules: input.molecules,
    products: input.products,
  });
  return {
    userId: input.userId,
    xp: report.xp,
    bestStreak: report.bestStreak,
    lessonsCompleted: report.totalLessonsCompleted,
    badgesEarned: report.earnedCount,
  };
}

export function buildLeaderboard(input: {
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
  /** Restrict to these user ids (cohort / institution seat holders). */
  memberUserIds?: string[];
  scope?: LeaderboardView["scope"];
  scopeLabel?: string;
  viewerUserId?: string;
  limit?: number;
}): LeaderboardView {
  const scope = input.scope ?? "individual";
  const limit = Math.max(1, Math.min(input.limit ?? 25, 100));
  const userById = new Map(input.users.map((u) => [u.id, u]));

  let userIds = [...new Set(input.progress.map((p) => p.userId))];
  if (input.memberUserIds) {
    const allow = new Set(input.memberUserIds);
    userIds = userIds.filter((id) => allow.has(id));
    // Include members with zero progress so cohort size is visible
    for (const id of input.memberUserIds) {
      if (!userIds.includes(id)) userIds.push(id);
    }
  }

  const viewerId = input.viewerUserId?.trim();
  if (viewerId && !userIds.includes(viewerId) && !input.memberUserIds) {
    userIds.push(viewerId);
  }

  const scored = userIds.map((userId) =>
    aggregateUser({
      userId,
      progress: input.progress,
      courses: input.courses,
      molecules: input.molecules,
      products: input.products,
    }),
  );

  scored.sort(
    (a, b) =>
      b.xp - a.xp ||
      b.badgesEarned - a.badgesEarned ||
      b.bestStreak - a.bestStreak ||
      a.userId.localeCompare(b.userId),
  );

  const rows: LeaderboardRow[] = scored.slice(0, limit).map((s, i) => ({
    rank: i + 1,
    userId: s.userId,
    displayLabel: leaderboardDisplayLabel(userById.get(s.userId), s.userId),
    xp: s.xp,
    bestStreak: s.bestStreak,
    lessonsCompleted: s.lessonsCompleted,
    badgesEarned: s.badgesEarned,
    isViewer: Boolean(viewerId && s.userId === viewerId),
  }));

  let viewerRank: number | null = null;
  if (viewerId) {
    const idx = scored.findIndex((s) => s.userId === viewerId);
    viewerRank = idx >= 0 ? idx + 1 : null;
  }

  return {
    scope,
    scopeLabel: input.scopeLabel ?? (scope === "individual" ? "Academy" : scope),
    rows,
    viewerRank,
    viewerUserId: viewerId || undefined,
    note: "Ranked by XP (10 per lesson + 5 per correct quiz). Labels are POPIA-minimised — no emails.",
    disclaimer: DISCLAIMER,
  };
}

/** Convenience: XP for one user without full badge evaluation (tests / previews). */
export function xpForUser(progress: ProgressLike[], userId: string): number {
  return computeXp(progress.filter((p) => p.userId === userId));
}
