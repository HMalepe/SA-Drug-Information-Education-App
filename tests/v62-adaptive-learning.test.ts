import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildAdaptiveSession,
  detectWeakAreas,
  type Course,
  type Molecule,
  type SafetyProfile,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-amox",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Penicillin",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-htn",
    slug: "enalapril",
    innName: "Enalapril",
    className: "ACE inhibitor",
    therapeuticArea: "antihypertensives",
    synonyms: [],
    publishState: "published",
  },
];

const courses: Array<
  Course & {
    lessons: Array<{ id: string }>;
    quiz: Array<{
      id: string;
      courseId: string;
      prompt: string;
      choices: string[];
      correctIndex: number;
      teachFromMiss: string;
      publishState: "published";
    }>;
  }
> = [
  {
    id: "c-amox",
    moleculeId: "mol-amox",
    title: "Amoxicillin",
    publishState: "published",
    lessons: [{ id: "l1" }],
    quiz: [
      {
        id: "q1",
        courseId: "c-amox",
        prompt: "Which class is amoxicillin?",
        choices: ["Penicillin", "Macrolide"],
        correctIndex: 0,
        teachFromMiss: "Amoxicillin is a penicillin — published teaching only.",
        publishState: "published",
      },
    ],
  },
  {
    id: "c-htn",
    moleculeId: "mol-htn",
    title: "Enalapril",
    publishState: "published",
    lessons: [{ id: "l1" }],
    quiz: [
      {
        id: "q2",
        courseId: "c-htn",
        prompt: "Enalapril class?",
        choices: ["ACE inhibitor", "Beta blocker"],
        correctIndex: 0,
        teachFromMiss: "Published ACE teaching only.",
        publishState: "published",
      },
    ],
  },
];

const safety: SafetyProfile[] = [];

describe("v62 adaptive weak-area session §7.5", () => {
  it("detects weak areas from low quiz accuracy without inventing areas", () => {
    const weak = detectWeakAreas({
      userId: "u1",
      progress: [
        {
          userId: "u1",
          courseId: "c-amox",
          completedLessonIds: ["l1"],
          quizCorrect: 1,
          quizAttempts: 5,
        },
        {
          userId: "u1",
          courseId: "c-htn",
          completedLessonIds: ["l1"],
          quizCorrect: 4,
          quizAttempts: 4,
        },
      ],
      courses,
      molecules,
    });
    assert.equal(weak.length, 1);
    assert.equal(weak[0]!.therapeuticArea, "antibiotics");
    assert.ok(weak[0]!.quizAccuracyPercent < 70);
  });

  it("builds tomorrow’s session from published content in weak areas only", () => {
    const plan = buildAdaptiveSession({
      userId: "u1",
      asOf: "2026-07-23",
      aheadDays: 1,
      progress: [
        {
          userId: "u1",
          courseId: "c-amox",
          completedLessonIds: [],
          quizCorrect: 0,
          quizAttempts: 3,
        },
      ],
      courses,
      molecules,
      safetyProfiles: safety,
    });
    assert.equal(plan.forDate, "2026-07-24");
    assert.ok(plan.weakAreas.some((w) => w.therapeuticArea === "antibiotics"));
    assert.ok(plan.recommendedCourses.every((c) => c.therapeuticArea === "antibiotics"));
    assert.ok(plan.recommendedCourses.some((c) => c.courseId === "c-amox"));
    assert.equal(plan.recommendedCourses.some((c) => c.courseId === "c-htn"), false);
    assert.ok(plan.recommendedReviewCards.every((c) => c.therapeuticArea === "antibiotics"));
    assert.doesNotMatch(JSON.stringify(plan), /\b\d+\s*mg\b/i);
    assert.match(plan.disclaimer, /never invent/i);

    const empty = buildAdaptiveSession({
      userId: "u2",
      progress: [],
      courses,
      molecules,
      safetyProfiles: safety,
      asOf: "2026-07-23",
    });
    assert.equal(empty.weakAreas.length, 0);
    assert.equal(empty.recommendedCourses.length, 0);
    assert.match(empty.note, /will not invent gaps/i);
  });
});
