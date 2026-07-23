"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Weak = {
  therapeuticArea: string;
  quizAccuracyPercent: number;
  quizAttempts: number;
  reason: string;
};

type CourseRec = {
  courseId: string;
  title: string;
  moleculeName: string;
  therapeuticArea: string;
  path: string;
};

type CardRec = {
  cardId: string;
  kind: string;
  prompt: string;
  therapeuticArea: string;
  moleculeName?: string;
};

export default function AdaptivePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [forDate, setForDate] = useState("");
  const [note, setNote] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [weakAreas, setWeakAreas] = useState<Weak[]>([]);
  const [courses, setCourses] = useState<CourseRec[]>([]);
  const [cards, setCards] = useState<CardRec[]>([]);
  const [msg, setMsg] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "adaptive@materiatest.za",
        mode: "student",
        tier: "student",
        displayName: "Adaptive Demo",
      }),
    });
    const data = await res.json();
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id, tier: "student" }),
    });
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function seedQuizMiss() {
    const uid = await ensureStudent();
    try {
      const list = await fetch(`${API}/academy/courses`).then((r) => r.json());
      const first = Array.isArray(list.courses) ? list.courses[0] : null;
      if (!first?.id) return;
      const detail = await fetch(`${API}/academy/courses/${first.id}?userId=${uid}`).then((r) =>
        r.json(),
      );
      const quiz = Array.isArray(detail.quiz) ? detail.quiz[0] : null;
      if (quiz?.id) {
        // Wrong index on purpose to create a weak-area signal
        await fetch(`${API}/academy/quiz/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: uid,
            courseId: first.id,
            questionId: quiz.id,
            selectedIndex: Math.max(1, (quiz.choices?.length ?? 2) - 1),
          }),
        });
        await fetch(`${API}/academy/quiz/answer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: uid,
            courseId: first.id,
            questionId: quiz.id,
            selectedIndex: Math.max(1, (quiz.choices?.length ?? 2) - 1),
          }),
        });
      }
    } catch {
      /* best-effort demo seed */
    }
  }

  async function load() {
    setMsg("");
    await seedQuizMiss();
    const uid = await ensureStudent();
    const res = await fetch(
      `${API}/academy/adaptive/${encodeURIComponent(uid)}?asOf=2026-07-23&aheadDays=1`,
    );
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not load adaptive session"));
      return;
    }
    setForDate(data.forDate ?? "");
    setNote(data.note ?? "");
    setDisclaimer(data.disclaimer ?? "");
    setWeakAreas(Array.isArray(data.weakAreas) ? data.weakAreas : []);
    setCourses(Array.isArray(data.recommendedCourses) ? data.recommendedCourses : []);
    setCards(Array.isArray(data.recommendedReviewCards) ? data.recommendedReviewCards : []);
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "adaptive_learning" }} />
      <h1>Adaptive session</h1>
      <p className="tagline">
        Tomorrow&apos;s plan from your quiz gaps (§7.5) — published Academy content only.
      </p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void load()}>
          Build tomorrow&apos;s session
        </button>
      </div>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      {note && (
        <div className="card" style={{ marginTop: 12 }}>
          {forDate && (
            <p className="muted" style={{ marginTop: 0 }}>
              For {forDate}
            </p>
          )}
          <p>{note}</p>
          <p className="muted" style={{ fontSize: 13 }}>
            {disclaimer}
          </p>
        </div>
      )}
      {weakAreas.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Weak areas</h2>
          {weakAreas.map((w) => (
            <article key={w.therapeuticArea} style={{ marginTop: 10 }}>
              <strong>{w.therapeuticArea}</strong>
              <div className="muted">
                {w.quizAccuracyPercent}% accuracy · {w.quizAttempts} attempt(s)
              </div>
              <p style={{ margin: "4px 0 0" }}>{w.reason}</p>
            </article>
          ))}
        </div>
      )}
      {courses.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Recommended courses</h2>
          <ul style={{ paddingLeft: 18 }}>
            {courses.map((c) => (
              <li key={c.courseId} style={{ marginBottom: 8 }}>
                <a href={c.path}>
                  {c.title} · {c.moleculeName}
                </a>
                <div className="muted">{c.therapeuticArea}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cards.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Recommended review prompts</h2>
          {cards.map((c) => (
            <article key={c.cardId} style={{ marginTop: 10 }}>
              <div className="muted">
                {c.kind} · {c.therapeuticArea}
                {c.moleculeName ? ` · ${c.moleculeName}` : ""}
              </div>
              <p style={{ margin: "4px 0 0" }}>{c.prompt}</p>
            </article>
          ))}
          <p style={{ marginTop: 12 }}>
            <a className="btn" href="/learn/review">
              Open spaced review
            </a>
          </p>
        </div>
      )}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
