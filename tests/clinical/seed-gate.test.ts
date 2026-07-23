/**
 * Seed-level S0 gate — no invented published numeric doses.
 */
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { resolveSearch } from "@materia/shared";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seedDir = join(__dirname, "../../content/seed");
const files = readdirSync(seedDir).filter((f) => f.endsWith(".json"));
const seeds = files.map((f) => JSON.parse(readFileSync(join(seedDir, f), "utf8")));
const molecules = seeds.flatMap((s) => s.molecules ?? []);
const products = seeds.flatMap((s) => s.products ?? []);
const safetyProfiles = seeds.flatMap((s) => s.safetyProfiles ?? []);

describe("seed S0 gate", () => {
  it("does not publish numeric adult dosing invents", () => {
    for (const sp of safetyProfiles) {
      const adult = sp.dosingAdult;
      if (adult?.publishState === "published") {
        assert.doesNotMatch(adult.value, /\d+\s*mg/i);
      }
    }
  });

  it("published antidote text is supportive empty-state only", () => {
    for (const sp of safetyProfiles) {
      const a = sp.antidoteOrSupportive;
      if (a?.publishState === "published") {
        assert.match(a.value.toLowerCase(), /no specific antidote|supportive/);
      }
    }
  });

  it("resolves Augmentin → amoxicillin-clavulanate from seed", () => {
    const hits = resolveSearch("Augmentin", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "amoxicillin-clavulanate");
  });

  it("resolves Panado → paracetamol from analgesics seed", () => {
    const hits = resolveSearch("Panado", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "paracetamol");
  });

  it("resolves Norvasc → amlodipine from antihypertensives seed", () => {
    const hits = resolveSearch("Norvasc", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "amlodipine");
  });

  it("resolves Glucophage → metformin from diabetes seed", () => {
    const hits = resolveSearch("Glucophage", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "metformin");
  });

  it("resolves Rimactane → rifampicin from hiv-tb seed", () => {
    const hits = resolveSearch("Rimactane", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "rifampicin");
  });

  it("publishes educational rifampicin↔dolutegravir interaction without inventing a dose", () => {
    const ix = seeds
      .flatMap((s) => s.interactions ?? [])
      .find((i) => i.id === "ix-rif-dtg");
    assert.ok(ix);
    assert.equal(ix.publishState, "published");
    assert.equal(ix.severity, "major");
    assert.match(String(ix.action?.value ?? ""), /Do not invent/i);
  });

  it("resolves Ventolin → salbutamol from respiratory seed", () => {
    const hits = resolveSearch("Ventolin", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "salbutamol");
  });

  it("resolves Lipitor → atorvastatin from cardiovascular seed", () => {
    const hits = resolveSearch("Lipitor", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "atorvastatin");
  });

  it("resolves Losec → omeprazole from gastrointestinal seed", () => {
    const hits = resolveSearch("Losec", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "omeprazole");
  });

  it("resolves Imodium → loperamide from gastrointestinal seed", () => {
    const hits = resolveSearch("Imodium", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "loperamide");
  });

  it("publishes educational warfarin↔aspirin interaction without inventing a dose", () => {
    const ix = seeds
      .flatMap((s) => s.interactions ?? [])
      .find((i) => i.id === "ix-warfarin-aspirin");
    assert.ok(ix);
    assert.equal(ix.publishState, "published");
    assert.equal(ix.severity, "major");
    assert.match(String(ix.action?.value ?? ""), /Do not invent/i);
  });

  it("publishes educational omeprazole↔clopidogrel interaction without inventing a dose", () => {
    const ix = seeds
      .flatMap((s) => s.interactions ?? [])
      .find((i) => i.id === "ix-omeprazole-clopidogrel");
    assert.ok(ix);
    assert.equal(ix.publishState, "published");
    assert.equal(ix.severity, "major");
    assert.match(String(ix.action?.value ?? ""), /Do not invent/i);
  });

  it("resolves Prozac → fluoxetine from mental-health seed", () => {
    const hits = resolveSearch("Prozac", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "fluoxetine");
  });

  it("resolves Zoloft → sertraline from mental-health seed", () => {
    const hits = resolveSearch("Zoloft", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "sertraline");
  });

  it("publishes educational fluoxetine↔tramadol interaction without inventing a dose", () => {
    const ix = seeds
      .flatMap((s) => s.interactions ?? [])
      .find((i) => i.id === "ix-fluoxetine-tramadol");
    assert.ok(ix);
    assert.equal(ix.publishState, "published");
    assert.equal(ix.severity, "major");
    assert.match(String(ix.action?.value ?? ""), /Do not invent/i);
  });

  it("resolves Postinor → levonorgestrel from womens-health seed", () => {
    const hits = resolveSearch("Postinor", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "levonorgestrel");
  });

  it("resolves Yasmin → drospirenone from womens-health seed", () => {
    const hits = resolveSearch("Yasmin", molecules, products);
    assert.equal(hits[0]?.moleculeSlug, "drospirenone");
  });

  it("publishes educational ethinylestradiol↔rifampicin interaction without inventing a dose", () => {
    const ix = seeds
      .flatMap((s) => s.interactions ?? [])
      .find((i) => i.id === "ix-ethinylestradiol-rifampicin");
    assert.ok(ix);
    assert.equal(ix.publishState, "published");
    assert.equal(ix.severity, "major");
    assert.match(String(ix.action?.value ?? ""), /Do not invent/i);
  });
});
