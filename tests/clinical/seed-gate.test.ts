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
});
