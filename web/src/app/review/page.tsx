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

type StgPlanItem = {
  extractId: string;
  moleculeSlug: string;
  preview?: string;
};

type StgPlanAll = {
  batches: Array<{
    batch: string;
    label: string;
    alreadyPublished: number;
    eligible: StgPlanItem[];
    blocked: Array<{ extractId: string; reason: string }>;
  }>;
  totals: { alreadyPublished: number; eligible: number; blocked: number };
  note: string;
};

type DosingPlanItem = {
  moleculeId: string;
  moleculeSlug: string;
  fieldPath: string;
  preview: string;
};

type DosingPlanAll = {
  batches: Array<{
    batch: string;
    label: string;
    placeholderAbsent: DosingPlanItem[];
    numericSuspect: DosingPlanItem[];
    otherDraft: DosingPlanItem[];
  }>;
  totals: { placeholderAbsent: number; numericSuspect: number; otherDraft: number };
  note: string;
};

type FounderProgress = {
  scope: string;
  stg: { alreadyPublished: number; eligible: number; blocked: number };
  dosing: { placeholderAbsent: number; numericSuspect: number; otherDraft: number };
  rag: { ok: boolean; mode: string; hostedConfigured: boolean };
  nextActions: string[];
  note: string;
};

type FounderChecklist = {
  scope: string;
  progress: FounderProgress;
  stgBlocked: Array<{ extractId: string; reason: string; preview: string }>;
  dosingNumericSuspect: Array<{
    moleculeId: string;
    moleculeSlug: string;
    fieldPath: string;
    preview: string;
  }>;
  stgCli: { count: number; lines: string[]; note: string };
  dosingCli: { count: number; lines: string[]; note: string };
  stgBatchPreviewLine: string;
  note: string;
};

type RagProvisionPack = {
  status: {
    ok: boolean;
    mode: { embedder: string; composer: string };
    embedderConfigured: boolean;
    llmConfigured: boolean;
    embedderHost: string | null;
    llmHost: string | null;
    allowHostsCount: number;
    authTokenConfigured: boolean;
    errors: string[];
    note: string;
  };
  verifyCmd: string;
  healthPath: string;
  envStubLines: string[];
  steps: string[];
  note: string;
};

type ReviewDecisionRow = {
  id: string;
  queueItemId: string;
  decision: string;
  reviewerLabel: string;
  attestation?: string;
  at: string;
  note?: string;
};

const BATCHES = ["A", "B", "C", "D", "E", "F", "G", "H", "I"] as const;

const ATTEST_STG =
  "I confirm this is sourced from DoH STG/EML — publishState only, no invented mg.";
const ATTEST_PLACEHOLDER =
  "I confirm this honest absence is intentional — Materia has no sourced dose yet.";

/** Short status line for review actions — never dumps clinical preview JSON. */
function formatReviewActionMsg(
  ok: boolean,
  data: {
    error?: unknown;
    note?: string;
    dryRun?: boolean;
    published?: number;
    eligible?: number | unknown[];
    blocked?: number | unknown[];
    count?: number;
    item?: { id?: string; publishState?: string };
    persisted?: { seedFile?: string } | null;
  },
): string {
  if (!ok || data.error) {
    const err =
      typeof data.error === "string"
        ? data.error
        : data.error
          ? JSON.stringify(data.error)
          : "Request failed";
    return `Error: ${err}`;
  }
  const parts: string[] = [];
  if (data.dryRun) parts.push("Preview (dry-run)");
  if (typeof data.published === "number") parts.push(`published=${data.published}`);
  if (typeof data.eligible === "number") parts.push(`eligible=${data.eligible}`);
  else if (Array.isArray(data.eligible)) parts.push(`eligible=${data.eligible.length}`);
  if (typeof data.blocked === "number") parts.push(`blocked=${data.blocked}`);
  else if (Array.isArray(data.blocked)) parts.push(`blocked=${data.blocked.length}`);
  if (typeof data.count === "number") parts.push(`count=${data.count}`);
  if (data.item?.id) {
    parts.push(data.item.id);
    if (data.item.publishState) parts.push(`→ ${data.item.publishState}`);
  }
  if (data.persisted?.seedFile) parts.push(`wrote ${data.persisted.seedFile}`);
  if (data.note) parts.push(data.note);
  return parts.join(" · ") || "OK";
}

