#!/usr/bin/env node
/**
 * Founder Batch A–I review CLI (constitution 3.2–3.3).
 * Offline: reads content/seed + stg-extracts. Never invents clinical text.
 *
 * Usage:
 *   npm run review:batches
 *   npm run review:batches -- progress [A|all] [--json]
 *   npm run review:batches -- checklist [A|all] [--json]
 *   npm run review:batches -- decisions [A|all] [--limit 50] [--json]
 *   npm run review:batches -- show A
 *   npm run review:batches -- show A --stg
 *   npm run review:batches -- plan-stg A|all [--json]
 *   npm run review:batches -- plan-dosing A|all [--json]
 *   npm run review:batches -- export-dosing-cli A|all [--attestation "…"] [--json]
 *   npm run review:batches -- export-stg-cli A|all [--attestation "…"] [--json]
 *   npm run review:batches -- publish-stg-batch A|all --attestation "I confirm sourced …" [--write]
 *   npm run review:batches -- publish-stg <extractId> --attestation "I confirm sourced …"
 *   npm run review:batches -- publish-stg <extractId> --attestation "…" --write
 *   npm run review:batches -- publish-dosing <moleculeId> <fieldPath> --attestation "…" --write
 *   npm run review:batches -- mark-reviewed-stg <extractId> --write
 *
 * Default is dry-run (no disk writes). Pass --write to persist publishState + audit JSONL.
 * There is no batch auto-publish for dosing (plan-dosing only).
 */
import { appendFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  STG_BATCH_A_I_SEEDS,
  applyStgExtractDecisionState,
  buildReviewQueue,
  buildStgExtractReviewQueue,
  dosingBacklogForBatch,
  findSeedFileForMolecule,
  nextPublishState,
  setFactPublishStateInSeedDoc,
  setStgExtractPublishStateInDoc,
  summarizeBatchAiBacklog,
  planStgBatchPublish,
  planStgAllBatches,
  planDosingBatch,
  planDosingAllBatches,
  applyStgBatchPublish,
  validateReviewDecision,
  validateStgExtractDecision,
  exportPlaceholderDosingCli,
  flattenDosingPlanItems,
  DEFAULT_HONEST_ABSENCE_ATTESTATION,
  exportEligibleStgCli,
  flattenStgEligibleItems,
  DEFAULT_STG_POINTER_ATTESTATION,
  summarizeFounderProgress,
  buildBatchChecklist,
  buildRagProvisionPack,
  describeInRegionRagEnv,
  parseReviewDecisionsJsonl,
  listRecentReviewDecisions,
  filterReviewDecisionsByMoleculeIds,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const seedDir = join(root, "content/seed");
const stgPath = join(root, "content/rag/stg-extracts.json");
const reviewDir = join(root, "content/review");
const decisionsPath = join(reviewDir, "decisions.jsonl");

function loadSeeds() {
  return readdirSync(seedDir)
    .filter((f) => f.endsWith(".json"))
    .map((fileName) => ({
      fileName,
      path: join(seedDir, fileName),
      doc: JSON.parse(readFileSync(join(seedDir, fileName), "utf8")),
    }));
}

function loadBatchMoleculeIds() {
  const map = new Map();
  for (const ref of STG_BATCH_A_I_SEEDS) {
    const entry = loadSeeds().find((f) => f.fileName === ref.seedFile);
    const ids = (entry?.doc.molecules ?? []).map((m) => m.id);
    map.set(ref.batch, ids);
  }
  return map;
}

function loadAllMoleculesAndSafety() {
  const files = loadSeeds();
  return {
    files,
    molecules: files.flatMap((f) => f.doc.molecules ?? []),
    safetyProfiles: files.flatMap((f) => f.doc.safetyProfiles ?? []),
  };
}

function loadStgDoc() {
  return JSON.parse(readFileSync(stgPath, "utf8"));
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const flags = new Set();
  const positional = [];
  let attestation = "";
  let limit;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--write") flags.add("write");
    else if (a === "--stg") flags.add("stg");
    else if (a === "--dosing") flags.add("dosing");
    else if (a === "--json") flags.add("json");
    else if (a === "--attestation") {
      attestation = String(args[++i] ?? "");
    } else if (a.startsWith("--attestation=")) {
      attestation = a.slice("--attestation=".length);
    } else if (a === "--limit") {
      limit = Number(args[++i] ?? "");
    } else if (a.startsWith("--limit=")) {
      limit = Number(a.slice("--limit=".length));
    } else if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    } else {
      positional.push(a);
    }
  }
  return { positional, flags, attestation, limit };
}

