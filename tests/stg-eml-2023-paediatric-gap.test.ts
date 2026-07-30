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
    assert.equal(gap.scaffoldedBatches.H_paeds_cardio_neuro_endocrine.length, 12);
    assert.equal(gap.scaffoldedBatches.I_paeds_supportive_misc.length, 7);
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

  it("scaffolds Batch G paediatric ID/neonatal molecules with draft dosing only", () => {
    assertDraftScaffold("content/seed/paediatric-eml.json", [
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
    ]);
  });

  it("scaffolds Batch H paediatric cardio/neuro/endocrine molecules with draft dosing only", () => {
    assertDraftScaffold("content/seed/paediatric-cardio-neuro-eml.json", [
      "mol-propranolol",
      "mol-captopril",
      "mol-clonazepam",
      "mol-methylphenidate",
      "mol-olanzapine",
      "mol-glucagon",
      "mol-mannitol",
      "mol-calcitriol",
      "mol-aminophylline",
      "mol-dopamine",
      "mol-dobutamine",
      "mol-octreotide",
    ]);
  });

  it("scaffolds Batch I paediatric supportive misc molecules with draft dosing only", () => {
    assertDraftScaffold("content/seed/paediatric-supportive-eml.json", [
      "mol-zinc-sulfate",
      "mol-sodium-bicarbonate",
      "mol-silver-sulfadiazine",
      "mol-valganciclovir",
      "mol-rifabutin",
      "mol-macrogol",
      "mol-sulfadiazine",
    ]);
  });
});
