"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface Lesson {
  id: string;
  order: number;
  title: string;
  body: string;
}

interface QuizQ {
  id: string;
  prompt: string;
  choices: string[];
}

interface SaFocus {
  moleculeName: string;
  className: string;
  therapeuticArea: string;
  originator: { brandName: string; formLabel: string; schedule: string } | null;
  generics: Array<{ brandName: string; formLabel: string; schedule: string }>;
  schedulesInUse: string[];
  packForms: string[];
  counsellingLangs: Array<{ code?: string; lang?: string; label: string; lineCount: number }>;
  counsellingTeaserEn: string | null;
  packagingExercisePath: string;
  note: string;
  disclaimer: string;
}

export function CoursePlayer({ courseId }: { courseId: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [quiz, setQuiz] = useState<QuizQ[]>([]);
  const [saFocus, setSaFocus] = useState<SaFocus | null>(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [progress, setProgress] = useState<{
    completionPercent: number;
    expertLevel: number;
    completedLessonIds: string[];
  } | null>(null);
  const [gradeMsg, setGradeMsg] = useState("");
  const [email, setEmail] = useState("student@materiatest.za");

  async function ensureUser() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mode: "student", tier: "student" }),
    });
    const data = await res.json();
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function load(uid?: string) {
    const q = uid ? `?userId=${uid}` : "";
    const res = await fetch(`${API}/academy/courses/${courseId}${q}`);
    const data = await res.json();
    setTitle(data.course.title);
    setLessons(data.course.lessons);
    setQuiz(data.course.quiz);
    setProgress(data.progress);
    setSaFocus(data.saFocus ?? null);
  }

  useEffect(() => {
    void load();
  }, [courseId]);

  async function completeLesson() {
    const uid = await ensureUser();
    const lesson = lessons[activeLesson];
    if (!lesson) return;
    const res = await fetch(`${API}/academy/lessons/complete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, courseId, lessonId: lesson.id }),
    });
    const data = await res.json();
    if (data.saFocus) setSaFocus(data.saFocus);
    track("lesson_completed", { courseId, lessonId: lesson.id });
    await load(uid);
    if (activeLesson < lessons.length - 1) setActiveLesson((i) => i + 1);
  }

  async function answerQuiz(questionId: string, selectedIndex: number) {
    const uid = await ensureUser();
    const res = await fetch(`${API}/academy/quiz/answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, courseId, questionId, selectedIndex }),
    });
    const data = await res.json();
    track("quiz_answered", {
      courseId,
      correct: Boolean(data.grade?.correct),
    });
    setGradeMsg(data.grade?.tutorMessage ?? JSON.stringify(data));
    await load(uid);
  }

  const lesson = lessons[activeLesson];

  return (
    <div>
      <h1>{title || "Loading…"}</h1>
      {progress && (
        <p className="muted">
          {progress.completionPercent}% · Expert level {progress.expertLevel} ·{" "}
          {progress.completedLessonIds.length} lessons done
        </p>
      )}
      <div className="card" style={{ marginBottom: 16 }}>
        <label className="muted">Session email (stub)</label>
        <input
          style={{ display: "block", width: "100%", marginTop: 8, padding: 10 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {lesson && (
        <section className="card">
          <p className="muted">
            Lesson {lesson.order} / {lessons.length}
          </p>
          <h2 style={{ marginTop: 0 }}>{lesson.title}</h2>
          <p style={{ lineHeight: 1.55 }}>{lesson.body}</p>
          <button className="btn" type="button" onClick={() => void completeLesson()}>
            Mark complete & continue
          </button>
        </section>
      )}
      {saFocus && (
        <section className="card" style={{ marginTop: 16 }}>
          <h2 style={{ marginTop: 0 }}>SA focus (§7.6)</h2>
          <p className="muted">
            {saFocus.moleculeName} · {saFocus.className} · {saFocus.therapeuticArea}
          </p>
          <p style={{ marginTop: 8 }}>{saFocus.note}</p>
          {saFocus.originator && (
            <p>
              <strong>Originator:</strong> {saFocus.originator.brandName} ·{" "}
              {saFocus.originator.formLabel} · {saFocus.originator.schedule}
            </p>
          )}
          {saFocus.generics.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <strong>Published SA generics</strong>
              <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
                {saFocus.generics.map((g) => (
                  <li key={g.brandName}>
                    {g.brandName} · {g.formLabel} · {g.schedule}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="muted" style={{ marginTop: 8 }}>
            Schedules: {saFocus.schedulesInUse.join(", ") || "—"} · Forms:{" "}
            {saFocus.packForms.join(", ") || "—"}
          </p>
          {saFocus.counsellingTeaserEn && (
            <p style={{ marginTop: 8, lineHeight: 1.45 }}>
              Counselling teaser (EN): {saFocus.counsellingTeaserEn}
            </p>
          )}
          <p className="muted" style={{ marginTop: 8 }}>
            Languages:{" "}
            {saFocus.counsellingLangs.map((l) => l.label).join(", ") || "none published yet"}
          </p>
          <p style={{ marginTop: 12 }}>
            <a className="btn" href={saFocus.packagingExercisePath}>
              Packaging recognition
            </a>
          </p>
          <p className="muted" style={{ marginTop: 12, fontSize: 13 }}>
            {saFocus.disclaimer}
          </p>
        </section>
      )}
      <section className="card" style={{ marginTop: 16 }}>
        <h2 style={{ marginTop: 0 }}>Quiz — teach from the miss</h2>
        {quiz.map((q) => (
          <div key={q.id} style={{ marginBottom: 16 }}>
            <p>
              <strong>{q.prompt}</strong>
            </p>
            {q.choices.map((c, i) => (
              <button
                key={c}
                type="button"
                className="tab"
                style={{ display: "block", marginBottom: 6, width: "100%", textAlign: "left" }}
                onClick={() => void answerQuiz(q.id, i)}
              >
                {c}
              </button>
            ))}
          </div>
        ))}
        {gradeMsg && <div className="source-tag">{gradeMsg}</div>}
      </section>
    </div>
  );
}
