"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Badge = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  current: number;
  target: number;
  progressPercent: number;
};

type Report = {
  xp: number;
  bestStreak: number;
  totalLessonsCompleted: number;
  totalQuizCorrect: number;
  coursesTouched: number;
  earnedCount: number;
  badges: Badge[];
  note: string;
  disclaimer: string;
};

export default function BadgesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [msg, setMsg] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "badges@materiatest.za",
        mode: "student",
        tier: "student",
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

  async function load() {
    setMsg("");
    const uid = await ensureStudent();
    // Best-effort: complete first lesson so streak/XP aren't empty on first visit
    try {
      const list = await fetch(`${API}/academy/courses`).then((r) => r.json());
      const first = Array.isArray(list.courses) ? list.courses[0] : null;
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
      /* ignore */
    }
    const res = await fetch(`${API}/academy/gamification/${uid}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not load badges"));
      setReport(null);
      return;
    }
    setReport(data);
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "academy_badges" }} />
      <h1>Badges &amp; streaks</h1>
      <p className="tagline">Earn XP and Spec badges as you complete Academy lessons — §7.2.</p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void load()}>
          Refresh my progress
        </button>
      </div>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      {report && (
        <>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>{report.xp}</strong> XP · streak <strong>{report.bestStreak}</strong> ·{" "}
            <strong>{report.earnedCount}</strong>/{report.badges.length} badges ·{" "}
            <strong>{report.totalLessonsCompleted}</strong> lessons ·{" "}
            <strong>{report.totalQuizCorrect}</strong> quiz correct
            <p className="muted">{report.note}</p>
            <p className="muted">{report.disclaimer}</p>
          </div>
          {report.badges.map((b) => (
            <article key={b.id} className="card" style={{ marginTop: 12 }}>
              <p className="pearl-reason">{b.earned ? "Earned" : `${b.progressPercent}%`}</p>
              <h2 style={{ marginTop: 0, fontSize: 18 }}>{b.title}</h2>
              <p style={{ marginBottom: 8 }}>{b.description}</p>
              <div className="muted">
                {b.current}/{b.target}
              </div>
              <div
                style={{
                  marginTop: 8,
                  height: 8,
                  background: "rgba(0,0,0,0.08)",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${b.progressPercent}%`,
                    height: "100%",
                    background: b.earned ? "var(--deep-teal)" : "var(--ink)",
                  }}
                />
              </div>
            </article>
          ))}
        </>
      )}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
