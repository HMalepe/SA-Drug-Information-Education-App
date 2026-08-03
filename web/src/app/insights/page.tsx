"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

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

type MasteryRow = {
  label: string;
  courses: number;
  avgCompletionPercent: number;
  quizAccuracyPercent: number;
};

type Personal = {
  learningCurve: Array<{
    dateKey: string;
    lessonsCompleted: number;
    quizzesAnswered: number;
    moleculeViews: number;
  }>;
  masteryByTherapeuticArea: MasteryRow[];
  masteryByClass: MasteryRow[];
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

function EmptyNote({ label }: { label: string }) {
  return <p className="muted">No {label} yet.</p>;
}

function LearningCurveTable({
  rows,
}: {
  rows: Personal["learningCurve"];
}) {
  if (rows.length === 0) return <EmptyNote label="learning-curve days" />;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 8 }}>
      <thead>
        <tr className="muted" style={{ textAlign: "left" }}>
          <th style={{ padding: "4px 8px 4px 0" }}>Date</th>
          <th style={{ padding: 4 }}>Lessons</th>
          <th style={{ padding: 4 }}>Quizzes</th>
          <th style={{ padding: 4 }}>Views</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.dateKey}>
            <td style={{ padding: "4px 8px 4px 0" }}>{r.dateKey}</td>
            <td style={{ padding: 4 }}>{r.lessonsCompleted}</td>
            <td style={{ padding: 4 }}>{r.quizzesAnswered}</td>
            <td style={{ padding: 4 }}>{r.moleculeViews}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MasteryTable({ rows }: { rows: MasteryRow[] }) {
  if (rows.length === 0) return <EmptyNote label="mastery rows" />;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginTop: 8 }}>
      <thead>
        <tr className="muted" style={{ textAlign: "left" }}>
          <th style={{ padding: "4px 8px 4px 0" }}>Label</th>
          <th style={{ padding: 4 }}>Courses</th>
          <th style={{ padding: 4 }}>Avg complete %</th>
          <th style={{ padding: 4 }}>Quiz accuracy %</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td style={{ padding: "4px 8px 4px 0" }}>{r.label}</td>
            <td style={{ padding: 4 }}>{r.courses}</td>
            <td style={{ padding: 4 }}>{r.avgCompletionPercent}</td>
            <td style={{ padding: 4 }}>{r.quizAccuracyPercent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MoleculeViewsList({ rows }: { rows: Array<{ slug: string; views: number }> }) {
  if (rows.length === 0) return <EmptyNote label="molecule views" />;
  return (
    <ol style={{ paddingLeft: 20, marginTop: 8, marginBottom: 0 }}>
      {rows.map((r) => (
        <li key={r.slug}>
          {r.slug} — {r.views} view{r.views === 1 ? "" : "s"}
        </li>
      ))}
    </ol>
  );
}

function ToolUsesList({ rows }: { rows: Array<{ tool: string; uses: number }> }) {
  if (rows.length === 0) return <EmptyNote label="tool uses" />;
  return (
    <ol style={{ paddingLeft: 20, marginTop: 8, marginBottom: 0 }}>
      {rows.map((r) => (
        <li key={r.tool}>
          {r.tool} — {r.uses} use{r.uses === 1 ? "" : "s"}
        </li>
      ))}
    </ol>
  );
}

function EventCountsList({ byName }: { byName: Record<string, number> }) {
  const entries = Object.entries(byName).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return <EmptyNote label="events" />;
  return (
    <ul style={{ paddingLeft: 20, marginTop: 8, marginBottom: 0 }}>
      {entries.map(([name, count]) => (
        <li key={name}>
          {name} — {count}
        </li>
      ))}
    </ul>
  );
}

export default function InsightsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [personal, setPersonal] = useState<Personal | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function loadProduct() {
    const res = await fetch(`${API}/analytics/summary`);
    setSummary(await res.json());
  }

  async function ensurePro(): Promise<string | null> {
    if (userId) return userId;
    try {
      const id = await createStubSession({
        email: "insights@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
        subscribeTier: "professional",
      });
      setUserId(id);
      return id;
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not create session");
      return null;
    }
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
    if (!uid) return;
    await seedDemoActivity(uid);
    // brief delay so fire-and-forget events land in the in-memory buffer
    await new Promise((r) => setTimeout(r, 200));
    const res = await fetch(`${API}/analytics/personal/${uid}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(formatApiError(data.error, "Could not load personal analytics"));
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
              <LearningCurveTable rows={personal.learningCurve} />
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Mastery by therapeutic area</strong>
              <MasteryTable rows={personal.masteryByTherapeuticArea} />
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Mastery by class</strong>
              <MasteryTable rows={personal.masteryByClass} />
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Your top molecules</strong>
              <MoleculeViewsList rows={personal.topMolecules} />
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Your top tools</strong>
              <ToolUsesList rows={personal.topTools} />
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
            <EventCountsList byName={summary.byName} />
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>Top molecules</strong>
            <MoleculeViewsList rows={summary.topMolecules} />
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>Top tools</strong>
            <ToolUsesList rows={summary.topTools} />
          </div>
        </>
      )}
    </>
  );
}