function printSummary(json) {
  const batchMoleculeIds = loadBatchMoleculeIds();
  const { molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const dosingItems = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed"],
  });
  const extracts = loadStgDoc().extracts ?? [];
  const summary = summarizeBatchAiBacklog({ batchMoleculeIds, dosingItems, extracts });
  if (json) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }
  console.log("Materia founder Batch A–I backlog (publishState only — never invents mg)\n");
  console.log(
    "Batch  Molecules  Dosing-critical  STG-draft  STG-published  Label",
  );
  console.log("-----  ---------  ---------------  ---------  -------------  -----");
  for (const b of summary.batches) {
    console.log(
      `${b.batch.padEnd(5)}  ${String(b.moleculeCount).padStart(9)}  ${String(b.dosingDraftCritical).padStart(15)}  ${String(b.stgExtractDraft).padStart(9)}  ${String(b.stgExtractPublished).padStart(13)}  ${b.label}`,
    );
  }
  console.log(
    `\nTotals: molecules=${summary.totals.molecules} dosingCritical=${summary.totals.dosingDraftCritical} stgDraft=${summary.totals.stgExtractDraft} stgPublished=${summary.totals.stgExtractPublished}`,
  );
  console.log(`\n${summary.note}`);
  console.log("\nNext: npm run review:batches -- show A");
  console.log("Publish (dry-run): npm run review:batches -- publish-stg <id> --attestation \"I confirm sourced…\"");
  console.log("Persist: add --write");
}

function printShow(batch, flags) {
  const b = batch.toUpperCase();
  const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === b);
  if (!ref) {
    console.error(`Unknown batch ${batch}. Use A–I.`);
    process.exit(2);
  }
  const ids = loadBatchMoleculeIds().get(b) ?? [];
  const { molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const dosingAll = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed"],
  });
  const dosing = dosingBacklogForBatch(dosingAll, ids);
  const batchByMoleculeId = new Map(ids.map((id) => [id, b]));
  const stg = buildStgExtractReviewQueue({
    extracts: loadStgDoc().extracts ?? [],
    states: ["draft", "reviewed"],
    moleculeIds: ids,
    batchByMoleculeId,
  });

  const showDosing = flags.has("dosing") || (!flags.has("stg") && !flags.has("dosing"));
  const showStg = flags.has("stg") || (!flags.has("stg") && !flags.has("dosing"));

  if (flags.has("json")) {
    console.log(
      JSON.stringify(
        {
          batch: b,
          label: ref.label,
          dosing: showDosing ? dosing : undefined,
          stg: showStg ? stg : undefined,
        },
        null,
        2,
      ),
    );
    return;
  }

  console.log(`Batch ${b} — ${ref.label} (${ref.edition})`);
  console.log(`Seed: content/seed/${ref.seedFile}  molecules=${ids.length}\n`);

  if (showDosing) {
    console.log(`Dosing / high-stakes drafts (${dosing.length}):`);
    for (const item of dosing.slice(0, 40)) {
      console.log(
        `  [${item.priority}] ${item.id}\n    ${item.preview.replace(/\s+/g, " ").slice(0, 120)}`,
      );
    }
    if (dosing.length > 40) console.log(`  … +${dosing.length - 40} more`);
    console.log("");
  }

  if (showStg) {
    console.log(`STG extract drafts (${stg.length}):`);
    for (const item of stg.slice(0, 40)) {
      console.log(
        `  [${item.priority}] ${item.extractId}\n    ${item.preview.replace(/\s+/g, " ").slice(0, 120)}`,
      );
    }
    if (stg.length > 40) console.log(`  … +${stg.length - 40} more`);
  }
}

function appendDecision(decision) {
  mkdirSync(reviewDir, { recursive: true });
  appendFileSync(decisionsPath, `${JSON.stringify(decision)}\n`, "utf8");
}

