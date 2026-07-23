import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildAnalyticsEvent,
  buildPersonalAnalytics,
  eventsForUserBucket,
  type AnalyticsEvent,
  type Course,
  type Molecule,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-amox",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Beta-lactam antibiotic (aminopenicillin)",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-ena",
    slug: "enalapril",
    innName: "Enalapril",
    className: "ACE inhibitor",
    therapeuticArea: "cardiovascular",
    synonyms: [],
    publishState: "published",
  },
];

const courses: Array<Course & { lessons: Array<{ id: string }> }> = [
  {
    id: "course-amox",
    moleculeId: "mol-amox",
    title: "Amoxicillin",
    publishState: "published",
    lessons: [{ id: "l1" }, { id: "l2" }, { id: "l3" }, { id: "l4" }, { id: "l5" }],
  },
  {
    id: "course-ena",
    moleculeId: "mol-ena",
    title: "Enalapril",
    publishState: "published",
    lessons: [{ id: "e1" }, { id: "e2" }],
  },
];

function evt(partial: {
  name: string;
  props?: Record<string, string | number | boolean>;
  at?: string;
}): AnalyticsEvent {
  const built = buildAnalyticsEvent({
    name: partial.name,
    props: partial.props,
    at: partial.at ?? "2026-07-23T10:00:00.000Z",
  });
  assert.equal(built.ok, true);
  if (!built.ok) throw new Error(built.reason);
  return built.event;
}

describe("v45 personal analytics §12", () => {
  it("scopes events by opaque userBucket only", () => {
    const events = [
      evt({ name: "molecule_viewed", props: { moleculeSlug: "amoxicillin", userBucket: "u1" } }),
      evt({ name: "molecule_viewed", props: { moleculeSlug: "enalapril", userBucket: "u2" } }),
      evt({ name: "molecule_viewed", props: { moleculeSlug: "warfarin" } }),
    ];
    assert.equal(eventsForUserBucket(events, "u1").length, 1);
    assert.equal(eventsForUserBucket(events, "").length, 0);
  });

  it("builds mastery, curve, and top lookups without clinical free text", () => {
    const events = [
      evt({
        name: "lesson_completed",
        props: { userBucket: "u1", courseId: "course-amox" },
        at: "2026-07-21T09:00:00.000Z",
      }),
      evt({
        name: "quiz_answered",
        props: { userBucket: "u1", courseId: "course-amox", correct: true },
        at: "2026-07-21T09:05:00.000Z",
      }),
      evt({
        name: "molecule_viewed",
        props: { userBucket: "u1", moleculeSlug: "amoxicillin" },
        at: "2026-07-22T11:00:00.000Z",
      }),
      evt({
        name: "molecule_viewed",
        props: { userBucket: "u1", moleculeSlug: "amoxicillin" },
        at: "2026-07-22T12:00:00.000Z",
      }),
      evt({
        name: "tool_used",
        props: { userBucket: "u1", tool: "clash_board" },
        at: "2026-07-23T08:00:00.000Z",
      }),
    ];

    const report = buildPersonalAnalytics({
      userId: "u1",
      progress: [
        {
          userId: "u1",
          courseId: "course-amox",
          completedLessonIds: ["l1", "l2", "l3"],
          quizCorrect: 4,
          quizAttempts: 5,
          streak: 3,
          updatedAt: "2026-07-22T10:00:00.000Z",
        },
        {
          userId: "u1",
          courseId: "course-ena",
          completedLessonIds: ["e1"],
          quizCorrect: 0,
          quizAttempts: 1,
          streak: 1,
          updatedAt: "2026-07-23T10:00:00.000Z",
        },
        {
          userId: "other",
          courseId: "course-amox",
          completedLessonIds: ["l1", "l2", "l3", "l4", "l5"],
          quizCorrect: 10,
          quizAttempts: 10,
          streak: 9,
          updatedAt: "2026-07-23T10:00:00.000Z",
        },
      ],
      courses,
      molecules,
      events,
    });

    assert.equal(report.totals.coursesTouched, 2);
    assert.equal(report.totals.lessonsCompleted, 4);
    assert.equal(report.totals.bestStreak, 3);
    assert.ok(report.masteryByTherapeuticArea.some((r) => r.key === "antibiotics"));
    assert.ok(report.masteryByClass.some((r) => /ACE inhibitor/i.test(r.label)));
    assert.equal(report.topMolecules[0]?.slug, "amoxicillin");
    assert.equal(report.topMolecules[0]?.views, 2);
    assert.equal(report.topTools[0]?.tool, "clash_board");
    assert.ok(report.learningCurve.length >= 2);
    assert.doesNotMatch(JSON.stringify(report), /\d+\s*mg/i);
    assert.doesNotMatch(report.disclaimer, /prescrib/i);
  });
});
