import { courseCompletionPercent } from "./academy.js";
import type { AnalyticsEvent } from "./analytics.js";
import type { Course, Molecule } from "./types.js";

/**
 * Build Spec §12 — Personal analytics for professionals (self-knowledge).
 * Uses academy progress + POPIA-minimised events (userBucket only). Never stores free-text clinical content.
 */

export interface ProgressSnapshot {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  quizCorrect: number;
  quizAttempts: number;
  streak: number;
  updatedAt: string;
}

export interface MasteryRow {
  key: string;
  label: string;
  courses: number;
  avgCompletionPercent: number;
  quizAttempts: number;
  quizCorrect: number;
  quizAccuracyPercent: number;
}

export interface LearningCurvePoint {
  dateKey: string;
  lessonsCompleted: number;
  quizzesAnswered: number;
  moleculeViews: number;
}

export interface PersonalAnalytics {
  userId: string;
  learningCurve: LearningCurvePoint[];
  masteryByTherapeuticArea: MasteryRow[];
  masteryByClass: MasteryRow[];
  topMolecules: Array<{ slug: string; views: number }>;
  topTools: Array<{ tool: string; uses: number }>;
  totals: {
    coursesTouched: number;
    lessonsCompleted: number;
    quizAttempts: number;
    quizCorrect: number;
    bestStreak: number;
    moleculeViews: number;
  };
  note: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Personal analytics summarise your Materia learning activity for self-reflection. Not a clinical performance score or CPD record.";

function dateKeyUtc(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "unknown";
  return d.toISOString().slice(0, 10);
}

function quizAccuracy(correct: number, attempts: number): number {
  if (attempts <= 0) return 0;
  return Math.min(100, Math.round((correct / attempts) * 100));
}

function emptyCurve(dateKey: string): LearningCurvePoint {
  return { dateKey, lessonsCompleted: 0, quizzesAnswered: 0, moleculeViews: 0 };
}

/**
 * Filter product events belonging to this user via opaque userBucket prop.
 * Events without userBucket are excluded from personal views (stay in product summary only).
 */
export function eventsForUserBucket(events: AnalyticsEvent[], userBucket: string): AnalyticsEvent[] {
  const bucket = userBucket.trim();
  if (!bucket) return [];
  return events.filter((e) => e.props.userBucket === bucket);
}

export function buildPersonalAnalytics(input: {
  userId: string;
  progress: ProgressSnapshot[];
  courses: Array<Pick<Course, "id" | "moleculeId" | "title"> & { lessonCount?: number; lessons?: Array<{ id: string }> }>;
  molecules: Array<Pick<Molecule, "id" | "slug" | "innName" | "className" | "therapeuticArea">>;
  events?: AnalyticsEvent[];
}): PersonalAnalytics {
  const userId = input.userId.trim();
  const mine = input.progress.filter((p) => p.userId === userId);
  const courseById = new Map(input.courses.map((c) => [c.id, c]));
  const molById = new Map(input.molecules.map((m) => [m.id, m]));

  const areaAgg = new Map<
    string,
    { completions: number[]; quizCorrect: number; quizAttempts: number; courses: number }
  >();
  const classAgg = new Map<
    string,
    { completions: number[]; quizCorrect: number; quizAttempts: number; courses: number }
  >();

  let lessonsCompleted = 0;
  let quizAttempts = 0;
  let quizCorrect = 0;
  let bestStreak = 0;

  for (const row of mine) {
    const course = courseById.get(row.courseId);
    const lessonTotal =
      course?.lessonCount ??
      course?.lessons?.length ??
      Math.max(row.completedLessonIds.length, 1);
    const pct = courseCompletionPercent(row.completedLessonIds, lessonTotal);
    lessonsCompleted += row.completedLessonIds.length;
    quizAttempts += row.quizAttempts;
    quizCorrect += row.quizCorrect;
    bestStreak = Math.max(bestStreak, row.streak);

    const mol = course ? molById.get(course.moleculeId) : undefined;
    const area = mol?.therapeuticArea?.trim() || "unspecified";
    const klass = mol?.className?.trim() || "unspecified";

    for (const [map, key] of [
      [areaAgg, area] as const,
      [classAgg, klass] as const,
    ]) {
      const cur = map.get(key) ?? { completions: [], quizCorrect: 0, quizAttempts: 0, courses: 0 };
      cur.completions.push(pct);
      cur.quizCorrect += row.quizCorrect;
      cur.quizAttempts += row.quizAttempts;
      cur.courses += 1;
      map.set(key, cur);
    }
  }

  function toMasteryRows(
    map: Map<string, { completions: number[]; quizCorrect: number; quizAttempts: number; courses: number }>,
  ): MasteryRow[] {
    return [...map.entries()]
      .map(([key, v]) => {
        const avg =
          v.completions.length === 0
            ? 0
            : Math.round(v.completions.reduce((a, b) => a + b, 0) / v.completions.length);
        return {
          key,
          label: key,
          courses: v.courses,
          avgCompletionPercent: avg,
          quizAttempts: v.quizAttempts,
          quizCorrect: v.quizCorrect,
          quizAccuracyPercent: quizAccuracy(v.quizCorrect, v.quizAttempts),
        };
      })
      .sort((a, b) => b.avgCompletionPercent - a.avgCompletionPercent || b.courses - a.courses)
      .slice(0, 12);
  }

  const scoped = eventsForUserBucket(input.events ?? [], userId);
  const curveMap = new Map<string, LearningCurvePoint>();
  const molViews = new Map<string, number>();
  const toolUses = new Map<string, number>();

  for (const e of scoped) {
    const dk = dateKeyUtc(e.at);
    const point = curveMap.get(dk) ?? emptyCurve(dk);
    if (e.name === "lesson_completed") point.lessonsCompleted += 1;
    if (e.name === "quiz_answered") point.quizzesAnswered += 1;
    if (e.name === "molecule_viewed") {
      point.moleculeViews += 1;
      if (typeof e.props.moleculeSlug === "string") {
        molViews.set(e.props.moleculeSlug, (molViews.get(e.props.moleculeSlug) ?? 0) + 1);
      }
    }
    if (e.name === "tool_used" && typeof e.props.tool === "string") {
      toolUses.set(e.props.tool, (toolUses.get(e.props.tool) ?? 0) + 1);
    }
    curveMap.set(dk, point);
  }

  // If no event curve yet, seed a single point from latest progress activity (no invented history).
  if (curveMap.size === 0 && mine.length > 0) {
    const latest = [...mine].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]!;
    const dk = dateKeyUtc(latest.updatedAt);
    curveMap.set(dk, {
      dateKey: dk,
      lessonsCompleted: lessonsCompleted,
      quizzesAnswered: quizAttempts,
      moleculeViews: 0,
    });
  }

  const learningCurve = [...curveMap.values()].sort((a, b) => a.dateKey.localeCompare(b.dateKey));

  return {
    userId,
    learningCurve,
    masteryByTherapeuticArea: toMasteryRows(areaAgg),
    masteryByClass: toMasteryRows(classAgg),
    topMolecules: [...molViews.entries()]
      .map(([slug, views]) => ({ slug, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10),
    topTools: [...toolUses.entries()]
      .map(([tool, uses]) => ({ tool, uses }))
      .sort((a, b) => b.uses - a.uses)
      .slice(0, 10),
    totals: {
      coursesTouched: mine.length,
      lessonsCompleted,
      quizAttempts,
      quizCorrect,
      bestStreak,
      moleculeViews: [...molViews.values()].reduce((a, b) => a + b, 0),
    },
    note: "Mastery rolls up published course progress by therapeutic area and class. Lookups come only from events tagged with your opaque user bucket.",
    disclaimer: DISCLAIMER,
  };
}
