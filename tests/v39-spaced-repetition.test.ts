import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  applyReviewGrade,
  buildReviewSession,
  collectReviewCards,
  initialCardState,
  type Molecule,
  type ReviewCourse,
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
];

const courses: ReviewCourse[] = [
  {
    id: "course-amox",
    moleculeId: "mol-amox",
    title: "Amoxicillin",
    publishState: "published",
    quiz: [
      {
        id: "q1",
        courseId: "course-amox",
        prompt: "Amoxicillin belongs to which class?",
        choices: ["Macrolide", "Beta-lactam"],
        correctIndex: 1,
        teachFromMiss: "Cell wall — beta-lactam.",
        publishState: "published",
      },
      {
        id: "q-draft",
        courseId: "course-amox",
        prompt: "Draft?",
        choices: ["a", "b"],
        correctIndex: 0,
        teachFromMiss: "x",
        publishState: "draft",
      },
    ],
  },
];

const safety: SafetyProfile[] = [
  {
    id: "saf",
    moleculeId: "mol-amox",
    clinicalPearls: [
      {
        value: "Cell wall, not 50S ribosome.",
        sourceId: "src-edu",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
    ],
    contraindications: [],
    warnings: [],
    counsellingPoints: [],
    publishState: "published",
  },
];

describe("v39 spaced repetition §7.5", () => {
  it("collects only published quiz and pearl cards", () => {
    const cards = collectReviewCards({ courses, molecules, safetyProfiles: safety });
    assert.equal(cards.length, 2);
    assert.equal(cards.some((c) => c.id.includes("draft")), false);
  });

  it("schedules again for today and good for later", () => {
    const s0 = initialCardState("u1", "quiz:q1", "2026-07-23");
    const again = applyReviewGrade(s0, "again", "2026-07-23");
    assert.equal(again.dueOn, "2026-07-23");
    assert.equal(again.intervalDays, 0);

    const good = applyReviewGrade(s0, "good", "2026-07-23");
    assert.equal(good.dueOn, "2026-07-24");
    assert.equal(good.repetitions, 1);
  });

  it("builds a due session preferring weak areas", () => {
    const catalog = collectReviewCards({ courses, molecules, safetyProfiles: safety });
    const session = buildReviewSession({
      catalog,
      states: [],
      userId: "u1",
      dateKey: "2026-07-23",
      preferAreas: ["antibiotics"],
      limit: 5,
    });
    assert.ok(session.due.length >= 1);
    assert.equal(session.due[0]?.therapeuticArea, "antibiotics");
    assert.match(session.disclaimer, /does not direct treatment/i);
  });
});
