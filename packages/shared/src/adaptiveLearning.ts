import { courseCompletionPercent } from "./academy.js";
import {
  collectReviewCards,
  reviewDateKey,
  type ReviewCard,
  type ReviewCourse,
} from "./spacedRepetition.js";
import type { ProgressLike } from "./gamification.js";
import type { Course, Molecule, SafetyProfile } from "./types.js";

/**
 * Build Spec §7.5 — Adaptive learning.
 * Tracks weak therapeutic areas from Academy quiz/completion progress and
 * builds tomorrow's session from published courses + review cards only.
 * Never invents clinical facts, doses, or unpublished content.
 */

export interface WeakAreaSignal {
  therapeuticArea: string;
  quizAccuracyPercent: number;
  quizAttempts: number;
  avgCompletionPercent: number;
  reason: string;
}

export interface AdaptiveCourseRec {
  courseId: string;
  title: string;
  moleculeId: string;
  moleculeName: string;
  moleculeSlug: string;
  therapeuticArea: string;
  path: string;
}

export interface AdaptiveCardRec {
  cardId: string;
  kind: string;
  prompt: string;
  therapeuticArea: string;
  moleculeName?: string;
}

export interface AdaptiveSessionPlan {
  asOf: string;
  forDate: string;
  weakAreas: WeakAreaSignal[];
  recommendedCourses: AdaptiveCourseRec[];
  recommendedReviewCards: AdaptiveCardRec[];
  note: string;
  disclaimer: string;
}

export const ADAPTIVE_DISCLAIMER =
  "Adaptive sessions reorder published Academy content around your quiz gaps. They are not clinical coaching and never invent doses, pearls, or unpublished lessons.";