function cmdPublishStg(extractId, attestation, write) {
  const doc = loadStgDoc();
  const batchMoleculeIds = loadBatchMoleculeIds();
  const batchByMoleculeId = new Map();
  for (const [batch, ids] of batchMoleculeIds) {
    for (const id of ids) batchByMoleculeId.set(id, batch);
  }
  const queue = buildStgExtractReviewQueue({
    extracts: doc.extracts ?? [],
    states: ["draft", "reviewed", "published"],
    batchByMoleculeId,
  });
  const item = queue.find((i) => i.extractId === extractId || i.id === extractId);
  if (!item) {
    console.error(`STG extract not found: ${extractId}`);
    process.exit(1);
  }
  const gate = validateStgExtractDecision({
    item,
    decision: "publish",
    attestation,
  });
  if (!gate.ok) {
    console.error(`Refuse: ${gate.reason}`);
    process.exit(1);
  }
  const next = applyStgExtractDecisionState(item.publishState, "publish");
  const decision = {
    id: `cli-stg-${Date.now()}`,
    queueItemId: item.id,
    decision: "publish",
    reviewerLabel: "founder-cli",
    attestation,
    at: new Date().toISOString(),
    note: write ? "persisted via founder-batch-review.mjs" : "dry-run",
  };
  console.log(
    JSON.stringify(
      {
        dryRun: !write,
        extractId: item.extractId,
        from: item.publishState,
        to: next,
        preview: item.preview.slice(0, 160),
        decision,
      },
      null,
      2,
    ),
  );
  if (!write) {
    console.error("\nDry-run only. Re-run with --write to persist.");
    return;
  }
  if (!setStgExtractPublishStateInDoc(doc, item.extractId, next)) {
    console.error("Failed to mutate extract");
    process.exit(1);
  }
  if (doc.meta) doc.meta.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(stgPath, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
  appendDecision(decision);
  console.error(`Wrote ${stgPath} + ${decisionsPath}`);
}

function cmdMarkReviewedStg(extractId, write) {
  const doc = loadStgDoc();
  const queue = buildStgExtractReviewQueue({
    extracts: doc.extracts ?? [],
    states: ["draft", "reviewed", "published"],
  });
  const item = queue.find((i) => i.extractId === extractId || i.id === extractId);
  if (!item) {
    console.error(`STG extract not found: ${extractId}`);
    process.exit(1);
  }
  const next = applyStgExtractDecisionState(item.publishState, "mark_reviewed");
  const decision = {
    id: `cli-stg-${Date.now()}`,
    queueItemId: item.id,
    decision: "mark_reviewed",
    reviewerLabel: "founder-cli",
    at: new Date().toISOString(),
    note: write ? "persisted via founder-batch-review.mjs" : "dry-run",
  };
  console.log(JSON.stringify({ dryRun: !write, extractId: item.extractId, from: item.publishState, to: next, decision }, null, 2));
  if (!write) {
    console.error("\nDry-run only. Re-run with --write to persist.");
    return;
  }
  setStgExtractPublishStateInDoc(doc, item.extractId, next);
  writeFileSync(stgPath, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
  appendDecision(decision);
  console.error(`Wrote ${stgPath}`);
}

function cmdPublishDosing(moleculeId, fieldPath, attestation, write) {
  const { files, molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const queue = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed", "published"],
  });
  const item = queue.find((i) => i.moleculeId === moleculeId && i.fieldPath === fieldPath);
  if (!item) {
    console.error(`Queue item not found: ${moleculeId} ${fieldPath}`);
    process.exit(1);
  }
  const gate = validateReviewDecision({ item, decision: "publish", attestation });
  if (!gate.ok) {
    console.error(`Refuse: ${gate.reason}`);
    process.exit(1);
  }
  const next = nextPublishState(item.publishState, "publish");
  const decision = {
    id: `cli-dose-${Date.now()}`,
    queueItemId: item.id,
    decision: "publish",
    reviewerLabel: "founder-cli",
    attestation,
    at: new Date().toISOString(),
    note: write ? "persisted via founder-batch-review.mjs" : "dry-run",
  };
  console.log(
    JSON.stringify(
      {
        dryRun: !write,
        moleculeId,
        fieldPath,
        from: item.publishState,
        to: next,
        preview: item.preview,
        decision,
      },
      null,
      2,
    ),
  );
  if (!write) {
    console.error("\nDry-run only. Re-run with --write to persist.");
    return;
  }
  const seedFile = findSeedFileForMolecule(files, moleculeId);
  if (!seedFile) {
    console.error(`No seed file for ${moleculeId}`);
    process.exit(1);
  }
  const entry = files.find((f) => f.fileName === seedFile);
  if (!setFactPublishStateInSeedDoc(entry.doc, moleculeId, fieldPath, next)) {
    console.error("Failed to mutate seed fact");
    process.exit(1);
  }
  writeFileSync(entry.path, `${JSON.stringify(entry.doc, null, 2)}\n`, "utf8");
  appendDecision(decision);
  console.error(`Wrote content/seed/${seedFile} + ${decisionsPath}`);
}

function cmdPlanStg(batchRaw, json) {
  const key = String(batchRaw).toUpperCase();
  if (key === "ALL") {
    const plan = planStgAllBatches({
      batchMoleculeIds: loadBatchMoleculeIds(),
      extracts: loadStgDoc().extracts ?? [],
    });
    if (json) {
      console.log(
        JSON.stringify(
          {
            ...plan,
            batches: plan.batches.map((b) => ({
              batch: b.batch,
              label: b.label,
              alreadyPublished: b.alreadyPublished,
              eligible: b.eligible.length,
              blocked: b.blocked.length,
              eligibleIds: b.eligible.map((e) => e.extractId),
              blockedIds: b.blocked.map((x) => x.extractId),
            })),
          },
          null,
          2,
        ),
      );
      return;
    }
    console.log("STG publish plan — Batches A–I\n");
    console.log("Batch  Eligible  Blocked  AlreadyPub  Label");
    console.log("-----  --------  -------  ----------  -----");
    for (const b of plan.batches) {
      console.log(
        `${b.batch.padEnd(5)}  ${String(b.eligible.length).padStart(8)}  ${String(b.blocked.length).padStart(7)}  ${String(b.alreadyPublished).padStart(10)}  ${b.label}`,
      );
    }
    console.log(
      `\nTotals: eligible=${plan.totals.eligible} blocked=${plan.totals.blocked} alreadyPublished=${plan.totals.alreadyPublished}`,
    );
    console.log(`\n${plan.note}`);
    return;
  }

  const batch = key;
  const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === batch);
  if (!ref) {
    console.error(`Unknown batch ${batchRaw}. Use A–I or all.`);
    process.exit(2);
  }
  const ids = loadBatchMoleculeIds().get(batch) ?? [];
  const plan = planStgBatchPublish({
    batch,
    extracts: loadStgDoc().extracts ?? [],
    moleculeIds: ids,
  });
  if (json) {
    console.log(
      JSON.stringify(
        {
          ...plan,
          label: ref.label,
          eligibleIds: plan.eligible.map((e) => e.extractId),
          eligible: plan.eligible.map((e) => ({
            extractId: e.extractId,
            moleculeSlug: e.moleculeSlug,
            publishState: e.publishState,
            preview: e.preview.slice(0, 120),
          })),
        },
        null,
        2,
      ),
    );
    return;
  }
  console.log(`STG publish plan — Batch ${batch} (${ref.label})`);
  console.log(`Already published: ${plan.alreadyPublished}`);
  console.log(`Eligible to publish: ${plan.eligible.length}`);
  console.log(`Blocked: ${plan.blocked.length}\n`);
  for (const e of plan.eligible) {
    console.log(`  ✓ ${e.extractId}  (${e.moleculeSlug}, ${e.publishState})`);
  }
  if (plan.blocked.length) {
    console.log("\nBlocked:");
    for (const b of plan.blocked) {
      console.log(`  ✗ ${b.extractId}: ${b.reason}`);
    }
  }
  console.log(`\n${plan.note}`);
  console.log(
    `\nDry-run publish: npm run review:batches -- publish-stg-batch ${batch} --attestation "I confirm sourced from DoH STG pointer only"`,
  );
  console.log("Persist: add --write");
}

