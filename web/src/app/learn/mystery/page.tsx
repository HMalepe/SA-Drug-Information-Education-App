"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Hint = { kind: string; label: string; text: string };

export default function MysteryPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<Hint[]>([]);
  const [guess, setGuess] = useState("");
  const [msg, setMsg] = useState("");
  const [note, setNote] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "mystery@materiatest.za",
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

  async function start() {
    setMsg("");
    const uid = await ensureStudent();
    const res = await fetch(`${API}/academy/mystery/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not start"));
      return;
    }
    setRoundId(data.roundId);
    setUnlocked(Array.isArray(data.unlockedHints) ? data.unlockedHints : []);
    setNote(data.note ?? "");
  }

  async function moreHint() {
    if (!userId || !roundId) return;
    const res = await fetch(`${API}/academy/mystery/${roundId}/hint`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Hint failed"));
      return;
    }
    setUnlocked(Array.isArray(data.unlockedHints) ? data.unlockedHints : []);
  }

  async function submitGuess() {
    if (!userId || !roundId) return;
    const res = await fetch(`${API}/academy/mystery/${roundId}/guess`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, guess }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Guess failed"));
      return;
    }
    setMsg(`${data.message} ${data.teachNote ?? ""}`);
    if (data.view?.unlockedHints) setUnlocked(data.view.unlockedHints);
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "mystery_molecule" }} />
      <h1>Mystery Molecule</h1>
      <p className="tagline">
        Unlock hints in order — mechanism → class → area → SA brands — then name the molecule.
      </p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void start()}>
          New round
        </button>{" "}
        <button className="btn" type="button" disabled={!roundId} onClick={() => void moreHint()}>
          Unlock next hint
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      <div className="pearl-feed">
        {unlocked.map((h) => (
          <article key={`${h.kind}-${h.label}`} className="pearl-card">
            <p className="pearl-reason">{h.label}</p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{h.text}</p>
          </article>
        ))}
      </div>
      {roundId && (
        <div className="card" style={{ marginTop: 12 }}>
          <label className="muted">Your guess (INN or slug)</label>
          <input
            style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="e.g. amoxicillin"
          />
          <button className="btn" type="button" onClick={() => void submitGuess()}>
            Submit guess
          </button>
        </div>
      )}
      {msg && <p>{msg}</p>}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
