"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function MyMedsPage() {
  const [email, setEmail] = useState("patient@materiatest.za");
  const [userId, setUserId] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [regimenNote, setRegimenNote] = useState("");

  async function start() {
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mode: "patient", tier: "free" }),
    });
    const data = await res.json();
    setUserId(data.user.id);
    setMsg("Session ready. Adding Amoxicillin reminder (support only).");
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
          Set up sample regimen
        </button>
      </div>
      {userId && <p className="muted">User: {userId}</p>}
      {msg && <p>{msg}</p>}
      {regimenNote && <div className="card">{regimenNote}</div>}
    </>
  );
}
