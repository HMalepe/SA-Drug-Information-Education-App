"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function MyMedsPage() {
  const [email, setEmail] = useState("patient@materiatest.za");
  const [userId, setUserId] = useState<string | null>(null);
  const [nowHhmm, setNowHhmm] = useState("08:00");
  const [msg, setMsg] = useState("");
  const [regimenNote, setRegimenNote] = useState("");
  const [out, setOut] = useState("");

  async function start() {
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mode: "patient", tier: "free" }),
    });
    const data = await res.json();
    setUserId(data.user.id);
    setMsg("Session ready. Sample Amoxicillin regimen (support only).");
    await fetch(`${API}/companion/regimen/${data.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            moleculeId: "mol-amox",
            moleculeName: "Amoxicillin",
            brandName: "Amoxil",
            reminderTimes: ["08:00", "20:00"],
          },
        ],
      }),
    });
    await fetch(`${API}/companion/reminders/prefs/${data.user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        channels: ["in_app", "email"],
        email,
        timezone: "Africa/Johannesburg",
        consentMessaging: true,
      }),
    });
    const check = await fetch(`${API}/companion/interactions/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id }),
    });
    const clash = await check.json();
    if (check.status === 402) {
      setRegimenNote(`${clash.error} — upgrade to Student for full interaction check.`);
    } else {
      setRegimenNote(clash.note);
    }
  }

  async function preview() {
    if (!userId) return;
    const res = await fetch(`${API}/companion/reminders/${userId}?from=${nowHhmm}`);
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function dispatch() {
    if (!userId) return;
    const res = await fetch(`${API}/companion/reminders/dispatch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, nowHhmm }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <>
      <h1>My Meds</h1>
      <p className="tagline">
        Reminders and tracking — support only. Never changes your dose.
      </p>
      <div className="card">
        <input
          style={{ width: "100%", padding: 12, marginBottom: 12 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn" type="button" onClick={() => void start()}>
          Set up sample regimen + consent
        </button>
      </div>
      {userId && (
        <div className="card" style={{ marginTop: 12 }}>
          <label className="muted">Clock tick (HH:mm) for dispatch preview</label>
          <input
            style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
            value={nowHhmm}
            onChange={(e) => setNowHhmm(e.target.value)}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <button className="btn" type="button" onClick={() => void preview()}>
              Preview upcoming
            </button>
            <button className="btn" type="button" onClick={() => void dispatch()}>
              Dispatch due now
            </button>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            Email/SMS/WhatsApp stay stub-logged until Resend/Twilio keys.
          </p>
        </div>
      )}
      {userId && <p className="muted">User: {userId}</p>}
      {msg && <p>{msg}</p>}
      {regimenNote && <div className="card">{regimenNote}</div>}
      {out && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {out}
        </pre>
      )}
    </>
  );
}
