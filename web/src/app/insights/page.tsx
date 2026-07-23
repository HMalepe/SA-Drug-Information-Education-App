"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Summary = {
  totalEvents: number;
  byName: Record<string, number>;
  topMolecules: Array<{ slug: string; views: number }>;
  topTools: Array<{ tool: string; uses: number }>;
  gatedHits: number;
  searchCount: number;
  note: string;
};

export default function InsightsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);

  async function load() {
    const res = await fetch(`${API}/analytics/summary`);
    setSummary(await res.json());
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <>
      <h1>Insights</h1>
      <p className="tagline">Founder product analytics — Doc 20 starter set (POPIA-minimised).</p>
      <button className="btn" type="button" onClick={() => void load()}>
        Refresh
      </button>
      {!summary ? (
        <p className="muted">Loading…</p>
      ) : (
        <>
          <div className="card" style={{ marginTop: 16 }}>
            <strong>{summary.totalEvents}</strong> events ·{" "}
            <strong>{summary.searchCount}</strong> searches ·{" "}
            <strong>{summary.gatedHits}</strong> gated hits
            <p className="muted">{summary.note}</p>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>By event</strong>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {JSON.stringify(summary.byName, null, 2)}
            </pre>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>Top molecules</strong>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {JSON.stringify(summary.topMolecules, null, 2)}
            </pre>
          </div>
          <div className="card" style={{ marginTop: 12 }}>
            <strong>Top tools</strong>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {JSON.stringify(summary.topTools, null, 2)}
            </pre>
          </div>
        </>
      )}
    </>
  );
}
