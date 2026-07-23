import type { QuizQuestion } from "./types.js";

export interface QuizGradeResult {
  correct: boolean;
  selectedIndex: number;
  correctIndex: number;
  /** Teach-from-the-miss explanation (Build Spec §7.4) — never invents clinical doses */
  tutorMessage: string;
  prompt: string;
}

/**
 * Grade a quiz answer and always teach from the miss.
 * Does not reveal or invent clinical dosing values.
 */
export function gradeQuizAnswer(
  question: QuizQuestion,
  selectedIndex: number,
): QuizGradeResult {
  if (question.publishState !== "published") {
    return {
      correct: false,
      selectedIndex,
      correctIndex: question.correctIndex,
      tutorMessage: "This question is not published yet — Materia will not mark unpublished content as fact.",
      prompt: question.prompt,
    };
  }

  const correct = selectedIndex === question.correctIndex;
  if (correct) {
    return {
      correct: true,
      selectedIndex,
      correctIndex: question.correctIndex,
      tutorMessage: `Correct. ${question.teachFromMiss}`,
      prompt: question.prompt,
    };
  }

  const chosen = question.choices[selectedIndex] ?? "(no choice)";
  const right = question.choices[question.correctIndex] ?? "";
  return {
    correct: false,
    selectedIndex,
    correctIndex: question.correctIndex,
    tutorMessage: `Not quite — you picked “${chosen}”. The right model is: “${right}”. ${question.teachFromMiss}`,
    prompt: question.prompt,
  };
}

export function courseCompletionPercent(completedLessonIds: string[], totalLessons: number): number {
  if (totalLessons <= 0) return 0;
  return Math.min(100, Math.round((completedLessonIds.length / totalLessons) * 100));
}

export function expertLevelFromPercent(pct: number): number {
  if (pct >= 100) return 3;
  if (pct >= 60) return 2;
  if (pct >= 20) return 1;
  return 0;
}
