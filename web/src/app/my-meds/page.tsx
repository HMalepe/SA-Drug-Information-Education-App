"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type ClashRow = {
  id: string;
  kind: string;
  tone: "red" | "orange" | "yellow" | "slate";
  title: string;
  detail: string;
};

export default function MyMedsPage() {
  const [email, setEmail] = useState("patient@materiatest.za");
  const [userId, setUserId] = useState<string | null>(null);
  const [nowHhmm, setNowHhmm] = useState("08:00");
  const [msg, setMsg] = useState("");
  const [regimenNote, setRegimenNote] = useState("");
  const [clashRows, setClashRows] = useState<ClashRow[]>([]);
  const [clashMeta, setClashMeta] = useState("");
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

  async function loadClashBoard() {
    if (!userId) return;
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, tier: "professional" }),
    });
    const res = await fetch(`${API}/tools/clash-board`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (res.status === 402) {
      setClashMeta(String(data.error ?? "Pro required"));
      setClashRows([]);
      return;
    }
    setClashRows(Array.isArray(data.rows) ? data.rows : []);
    setClashMeta(
      `${data.note ?? ""} · red ${data.summary?.red ?? 0} · orange ${data.summary?.orange ?? 0} · yellow ${data.summary?.yellow ?? 0}`,
    );
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
            <button className="btn" type="button" onClick={() => void loadClashBoard()}>
              Clash board (Pro)
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
      {clashMeta && (
        <div className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0 }}>Clash board</h2>
          <p className="muted">{clashMeta}</p>
          <div className="clash-board">
            {clashRows.map((row) => (
              <article key={row.id} className={`clash-row tone-${row.tone}`}>
                <strong>{row.title}</strong>
                <p className="muted" style={{ margin: "4px 0 0" }}>
                  {row.detail}
                </p>
                <span className="clash-kind">{row.kind}</span>
              </article>
            ))}
            {clashRows.length === 0 && <p className="muted">No published flags on this list.</p>}
          </div>
        </div>
      )}
      {out && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {out}
        </pre>
      )}
    </>
  );
}
