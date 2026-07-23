"use client";

import { useMemo, useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Mech = { id: string; text: string };
type Med = { id: string; name: string; slug: string };

export default function MatchPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [mechanisms, setMechanisms] = useState<Mech[]>([]);
  const [medicines, setMedicines] = useState<Med[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

  const options = useMemo(
    () => [{ id: "", name: "— choose —" }, ...medicines.map((m) => ({ id: m.id, name: m.name }))],
    [medicines],
  );

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "match@materiatest.za",
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
    setMapping({});
    const uid = await ensureStudent();
    const res = await fetch(`${API}/academy/match/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, size: 4 }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResult(String(data.error ?? "Could not start"));
      return;
    }
    setRoundId(data.roundId);
    setMechanisms(Array.isArray(data.mechanisms) ? data.mechanisms : []);
    setMedicines(Array.isArray(data.medicines) ? data.medicines : []);
    setNote(data.note ?? "");
  }

  async function submit() {
    if (!userId || !roundId) return;
    const res = await fetch(`${API}/academy/match/${roundId}/grade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, mapping }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResult(String(data.error ?? "Grade failed"));
      return;
    }
    setResult(`${data.message} (score ${data.score}/${data.total})`);
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "match_game" }} />
      <h1>Match</h1>
      <p className="tagline">Pair each published mechanism with the right medicine.</p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void start()}>
          New match round
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      {mechanisms.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          {mechanisms.map((m) => (
            <div key={m.id} style={{ marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", lineHeight: 1.45 }}>{m.text}</p>
              <select
                value={mapping[m.id] ?? ""}
                onChange={(e) => setMapping((prev) => ({ ...prev, [m.id]: e.target.value }))}
                style={{ width: "100%", padding: 10 }}
              >
                {options.map((o) => (
                  <option key={`${m.id}-${o.id || "blank"}`} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className="btn" type="button" onClick={() => void submit()}>
            Check matches
          </button>
        </div>
      )}
      {result && <p style={{ marginTop: 12 }}>{result}</p>}
      <p>
        <a href="/learn">← Back to Academy</a>
      </p>
    </>
  );
}
