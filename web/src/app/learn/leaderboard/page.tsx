"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Row = {
  rank: number;
  displayLabel: string;
  xp: number;
  bestStreak: number;
  lessonsCompleted: number;
  badgesEarned: number;
  isViewer: boolean;
};

type Board = {
  scopeLabel: string;
  rows: Row[];
  viewerRank: number | null;
  note: string;
  disclaimer: string;
};

export default function LeaderboardPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [board, setBoard] = useState<Board | null>(null);
  const [msg, setMsg] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "leaderboard@materiatest.za",
        displayName: "Academy Demo",
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
      /* best-effort seed */
    }
    const res = await fetch(`${API}/academy/leaderboard?userId=${encodeURIComponent(uid)}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not load leaderboard"));
      setBoard(null);
      return;
    }
    setBoard(data);
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "academy_leaderboard" }} />
      <h1>Leaderboard</h1>
      <p className="tagline">
        Academy XP ranks — individual board (§7.2). Cohort / org boards live on the{" "}
        <a href="/institution">Institution console</a>.
      </p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void load()}>
          Load Academy leaderboard
        </button>
      </div>
      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      {board && (
        <>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>{board.scopeLabel}</strong>
            {board.viewerRank != null && (
              <span className="muted"> · your rank #{board.viewerRank}</span>
            )}
            <p className="muted">{board.note}</p>
            <p className="muted">{board.disclaimer}</p>
          </div>
          {board.rows.map((r) => (
            <article
              key={`${r.rank}-${r.displayLabel}`}
              className="card"
              style={{
                marginTop: 12,
                outline: r.isViewer ? "2px solid var(--deep-teal)" : undefined,
              }}
            >
              <p className="pearl-reason">
                #{r.rank}
                {r.isViewer ? " · you" : ""}
              </p>
              <h2 style={{ marginTop: 0, fontSize: 18 }}>{r.displayLabel}</h2>
              <div className="muted">
                {r.xp} XP · streak {r.bestStreak} · {r.lessonsCompleted} lessons · {r.badgesEarned}{" "}
                badges
              </div>
            </article>
          ))}
          {board.rows.length === 0 && <p className="muted">No ranked learners yet — complete a lesson.</p>}
        </>
      )}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
