"use client";

import { useState } from "react";
import { MODE_STORAGE_KEY, useUserMode, WEB_USER_MODES } from "@/components/ModeProvider";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function OnboardingPage() {
  const { mode, setMode } = useUserMode();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  async function createSession(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mode }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(JSON.stringify(data.error));
      return;
    }
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
    setUserId(data.user.id);
    setMsg(`Session ready as ${mode}. Accept disclaimers below.`);
  }

  async function accept(consentType: "popia" | "medical_disclaimer") {
    if (!userId) return;
    await fetch(`${API}/consent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, consentType, version: "2026-07-01" }),
    });
    setMsg((m) => `${m} · Logged ${consentType}`);
  }

  return (
    <>
      <h1>Who are you?</h1>
      <p className="tagline">One object, many lenses — pick your mode (Build Spec §5.7 / Doc 8).</p>
      <form className="card" onSubmit={createSession}>
        <label className="muted">Email</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 12 }}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {WEB_USER_MODES.map((m) => (
            <button
              key={m}
              type="button"
              className={`tab${mode === m ? " active" : ""}`}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <button className="btn" type="submit">
          Continue
        </button>
      </form>
      {userId && (
        <div className="card">
          <p>
            Materia is a <strong>reference / education</strong> tool — not emergency care and not a
            medical device that directs treatment for a specific patient.
          </p>
          <button className="btn" type="button" onClick={() => accept("medical_disclaimer")}>
            I understand — medical disclaimer
          </button>{" "}
          <button className="btn" type="button" onClick={() => accept("popia")} style={{ background: "var(--ink)" }}>
            POPIA consent (account data)
          </button>
        </div>
      )}
      {msg && <p className="muted">{msg}</p>}
      <p>
        <a href="/molecules/amoxicillin">Skip to Amoxicillin 360°</a>
      </p>
    </>
  );
}
