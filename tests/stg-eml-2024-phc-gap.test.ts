import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("STG/EML 2024 PHC gap triage", () => {
  it("records curated priority batches without embedding PDF dose text", () => {
    const gap = JSON.parse(
      readFileSync(join(root, "content/rag/stg-eml-2024-phc-gap.json"), "utf8"),
    );
    assert.match(gap.meta.edition, /2024/i);
    assert.match(gap.meta.edition, /Primary Healthcare/i);
    assert.ok(gap.priorityMissingBatches.D_phc_clinic_core.includes("mebendazole"));
    assert.ok(gap.priorityMissingBatches.E_phc_hiv_tb_followon.includes("emtricitabine"));
    assert.ok(gap.priorityMissingBatches.F_phc_supportive_misc.includes("retinol"));
    assert.equal(gap.scaffoldedBatches.D_phc_clinic_core.length, 12);
    const blob = JSON.stringify(gap);
    assert.ok(!/\d+\s*mg\b/i.test(blob));
  });

  it("scaffolds Batch D PHC clinic-core molecules with draft dosing only", () => {
    const seed = JSON.parse(
      readFileSync(join(root, "content/seed/phc-eml.json"), "utf8"),
    );
    const ids = seed.molecules.map((m: { id: string }) => m.id);
    for (const id of [
      "mol-mebendazole",
      "mol-ivermectin",
      "mol-nystatin",
      "mol-benzathine-benzylpenicillin",
      "mol-griseofulvin",
      "mol-chlorhexidine",
      "mol-nifedipine",
      "mol-methyldopa",
      "mol-mifepristone",
      "mol-ergometrine",
      "mol-promethazine",
      "mol-fosfomycin",
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