function cmdPlanDosing(batchRaw, json) {
  const key = String(batchRaw).toUpperCase();
  const { molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const dosingItems = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed"],
  });
  const batchMoleculeIds = loadBatchMoleculeIds();

  if (key === "ALL") {
    const plan = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    if (json) {
      console.log(
        JSON.stringify(
          {
            ...plan,
            batches: plan.batches.map((b) => ({
              batch: b.batch,
              label: b.label,
              placeholderAbsent: b.placeholderAbsent.length,
              numericSuspect: b.numericSuspect.length,
              otherDraft: b.otherDraft.length,
            })),
          },
          null,
          2,
        ),
      );
      return;
    }
    console.log("Dosing review plan — Batches A–I (no auto-publish)\n");
    console.log("Batch  Placeholder  NumericSuspect  Other  Label");
    console.log("-----  -----------  --------------  -----  -----");
    for (const b of plan.batches) {
      console.log(
        `${b.batch.padEnd(5)}  ${String(b.placeholderAbsent.length).padStart(11)}  ${String(b.numericSuspect.length).padStart(14)}  ${String(b.otherDraft.length).padStart(5)}  ${b.label}`,
      );
    }
    console.log(
      `\nTotals: placeholder=${plan.totals.placeholderAbsent} numericSuspect=${plan.totals.numericSuspect} other=${plan.totals.otherDraft}`,
    );
    console.log(`\n${plan.note}`);
    return;
  }

  const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
  if (!ref) {
    console.error(`Unknown batch ${batchRaw}. Use A–I or all.`);
    process.exit(2);
  }
  const plan = planDosingBatch({
    batch: key,
    dosingItems,
    moleculeIds: batchMoleculeIds.get(key) ?? [],
  });
  if (json) {
    console.log(JSON.stringify({ ...plan, label: ref.label }, null, 2));
    return;
  }
  console.log(`Dosing plan — Batch ${key} (${ref.label})`);
  console.log(`placeholder_absent: ${plan.placeholderAbsent.length}`);
  console.log(`numeric_suspect: ${plan.numericSuspect.length}`);
  console.log(`other_draft: ${plan.otherDraft.length}\n`);
  if (plan.numericSuspect.length) {
    console.log("NUMERIC SUSPECT — do not publish until sourced rewrite:");
    for (const row of plan.numericSuspect) {
      console.log(`  ✗ ${row.id}\n    ${row.preview}`);
    }
    console.log("");
  }
  console.log("Placeholder absent (honest no-dose text) — optional individual publish:");
  for (const row of plan.placeholderAbsent.slice(0, 20)) {
    console.log(`  · ${row.id}`);
  }
  if (plan.placeholderAbsent.length > 20) {
    console.log(`  … +${plan.placeholderAbsent.length - 20} more`);
  }
  console.log(`\n${plan.note}`);
}

function cmdExportDosingCli(batchRaw, json, attestation) {
  const key = String(batchRaw).toUpperCase();
  const { molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const dosingItems = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed"],
  });
  const batchMoleculeIds = loadBatchMoleculeIds();

  let items;
  let scope;
  if (key === "ALL") {
    const plan = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    items = flattenDosingPlanItems(plan.batches);
    scope = "all";
  } else {
    const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
    if (!ref) {
      console.error(`Unknown batch ${batchRaw}. Use A–I or all.`);
      process.exit(2);
    }
    const plan = planDosingBatch({
      batch: key,
      dosingItems,
      moleculeIds: batchMoleculeIds.get(key) ?? [],
    });
    items = flattenDosingPlanItems([plan]);
    scope = key;
  }

  const exported = exportPlaceholderDosingCli({
    scope,
    items,
    attestation: attestation || DEFAULT_HONEST_ABSENCE_ATTESTATION,
  });

  if (json) {
    console.log(JSON.stringify(exported, null, 2));
    return;
  }

  console.log(`# ${exported.note}`);
  console.log(
    `# scope=${exported.scope} placeholders=${exported.count} skippedSuspect=${exported.skippedNumericSuspect}`,
  );
  for (const line of exported.lines) {
    console.log(line);
  }
}

