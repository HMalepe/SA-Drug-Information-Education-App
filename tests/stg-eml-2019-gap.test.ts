import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("STG/EML 2019 hospital adults gap triage", () => {
  it("records curated priority batches without embedding PDF dose text", () => {
    const gap = JSON.parse(
      readFileSync(join(root, "content/rag/stg-eml-2019-hospital-adults-gap.json"), "utf8"),
    );
    assert.match(gap.meta.edition, /2019/i);
    assert.ok(gap.priorityMissingBatches.A_emergency_antidotes.includes("naloxone"));
    assert.ok(gap.priorityMissingBatches.B_id_malaria_parasites_abx.includes("artesunate"));
    const blob = JSON.stringify(gap);
    assert.ok(!/\d+\s*mg\b/i.test(blob));
  });

  it("scaffolds Batch A emergency-supportive molecules with draft dosing only", () => {
    const seed = JSON.parse(
      readFileSync(join(root, "content/seed/emergency-supportive.json"), "utf8"),
    );
    const ids = seed.molecules.map((m: { id: string }) => m.id);
    for (const id of [
      "mol-adrenaline",
      "mol-atropine",
      "mol-naloxone",
      "mol-acetylcysteine",
      "mol-activated-charcoal",
      "mol-calcium-gluconate",
      "mol-magnesium-sulfate",
    ]) {
      assert.ok(ids.includes(id), `missing ${id}`);
    }
    for (const s of seed.safetyProfiles) {
      assert.equal(s.dosingAdult.publishState, "draft");
      assert.match(s.dosingAdult.value, /not publish|will not invent/i);
    }
  });
});
