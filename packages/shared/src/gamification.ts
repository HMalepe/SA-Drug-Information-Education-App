import { courseCompletionPercent } from "./academy.js";
import type { Course, Molecule, Product } from "./types.js";

/**
 * Build Spec §7.2 — Gamification: badges, streaks, XP.
 * Awards from academy progress + published catalogue only. Never invents clinical facts.
 */

export interface ProgressLike {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  quizCorrect: number;
  quizAttempts: number;
  streak: number;
  updatedAt: string;
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  /** Opaque criterion key for tests / UI */
  criterion: string;
  target: number;
}

export interface BadgeStatus {
  id: string;
  title: string;
  description: string;
  criterion: string;
  earned: boolean;
  current: number;
  target: number;
  progressPercent: number;
}

export interface GamificationReport {
  userId: string;
  xp: number;
  bestStreak: number;
  totalLessonsCompleted: number;
  totalQuizCorrect: number;
  coursesTouched: number;
  badges: BadgeStatus[];
  earnedCount: number;
  note: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Badges and XP track educational progress in Materia Academy. They are not clinical credentials or CPD credits.";

/** Spec-aligned badge catalogue — targets scale with the published seed set. */
export const BADGE_CATALOGUE: BadgeDefinition[] = [
  {
    id: "antibiotic_explorer",
    title: "Antibiotic Explorer",
    description: "Complete 20 lessons in the antibiotics therapeutic area.",
    criterion: "antibiotics_lessons",
    target: 20,
  },
  {
    id: "cardiologist",
    title: "Cardiologist",
    description: "Fully complete a published antihypertensive or cardiovascular course.",
    criterion: "cardio_course_mastery",
    target: 1,
  },
  {
    id: "endocrine_expert",
    title: "Endocrine Expert",
    description: "Fully complete a published diabetes or endocrine course.",
    criterion: "endocrine_course_mastery",
    target: 1,
  },
  {
    id: "pk_master",
    title: "Pharmacokinetics Master",
    description: "Answer 15 Academy quiz questions correctly (ADME & mechanism practice).",
    criterion: "quiz_correct",
    target: 15,
  },
  {
    id: "generic_genius",
    title: "Generic Genius",
    description: "Complete courses for 5 molecules that have 2+ published SA brands.",
    criterion: "multi_brand_courses",
    target: 5,
  },
];

function clampPct(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

function areaOf(
  course: Pick<Course, "moleculeId">,
  molById: Map<string, Pick<Molecule, "therapeuticArea">>,
): string {
  return (molById.get(course.moleculeId)?.therapeuticArea ?? "").toLowerCase();
}

function isCardioArea(area: string): boolean {
  return area === "antihypertensives" || area === "cardiovascular";
}

function isEndocrineArea(area: string): boolean {
  return area === "diabetes" || area === "endocrine";
}

/**
 * Count published brands per molecule (for Generic Genius).
 */
export function multiBrandMoleculeIds(
  products: Array<Pick<Product, "moleculeId" | "publishState">>,
): Set<string> {
  const counts = new Map<string, number>();
  for (const p of products) {
    if (p.publishState !== "published") continue;
    counts.set(p.moleculeId, (counts.get(p.moleculeId) ?? 0) + 1);
  }
  return new Set([...counts.entries()].filter(([, n]) => n >= 2).map(([id]) => id));
}

export function computeXp(progress: ProgressLike[]): number {
  let lessons = 0;
  let quizCorrect = 0;
  for (const row of progress) {
    lessons += row.completedLessonIds.length;
    quizCorrect += row.quizCorrect;
  }
  return lessons * 10 + quizCorrect * 5;
}

export function evaluateBadges(input: {
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
  catalogue?: BadgeDefinition[];
}): GamificationReport {
  const userId = input.userId.trim();
  const mine = input.progress.filter((p) => p.userId === userId);
  const courseById = new Map(input.courses.map((c) => [c.id, c]));
  const molById = new Map(input.molecules.map((m) => [m.id, m]));
  const multiBrand = multiBrandMoleculeIds(input.products ?? []);
  const catalogue = input.catalogue ?? BADGE_CATALOGUE;

  let antibioticLessons = 0;
  let cardioMastered = 0;
  let endocrineMastered = 0;
  let quizCorrect = 0;
  let multiBrandCompleted = 0;
  let bestStreak = 0;
  let totalLessons = 0;

  for (const row of mine) {
    bestStreak = Math.max(bestStreak, row.streak);
    quizCorrect += row.quizCorrect;
    totalLessons += row.completedLessonIds.length;
    const course = courseById.get(row.courseId);
    if (!course) continue;
    const area = areaOf(course, molById);
    const lessonTotal =
      course.lessonCount ?? course.lessons?.length ?? Math.max(row.completedLessonIds.length, 1);
    const pct = courseCompletionPercent(row.completedLessonIds, lessonTotal);

    if (area === "antibiotics") {
      antibioticLessons += row.completedLessonIds.length;
    }
    if (isCardioArea(area) && pct >= 100) cardioMastered += 1;
    if (isEndocrineArea(area) && pct >= 100) endocrineMastered += 1;
    if (pct >= 100 && multiBrand.has(course.moleculeId)) multiBrandCompleted += 1;
  }

  const currentByCriterion: Record<string, number> = {
    antibiotics_lessons: antibioticLessons,
    cardio_course_mastery: cardioMastered,
    endocrine_course_mastery: endocrineMastered,
    quiz_correct: quizCorrect,
    multi_brand_courses: multiBrandCompleted,
  };

  const badges: BadgeStatus[] = catalogue.map((def) => {
    const current = currentByCriterion[def.criterion] ?? 0;
    const earned = current >= def.target;
    return {
      id: def.id,
      title: def.title,
      description: def.description,
      criterion: def.criterion,
      earned,
      current,
      target: def.target,
      progressPercent: clampPct(current, def.target),
    };
  });

  return {
    userId,
    xp: computeXp(mine),
    bestStreak,
    totalLessonsCompleted: totalLessons,
    totalQuizCorrect: quizCorrect,
    coursesTouched: mine.length,
    badges,
    earnedCount: badges.filter((b) => b.earned).length,
    note: "Streak counts consecutive lesson completions per course. XP = 10 per lesson + 5 per correct quiz.",
    disclaimer: DISCLAIMER,
  };
}