function cmdExportStgCli(batchRaw, json, attestation) {
  const key = String(batchRaw).toUpperCase();
  const batchMoleculeIds = loadBatchMoleculeIds();
  const extracts = loadStgDoc().extracts ?? [];

  let eligible;
  let blockedCount;
  let scope;
  if (key === "ALL") {
    const plan = planStgAllBatches({
      batchMoleculeIds,
      extracts,
      attestation: attestation || DEFAULT_STG_POINTER_ATTESTATION,
    });
    eligible = flattenStgEligibleItems(plan.batches);
    blockedCount = plan.totals.blocked;
    scope = "all";
  } else {
    const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
    if (!ref) {
      console.error(`Unknown batch ${batchRaw}. Use A–I or all.`);
      process.exit(2);
    }
    const plan = planStgBatchPublish({
      batch: key,
      extracts,
      moleculeIds: batchMoleculeIds.get(key) ?? [],
      attestation: attestation || DEFAULT_STG_POINTER_ATTESTATION,
    });
    eligible = flattenStgEligibleItems([{ eligible: plan.eligible }]);
    blockedCount = plan.blocked.length;
    scope = key;
  }

  const exported = exportEligibleStgCli({
    scope,
    eligible,
    blockedCount,
    attestation: attestation || DEFAULT_STG_POINTER_ATTESTATION,
  });

  if (json) {
    console.log(JSON.stringify(exported, null, 2));
    return;
  }

  console.log(`# ${exported.note}`);
  console.log(
    `# scope=${exported.scope} eligible=${exported.count} skippedBlocked=${exported.skippedBlocked}`,
  );
  for (const line of exported.lines) {
    console.log(line);
  }
}

function cmdDecisions(json, limitRaw, batchRaw) {
  let raw = "";
  try {
    raw = readFileSync(decisionsPath, "utf8");
  } catch {
    raw = "";
  }
  const all = parseReviewDecisionsJsonl(raw);
  const limit = limitRaw != null ? Number(limitRaw) : 50;
  const key = batchRaw ? String(batchRaw).toUpperCase() : "ALL";

  let scoped = all;
  let scope = "all";
  if (key !== "ALL") {
    const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
    if (!ref) {
      console.error(`Unknown batch ${batchRaw}. Use A–I or omit for all.`);
      process.exit(2);
    }
    const ids = loadBatchMoleculeIds().get(key) ?? [];
    const extracts = loadStgDoc().extracts ?? [];
    const extractMoleculeById = new Map(extracts.map((e) => [e.id, e.moleculeId]));
    scoped = filterReviewDecisionsByMoleculeIds(all, ids, extractMoleculeById);
    scope = key;
  }

  const items = listRecentReviewDecisions(scoped, Number.isFinite(limit) ? limit : 50);
  const body = {
    scope,
    total: scoped.length,
    limit: items.length,
    items,
    note:
      scope === "all"
        ? "Audit journal (newest first). publishState changes only — never invented clinical text. Empty until first --write / REVIEW_PERSIST decide."
        : `Audit journal filtered to Batch ${scope} (newest first). publishState only — never invented clinical text.`,
  };
  if (json) {
    console.log(JSON.stringify(body, null, 2));
    return;
  }
  console.log(
    `Review decisions — ${scope === "all" ? "Batches A–I" : `Batch ${scope}`} · ${body.total} total, showing ${body.limit}\n`,
  );
  if (items.length === 0) {
    console.log("(empty — no persisted decisions yet)");
    console.log(`\n${body.note}`);
    return;
  }
  for (const d of items) {
    console.log(`${d.at}  ${d.decision.padEnd(14)}  ${d.reviewerLabel}  ${d.queueItemId}`);
    if (d.note) console.log(`  note: ${d.note}`);
  }
  console.log(`\n${body.note}`);
}

