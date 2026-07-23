#!/usr/bin/env node
/**
 * Content pipeline gate: published clinical facts must have sourceId;
 * draft content must not be treated as renderable.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "seed", "antibiotics.json");
const seed = JSON.parse(readFileSync(root, "utf8"));

const sourceIds = new Set(seed.sources.map((s) => s.id));
let errors = 0;

function fail(msg) {
  console.error("SEED FAIL:", msg);
  errors += 1;
}

function checkFact(path, fact) {
  if (!fact) return;
  if (!fact.sourceId || !sourceIds.has(fact.sourceId)) {
    fail(`${path} missing/unknown sourceId`);
  }
  if (!["draft", "reviewed", "published"].includes(fact.publishState)) {
    fail(`${path} invalid publishState`);
  }
}

for (const m of seed.molecules) {
  checkFact(`${m.slug}.chemistrySummary`, m.chemistrySummary);
  checkFact(`${m.slug}.moaSummary`, m.moaSummary);
  checkFact(`${m.slug}.discoveryNote`, m.discoveryNote);
}

for (const sp of seed.safetyProfiles) {
  for (const key of Object.keys(sp)) {
    if (key === "id" || key === "moleculeId" || key === "publishState") continue;
    const val = sp[key];
    if (Array.isArray(val)) val.forEach((f, i) => checkFact(`safety.${sp.moleculeId}.${key}[${i}]`, f));
    else if (val && typeof val === "object" && "sourceId" in val) checkFact(`safety.${sp.moleculeId}.${key}`, val);
  }
}

if (seed.doseRules?.length) {
  for (const r of seed.doseRules) {
    checkFact(`doseRule.${r.indicationKey}`, r.fact);
    if (r.fact?.publishState === "published" && r.mgPerKgPerDose == null) {
      fail(`published dose rule ${r.indicationKey} missing mgPerKgPerDose`);
    }
  }
}

if (errors) {
  console.error(`\n${errors} seed validation error(s).`);
  process.exit(1);
}
console.log(`Seed OK: ${seed.molecules.length} molecules, ${seed.products.length} products, ${sourceIds.size} sources.`);
