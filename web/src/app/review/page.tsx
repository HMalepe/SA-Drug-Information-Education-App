"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Coverage = {
  areas: Array<{
    therapeuticArea: string;
    molecules: number;
    factsDraft: number;
    factsReviewed: number;
    factsPublished: number;
    publishPercent: number;
  }>;
  totals: { molecules: number; factsDraft: number; factsPublished: number; publishPercent: number };
  note: string;
};

type QueueItem = {
  id: string;
  moleculeName: string;
  moleculeSlug: string;
  therapeuticArea: string;
  fieldPath: string;
  publishState: string;
  preview: string;
  priority: string;
  highStakes: boolean;
  sourceId?: string;
};

export default function ReviewPage() {
  const [coverage, setCoverage] = useState<Coverage | null>(null);
  const [items, setItems] = useState<QueueItem[]>([]);
  const [area, setArea] = useState("");
  const [reviewer, setReviewer] = useState("Founder pharmacist");
  const [attestation, setAttestation] = useState(
    "I confirm this is sourced from labelled product / SA guideline — not invented.",
  );
  const [msg, setMsg] = useState("");

  async function load() {
    const qs = area ? `?area=${encodeURIComponent(area)}` : "";
    const [c, q] = await Promise.all([
      fetch(`${API}/review/coverage`).then((r) => r.json()),
      fetch(`${API}/review/queue${qs}`).then((r) => r.json()),
    ]);
    setCoverage(c);
    setItems(q.items ?? []);
  }

  useEffect(() => {
    void load();
  }, [area]);

  async function decide(queueItemId: string, decision: "keep_draft" | "mark_reviewed" | "publish") {
    const res = await fetch(`${API}/review/decide`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        queueItemId,
        decision,
        reviewerLabel: reviewer,
        attestation: decision === "publish" ? attestation : undefined,
      }),
    });
    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
    await load();
  }

  return (
    <>
      <h1>Clinical review</h1>
      <p className="tagline">
        Founder publish gate — surfaces draft facts. Never invents doses.
      </p>

      {coverage && (
        <div className="card">
          <strong>
            {coverage.totals.molecules} molecules · {coverage.totals.factsPublished} published ·{" "}
            {coverage.totals.factsDraft} draft · {coverage.totals.publishPercent}% published
          </strong>
          <p className="muted">{coverage.note}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button className="btn" type="button" onClick={() => setArea("")}>
              All areas
            </button>
            {coverage.areas.map((a) => (
              <button
                key={a.therapeuticArea}
                className="btn"
                type="button"
                style={{ opacity: area === a.therapeuticArea ? 1 : 0.7 }}
                onClick={() => setArea(a.therapeuticArea)}
              >
                {a.therapeuticArea} ({a.publishPercent}%)
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: 12 }}>
        <label className="muted">Reviewer label</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
        />
        <label className="muted">Publish attestation (required for high-stakes)</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 0", padding: 10 }}
          value={attestation}
          onChange={(e) => setAttestation(e.target.value)}
        />
      </div>

      <h2 style={{ marginTop: 24 }}>Queue ({items.length})</h2>
      {items.length === 0 ? (
        <p className="muted">No draft/reviewed facts in this filter.</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="card" style={{ marginBottom: 12 }}>
            <strong>
              {item.moleculeName} · {item.fieldPath}
            </strong>
            <div className="muted">
              {item.therapeuticArea} · {item.publishState} · {item.priority}
              {item.highStakes ? " · high-stakes" : ""} · source {item.sourceId ?? "missing"}
            </div>
            <p style={{ margin: "8px 0" }}>{item.preview}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button className="btn" type="button" onClick={() => void decide(item.id, "keep_draft")}>
                Keep draft
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => void decide(item.id, "mark_reviewed")}
              >
                Mark reviewed
              </button>
              <button className="btn" type="button" onClick={() => void decide(item.id, "publish")}>
                Publish
              </button>
              <a className="btn" href={`/molecules/${item.moleculeSlug}`}>
                Open 360°
              </a>
            </div>
          </div>
        ))
      )}

      {msg && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {msg}
        </pre>
      )}
    </>
  );
}