function cmdProgress(json, batchRaw) {
  const batchMoleculeIds = loadBatchMoleculeIds();
  const extracts = loadStgDoc().extracts ?? [];
  const { molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const dosingItems = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed"],
  });
  const rag = describeInRegionRagEnv(process.env);
  const ragInput = {
    ok: rag.ok,
    mode: rag.mode,
    embedderConfigured: rag.embedderConfigured,
    llmConfigured: rag.llmConfigured,
  };

  const key = batchRaw ? String(batchRaw).toUpperCase() : "ALL";
  let snap;
  if (key === "ALL") {
    const stg = planStgAllBatches({ batchMoleculeIds, extracts });
    const dosing = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    snap = summarizeFounderProgress({
      scope: "all",
      stgTotals: stg.totals,
      dosingTotals: dosing.totals,
      rag: ragInput,
    });
  } else {
    const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
    if (!ref) {
      console.error(`Unknown batch ${batchRaw}. Use A–I or omit for all.`);
      process.exit(2);
    }
    const ids = batchMoleculeIds.get(key) ?? [];
    const stg = planStgBatchPublish({
      batch: key,
      extracts,
      moleculeIds: ids,
    });
    const dosing = planDosingBatch({
      batch: key,
      dosingItems,
      moleculeIds: ids,
    });
    snap = summarizeFounderProgress({
      scope: key,
      stgTotals: {
        alreadyPublished: stg.alreadyPublished,
        eligible: stg.eligible.length,
        blocked: stg.blocked.length,
      },
      dosingTotals: {
        placeholderAbsent: dosing.placeholderAbsent.length,
        numericSuspect: dosing.numericSuspect.length,
        otherDraft: dosing.otherDraft.length,
      },
      rag: ragInput,
    });
  }

  if (json) {
    console.log(JSON.stringify(snap, null, 2));
    return;
  }
  console.log(`Founder progress — ${snap.scope === "all" ? "Batches A–I" : `Batch ${snap.scope.toUpperCase()}`} (read-only)\n`);
  console.log(
    `STG: published=${snap.stg.alreadyPublished} eligible=${snap.stg.eligible} blocked=${snap.stg.blocked}`,
  );
  console.log(
    `Dosing: placeholders=${snap.dosing.placeholderAbsent} suspects=${snap.dosing.numericSuspect} other=${snap.dosing.otherDraft}`,
  );
  console.log(`RAG: ok=${snap.rag.ok} mode=${snap.rag.mode} hosted=${snap.rag.hostedConfigured}`);
  console.log("\nNext actions:");
  for (const [i, action] of snap.nextActions.entries()) {
    console.log(`  ${i + 1}. ${action}`);
  }
  console.log(`\n${snap.note}`);
}

function cmdChecklist(json, batchRaw) {
  const batchMoleculeIds = loadBatchMoleculeIds();
  const extracts = loadStgDoc().extracts ?? [];
  const { molecules, safetyProfiles } = loadAllMoleculesAndSafety();
  const dosingItems = buildReviewQueue({
    molecules,
    safetyProfiles,
    states: ["draft", "reviewed"],
  });
  const rag = describeInRegionRagEnv(process.env);
  const ragInput = {
    ok: rag.ok,
    mode: rag.mode,
    embedderConfigured: rag.embedderConfigured,
    llmConfigured: rag.llmConfigured,
  };

  const key = batchRaw ? String(batchRaw).toUpperCase() : "ALL";
  let progress;
  let stgBlocked;
  let dosingNumericSuspect;
  let stgEligible;
  let dosingPlaceholders;
  let scope;

  if (key === "ALL") {
    const stg = planStgAllBatches({ batchMoleculeIds, extracts });
    const dosing = planDosingAllBatches({ batchMoleculeIds, dosingItems });
    scope = "all";
    progress = summarizeFounderProgress({
      scope: "all",
      stgTotals: stg.totals,
      dosingTotals: dosing.totals,
      rag: ragInput,
    });
    stgBlocked = stg.batches.flatMap((b) => b.blocked);
    dosingNumericSuspect = dosing.batches.flatMap((b) => b.numericSuspect);
    stgEligible = flattenStgEligibleItems(stg.batches);
    dosingPlaceholders = dosing.batches.flatMap((b) => b.placeholderAbsent);
  } else {
    const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
    if (!ref) {
      console.error(`Unknown batch ${batchRaw}. Use A–I or omit for all.`);
      process.exit(2);
    }
    const ids = batchMoleculeIds.get(key) ?? [];
    const stg = planStgBatchPublish({
      batch: key,
      extracts,
      moleculeIds: ids,
    });
    const dosing = planDosingBatch({
      batch: key,
      dosingItems,
      moleculeIds: ids,
    });
    scope = key;
    progress = summarizeFounderProgress({
      scope: key,
      stgTotals: {
        alreadyPublished: stg.alreadyPublished,
        eligible: stg.eligible.length,
        blocked: stg.blocked.length,
      },
      dosingTotals: {
        placeholderAbsent: dosing.placeholderAbsent.length,
        numericSuspect: dosing.numericSuspect.length,
        otherDraft: dosing.otherDraft.length,
      },
      rag: ragInput,
    });
    stgBlocked = stg.blocked;
    dosingNumericSuspect = dosing.numericSuspect;
    stgEligible = stg.eligible.map((e) => ({ extractId: e.extractId }));
    dosingPlaceholders = dosing.placeholderAbsent;
  }

  const pack = buildBatchChecklist({
    scope,
    progress,
    stgBlocked,
    dosingNumericSuspect,
    stgEligible,
    dosingPlaceholders,
  });

  if (json) {
    console.log(JSON.stringify(pack, null, 2));
    return;
  }

  const label = pack.scope === "all" ? "Batches A–I" : `Batch ${pack.scope}`;
  console.log(`Founder checklist — ${label} (read-only, no --write)\n`);
  console.log(
    `STG: published=${pack.progress.stg.alreadyPublished} eligible=${pack.progress.stg.eligible} blocked=${pack.progress.stg.blocked}`,
  );
  console.log(
    `Dosing: placeholders=${pack.progress.dosing.placeholderAbsent} suspects=${pack.progress.dosing.numericSuspect} other=${pack.progress.dosing.otherDraft}`,
  );
  console.log(
    `RAG: ok=${pack.progress.rag.ok} mode=${pack.progress.rag.mode} hosted=${pack.progress.rag.hostedConfigured}`,
  );

  console.log("\nNext actions:");
  for (const [i, action] of pack.progress.nextActions.entries()) {
    console.log(`  ${i + 1}. ${action}`);
  }

  if (pack.stgBlocked.length > 0) {
    console.log(`\nBlocked STG (${pack.stgBlocked.length}):`);
    for (const b of pack.stgBlocked) {
      console.log(`  - ${b.extractId}: ${b.reason}`);
    }
  } else {
    console.log("\nBlocked STG: none");
  }

  if (pack.dosingNumericSuspect.length > 0) {
    console.log(`\nNumeric-suspect dosing (do not publish) (${pack.dosingNumericSuspect.length}):`);
    for (const row of pack.dosingNumericSuspect) {
      console.log(`  - ${row.moleculeId} ${row.fieldPath}`);
    }
  } else {
    console.log("\nNumeric-suspect dosing: none");
  }

  console.log(`\nSTG batch preview (still no --write):\n  ${pack.stgBatchPreviewLine}`);

  console.log(`\nCopy-ready STG CLI (${pack.stgCli.count}):`);
  if (pack.stgCli.lines.length === 0) console.log("  (none)");
  else for (const line of pack.stgCli.lines) console.log(`  ${line}`);

  console.log(`\nCopy-ready dosing placeholder CLI (${pack.dosingCli.count}):`);
  if (pack.dosingCli.lines.length === 0) console.log("  (none)");
  else for (const line of pack.dosingCli.lines) console.log(`  ${line}`);

  console.log(`\n${pack.note}`);
}

