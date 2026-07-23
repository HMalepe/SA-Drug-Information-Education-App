"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type PearlItem = {
  id: string;
  innName: string;
  moleculeSlug: string;
  therapeuticArea: string;
  text: string;
  reason: string;
  sourceCitation?: string;
  lastReviewed: string;
};

export default function PearlsPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState("antibiotics");
  const [weak, setWeak] = useState("diabetes");
  const [items, setItems] = useState<PearlItem[]>([]);
  const [meta, setMeta] = useState("");
  const [err, setErr] = useState("");

  async function ensurePro() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "pearls@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
      }),
    });
    const data = await res.json();
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id, tier: "professional" }),
    });
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function loadFeed() {
    setErr("");
    const uid = await ensurePro();
    const qs = new URLSearchParams({
      userId: uid,
      specialty,
      weak,
      limit: "5",
    });
    const res = await fetch(`${API}/pearls/today?${qs}`);
    const data = await res.json();
    if (res.status === 402) {
      setErr(String(data.error ?? "Pro required"));
      setItems([]);
      return;
    }
    setItems(Array.isArray(data.items) ? data.items : []);
    setMeta(
      `${data.dateKey ?? ""} · pool ${data.totalPublishedPool ?? 0} · ${data.note ?? ""}`,
    );
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "pearl_feed" }} />
      <h1>Clinical pearl feed</h1>
      <p className="tagline">
        Daily high-yield pearls from published Materia facts — habit loop, not a newsletter of invented tips.
      </p>
      <div className="card">
        <label className="muted">Specialty areas (comma-separated)</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 12px", padding: 10 }}
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          placeholder="antibiotics, hiv-tb"
        />
        <label className="muted">Weak areas to boost</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={weak}
          onChange={(e) => setWeak(e.target.value)}
          placeholder="diabetes, renal"
        />
        <button className="btn" type="button" onClick={() => void loadFeed()}>
          Load today&apos;s feed
        </button>
      </div>
      {err && <p className="muted">{err}</p>}
      {meta && <p className="muted">{meta}</p>}
      <div className="pearl-feed">
        {items.map((item) => (
          <article key={item.id} className="pearl-card">
            <p className="pearl-reason">{item.reason.replace("_", " ")}</p>
            <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>
              <a href={`/molecules/${item.moleculeSlug}`}>{item.innName}</a>
            </h2>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{item.text}</p>
            <p className="muted" style={{ marginTop: 10 }}>
              {item.therapeuticArea}
              {item.sourceCitation ? ` · ${item.sourceCitation}` : ""} · reviewed{" "}
              {item.lastReviewed}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
