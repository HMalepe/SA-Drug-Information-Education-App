#!/usr/bin/env node
/**
 * Founder Batch A–I review CLI (constitution 3.2–3.3).
 * Offline: reads content/seed + stg-extracts. Never invents clinical text.
 *
 * Usage:
 *   npm run review:batches
 *   npm run review:batches -- show A
 *   npm run review:batches -- show A --stg
 *   npm run review:batches -- publish-stg <extractId> --attestation "I confirm sourced …"
 *   npm run review:batches -- publish-stg <extractId> --attestation "…" --write
 *   npm run review:batches -- publish-dosing <moleculeId> <fieldPath> --attestation "…" --write
 *   npm run review:batches -- mark-reviewed-stg <extractId> --write
 *
 * Default is dry-run (no disk writes). Pass --write to persist publishState + audit JSONL.
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
  validateReviewDecision,
  validateStgExtractDecision,
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
    } else if (a.startsWith("-")) {
      console.error(`Unknown flag: ${a}`);
      process.exit(2);
    } else {
      positional.push(a);
    }
  }
  return { positional, flags, attestation };
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

function usage() {
  console.log(`Founder Batch A–I review CLI

  npm run review:batches
  npm run review:batches -- show A [--stg|--dosing] [--json]
  npm run review:batches -- publish-stg <extractId> --attestation "I confirm sourced…" [--write]
  npm run review:batches -- mark-reviewed-stg <extractId> [--write]
  npm run review:batches -- publish-dosing <moleculeId> <fieldPath> --attestation "…" [--write]

Default is dry-run. --write persists publishState only (never invents clinical text).`);
}

const { positional, flags, attestation } = parseArgs(process.argv);
const cmd = positional[0] ?? "summary";

if (cmd === "help" || cmd === "-h" || cmd === "--help") {
  usage();
  process.exit(0);
}

if (cmd === "summary") {
  printSummary(flags.has("json"));
} else if (cmd === "show") {
  const batch = positional[1];
  if (!batch) {
    usage();
    process.exit(2);
  }
  printShow(batch, flags);
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
