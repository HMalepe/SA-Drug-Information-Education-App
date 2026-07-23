import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  courseCompletionPercent,
  expertLevelFromPercent,
  gateFeature,
  gradeQuizAnswer,
  tierAllows,
  type QuizQuestion,
} from "@materia/shared";

const q: QuizQuestion = {
  id: "q1",
  courseId: "c1",
  prompt: "Amoxicillin primarily works by…",
  choices: ["50S", "cell wall", "gyrase", "folate"],
  correctIndex: 1,
  teachFromMiss: "Beta-lactam — cell wall.",
  publishState: "published",
};

describe("academy tutor", () => {
  it("teaches from the miss on wrong answer", () => {
    const g = gradeQuizAnswer(q, 0);
    assert.equal(g.correct, false);
    assert.match(g.tutorMessage, /Not quite/);
    assert.match(g.tutorMessage, /cell wall/i);
  });

  it("confirms correct answers with teaching anchor", () => {
    const g = gradeQuizAnswer(q, 1);
    assert.equal(g.correct, true);
    assert.match(g.tutorMessage, /Correct/);
  });

  it("computes completion + expert level", () => {
    assert.equal(courseCompletionPercent(["a", "b"], 5), 40);
    assert.equal(expertLevelFromPercent(40), 1);
    assert.equal(expertLevelFromPercent(100), 3);
  });
});

describe("tier gates", () => {
  it("gates dose calculator to professional", () => {
    assert.equal(tierAllows("free", "dose_calculator"), false);
    assert.equal(tierAllows("professional", "dose_calculator"), true);
    assert.equal(gateFeature("free", "dose_calculator").upgradeTo, "professional");
  });

  it("allows academy sample on free", () => {
    assert.equal(tierAllows("free", "academy_sample"), true);
    assert.equal(tierAllows("free", "academy_full"), false);
  });
});
