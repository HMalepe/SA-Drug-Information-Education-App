#!/usr/bin/env node
/**
 * Content pipeline gate: published clinical facts must have sourceId;
 * draft content must not be treated as renderable.
 * Published dosing / STG text must not look like inventable numeric scaffolds
 * (constitution 3.1 — shared classifyDosingPreview / STG mg gate).
 * Validates every JSON file under content/seed/ + content/rag/stg-extracts.json.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  listPublishedNumericSuspectDosing,
  listPublishedStgNumericSuspects,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const seedDir = join(root, "content", "seed");
const stgPath = join(root, "content", "rag", "stg-extracts.json");
const files = readdirSync(seedDir).filter((f) => f.endsWith(".json"));

let errors = 0;
let moleculeCount = 0;
let productCount = 0;
const allSources = new Set();

function fail(file, msg) {
  console.error(`SEED FAIL [${file}]:`, msg);
  errors += 1;
}

function checkFact(file, path, fact, sourceIds) {
  if (!fact) return;
  if (!fact.sourceId || !sourceIds.has(fact.sourceId)) {
    fail(file, `${path} missing/unknown sourceId`);
  }
  if (!["draft", "reviewed", "published"].includes(fact.publishState)) {
    fail(file, `${path} invalid publishState`);
  }
}

for (const file of files) {
  const seed = JSON.parse(readFileSync(join(seedDir, file), "utf8"));
  const sourceIds = new Set(seed.sources.map((s) => s.id));
  for (const id of sourceIds) allSources.add(id);
  moleculeCount += seed.molecules?.length ?? 0;
  productCount += seed.products?.length ?? 0;

  for (const m of seed.molecules ?? []) {
    checkFact(file, `${m.slug}.chemistrySummary`, m.chemistrySummary, sourceIds);
    checkFact(file, `${m.slug}.moaSummary`, m.moaSummary, sourceIds);
    checkFact(file, `${m.slug}.discoveryNote`, m.discoveryNote, sourceIds);
  }

  for (const sp of seed.safetyProfiles ?? []) {
    for (const key of Object.keys(sp)) {
      if (key === "id" || key === "moleculeId" || key === "publishState") continue;
      const val = sp[key];
      if (Array.isArray(val)) {
        val.forEach((f, i) => checkFact(file, `safety.${sp.moleculeId}.${key}[${i}]`, f, sourceIds));
      } else if (val && typeof val === "object" && "sourceId" in val) {
        checkFact(file, `safety.${sp.moleculeId}.${key}`, val, sourceIds);
      }
    }
  }

  const dosingHits = listPublishedNumericSuspectDosing(seed.safetyProfiles ?? []);
  for (const hit of dosingHits) {
    fail(
      file,
      `published dosing ${hit.moleculeId}.${hit.fieldPath} looks like inventable numeric scaffold (constitution 3.1): ${hit.preview}`,
    );
  }

  if (seed.doseRules?.length) {
    for (const r of seed.doseRules) {
      checkFact(file, `doseRule.${r.indicationKey}`, r.fact, sourceIds);
      if (r.fact?.publishState === "published" && r.mgPerKgPerDose == null) {
        fail(file, `published dose rule ${r.indicationKey} missing mgPerKgPerDose`);
      }
    }
  }
}

try {
  const stgDoc = JSON.parse(readFileSync(stgPath, "utf8"));
  const stgHits = listPublishedStgNumericSuspects(stgDoc.extracts ?? []);
  for (const hit of stgHits) {
    fail(
      "stg-extracts.json",
      `published STG ${hit.extractId} contains numeric dose units (constitution 3.1): ${hit.preview}`,
    );
  }
} catch (err) {
  fail("stg-extracts.json", `could not read STG extracts: ${err instanceof Error ? err.message : err}`);
}

if (errors) {
  console.error(`\n${errors} seed validation error(s).`);
  process.exit(1);
}
console.log(
  `Seed OK: ${files.length} files, ${moleculeCount} molecules, ${productCount} products, ${allSources.size} unique source ids (no published numeric-suspect dosing/STG).`,
);
