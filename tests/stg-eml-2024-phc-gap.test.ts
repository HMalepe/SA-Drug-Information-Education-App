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
    assert.equal(gap.scaffoldedBatches.E_phc_hiv_tb_followon.length, 7);
    assert.equal(gap.scaffoldedBatches.F_phc_supportive_misc.length, 9);
    const blob = JSON.stringify(gap);
    assert.ok(!/\d+\s*mg\b/i.test(blob));
  });

  function assertDraftScaffold(pathFromRoot: string, expectedIds: string[]) {
    const seed = JSON.parse(readFileSync(join(root, pathFromRoot), "utf8"));
    const ids = seed.molecules.map((m: { id: string }) => m.id);
    for (const id of expectedIds) {
      assert.ok(ids.includes(id), `missing ${id}`);
    }
    assert.equal(ids.length, expectedIds.length);
    for (const s of seed.safetyProfiles) {
      assert.equal(s.dosingAdult.publishState, "draft");
      assert.match(s.dosingAdult.value, /not publish|will not invent/i);
    }
    const blob = JSON.stringify(seed);
    assert.ok(!/\d+\s*mg\b/i.test(blob));
  }

  it("scaffolds Batch D PHC clinic-core molecules with draft dosing only", () => {
    assertDraftScaffold("content/seed/phc-eml.json", [
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
    ]);
  });

  it("scaffolds Batch E PHC HIV/TB follow-on molecules with draft dosing only", () => {
    assertDraftScaffold("content/seed/phc-hiv-tb-eml.json", [
      "mol-emtricitabine",
      "mol-abacavir",
      "mol-zidovudine",
      "mol-lopinavir",
      "mol-darunavir",
      "mol-bedaquiline",
      "mol-quinine",
    ]);
  });

  it("scaffolds Batch F PHC supportive misc molecules with draft dosing only", () => {
    assertDraftScaffold("content/seed/phc-supportive-eml.json", [
      "mol-retinol",
      "mol-sennosides",
      "mol-orphenadrine",
      "mol-biperiden",
      "mol-zuclopenthixol",
      "mol-selenium-sulfide",
      "mol-benzyl-benzoate",
      "mol-povidone-iodine",
      "mol-nicotinamide",
    ]);
  });
});
