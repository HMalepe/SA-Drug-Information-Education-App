import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  listPublishedNumericSuspectDosing,
  listPublishedStgNumericSuspects,
} from "@materia/shared";

describe("published numeric-suspect seed gate (constitution 3.1)", () => {
  it("flags published dosing with inventable mg and ignores drafts", () => {
    const hits = listPublishedNumericSuspectDosing([
      {
        moleculeId: "mol-a",
        dosingAdult: {
          value: "Give 500 mg TDS",
          sourceId: "src",
          publishState: "published",
        },
        dosingPaediatric: {
          value: "Give 250 mg twice daily.",
          sourceId: "src",
          publishState: "draft",
        },
      },
      {
        moleculeId: "mol-b",
        dosingAdult: {
          value: "Adult dosing not published yet.",
          sourceId: "src",
          publishState: "published",
        },
      },
    ]);
    assert.equal(hits.length, 1);
    assert.equal(hits[0]!.moleculeId, "mol-a");
    assert.equal(hits[0]!.fieldPath, "dosingAdult");
  });

  it("flags published STG extracts that contain numeric mg", () => {
    const hits = listPublishedStgNumericSuspects([
      {
        id: "stg-ok",
        publishState: "published",
        text: "Educational pointer to DoH STG — no invented dose.",
      },
      {
        id: "stg-bad",
        publishState: "published",
        text: "Pointer with invented 500 mg — refuse.",
      },
      {
        id: "stg-draft",
        publishState: "draft",
        text: "Draft still has 250 mg — ok until publish.",
      },
    ]);
    assert.equal(hits.length, 1);
    assert.equal(hits[0]!.extractId, "stg-bad");
  });
});
