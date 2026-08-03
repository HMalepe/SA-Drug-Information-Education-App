"use client";

import { useMemo, useState } from "react";
import { TrackPage } from "@/components/TrackPage";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Med = { id: string; name: string; slug: string };
type Bucket = { id: string; label: string };

export default function DragDropPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<Med[]>([]);
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const options = useMemo(
    () => [{ id: "", label: "— choose class —" }, ...buckets],
    [buckets],
  );

  async function ensureStudent(): Promise<string | null> {
    if (userId) return userId;
    try {
      const id = await createStubSession({
        email: "dragdrop@materiatest.za",
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
    setMapping({});
    try {
      const uid = await ensureStudent();
      if (!uid) return;
      const res = await fetch(`${API}/academy/drag-drop/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, bucketCount: 3, perBucket: 2 }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(formatApiError(data.error, "Could not start"));
        return;
      }
      setRoundId(data.roundId);
      setMedicines(Array.isArray(data.medicines) ? data.medicines : []);
      setBuckets(Array.isArray(data.buckets) ? data.buckets : []);
      setNote(data.note ?? "");
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (!userId || !roundId || busy) return;
    setBusy(true);
    try {
      const res = await fetch(`${API}/academy/drag-drop/${roundId}/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, mapping }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult(formatApiError(data.error, "Grade failed"));
        return;
      }
      setResult(`${data.message} (score ${data.score}/${data.total})`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "drag_drop_sort" }} />
      <h1>Drag &amp; drop</h1>
      <p className="tagline">Sort each medicine into its published therapeutic class.</p>
      <div className="card">
        <button className="btn" type="button" disabled={busy} onClick={() => void start()}>
          New class-sort round
        </button>
      </div>
      {note && <p className="muted">{note}</p>}
      {buckets.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <p className="muted" style={{ marginTop: 0 }}>
            Buckets: {buckets.map((b) => b.label).join(" · ")}
          </p>
          {medicines.map((m) => (
            <div key={m.id} style={{ marginBottom: 16 }}>
              <p style={{ margin: "0 0 8px", fontWeight: 600 }}>{m.name}</p>
              <select
                value={mapping[m.id] ?? ""}
                onChange={(e) => setMapping((prev) => ({ ...prev, [m.id]: e.target.value }))}
                style={{ width: "100%", padding: 10 }}
                disabled={busy}
              >
                {options.map((o) => (
                  <option key={`${m.id}-${o.id || "blank"}`} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button className="btn" type="button" disabled={busy} onClick={() => void submit()}>
            Check sort
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