function addDays(dateKey: string, days: number): string {
  const d = new Date(`${dateKey}T12:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function quizAccuracy(correct: number, attempts: number): number {
  if (attempts <= 0) return 100;
  return Math.min(100, Math.round((correct / attempts) * 100));
}

/**
 * Infer weak therapeutic areas from progress.
 * Requires at least one quiz attempt in the area; low accuracy ranks first.
 */
export function detectWeakAreas(input: {
  userId: string;
  progress: ProgressLike[];
  courses: Array<Pick<Course, "id" | "moleculeId" | "title"> & { lessons?: Array<{ id: string }> }>;
  molecules: Array<Pick<Molecule, "id" | "innName" | "therapeuticArea">>;
  limit?: number;
}): WeakAreaSignal[] {
  const mine = input.progress.filter((p) => p.userId === input.userId);
  const courseById = new Map(input.courses.map((c) => [c.id, c]));
  const molById = new Map(input.molecules.map((m) => [m.id, m]));
  const byArea = new Map<
    string,
    { quizCorrect: number; quizAttempts: number; completions: number[] }
  >();

  for (const row of mine) {
    const course = courseById.get(row.courseId);
    if (!course) continue;
    const mol = molById.get(course.moleculeId);
    const area = mol?.therapeuticArea?.trim();
    if (!area) continue;
    const lessonTotal = Math.max(course.lessons?.length ?? 1, 1);
    const pct = courseCompletionPercent(row.completedLessonIds, lessonTotal);
    const cur = byArea.get(area) ?? { quizCorrect: 0, quizAttempts: 0, completions: [] };
    cur.quizCorrect += row.quizCorrect;
    cur.quizAttempts += row.quizAttempts;
    cur.completions.push(pct);
    byArea.set(area, cur);
  }

  const signals: WeakAreaSignal[] = [];
  for (const [therapeuticArea, v] of byArea) {
    if (v.quizAttempts < 1) continue;
    const quizAccuracyPercent = quizAccuracy(v.quizCorrect, v.quizAttempts);
    const avgCompletionPercent = Math.round(
      v.completions.reduce((a, b) => a + b, 0) / Math.max(v.completions.length, 1),
    );
    const weakQuiz = quizAccuracyPercent < 70;
    const weakCompletion = avgCompletionPercent < 50 && v.quizAttempts >= 1;
    if (!weakQuiz && !weakCompletion) continue;
    signals.push({
      therapeuticArea,
      quizAccuracyPercent,
      quizAttempts: v.quizAttempts,
      avgCompletionPercent,
      reason: weakQuiz
        ? `Quiz accuracy ${quizAccuracyPercent}% across ${v.quizAttempts} attempt(s) — practice published cards in this area.`
        : `Average course completion ${avgCompletionPercent}% — continue published lessons in this area.`,
    });
  }

  signals.sort(
    (a, b) =>
      a.quizAccuracyPercent - b.quizAccuracyPercent ||
      a.avgCompletionPercent - b.avgCompletionPercent ||
      a.therapeuticArea.localeCompare(b.therapeuticArea),
  );
  return signals.slice(0, Math.max(1, Math.min(input.limit ?? 5, 8)));
}

export function buildAdaptiveSession(input: {
  userId: string;
  progress: ProgressLike[];
  courses: ReviewCourse[];
  molecules: Molecule[];
  safetyProfiles: SafetyProfile[];
  asOf?: string;
  /** Days ahead for “tomorrow’s session” (default 1). */
  aheadDays?: number;
  courseLimit?: number;
  cardLimit?: number;
}): AdaptiveSessionPlan {
  const asOf = input.asOf ?? reviewDateKey();
  const forDate = addDays(asOf, input.aheadDays ?? 1);
  const weakAreas = detectWeakAreas({
    userId: input.userId,
    progress: input.progress,
    courses: input.courses,
    molecules: input.molecules,
  });
  const weakSet = new Set(weakAreas.map((w) => w.therapeuticArea.toLowerCase()));
  const molById = new Map(input.molecules.map((m) => [m.id, m]));

  const recommendedCourses: AdaptiveCourseRec[] = [];
  for (const course of input.courses) {
    if (course.publishState !== "published") continue;
    const mol = molById.get(course.moleculeId);
    if (!mol || mol.publishState !== "published") continue;
    const area = mol.therapeuticArea?.trim();
    if (!area || (weakSet.size > 0 && !weakSet.has(area.toLowerCase()))) continue;
    // If no weak areas yet, skip course recommendations (honest empty state)
    if (weakSet.size === 0) continue;
    recommendedCourses.push({
      courseId: course.id,
      title: course.title,
      moleculeId: mol.id,
      moleculeName: mol.innName,
      moleculeSlug: mol.slug,
      therapeuticArea: area,
      path: `/learn/${course.id}`,
    });
    if (recommendedCourses.length >= (input.courseLimit ?? 6)) break;
  }

  const catalog = collectReviewCards({
    courses: input.courses,
    molecules: input.molecules,
    safetyProfiles: input.safetyProfiles,
  });
  const recommendedReviewCards: AdaptiveCardRec[] = [];
  for (const card of catalog) {
    const area = card.therapeuticArea?.trim();
    if (!area || (weakSet.size > 0 && !weakSet.has(area.toLowerCase()))) continue;
    if (weakSet.size === 0) continue;
    recommendedReviewCards.push({
      cardId: card.id,
      kind: card.kind,
      prompt: card.prompt,
      therapeuticArea: area,
      moleculeName: card.moleculeName,
    });
    if (recommendedReviewCards.length >= (input.cardLimit ?? 8)) break;
  }

  return {
    asOf,
    forDate,
    weakAreas,
    recommendedCourses,
    recommendedReviewCards,
    note:
      weakAreas.length === 0
        ? "No weak areas detected yet — complete published Academy quizzes so Materia can personalise tomorrow’s session. It will not invent gaps."
        : `Tomorrow’s session (${forDate}) prioritises ${weakAreas.map((w) => w.therapeuticArea).join(", ")} from your quiz history — published content only.`,
    disclaimer: ADAPTIVE_DISCLAIMER,
  };
}

/** Test helper — expose card catalog shape without re-exporting collect internals. */
export function sampleAdaptiveCards(cards: ReviewCard[], areas: string[], limit = 5): AdaptiveCardRec[] {
  const prefer = new Set(areas.map((a) => a.toLowerCase()));
  return cards
    .filter((c) => c.therapeuticArea && prefer.has(c.therapeuticArea.toLowerCase()))
    .slice(0, limit)
    .map((c) => ({
      cardId: c.id,
      kind: c.kind,
      prompt: c.prompt,
      therapeuticArea: c.therapeuticArea!,
      moleculeName: c.moleculeName,
    }));
}
