"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type DueCard = {
  id: string;
  kind: string;
  prompt: string;
  answer: string;
  teachFromMiss?: string;
  moleculeName?: string;
  therapeuticArea?: string;
  state: { dueOn: string; ease: number; lapses: number };
};

export default function ReviewPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [weak, setWeak] = useState("antibiotics");
  const [due, setDue] = useState<DueCard[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [meta, setMeta] = useState("");
  const [err, setErr] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "review@materiatest.za",
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

  async function loadSession() {
    setErr("");
    setRevealed(false);
    setIdx(0);
    const uid = await ensureStudent();
    const qs = new URLSearchParams({ weak, limit: "10" });
    const res = await fetch(`${API}/academy/review/${uid}?${qs}`);
    const data = await res.json();
    if (res.status === 402) {
      setErr(String(data.error ?? "Student tier required"));
      setDue([]);
      return;
    }
    setDue(Array.isArray(data.due) ? data.due : []);
    setMeta(
      `${data.dateKey ?? ""} · pool ${data.poolSize ?? 0} · weak ${((data.weakAreas as string[]) ?? []).join(", ") || "—"} · ${data.note ?? ""}`,
    );
  }

  async function grade(g: "again" | "hard" | "good" | "easy") {
    if (!userId || !due[idx]) return;
    await fetch(`${API}/academy/review/${userId}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cardId: due[idx].id, grade: g }),
    });
    setRevealed(false);
    if (idx + 1 < due.length) setIdx(idx + 1);
    else await loadSession();
  }

  const card = due[idx];

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "spaced_repetition" }} />
      <h1>Spaced review</h1>
      <p className="tagline">
        Anki-style retention from published Academy quizzes and pearls — never invents clinical facts.
      </p>
      <div className="card">
        <label className="muted">Prefer weak areas</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={weak}
          onChange={(e) => setWeak(e.target.value)}
          placeholder="antibiotics, diabetes"
        />
        <button className="btn" type="button" onClick={() => void loadSession()}>
          Start today&apos;s queue
        </button>
      </div>
      {err && <p className="muted">{err}</p>}
      {meta && <p className="muted">{meta}</p>}
      {card ? (
        <div className="card" style={{ marginTop: 12 }}>
          <p className="pearl-reason">
            {card.kind} · {card.moleculeName ?? "molecule"} · {idx + 1}/{due.length}
          </p>
          <h2 style={{ marginTop: 0 }}>{card.prompt}</h2>
          {revealed ? (
            <>
              <p style={{ lineHeight: 1.5 }}>
                <strong>Answer:</strong> {card.answer}
              </p>
              {card.teachFromMiss && (
                <p className="muted">{card.teachFromMiss}</p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                <button className="btn" type="button" onClick={() => void grade("again")}>
                  Again
                </button>
                <button className="btn" type="button" onClick={() => void grade("hard")}>
                  Hard
                </button>
                <button className="btn" type="button" onClick={() => void grade("good")}>
                  Good
                </button>
                <button
                  className="btn"
                  type="button"
                  style={{ background: "var(--ink)" }}
                  onClick={() => void grade("easy")}
                >
                  Easy
                </button>
              </div>
            </>
          ) : (
            <button className="btn" type="button" onClick={() => setRevealed(true)}>
              Reveal answer
            </button>
          )}
        </div>
      ) : (
        meta && <p className="muted">No cards in the current queue.</p>
      )}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