function cmdPublishStgBatch(batchRaw, attestation, write) {
  const key = String(batchRaw).toUpperCase();
  const batchMoleculeIds = loadBatchMoleculeIds();
  const doc = loadStgDoc();
  const extracts = doc.extracts ?? [];

  let plans;
  let scope;
  if (key === "ALL") {
    const rollup = planStgAllBatches({ batchMoleculeIds, extracts, attestation });
    plans = rollup.batches;
    scope = "all";
  } else {
    const ref = STG_BATCH_A_I_SEEDS.find((x) => x.batch === key);
    if (!ref) {
      console.error(`Unknown batch ${batchRaw}. Use A–I or all.`);
      process.exit(2);
    }
    const plan = planStgBatchPublish({
      batch: key,
      extracts,
      moleculeIds: batchMoleculeIds.get(key) ?? [],
      attestation,
    });
    plans = [{ ...plan, label: ref.label }];
    scope = key;
  }

  const applied = applyStgBatchPublish({
    scope,
    plans,
    reviewerLabel: "founder-cli",
    attestation,
    decisionIdPrefix: write ? `cli-stg-batch-${scope}` : `cli-stg-dry-${scope}`,
  });

  if (!applied.ok) {
    console.error(
      JSON.stringify({ error: applied.reason, blocked: applied.blocked }, null, 2),
    );
    process.exit(1);
  }

  if (applied.mutations.length === 0) {
    console.log(
      JSON.stringify(
        {
          dryRun: !write,
          batch: scope,
          published: 0,
          message: "Nothing to publish (no draft/reviewed eligible extracts).",
          alreadyPublished: applied.alreadyPublished,
        },
        null,
        2,
      ),
    );
    return;
  }

  const results = applied.mutations.map((m) => ({
    batch: m.batch,
    extractId: m.extractId,
    moleculeSlug: m.moleculeSlug,
    from: m.from,
    to: m.to,
  }));

  if (write) {
    for (const m of applied.mutations) {
      if (!setStgExtractPublishStateInDoc(doc, m.extractId, m.to)) {
        console.error(`Failed to mutate ${m.extractId}`);
        process.exit(1);
      }
    }
    for (const decision of applied.decisions) {
      appendDecision({
        ...decision,
        id: `${decision.id}-${Date.now()}`,
        note: `publish-stg-batch ${scope} persist`,
      });
    }
    if (doc.meta) doc.meta.updated = new Date().toISOString().slice(0, 10);
    writeFileSync(stgPath, `${JSON.stringify(doc, null, 2)}\n`, "utf8");
  }

  console.log(
    JSON.stringify(
      {
        dryRun: !write,
        batch: scope,
        count: results.length,
        alreadyPublished: applied.alreadyPublished,
        results,
        note: applied.note,
      },
      null,
      2,
    ),
  );

  if (!write) {
    console.error("\nDry-run only. Re-run with --write to persist.");
    return;
  }
  console.error(`Wrote ${stgPath} (${results.length} extracts) + ${decisionsPath}`);
}

