"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function SpotErrorPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [statement, setStatement] = useState("");
  const [moleculeName, setMoleculeName] = useState("");
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "spot@materiatest.za",
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
    setResult("");
    const uid = await ensureStudent();
    const res = await fetch(`${API}/academy/spot-error/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResult(String(data.error ?? "Could not start"));
      return;
    }
    setRoundId(data.roundId);
    setStatement(data.card?.statement ?? "");
    setMoleculeName(data.card?.moleculeName ?? "");
    setNote(data.note ?? "");
  }

  async function choose(choice: "correct_statement" | "error") {
    if (!userId || !roundId) return;
    const res = await fetch(`${API}/academy/spot-error/${roundId}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, choice }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResult(String(data.error ?? "Grade failed"));
      return;
    }
    setResult(
      `${data.message}\n\nVerdict: ${data.verdict}\n\n${data.explanation}${
        data.moleculeSlug ? `\n\nDeepen: /molecules/${data.moleculeSlug}` : ""
      }`,
    );
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "spot_the_error" }} />
      <h1>Spot the Error</h1>
      <p className="tagline">
        Is this counselling statement sound — or does it hide a teaching trap?
      </p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void start()}>
          New statement
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      {statement && (
        <div className="card" style={{ marginTop: 12 }}>
          {moleculeName && <p className="pearl-reason">{moleculeName}</p>}
          <h2 style={{ marginTop: 0, fontSize: 20 }}>{statement}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            <button className="btn" type="button" onClick={() => void choose("correct_statement")}>
              Sounds correct
            </button>
            <button
              className="btn"
              type="button"
              style={{ background: "var(--danger)" }}
              onClick={() => void choose("error")}
            >
              Spot an error
            </button>
          </div>
        </div>
      )}
      {result && (
        <pre className="card" style={{ marginTop: 12, whiteSpace: "pre-wrap", fontSize: 14 }}>
          {result}
        </pre>
      )}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
