import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("STG/EML 2023 paediatric hospital gap triage", () => {
  it("records curated priority batches without embedding PDF dose text", () => {
    const gap = JSON.parse(
      readFileSync(join(root, "content/rag/stg-eml-2023-paediatric-gap.json"), "utf8"),
    );
    assert.match(gap.meta.edition, /2023/i);
    assert.match(gap.meta.edition, /Paediatric/i);
    assert.ok(gap.priorityMissingBatches.G_paeds_id_neonatal.includes("caffeine"));
    assert.ok(gap.priorityMissingBatches.H_paeds_cardio_neuro_endocrine.includes("propranolol"));
    assert.ok(gap.priorityMissingBatches.I_paeds_supportive_misc.includes("zinc-sulfate"));
    assert.equal(gap.scaffoldedBatches.G_paeds_id_neonatal.length, 12);
    const blob = JSON.stringify(gap);
    assert.ok(!/\d+\s*mg\b/i.test(blob));
  });

  it("scaffolds Batch G paediatric ID/neonatal molecules with draft dosing only", () => {
    const seed = JSON.parse(
      readFileSync(join(root, "content/seed/paediatric-eml.json"), "utf8"),
    );
    const ids = seed.molecules.map((m: { id: string }) => m.id);
    for (const id of [
      "mol-caffeine",
      "mol-cefotaxime",
      "mol-ceftazidime",
      "mol-amikacin",
      "mol-piperacillin-tazobactam",
      "mol-flucytosine",
      "mol-primaquine",
      "mol-miconazole",
      "mol-levofloxacin",
      "mol-dapsone",
      "mol-ethionamide",
      "mol-ganciclovir",
    ]) {
      assert.ok(ids.includes(id), `missing ${id}`);
    }
    assert.equal(ids.length, 12);
    for (const s of seed.safetyProfiles) {
      assert.equal(s.dosingAdult.publishState, "draft");
      assert.match(s.dosingAdult.value, /not publish|will not invent/i);
    }
    const blob = JSON.stringify(seed);
    assert.ok(!/\d+\s*mg\b/i.test(blob));
  });
});
