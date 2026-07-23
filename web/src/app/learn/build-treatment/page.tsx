"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Option = { id: string; label: string };

export default function BuildTreatmentPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [vignette, setVignette] = useState("");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "buildtreatment@materiatest.za",
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
    setOptions([]);
    const uid = await ensureStudent();
    const res = await fetch(`${API}/academy/build-treatment/start`, {
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
    setTitle(data.case?.title ?? "");
    setVignette(data.case?.vignette ?? "");
    setPrompt(data.case?.prompt ?? "");
    setOptions(Array.isArray(data.case?.options) ? data.case.options : []);
    setNote(data.note ?? "");
  }

  async function choose(chosenOptionId: string) {
    if (!userId || !roundId) return;
    const res = await fetch(`${API}/academy/build-treatment/${roundId}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, chosenOptionId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResult(String(data.error ?? "Grade failed"));
      return;
    }
    setResult(
      `${data.message}\n\n${data.explanation}${
        data.relatedMoleculeSlug ? `\n\nDeepen: /molecules/${data.relatedMoleculeSlug}` : ""
      }`,
    );
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "build_treatment" }} />
      <h1>Build the Treatment</h1>
      <p className="tagline">
        Read the case, pick the educational class — then learn the reasoning.
      </p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void start()}>
          New case
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      {vignette && (
        <div className="card" style={{ marginTop: 12 }}>
          <p className="pearl-reason">{title}</p>
          <p style={{ lineHeight: 1.5 }}>{vignette}</p>
          <h2 style={{ marginTop: 16, fontSize: 18 }}>{prompt}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
            {options.map((o) => (
              <button
                key={o.id}
                className="btn"
                type="button"
                style={{ textAlign: "left", background: "var(--ink)" }}
                onClick={() => void choose(o.id)}
              >
                {o.label}
              </button>
            ))}
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
