#!/usr/bin/env node
/**
 * Content pipeline gate: published clinical facts must have sourceId;
 * draft content must not be treated as renderable.
 * Validates every JSON file under content/seed/.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const seedDir = join(dirname(fileURLToPath(import.meta.url)), "..", "seed");
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

  if (seed.doseRules?.length) {
    for (const r of seed.doseRules) {
      checkFact(file, `doseRule.${r.indicationKey}`, r.fact, sourceIds);
      if (r.fact?.publishState === "published" && r.mgPerKgPerDose == null) {
        fail(file, `published dose rule ${r.indicationKey} missing mgPerKgPerDose`);
      }
    }
  }
}

if (errors) {
  console.error(`\n${errors} seed validation error(s).`);
  process.exit(1);
}
console.log(
  `Seed OK: ${files.length} files, ${moleculeCount} molecules, ${productCount} products, ${allSources.size} unique source ids.`,
);
