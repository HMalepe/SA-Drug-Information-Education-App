"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function SpotErrorPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [statement, setStatement] = useState("");
  const [moleculeName, setMoleculeName] = useState("");
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  async function ensureStudent(): Promise<string | null> {
    if (userId) return userId;
    try {
      const id = await createStubSession({
        email: "spot@materiatest.za",
        mode: "student",
        tier: "student",
        subscribeTier: "student",
      });
      setUserId(id);
      return id;
    } catch (e) {
      setResult(e instanceof Error ? e.message : "Could not create session");
      return null;
    }
  }

  async function start() {
    if (busy) return;
    setBusy(true);
    setResult("");
    try {
      const uid = await ensureStudent();
      if (!uid) return;
      const res = await fetch(`${API}/academy/spot-error/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(formatApiError(data.error, "Could not start"));
        return;
      }
      setRoundId(data.roundId);
      setStatement(data.card?.statement ?? "");
      setMoleculeName(data.card?.moleculeName ?? "");
      setNote(data.note ?? "");
    } finally {
      setBusy(false);
    }
  }

  async function choose(choice: "correct_statement" | "error") {
    if (!userId || !roundId || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`${API}/academy/spot-error/${roundId}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, choice }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(formatApiError(data.error, "Grade failed"));
        return;
      }
      setResult(
        `${data.message}\n\nVerdict: ${data.verdict}\n\n${data.explanation}${
          data.moleculeSlug ? `\n\nDeepen: /molecules/${data.moleculeSlug}` : ""
        }`,
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "spot_the_error" }} />
      <h1>Spot the Error</h1>
      <p className="tagline">
        Is this counselling statement sound — or does it hide a teaching trap?
      </p>
      <div className="card">
        <button className="btn" type="button" disabled={busy} onClick={() => void start()}>
          New statement
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      {statement && (
        <div className="card" style={{ marginTop: 12 }}>
          {moleculeName && <p className="pearl-reason">{moleculeName}</p>}
          <h2 style={{ marginTop: 0, fontSize: 20 }}>{statement}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            <button
              className="btn"
              type="button"
              disabled={busy}
              onClick={() => void choose("correct_statement")}
            >
              Sounds correct
            </button>
            <button
              className="btn"
              type="button"
              style={{ background: "var(--danger)" }}
              disabled={busy}
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
