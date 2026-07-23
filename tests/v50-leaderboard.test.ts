import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildLeaderboard,
  leaderboardDisplayLabel,
  xpForUser,
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

describe("v50 academy leaderboards §7.2", () => {
  it("uses POPIA-safe labels (never email)", () => {
    assert.equal(leaderboardDisplayLabel({ id: "u1", displayName: "Thandi M" }, "u1"), "Thandi M");
    assert.equal(leaderboardDisplayLabel({ id: "u2", displayName: "a@b.co.za" }, "u2").includes("@"), false);
    assert.match(leaderboardDisplayLabel(undefined, "user-secret"), /^Learner /);
  });

  it("ranks by XP and reports viewer rank", () => {
    const progress = [
      {
        userId: "u-high",
        courseId: "c1",
        completedLessonIds: ["l1", "l2"],
        quizCorrect: 4,
        quizAttempts: 4,
        streak: 5,
        updatedAt: "2026-07-23T10:00:00.000Z",
      },
      {
        userId: "u-low",
        courseId: "c1",
        completedLessonIds: ["l1"],
        quizCorrect: 0,
        quizAttempts: 1,
        streak: 1,
        updatedAt: "2026-07-23T11:00:00.000Z",
      },
    ];
    assert.ok(xpForUser(progress, "u-high") > xpForUser(progress, "u-low"));

    const board = buildLeaderboard({
      progress,
      users: [
        { id: "u-high", displayName: "High Scorer" },
        { id: "u-low", displayName: "Low Scorer" },
      ],
      courses,
      molecules,
      viewerUserId: "u-low",
      limit: 10,
    });
    assert.equal(board.rows[0]?.userId, "u-high");
    assert.equal(board.rows[0]?.displayLabel, "High Scorer");
    assert.equal(board.viewerRank, 2);
    assert.equal(board.rows[1]?.isViewer, true);
    assert.doesNotMatch(JSON.stringify(board), /@/);
  });

  it("scopes cohort boards to member ids", () => {
    const progress = [
      {
        userId: "in",
        courseId: "c1",
        completedLessonIds: ["l1"],
        quizCorrect: 0,
        quizAttempts: 0,
        streak: 1,
        updatedAt: "2026-07-23T10:00:00.000Z",
      },
      {
        userId: "out",
        courseId: "c1",
        completedLessonIds: ["l1", "l2"],
        quizCorrect: 10,
        quizAttempts: 10,
        streak: 9,
        updatedAt: "2026-07-23T10:00:00.000Z",
      },
    ];
    const board = buildLeaderboard({
      progress,
      users: [{ id: "in" }, { id: "out" }, { id: "empty" }],
      courses,
      molecules,
      memberUserIds: ["in", "empty"],
      scope: "cohort",
      scopeLabel: "Class A",
    });
    assert.equal(board.scope, "cohort");
    assert.equal(board.rows.some((r) => r.userId === "out"), false);
    assert.ok(board.rows.some((r) => r.userId === "in"));
    assert.ok(board.rows.some((r) => r.userId === "empty" && r.xp === 0));
  });
});
