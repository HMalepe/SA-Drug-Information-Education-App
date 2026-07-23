import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BADGE_CATALOGUE,
  evaluateBadges,
  multiBrandMoleculeIds,
  type Course,
  type Molecule,
  type Product,
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
    id: "mol-ena",
    slug: "enalapril",
    innName: "Enalapril",
    className: "ACE inhibitor",
    therapeuticArea: "antihypertensives",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-met",
    slug: "metformin",
    innName: "Metformin",
    className: "Biguanide",
    therapeuticArea: "diabetes",
    synonyms: [],
    publishState: "published",
  },
];

const courses: Array<Course & { lessons: Array<{ id: string }> }> = [
  {
    id: "c-amox",
    moleculeId: "mol-amox",
    title: "Amoxicillin",
    publishState: "published",
    lessons: Array.from({ length: 20 }, (_, i) => ({ id: `a${i}` })),
  },
  {
    id: "c-ena",
    moleculeId: "mol-ena",
    title: "Enalapril",
    publishState: "published",
    lessons: [{ id: "e1" }, { id: "e2" }],
  },
  {
    id: "c-met",
    moleculeId: "mol-met",
    title: "Metformin",
    publishState: "published",
    lessons: [{ id: "m1" }],
  },
];

const products: Product[] = [
  {
    id: "p1",
    moleculeId: "mol-amox",
    manufacturerId: "m",
    brandName: "Amoxil",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "p2",
    moleculeId: "mol-amox",
    manufacturerId: "m",
    brandName: "Aspen Amoxicillin",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
];

describe("v46 gamification badges §7.2", () => {
  it("exposes the Build Spec badge catalogue", () => {
    assert.ok(BADGE_CATALOGUE.some((b) => b.id === "antibiotic_explorer"));
    assert.ok(BADGE_CATALOGUE.some((b) => b.id === "generic_genius"));
    assert.equal(multiBrandMoleculeIds(products).has("mol-amox"), true);
  });

  it("awards badges from progress without inventing clinical content", () => {
    const report = evaluateBadges({
      userId: "u1",
      progress: [
        {
          userId: "u1",
          courseId: "c-amox",
          completedLessonIds: Array.from({ length: 20 }, (_, i) => `a${i}`),
          quizCorrect: 15,
          quizAttempts: 16,
          streak: 8,
          updatedAt: "2026-07-23T10:00:00.000Z",
        },
        {
          userId: "u1",
          courseId: "c-ena",
          completedLessonIds: ["e1", "e2"],
          quizCorrect: 0,
          quizAttempts: 0,
          streak: 2,
          updatedAt: "2026-07-23T11:00:00.000Z",
        },
        {
          userId: "u1",
          courseId: "c-met",
          completedLessonIds: ["m1"],
          quizCorrect: 0,
          quizAttempts: 0,
          streak: 1,
          updatedAt: "2026-07-23T12:00:00.000Z",
        },
      ],
      courses,
      molecules,
      products,
    });

    assert.equal(report.bestStreak, 8);
    assert.equal(report.xp, 20 * 10 + 15 * 5 + 2 * 10 + 1 * 10);
    const byId = Object.fromEntries(report.badges.map((b) => [b.id, b]));
    assert.equal(byId.antibiotic_explorer?.earned, true);
    assert.equal(byId.cardiologist?.earned, true);
    assert.equal(byId.endocrine_expert?.earned, true);
    assert.equal(byId.pk_master?.earned, true);
    assert.equal(byId.generic_genius?.earned, false);
    assert.equal(byId.generic_genius?.current, 1);
    assert.match(report.disclaimer, /not clinical credentials/i);
  });
});
