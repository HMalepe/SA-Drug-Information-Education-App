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
  dosingClass?: "placeholder_absent" | "numeric_suspect" | "other_draft";
};

type StgQueueItem = {
  id: string;
  extractId: string;
  moleculeSlug: string;
  batch?: string;
  publishState: string;
  preview: string;
  priority: string;
};

type BatchBacklog = {
  batches: Array<{
    batch: string;
    label: string;
    moleculeCount: number;
    dosingDraftCritical: number;
    stgExtractDraft: number;
    stgExtractPublished: number;
  }>;
  totals: {
    molecules: number;
    dosingDraftCritical: number;
    stgExtractDraft: number;
    stgExtractPublished: number;
  };
  note: string;
};

type StgPlanAll = {
  batches: Array<{
    batch: string;
    label: string;
    alreadyPublished: number;
    eligible: unknown[];
    blocked: unknown[];
  }>;
  totals: { alreadyPublished: number; eligible: number; blocked: number };
  note: string;
};

type DosingPlanAll = {
  batches: Array<{
    batch: string;
    label: string;
    placeholderAbsent: unknown[];
    numericSuspect: unknown[];
    otherDraft: unknown[];
  }>;
  totals: { placeholderAbsent: number; numericSuspect: number; otherDraft: number };
  note: string;
};

const BATCHES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const;

