"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { formatApiError, messageFromHttpErrorBody } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

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
  typicalStrengths: string[];
  counsellingLangs: Array<{ code?: string; lang?: string; label: string; lineCount: number }>;
  counsellingTeaserEn: string | null;
  packagingExercisePath: string;
  note: string;
  disclaimer: string;
}

/** Quiz feedback — never dumps raw API JSON into the grade box. */
function formatQuizGradeMsg(
  ok: boolean,
  data: {
    error?: unknown;
    grade?: { tutorMessage?: string; correct?: boolean };
  },
): string {
  if (!ok || data.error) {
    return `Error: ${formatApiError(
      data.error,
      data.error ? "Could not grade answer" : "Request failed",
    )}`;
  }
  if (data.grade?.tutorMessage) return data.grade.tutorMessage;
  return "Answer recorded — no tutor message returned.";
}

async function readJson(res: Response): Promise<Record<string, unknown>> {
  const raw = await res.text();
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error(messageFromHttpErrorBody(raw, `HTTP ${res.status}`));
  }
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
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  async function ensureUser() {
    if (userId) return userId;
    const id = await createStubSession({
      email,
      mode: "student",
      tier: "student",
    });
    setUserId(id);
    return id;
  }

  async function load(uid?: string) {
    const q = uid ? `?userId=${uid}` : "";
    const res = await fetch(`${API}/academy/courses/${courseId}${q}`);
    const data = await readJson(res);
    if (!res.ok) {
      throw new Error(formatApiError(data.error ?? data, "Could not load course"));
    }
    const course = data.course as
      | { title?: string; lessons?: Lesson[]; quiz?: QuizQ[] }
      | undefined;
    setTitle(typeof course?.title === "string" ? course.title : "");
    setLessons(Array.isArray(course?.lessons) ? course.lessons : []);
    setQuiz(Array.isArray(course?.quiz) ? course.quiz : []);
    setProgress(
      data.progress && typeof data.progress === "object"
        ? (data.progress as {
            completionPercent: number;
            expertLevel: number;
            completedLessonIds: string[];
          })
        : null,
    );
    setSaFocus((data.saFocus as SaFocus | null | undefined) ?? null);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        await load();
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Could not load course");
          setTitle("");
          setLessons([]);
          setQuiz([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [courseId]);

  async function completeLesson() {
    if (busy) return;
    const lesson = lessons[activeLesson];
    if (!lesson) return;
    setBusy(true);
    setError("");
    try {
      const uid = await ensureUser();
      const res = await fetch(`${API}/academy/lessons/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, courseId, lessonId: lesson.id }),
      });
      const data = await readJson(res);
      if (!res.ok) {
        setError(formatApiError(data.error ?? data, "Could not complete lesson"));
        return;
      }
      if (data.saFocus) setSaFocus(data.saFocus as SaFocus);
      track("lesson_completed", { courseId, lessonId: lesson.id });
      await load(uid);
      if (activeLesson < lessons.length - 1) setActiveLesson((i) => i + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not complete lesson");
    } finally {
      setBusy(false);
    }
  }

  async function answerQuiz(questionId: string, selectedIndex: number) {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const uid = await ensureUser();
      const res = await fetch(`${API}/academy/quiz/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, courseId, questionId, selectedIndex }),
      });
      const data = await readJson(res);
      track("quiz_answered", {
        courseId,
        correct: Boolean(
          data.grade &&
            typeof data.grade === "object" &&
            (data.grade as { correct?: boolean }).correct,
        ),
      });
      setGradeMsg(formatQuizGradeMsg(res.ok, data as Parameters<typeof formatQuizGradeMsg>[1]));
      if (res.ok) await load(uid);
    } catch (e) {
      setGradeMsg(`Error: ${e instanceof Error ? e.message : "Could not grade answer"}`);
    } finally {
      setBusy(false);
    }
  }

  const lesson = lessons[activeLesson];

  return (
    <div>
      <h1>{loading ? "Loading…" : title || "Course"}</h1>
      {error ? (
        <p className="muted" role="alert">
          {error}
        </p>
      ) : null}
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
          disabled={busy}
        />
      </div>
      {lesson && (
        <section className="card">
          <p className="muted">
            Lesson {lesson.order} / {lessons.length}
          </p>
          <h2 style={{ marginTop: 0 }}>{lesson.title}</h2>
          <p style={{ lineHeight: 1.55 }}>{lesson.body}</p>
          <button
            className="btn"
            type="button"
            disabled={busy}
            onClick={() => void completeLesson()}
          >
            {busy ? "Working…" : "Mark complete & continue"}
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
          <p className="muted" style={{ marginTop: 8 }}>
            Typical pack strengths (published rows only — not a prescribed dose):{" "}
            {saFocus.typicalStrengths?.length
              ? saFocus.typicalStrengths.join(" · ")
              : "none published yet"}
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
                disabled={busy}
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