function cmdRag(json) {
  const pack = buildRagProvisionPack(process.env);
  if (json) {
    console.log(JSON.stringify(pack, null, 2));
    return;
  }
  console.log("Founder RAG provision pack (read-only — no invented URLs)\n");
  console.log(
    `Status: ok=${pack.status.ok} mode=${pack.status.mode.embedder}/${pack.status.mode.composer}` +
      ` hosted=${pack.status.embedderConfigured || pack.status.llmConfigured}` +
      (pack.status.embedderHost ? ` embedderHost=${pack.status.embedderHost}` : "") +
      (pack.status.llmHost ? ` llmHost=${pack.status.llmHost}` : ""),
  );
  if (pack.status.errors.length > 0) {
    console.log("Errors:");
    for (const e of pack.status.errors) console.log(`  - ${e}`);
  }
  console.log("\nSteps:");
  for (const [i, step] of pack.steps.entries()) {
    console.log(`  ${i + 1}. ${step}`);
  }
  console.log("\nEnv stub (empty placeholders — paste founder URLs locally):\n");
  console.log(pack.envStubLines.join("\n"));
  console.log(`\nVerify: ${pack.verifyCmd}`);
  console.log(`Runtime: ${pack.healthPath}`);
  console.log(`\n${pack.note}`);
}

function usage() {
  console.log(`Founder Batch A–I review CLI

  npm run review:batches
  npm run review:batches -- progress [A|all] [--json]
  npm run review:batches -- checklist [A|all] [--json]
  npm run review:batches -- rag [--json]
  npm run review:batches -- decisions [A|all] [--limit 50] [--json]
  npm run review:batches -- show A [--stg|--dosing] [--json]
  npm run review:batches -- plan-stg A|all [--json]
  npm run review:batches -- plan-dosing A|all [--json]
  npm run review:batches -- export-dosing-cli A|all [--attestation "…"] [--json]
  npm run review:batches -- export-stg-cli A|all [--attestation "…"] [--json]
  npm run review:batches -- publish-stg-batch A|all --attestation "I confirm sourced…" [--write]
  npm run review:batches -- publish-stg <extractId> --attestation "I confirm sourced…" [--write]
  npm run review:batches -- mark-reviewed-stg <extractId> [--write]
  npm run review:batches -- publish-dosing <moleculeId> <fieldPath> --attestation "…" [--write]

Default is dry-run. --write persists publishState only (never invents clinical text).
No batch auto-publish for dosing — use plan-dosing / export-dosing-cli then individual publish-dosing.`);
}

const { positional, flags, attestation, limit } = parseArgs(process.argv);
const cmd = positional[0] ?? "summary";

if (cmd === "help" || cmd === "-h" || cmd === "--help") {
  usage();
  process.exit(0);
}

if (cmd === "summary") {
  printSummary(flags.has("json"));
} else if (cmd === "progress") {
  cmdProgress(flags.has("json"), positional[1]);
} else if (cmd === "checklist") {
  cmdChecklist(flags.has("json"), positional[1]);
} else if (cmd === "rag") {
  cmdRag(flags.has("json"));
} else if (cmd === "decisions") {
  cmdDecisions(flags.has("json"), limit, positional[1]);
} else if (cmd === "show") {
  const batch = positional[1];
  if (!batch) {
    usage();
    process.exit(2);
  }
  printShow(batch, flags);
} else if (cmd === "plan-stg") {
  const batch = positional[1];
  if (!batch) {
    console.error("Need: plan-stg <A–I|all>");
    process.exit(2);
  }
  cmdPlanStg(batch, flags.has("json"));
} else if (cmd === "plan-dosing") {
  const batch = positional[1];
  if (!batch) {
    console.error("Need: plan-dosing <A–I|all>");
    process.exit(2);
  }
  cmdPlanDosing(batch, flags.has("json"));
} else if (cmd === "export-dosing-cli") {
  const batch = positional[1];
  if (!batch) {
    console.error("Need: export-dosing-cli <A–I|all>");
    process.exit(2);
  }
  cmdExportDosingCli(batch, flags.has("json"), attestation);
} else if (cmd === "export-stg-cli") {
  const batch = positional[1];
  if (!batch) {
    console.error("Need: export-stg-cli <A–I|all>");
    process.exit(2);
  }
  cmdExportStgCli(batch, flags.has("json"), attestation);
} else if (cmd === "publish-stg-batch") {
  const batch = positional[1];
  if (!batch || !attestation) {
    console.error("Need: publish-stg-batch <A–I|all> --attestation \"…\"");
    process.exit(2);
  }
  cmdPublishStgBatch(batch, attestation, flags.has("write"));
} else if (cmd === "publish-stg") {
  const id = positional[1];
  if (!id || !attestation) {
    console.error("Need: publish-stg <extractId> --attestation \"…\"");
    process.exit(2);
  }
  cmdPublishStg(id, attestation, flags.has("write"));
} else if (cmd === "mark-reviewed-stg") {
  const id = positional[1];
  if (!id) {
    console.error("Need: mark-reviewed-stg <extractId>");
    process.exit(2);
  }
  cmdMarkReviewedStg(id, flags.has("write"));
} else if (cmd === "publish-dosing") {
  const moleculeId = positional[1];
  const fieldPath = positional[2];
  if (!moleculeId || !fieldPath || !attestation) {
    console.error("Need: publish-dosing <moleculeId> <fieldPath> --attestation \"…\"");
    process.exit(2);
  }
  cmdPublishDosing(moleculeId, fieldPath, attestation, flags.has("write"));
} else {
  console.error(`Unknown command: ${cmd}`);
  usage();
  process.exit(2);
}
