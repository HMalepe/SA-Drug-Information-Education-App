import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  exportPlaceholderDosingCli,
  flattenDosingPlanItems,
  type DosingPlanItem,
} from "@materia/shared";

describe("exportPlaceholderDosingCli", () => {
  const items: DosingPlanItem[] = [
    {
      id: "q1",
      moleculeId: "mol-a",
      moleculeSlug: "alpha",
      fieldPath: "dosingAdult",
      publishState: "draft",
      classification: "placeholder_absent",
      preview: "Adult dosing not published yet.",
    },
    {
      id: "q2",
      moleculeId: "mol-b",
      moleculeSlug: "beta",
      fieldPath: "dosingPaediatric",
      publishState: "draft",
      classification: "numeric_suspect",
      preview: "Give 250 mg twice daily.",
    },
    {
      id: "q3",
      moleculeId: "mol-c",
      moleculeSlug: "gamma",
      fieldPath: "dosingAdult",
      publishState: "draft",
      classification: "other_draft",
      preview: "See product label.",
    },
  ];

  it("emits only placeholder_absent lines without --write", () => {
    const exported = exportPlaceholderDosingCli({
      scope: "A",
      items,
      attestation: 'I confirm "honest" absence',
    });
    assert.equal(exported.count, 1);
    assert.equal(exported.skippedNumericSuspect, 1);
    assert.equal(exported.skippedOtherDraft, 1);
    assert.equal(exported.lines.length, 1);
    assert.match(exported.lines[0]!, /publish-dosing mol-a dosingAdult/);
    assert.ok(!exported.lines[0]!.includes("--write"));
    assert.match(exported.lines[0]!, /honest\\"/);
    assert.match(exported.note, /no dosing batch/i);
  });

  it("flattenDosingPlanItems keeps all classes for skip accounting", () => {
    const flat = flattenDosingPlanItems([
      {
        placeholderAbsent: [items[0]!],
        numericSuspect: [items[1]!],
        otherDraft: [items[2]!],
      },
    ]);
    assert.equal(flat.length, 3);
  });
});
