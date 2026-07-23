/**
 * Seed-level S0 gate — no invented published numeric doses.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { resolveSearch } from "@materia/shared";

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(
  readFileSync(join(__dirname, "../../content/seed/antibiotics.json"), "utf8"),
);

describe("seed S0 gate", () => {
  it("does not publish numeric adult dosing invents", () => {
    for (const sp of seed.safetyProfiles) {
      const adult = sp.dosingAdult;
      if (adult?.publishState === "published") {
        assert.doesNotMatch(adult.value, /\d+\s*mg/i);
      }
    }
  });

  it("published antidote text is supportive empty-state only", () => {
    for (const sp of seed.safetyProfiles) {
      const a = sp.antidoteOrSupportive;
      if (a?.publishState === "published") {
        assert.match(a.value.toLowerCase(), /no specific antidote|supportive/);
      }
    }
  });

  it("resolves Augmentin → amoxicillin-clavulanate from seed", () => {
    const hits = resolveSearch("Augmentin", seed.molecules, seed.products);
    assert.equal(hits[0]?.moleculeSlug, "amoxicillin-clavulanate");
  });
});
