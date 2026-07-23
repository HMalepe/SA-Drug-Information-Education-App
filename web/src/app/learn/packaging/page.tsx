"use client";

import { useMemo, useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Pack = { cueId: string; brandName: string; formLabel: string; schedule: string; hint: string };
type Med = { id: string; name: string; slug: string };

export default function PackagingPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [medicines, setMedicines] = useState<Med[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

  const options = useMemo(
    () => [{ id: "", name: "— choose molecule —" }, ...medicines.map((m) => ({ id: m.id, name: m.name }))],
    [medicines],
  );

  async function ensureStudent() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "packaging@materiatest.za",
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
    const res = await fetch(`${API}/academy/packaging/start`, {
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
    setPacks(Array.isArray(data.packs) ? data.packs : []);
    setMedicines(Array.isArray(data.medicines) ? data.medicines : []);
    setNote(data.note ?? "");
  }

  async function submit() {
    if (!userId || !roundId) return;
    const res = await fetch(`${API}/academy/packaging/${roundId}/grade`, {
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
      <TrackPage name="tool_used" props={{ tool: "packaging_recognition" }} />
      <h1>Packaging recognition</h1>
      <p className="tagline">
        Match published SA brands to molecules (§7.6) — no invented imprints or pack photos.
      </p>
      <div className="card">
        <button className="btn" type="button" onClick={() => void start()}>
          New packaging round
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      {packs.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          {packs.map((p) => (
            <div key={p.cueId} style={{ marginBottom: 16 }}>
              <strong>{p.brandName}</strong>
              <div className="muted">
                {p.formLabel} · schedule {p.schedule}
              </div>
              <p className="muted" style={{ fontSize: 13, margin: "4px 0 8px" }}>
                {p.hint}
              </p>
              <select
                value={mapping[p.cueId] ?? ""}
                onChange={(e) => setMapping((prev) => ({ ...prev, [p.cueId]: e.target.value }))}
                style={{ width: "100%", padding: 10 }}
              >
                {options.map((o) => (
                  <option key={`${p.cueId}-${o.id || "blank"}`} value={o.id}>
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
