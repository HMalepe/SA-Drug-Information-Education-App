import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  findSeedFileForMolecule,
  setFactPublishStateInSeedDoc,
} from "@materia/shared";

describe("v14 seed write-back", () => {
  it("updates dosingAdult publishState without changing text", () => {
    const doc = {
      molecules: [{ id: "mol-x", slug: "x" }],
      safetyProfiles: [
        {
          moleculeId: "mol-x",
          dosingAdult: {
            value: "Adult dosing not published yet.",
            sourceId: "src",
            publishState: "draft",
            lastReviewed: "2026-07-01",
          },
        },
      ],
    };
    const ok = setFactPublishStateInSeedDoc(doc, "mol-x", "dosingAdult", "reviewed");
    assert.equal(ok, true);
    assert.equal(doc.safetyProfiles[0]!.dosingAdult.publishState, "reviewed");
    assert.equal(doc.safetyProfiles[0]!.dosingAdult.value, "Adult dosing not published yet.");
  });

  it("finds the seed file owning a molecule", () => {
    const file = findSeedFileForMolecule(
      [
        { fileName: "a.json", doc: { molecules: [{ id: "mol-a" }] } },
        { fileName: "b.json", doc: { molecules: [{ id: "mol-b" }] } },
      ],
      "mol-b",
    );
    assert.equal(file, "b.json");
  });
});