export default function ReviewPage() {
  const [coverage, setCoverage] = useState<Coverage | null>(null);
  const [items, setItems] = useState<QueueItem[]>([]);
  const [stgItems, setStgItems] = useState<StgQueueItem[]>([]);
  const [backlog, setBacklog] = useState<BatchBacklog | null>(null);
  const [stgPlan, setStgPlan] = useState<StgPlanAll | null>(null);
  const [dosingPlan, setDosingPlan] = useState<DosingPlanAll | null>(null);
  const [area, setArea] = useState("");
  const [batch, setBatch] = useState("");
  const [reviewer, setReviewer] = useState("Founder pharmacist");
  const [attestation, setAttestation] = useState(
    "I confirm this is sourced from labelled product / SA guideline — not invented.",
  );
  const [msg, setMsg] = useState("");
  const [placeholdersOnly, setPlaceholdersOnly] = useState(false);

  async function load() {
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (batch) params.set("batch", batch);
    if (placeholdersOnly) params.set("dosingClass", "placeholder_absent");
    const qs = params.toString() ? `?${params}` : "";
    const stgQs = batch ? `?batch=${encodeURIComponent(batch)}` : "";

    const [c, q, b, sp, dp, stg] = await Promise.all([
      fetch(`${API}/review/coverage`).then((r) => r.json()),
      fetch(`${API}/review/queue${qs}`).then((r) => r.json()),
      fetch(`${API}/review/batches-ai`).then((r) => r.json()),
      fetch(`${API}/review/plan-stg?batch=all`).then((r) => r.json()),
      fetch(`${API}/review/plan-dosing?batch=all`).then((r) => r.json()),
      fetch(`${API}/review/stg-queue${stgQs}`).then((r) => r.json()),
    ]);
    setCoverage(c);
    setItems(q.items ?? []);
    setBacklog(b);
    setStgPlan(sp);
    setDosingPlan(dp);
    setStgItems(stg.items ?? []);
  }

  useEffect(() => {
    void load();
  }, [area, batch, placeholdersOnly]);

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

  async function decideStg(
    queueItemId: string,
    decision: "keep_draft" | "mark_reviewed" | "publish",
  ) {
    const res = await fetch(`${API}/review/stg-decide`, {
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

  async function publishStgBatch(scope: string) {
    const confirmed = window.confirm(
      `Publish all eligible STG pointers for batch ${scope}? ` +
        "This changes publishState only (text unchanged). Requires attestation.",
    );
    if (!confirmed) return;
    const res = await fetch(`${API}/review/publish-stg-batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batch: scope,
        reviewerLabel: reviewer,
        attestation,
      }),
    });
    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
    await load();
  }

  const stgEligibleForFilter =
    stgPlan == null
      ? 0
      : batch
        ? (stgPlan.batches.find((b) => b.batch === batch)?.eligible.length ?? 0)
        : stgPlan.totals.eligible;
  const stgBlockedForFilter =
    stgPlan == null
      ? 0
      : batch
        ? (stgPlan.batches.find((b) => b.batch === batch)?.blocked.length ?? 0)
        : stgPlan.totals.blocked;

  return (
    <>
      <h1>Clinical review</h1>
      <p className="tagline">
        Founder publish gate — surfaces draft facts and STG/RAG pointers. Never invents doses.
        Decisions persist to content/seed, stg-extracts.json, and content/review/decisions.jsonl.
      </p>

      {backlog && stgPlan && dosingPlan && (
        <section style={{ marginTop: 16 }}>
          <h2>Batches A–I</h2>
          <p className="muted">
            STG eligible {stgPlan.totals.eligible} · blocked {stgPlan.totals.blocked} · dosing
            placeholders {dosingPlan.totals.placeholderAbsent} · numeric suspects{" "}
            {dosingPlan.totals.numericSuspect} (must stay unpublished)
          </p>
          <p className="muted">{backlog.note}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button className="btn" type="button" onClick={() => setBatch("")}>
              All batches
            </button>
            {BATCHES.map((letter) => {
              const row = backlog.batches.find((b) => b.batch === letter);
              return (
                <button
                  key={letter}
                  className="btn"
                  type="button"
                  style={{ opacity: batch === letter ? 1 : 0.75 }}
                  onClick={() => {
                    setBatch(letter);
                    setArea("");
                  }}
                >
                  {letter}
                  {row
                    ? ` · ${row.stgExtractDraft} STG · ${row.dosingDraftCritical} dose`
                    : ""}
                </button>
              );
            })}
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            CLI: <code>npm run review:batches -- plan-stg all</code> ·{" "}
            <code>npm run review:batches -- plan-dosing all</code>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              type="button"
              disabled={stgEligibleForFilter === 0 || stgBlockedForFilter > 0}
              onClick={() => void publishStgBatch(batch || "all")}
            >
              Publish eligible STG
              {batch ? ` batch ${batch}` : " all"} ({stgEligibleForFilter})
            </button>
            {stgBlockedForFilter > 0 ? (
              <span className="muted">
                Blocked {stgBlockedForFilter} — fix before batch publish (all-or-nothing).
              </span>
            ) : null}
          </div>
        </section>
      )}

      {coverage && (
        <section style={{ marginTop: 24 }}>
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
                onClick={() => {
                  setArea(a.therapeuticArea);
                  setBatch("");
                }}
              >
                {a.therapeuticArea} ({a.publishPercent}%)
              </button>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: 24 }}>
        <label className="muted">Reviewer label</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0", padding: 10 }}
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
        />
        <label className="muted">Publish attestation (required for high-stakes / STG)</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 0", padding: 10 }}
          value={attestation}
          onChange={(e) => setAttestation(e.target.value)}
        />
      </section>

      <h2 style={{ marginTop: 24 }}>
        Dosing / safety queue ({items.length})
        {batch ? ` · batch ${batch}` : ""}
        {placeholdersOnly ? " · placeholders only" : ""}
      </h2>
      <p className="muted">
        Dosing Publish is disabled when classification is numeric_suspect (invented-looking mg).
        placeholder_absent may be published as an honest absence after attestation.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "8px 0 16px" }}>
        <button
          className="btn"
          type="button"
          style={{ opacity: placeholdersOnly ? 1 : 0.75 }}
          onClick={() => setPlaceholdersOnly((v) => !v)}
        >
          {placeholdersOnly ? "Showing placeholders only" : "Show publishable placeholders only"}
          {dosingPlan ? ` (${dosingPlan.totals.placeholderAbsent})` : ""}
        </button>
      </div>
      {items.length === 0 ? (
        <p className="muted">No draft/reviewed facts in this filter.</p>
      ) : (
        items.map((item) => {
          const numericBlocked = item.dosingClass === "numeric_suspect";
          return (
          <article key={item.id} style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #ddd" }}>
            <strong>
              {item.moleculeName} · {item.fieldPath}
            </strong>
            <div className="muted">
              {item.therapeuticArea} · {item.publishState} · {item.priority}
              {item.highStakes ? " · high-stakes" : ""} · source {item.sourceId ?? "missing"}
              {item.dosingClass ? ` · dosing ${item.dosingClass}` : ""}
            </div>
            {item.dosingClass === "placeholder_absent" ? (
              <p className="muted" style={{ margin: "4px 0 0" }}>
                Honest absence placeholder — safe to publish after attestation (no invented mg).
              </p>
            ) : null}
            {numericBlocked ? (
              <p className="muted" style={{ margin: "4px 0 0" }}>
                Publish blocked — rewrite without invented numeric units, or leave unpublished
                (constitution 3.1).
              </p>
            ) : null}
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
              <button
                className="btn"
                type="button"
                disabled={numericBlocked}
                title={
                  numericBlocked
                    ? "numeric_suspect — rewrite without invented mg before publish"
                    : undefined
                }
                onClick={() => void decide(item.id, "publish")}
              >
                Publish
              </button>
              <a className="btn" href={`/molecules/${item.moleculeSlug}`}>
                Open 360°
              </a>
            </div>
          </article>
          );
        })
      )}

      <h2 style={{ marginTop: 32 }}>
        STG extract queue ({stgItems.length})
        {batch ? ` · batch ${batch}` : ""}
      </h2>
      <p className="muted">
        Draft pointers do not index in RAG until published. Publish changes state only — no invented
        mg.
      </p>
      {stgItems.length === 0 ? (
        <p className="muted">No draft/reviewed STG extracts in this filter.</p>
      ) : (
        stgItems.map((item) => (
          <article key={item.id} style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #ddd" }}>
            <strong>
              {item.extractId} · {item.moleculeSlug}
            </strong>
            <div className="muted">
              batch {item.batch ?? "—"} · {item.publishState} · {item.priority}
            </div>
            <p style={{ margin: "8px 0" }}>{item.preview}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button
                className="btn"
                type="button"
                onClick={() => void decideStg(item.id, "keep_draft")}
              >
                Keep draft
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => void decideStg(item.id, "mark_reviewed")}
              >
                Mark reviewed
              </button>
              <button className="btn" type="button" onClick={() => void decideStg(item.id, "publish")}>
                Publish STG pointer
              </button>
            </div>
          </article>
        ))
      )}

      {msg && (
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {msg}
        </pre>
      )}
    </>
  );
}
