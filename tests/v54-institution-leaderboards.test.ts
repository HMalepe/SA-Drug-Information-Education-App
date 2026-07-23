import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildInstitutionLeaderboardBundle,
  type Course,
  type Molecule,
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

const courses: Array<Course & { lessons: Array<{ id: string }> }> = [
  {
    id: "c1",
    moleculeId: "mol-amox",
    title: "Amoxicillin",
    publishState: "published",
    lessons: [{ id: "l1" }, { id: "l2" }],
  },
];

describe("v54 institution cohort leaderboards §7.2 / §11", () => {
  it("builds org seat board and scoped cohort boards without leaking outsiders or emails", () => {
    const progress = [
      {
        userId: "seat-a",
        courseId: "c1",
        completedLessonIds: ["l1", "l2"],
        quizCorrect: 3,
        quizAttempts: 3,
        streak: 4,
        updatedAt: "2026-07-23T10:00:00.000Z",
      },
      {
        userId: "seat-b",
        courseId: "c1",
        completedLessonIds: ["l1"],
        quizCorrect: 0,
        quizAttempts: 1,
        streak: 1,
        updatedAt: "2026-07-23T11:00:00.000Z",
      },
      {
        userId: "outsider",
        courseId: "c1",
        completedLessonIds: ["l1", "l2"],
        quizCorrect: 20,
        quizAttempts: 20,
        streak: 20,
        updatedAt: "2026-07-23T12:00:00.000Z",
      },
    ];

    const bundle = buildInstitutionLeaderboardBundle({
      org: { id: "org-1", name: "Demo Pharmacy School" },
      seats: [
        { orgId: "org-1", userId: "seat-a" },
        { orgId: "org-1", userId: "seat-b" },
        { orgId: "org-other", userId: "outsider" },
      ],
      cohorts: [
        {
          id: "cohort-1",
          orgId: "org-1",
          name: "Year 3 antibiotics",
          memberUserIds: ["seat-b"],
        },
      ],
      progress,
      users: [
        { id: "seat-a", displayName: "Ada Admin" },
        { id: "seat-b", displayName: "student1@materiatest.za" },
        { id: "outsider", displayName: "Outsider" },
      ],
      courses,
      molecules,
      viewerUserId: "seat-a",
    });

    assert.equal(bundle.orgBoard.scope, "institution");
    assert.equal(bundle.orgBoard.scopeLabel, "Demo Pharmacy School");
    assert.equal(bundle.orgBoard.rows.some((r) => r.userId === "outsider"), false);
    assert.equal(bundle.orgBoard.rows[0]?.userId, "seat-a");
    assert.equal(bundle.orgBoard.viewerRank, 1);

    assert.equal(bundle.cohortBoards.length, 1);
    const cohort = bundle.cohortBoards[0]!;
    assert.equal(cohort.cohortName, "Year 3 antibiotics");
    assert.equal(cohort.board.scope, "cohort");
    assert.equal(cohort.board.rows.length, 1);
    assert.equal(cohort.board.rows[0]?.userId, "seat-b");
    assert.doesNotMatch(cohort.board.rows[0]!.displayLabel, /@/);
    assert.doesNotMatch(JSON.stringify(bundle), /materiatest\.za/);
    assert.match(bundle.disclaimer, /not clinical credentials/i);
  });
});