export default function ReviewPage() {
  const [coverage, setCoverage] = useState<Coverage | null>(null);
  const [items, setItems] = useState<QueueItem[]>([]);
  const [stgItems, setStgItems] = useState<StgQueueItem[]>([]);
  const [backlog, setBacklog] = useState<BatchBacklog | null>(null);
  const [stgPlan, setStgPlan] = useState<StgPlanAll | null>(null);
  const [dosingPlan, setDosingPlan] = useState<DosingPlanAll | null>(null);
  const [progress, setProgress] = useState<FounderProgress | null>(null);
  const [checklist, setChecklist] = useState<FounderChecklist | null>(null);
  const [ragPack, setRagPack] = useState<RagProvisionPack | null>(null);
  const [decisions, setDecisions] = useState<ReviewDecisionRow[]>([]);
  const [decisionsTotal, setDecisionsTotal] = useState(0);
  const [area, setArea] = useState("");
  const [batch, setBatch] = useState("");
  const [reviewer, setReviewer] = useState("Founder pharmacist");
  const [attestation, setAttestation] = useState(ATTEST_STG);
  const [msg, setMsg] = useState("");
  /** Queue dosingClass filter — mutually exclusive audit modes for founder publish sweeps. */
  const [dosingClassFilter, setDosingClassFilter] = useState<
    "" | "placeholder_absent" | "numeric_suspect"
  >("");
  const [showStgChecklist, setShowStgChecklist] = useState(false);

  async function load() {
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (batch) params.set("batch", batch);
    if (dosingClassFilter) params.set("dosingClass", dosingClassFilter);
    const qs = params.toString() ? `?${params}` : "";
    const stgQs = batch ? `?batch=${encodeURIComponent(batch)}` : "";

    const [c, q, b, sp, dp, stg, prog, check, rag, dec] = await Promise.all([
      fetch(`${API}/review/coverage`).then((r) => r.json()),
      fetch(`${API}/review/queue${qs}`).then((r) => r.json()),
      fetch(`${API}/review/batches-ai`).then((r) => r.json()),
      fetch(`${API}/review/plan-stg?batch=all`).then((r) => r.json()),
      fetch(`${API}/review/plan-dosing?batch=all`).then((r) => r.json()),
      fetch(`${API}/review/stg-queue${stgQs}`).then((r) => r.json()),
      fetch(
        `${API}/review/progress?batch=${encodeURIComponent(batch || "all")}`,
      ).then((r) => r.json()),
      fetch(
        `${API}/review/checklist?batch=${encodeURIComponent(batch || "all")}`,
      ).then((r) => r.json()),
      fetch(`${API}/review/rag`).then((r) => r.json()),
      fetch(
        `${API}/review/decisions?limit=20&batch=${encodeURIComponent(batch || "all")}`,
      ).then((r) => r.json()),
    ]);
    setCoverage(c);
    setItems(q.items ?? []);
    setBacklog(b);
    setStgPlan(sp);
    setDosingPlan(dp);
    setStgItems(stg.items ?? []);
    setProgress(prog);
    setChecklist(check);
    setRagPack(rag);
    setDecisions(dec.items ?? []);
    setDecisionsTotal(dec.total ?? 0);
  }

  useEffect(() => {
    void load();
  }, [area, batch, dosingClassFilter]);

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
    setMsg(formatReviewActionMsg(res.ok, data));
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
    setMsg(formatReviewActionMsg(res.ok, data));
    await load();
  }

  async function copyStgCli() {
    const params = new URLSearchParams();
    params.set("batch", batch || "all");
    if (attestation.trim()) params.set("attestation", attestation.trim());
    const res = await fetch(`${API}/review/export-stg-cli?${params}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(formatReviewActionMsg(false, data));
      return;
    }
    const text = [`# ${data.note}`, `# count=${data.count}`, ...(data.lines ?? [])].join(
      "\n",
    );
    try {
      await navigator.clipboard.writeText(text);
      setMsg(`Copied ${data.count} eligible publish-stg lines (no --write).`);
    } catch {
      setMsg(text);
    }
  }

  async function copyPlaceholderCli() {
    const params = new URLSearchParams();
    params.set("batch", batch || "all");
    if (attestation.trim()) params.set("attestation", attestation.trim());
    const res = await fetch(`${API}/review/export-dosing-cli?${params}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(formatReviewActionMsg(false, data));
      return;
    }
    const text = [`# ${data.note}`, `# count=${data.count}`, ...(data.lines ?? [])].join(
      "\n",
    );
    try {
      await navigator.clipboard.writeText(text);
      setMsg(`Copied ${data.count} placeholder publish-dosing lines (no --write).`);
    } catch {
      setMsg(text);
    }
  }

  async function copyText(label: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMsg(`Copied ${label} (no --write).`);
    } catch {
      setMsg(text);
    }
  }

  async function publishStgBatch(scope: string, dryRun: boolean) {
    if (!dryRun) {
      const confirmed = window.confirm(
        `Publish all eligible STG pointers for batch ${scope}? ` +
          "This changes publishState only (text unchanged). Requires attestation. Prefer Preview first.",
      );
      if (!confirmed) return;
    }
    const res = await fetch(`${API}/review/publish-stg-batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batch: scope,
        reviewerLabel: reviewer,
        attestation,
        dryRun,
      }),
    });
    const data = await res.json();
    setMsg(formatReviewActionMsg(res.ok, { ...data, dryRun }));
    if (!dryRun) await load();
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

  const stgEligibleItems: StgPlanItem[] =
    stgPlan == null
      ? []
      : batch
        ? (stgPlan.batches.find((b) => b.batch === batch)?.eligible ?? [])
        : stgPlan.batches.flatMap((b) => b.eligible);

  const placeholderItems: DosingPlanItem[] =
    dosingPlan == null
      ? []
      : batch
        ? (dosingPlan.batches.find((b) => b.batch === batch)?.placeholderAbsent ?? [])
        : dosingPlan.batches.flatMap((b) => b.placeholderAbsent);

  const dosingSuspectsForFilter =
    dosingPlan == null
      ? 0
      : batch
        ? (dosingPlan.batches.find((b) => b.batch === batch)?.numericSuspect.length ?? 0)
        : dosingPlan.totals.numericSuspect;

  const stgPublishedForFilter =
    stgPlan == null
      ? 0
      : batch
        ? (stgPlan.batches.find((b) => b.batch === batch)?.alreadyPublished ?? 0)
        : stgPlan.totals.alreadyPublished;

  const cliScope = batch || "all";

  return (
    <>
      <h1>Clinical review</h1>
      <p className="tagline">
        Founder publish gate — surfaces draft facts and STG/RAG pointers. Never invents doses.
        Decisions persist to content/seed, stg-extracts.json, and content/review/decisions.jsonl.
      </p>

      {progress && (
        <section style={{ marginTop: 16 }}>
          <h2>
            Founder progress
            {progress.scope && progress.scope !== "all"
              ? ` — Batch ${progress.scope.toUpperCase()}`
              : " — Batches A–I"}
          </h2>
          <p className="muted">
            STG published {progress.stg.alreadyPublished} · eligible {progress.stg.eligible} ·
            blocked {progress.stg.blocked} · dosing placeholders{" "}
            {progress.dosing.placeholderAbsent} · suspects {progress.dosing.numericSuspect} · RAG{" "}
            {progress.rag.mode}
            {progress.rag.hostedConfigured ? " (hosted)" : " (local default)"}
          </p>
          <ol className="muted" style={{ marginTop: 8, paddingLeft: 20 }}>
            {progress.nextActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
          <p className="muted" style={{ marginTop: 8 }}>
            {progress.note} · CLI:{" "}
            <code>
              npm run review:batches -- progress
              {progress.scope && progress.scope !== "all"
                ? ` ${progress.scope.toUpperCase()}`
                : ""}
            </code>
          </p>
        </section>
      )}

      {checklist && (
        <section style={{ marginTop: 16 }}>
          <h2>
            Sweep checklist
            {checklist.scope && checklist.scope !== "all"
              ? ` — Batch ${checklist.scope.toUpperCase()}`
              : " — Batches A–I"}
          </h2>
          <p className="muted">{checklist.note}</p>
          {checklist.stgBlocked.length > 0 ? (
            <p className="muted" style={{ marginTop: 8 }}>
              Blocked STG ({checklist.stgBlocked.length}):{" "}
              {checklist.stgBlocked.map((b) => b.extractId).join(", ")}
            </p>
          ) : (
            <p className="muted" style={{ marginTop: 8 }}>
              Blocked STG: none
            </p>
          )}
          {checklist.dosingNumericSuspect.length > 0 ? (
            <p className="muted">
              Numeric-suspect dosing (do not publish):{" "}
              {checklist.dosingNumericSuspect
                .map((r) => `${r.moleculeSlug}:${r.fieldPath}`)
                .join(", ")}
            </p>
          ) : (
            <p className="muted">Numeric-suspect dosing: none</p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              type="button"
              disabled={!checklist.stgBatchPreviewLine}
              onClick={() =>
                void copyText("STG batch preview line", checklist.stgBatchPreviewLine)
              }
            >
              Copy STG batch preview line
            </button>
            <button
              className="btn"
              type="button"
              disabled={checklist.stgCli.count === 0}
              onClick={() =>
                void copyText(
                  `${checklist.stgCli.count} STG CLI lines`,
                  checklist.stgCli.lines.join("\n"),
                )
              }
            >
              Copy STG CLI ({checklist.stgCli.count})
            </button>
            <button
              className="btn"
              type="button"
              disabled={checklist.dosingCli.count === 0}
              onClick={() =>
                void copyText(
                  `${checklist.dosingCli.count} dosing CLI lines`,
                  checklist.dosingCli.lines.join("\n"),
                )
              }
            >
              Copy dosing CLI ({checklist.dosingCli.count})
            </button>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            CLI:{" "}
            <code>
              npm run review:batches -- checklist
              {checklist.scope && checklist.scope !== "all"
                ? ` ${checklist.scope.toUpperCase()}`
                : ""}
            </code>
          </p>
        </section>
      )}

      {ragPack && (
        <section style={{ marginTop: 16 }}>
          <h2>RAG provision (optional)</h2>
          <p className="muted">{ragPack.note}</p>
          <p className="muted" style={{ marginTop: 8 }}>
            Mode {ragPack.status.mode.embedder}/{ragPack.status.mode.composer}
            {ragPack.status.embedderConfigured || ragPack.status.llmConfigured
              ? " (hosted)"
              : " (local default)"}
            {ragPack.status.embedderHost ? ` · embedder ${ragPack.status.embedderHost}` : ""}
            {ragPack.status.llmHost ? ` · llm ${ragPack.status.llmHost}` : ""}
            {ragPack.status.authTokenConfigured ? " · auth set" : ""}
          </p>
          {ragPack.status.errors.length > 0 ? (
            <p className="muted" style={{ marginTop: 8 }}>
              Errors: {ragPack.status.errors.join("; ")}
            </p>
          ) : null}
          <ol className="muted" style={{ marginTop: 8, paddingLeft: 20 }}>
            {ragPack.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              type="button"
              onClick={() =>
                void copyText("RAG env stub", ragPack.envStubLines.join("\n"))
              }
            >
              Copy env stub
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => void copyText("RAG verify command", ragPack.verifyCmd)}
            >
              Copy verify command
            </button>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>
            CLI: <code>npm run review:batches -- rag</code> · runtime{" "}
            <code>{ragPack.healthPath}</code>
          </p>
        </section>
      )}

      {backlog && stgPlan && dosingPlan && (
        <section style={{ marginTop: 16 }}>
          <h2>Batches A–I{batch ? ` — filter ${batch}` : ""}</h2>
          <p className="muted">
            STG published {stgPublishedForFilter} · eligible {stgEligibleForFilter} · blocked{" "}
            {stgBlockedForFilter} · dosing placeholders {placeholderItems.length} · numeric
            suspects {dosingSuspectsForFilter} (must stay unpublished)
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
            CLI: <code>npm run review:batches -- plan-stg {cliScope}</code> ·{" "}
            <code>npm run review:batches -- export-stg-cli {cliScope}</code> ·{" "}
            <code>npm run review:batches -- plan-dosing {cliScope}</code> ·{" "}
            <code>npm run review:batches -- export-dosing-cli {cliScope}</code>
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <button
              className="btn"
              type="button"
              disabled={stgEligibleForFilter === 0}
              onClick={() => void publishStgBatch(batch || "all", true)}
            >
              Preview STG publish
              {batch ? ` batch ${batch}` : " all"} ({stgEligibleForFilter})
            </button>
            <button
              className="btn"
              type="button"
              disabled={stgEligibleForFilter === 0 || stgBlockedForFilter > 0}
              onClick={() => void publishStgBatch(batch || "all", false)}
            >
              Publish eligible STG
              {batch ? ` batch ${batch}` : " all"} ({stgEligibleForFilter})
            </button>
            <button
              className="btn"
              type="button"
              style={{ opacity: showStgChecklist ? 1 : 0.75 }}
              onClick={() => setShowStgChecklist((v) => !v)}
            >
              {showStgChecklist ? "Hide" : "Show"} STG checklist
            </button>
            <button
              className="btn"
              type="button"
              disabled={stgEligibleForFilter === 0}
              onClick={() => void copyStgCli()}
            >
              Copy STG CLI ({stgEligibleForFilter})
            </button>
            <button
              className="btn"
              type="button"
              disabled={placeholderItems.length === 0}
              onClick={() => void copyPlaceholderCli()}
            >
              Copy placeholder CLI ({placeholderItems.length})
            </button>
            {stgBlockedForFilter > 0 ? (
              <span className="muted">
                Blocked {stgBlockedForFilter} — fix before batch publish (all-or-nothing).
              </span>
            ) : null}
          </div>
          {showStgChecklist ? (
            <div style={{ marginTop: 12 }}>
              <p className="muted">
                Eligible STG pointers ({stgEligibleItems.length}) — publishState only; text
                unchanged. Dry-run via Preview before Publish.
              </p>
              {stgEligibleItems.length === 0 ? (
                <p className="muted">None eligible in this filter.</p>
              ) : (
                <ul className="muted" style={{ marginTop: 8, paddingLeft: 20 }}>
                  {stgEligibleItems.slice(0, 40).map((e) => (
                    <li key={e.extractId}>
                      {e.extractId} · {e.moleculeSlug}
                    </li>
                  ))}
                  {stgEligibleItems.length > 40 ? (
                    <li>…and {stgEligibleItems.length - 40} more (use Preview for full list)</li>
                  ) : null}
                </ul>
              )}
              <p className="muted" style={{ marginTop: 12 }}>
                Honest dosing placeholders ({placeholderItems.length}) — individual Publish only;
                no dosing batch auto-publish. Switch queue filter to “Publishable placeholders”.
              </p>
              {placeholderItems.length === 0 ? null : (
                <ul className="muted" style={{ marginTop: 8, paddingLeft: 20 }}>
                  {placeholderItems.slice(0, 20).map((d) => (
                    <li key={`${d.moleculeId}-${d.fieldPath}`}>
                      {d.moleculeSlug} · {d.fieldPath}
                    </li>
                  ))}
                  {placeholderItems.length > 20 ? (
                    <li>…and {placeholderItems.length - 20} more</li>
                  ) : null}
                </ul>
              )}
            </div>
          ) : null}
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "8px 0" }}>
          <button className="btn" type="button" onClick={() => setAttestation(ATTEST_STG)}>
            Preset: STG pointer
          </button>
          <button
            className="btn"
            type="button"
            onClick={() => setAttestation(ATTEST_PLACEHOLDER)}
          >
            Preset: honest absence
          </button>
        </div>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 0", padding: 10 }}
          value={attestation}
          onChange={(e) => setAttestation(e.target.value)}
        />
      </section>

      <h2 style={{ marginTop: 24 }}>
        Dosing / safety queue ({items.length})
        {batch ? ` · batch ${batch}` : ""}
        {dosingClassFilter === "placeholder_absent"
          ? " · placeholders only"
          : dosingClassFilter === "numeric_suspect"
            ? " · numeric suspects only"
            : ""}
      </h2>
      <p className="muted">
        Dosing Publish is disabled when classification is numeric_suspect (invented-looking mg).
        placeholder_absent may be published as an honest absence after attestation. Use suspects
        filter to audit inventable drafts — do not publish them.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "8px 0 16px" }}>
        <button
          className="btn"
          type="button"
          style={{ opacity: dosingClassFilter === "" ? 1 : 0.75 }}
          onClick={() => setDosingClassFilter("")}
        >
          All queue items
        </button>
        <button
          className="btn"
          type="button"
          style={{ opacity: dosingClassFilter === "placeholder_absent" ? 1 : 0.75 }}
          onClick={() =>
            setDosingClassFilter((v) => (v === "placeholder_absent" ? "" : "placeholder_absent"))
          }
        >
          Publishable placeholders
          {dosingPlan ? ` (${dosingPlan.totals.placeholderAbsent})` : ""}
        </button>
        <button
          className="btn"
          type="button"
          style={{ opacity: dosingClassFilter === "numeric_suspect" ? 1 : 0.75 }}
          onClick={() =>
            setDosingClassFilter((v) => (v === "numeric_suspect" ? "" : "numeric_suspect"))
          }
        >
          Numeric suspects (audit)
          {dosingPlan ? ` (${dosingPlan.totals.numericSuspect})` : ""}
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

      <h2 style={{ marginTop: 32 }}>
        Recent decisions
        {batch ? ` — Batch ${batch}` : " — Batches A–I"} ({decisions.length}
        {decisionsTotal > decisions.length ? ` of ${decisionsTotal}` : ""})
      </h2>
      <p className="muted">
        Audit journal from decisions.jsonl — publishState only. CLI:{" "}
        <code>
          npm run review:batches -- decisions
          {batch ? ` ${batch}` : ""} --json
        </code>
      </p>
      {decisions.length === 0 ? (
        <p className="muted">No persisted decisions yet.</p>
      ) : (
        <ul className="muted" style={{ paddingLeft: 20 }}>
          {decisions.map((d) => (
            <li key={d.id} style={{ marginBottom: 8 }}>
              <strong>{d.decision}</strong> · {d.at} · {d.reviewerLabel} · {d.queueItemId}
              {d.note ? ` — ${d.note}` : ""}
            </li>
          ))}
        </ul>
      )}

      {msg && (
        <pre style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {msg}
        </pre>
      )}
    </>
  );
}
