import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildReviewQueue,
  filterReviewQueueByDosingClass,
  type Molecule,
  type SafetyProfile,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-x",
    slug: "demo-mol",
    innName: "Demo Molecule",
    className: "Demo",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
    moaSummary: {
      value: "Educational MOA",
      sourceId: "src",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
  },
];

const safety: SafetyProfile[] = [
  {
    id: "safe-x",
    moleculeId: "mol-x",
    publishState: "published",
    dosingAdult: {
      value: "Adult dosing not published yet.",
      sourceId: "src",
      publishState: "draft",
      lastReviewed: "2026-07-01",
    },
    dosingPaediatric: {
      value: "Give 250 mg twice daily.",
      sourceId: "src",
      publishState: "draft",
      lastReviewed: "2026-07-01",
    },
    contraindications: [],
    warnings: [],
    clinicalPearls: [],
    counsellingPoints: [
      {
        value: "Finish the course.",
        sourceId: "src",
        publishState: "draft",
        lastReviewed: "2026-07-01",
      },
    ],
  },
];

describe("review queue dosingClass filter (GET /review/queue composition)", () => {
  it("filterReviewQueueByDosingClass returns only matching dosing items", () => {
    const queue = buildReviewQueue({ molecules, safetyProfiles: safety });
    const placeholders = filterReviewQueueByDosingClass(queue, "placeholder_absent");
    const suspects = filterReviewQueueByDosingClass(queue, "numeric_suspect");

    assert.ok(placeholders.length >= 1);
    assert.ok(placeholders.every((i) => i.dosingClass === "placeholder_absent"));
    assert.ok(placeholders.some((i) => i.fieldPath === "dosingAdult"));

    assert.ok(suspects.length >= 1);
    assert.ok(suspects.every((i) => i.dosingClass === "numeric_suspect"));
    assert.ok(suspects.some((i) => i.fieldPath === "dosingPaediatric"));

    assert.ok(!placeholders.some((i) => i.fieldPath.startsWith("counselling")));
  });

  it("omitting dosingClass filter preserves mixed queue (shared contract)", () => {
    const queue = buildReviewQueue({ molecules, safetyProfiles: safety });
    assert.ok(queue.some((i) => i.dosingClass === "placeholder_absent"));
    assert.ok(queue.some((i) => i.dosingClass === "numeric_suspect"));
    assert.ok(queue.some((i) => i.dosingClass === undefined));
  });
});
