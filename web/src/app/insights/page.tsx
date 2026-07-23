"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Summary = {
  totalEvents: number;
  byName: Record<string, number>;
  topMolecules: Array<{ slug: string; views: number }>;
  topTools: Array<{ tool: string; uses: number }>;
  gatedHits: number;
  searchCount: number;
  note: string;
};

type Personal = {
  learningCurve: Array<{
    dateKey: string;
    lessonsCompleted: number;
    quizzesAnswered: number;
    moleculeViews: number;
  }>;
  masteryByTherapeuticArea: Array<{
    label: string;
    courses: number;
    avgCompletionPercent: number;
    quizAccuracyPercent: number;
  }>;
  masteryByClass: Array<{
    label: string;
    courses: number;
    avgCompletionPercent: number;
    quizAccuracyPercent: number;
  }>;
  topMolecules: Array<{ slug: string; views: number }>;
  topTools: Array<{ tool: string; uses: number }>;
  totals: {
    coursesTouched: number;
    lessonsCompleted: number;
    quizAttempts: number;
    quizCorrect: number;
    bestStreak: number;
    moleculeViews: number;
  };
  note: string;
  disclaimer: string;
};

export default function InsightsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [personal, setPersonal] = useState<Personal | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function loadProduct() {
    const res = await fetch(`${API}/analytics/summary`);
    setSummary(await res.json());
  }

  async function ensurePro() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "insights@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
      }),
    });
    const data = await res.json();
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id, tier: "professional" }),
    });
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function seedDemoActivity(uid: string) {
    // Tag a few POPIA-safe events so personal look-ups / curve have something to show
    const day = "2026-07-23";
    for (const slug of ["amoxicillin", "amoxicillin", "enalapril"]) {
      track("molecule_viewed", { moleculeSlug: slug, userBucket: uid }, { tier: "professional" });
    }
    track("lesson_completed", { courseId: "demo", userBucket: uid }, { tier: "professional" });
    track("quiz_answered", { courseId: "demo", correct: true, userBucket: uid }, { tier: "professional" });
    track("tool_used", { tool: "personal_analytics", userBucket: uid }, { tier: "professional" });
    // Touch academy progress if amoxicillin course exists
    try {
      const courses = await fetch(`${API}/academy/courses`).then((r) => r.json());
      const first = Array.isArray(courses.courses) ? courses.courses[0] : null;
      if (first?.id) {
        const detail = await fetch(`${API}/academy/courses/${first.id}?userId=${uid}`).then((r) =>
          r.json(),
        );
        const lessonId = detail.lessons?.[0]?.id;
        if (lessonId) {
          await fetch(`${API}/academy/courses/${first.id}/lessons/${lessonId}/complete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: uid }),
          });
        }
      }
    } catch {
      /* demo seed best-effort */
    }
    void day;
  }

  async function loadPersonal() {
    setMsg("");
    const uid = await ensurePro();
    await seedDemoActivity(uid);
    // brief delay so fire-and-forget events land in the in-memory buffer
    await new Promise((r) => setTimeout(r, 200));
    const res = await fetch(`${API}/analytics/personal/${uid}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not load personal analytics"));
      setPersonal(null);
      return;
    }
    setPersonal(data);
    await loadProduct();
  }

  useEffect(() => {
    void loadProduct();
  }, []);

  return (
    <>
      <h1>Insights</h1>
      <p className="tagline">
        Product pulse (Doc 20) plus Professional personal analytics (Build Spec §12).
      </p>

      <div className="card">
        <h2 style={{ marginTop: 0, fontSize: 18 }}>Personal analytics (§12)</h2>
        <p className="muted" style={{ marginTop: 0 }}>
          Your learning curve, mastery by area/class, and most-looked-up molecules — self-knowledge,
          not a clinical score.
        </p>
        <button className="btn" type="button" onClick={() => void loadPersonal()}>
          Load my Pro analytics
        </button>
        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
        {personal && (
          <>
            <p className="muted" style={{ marginTop: 12 }}>
              {personal.disclaimer}
            </p>
            <div style={{ marginTop: 12 }}>
              <strong>{personal.totals.coursesTouched}</strong> courses ·{" "}
              <strong>{personal.totals.lessonsCompleted}</strong> lessons ·{" "}
              <strong>{personal.totals.quizCorrect}</strong>/{personal.totals.quizAttempts} quiz ·
              streak <strong>{personal.totals.bestStreak}</strong> ·{" "}
              <strong>{personal.totals.moleculeViews}</strong> tagged views
            </div>
            <div style={{ marginTop: 16 }}>
              <strong>Learning curve</strong>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(personal.learningCurve, null, 2)}
              </pre>
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Mastery by therapeutic area</strong>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(personal.masteryByTherapeuticArea, null, 2)}
              </pre>
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Mastery by class</strong>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(personal.masteryByClass, null, 2)}
              </pre>
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Your top molecules</strong>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(personal.topMolecules, null, 2)}
              </pre>
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Your top tools</strong>
              <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
                {JSON.stringify(personal.topTools, null, 2)}
              </pre>
            </div>
            <p className="muted">{personal.note}</p>
          </>
        )}
      </div>

      <h2 style={{ marginTop: 28, fontSize: 20 }}>Product analytics</h2>
      <button className="btn" type="button" onClick={() => void loadProduct()}>
        Refresh product summary
      </button>
      {!summary ? (
        <p className="muted">Loading…</p>
      ) : (
        <>
          <div className="card" style={{ marginTop: 16 }}>
            <strong>{summary.totalEvents}</strong> events ·{" "}
            <strong>{summary.searchCount}</strong> searches ·{" "}
            <strong>{summary.gatedHits}</strong> gated hits
            <p className="muted">{summary.note}</p>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>By event</strong>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {JSON.stringify(summary.byName, null, 2)}
            </pre>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>Top molecules</strong>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {JSON.stringify(summary.topMolecules, null, 2)}
            </pre>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>Top tools</strong>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {JSON.stringify(summary.topTools, null, 2)}
            </pre>
          </div>
        </>
      )}
    </>
  );
}
