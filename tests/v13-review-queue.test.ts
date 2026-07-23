import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildReviewQueue,
  nextPublishState,
  summarizeCoverage,
  validateReviewDecision,
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

describe("v13 clinical review queue", () => {
  it("prioritises draft dosing as critical", () => {
    const queue = buildReviewQueue({ molecules, safetyProfiles: safety });
    assert.ok(queue.some((i) => i.fieldPath === "dosingAdult" && i.priority === "critical"));
    assert.ok(queue.every((i) => i.publishState !== "published"));
  });

  it("summarises coverage publish percent", () => {
    const summary = summarizeCoverage({ molecules, safetyProfiles: safety });
    assert.equal(summary.areas[0]?.therapeuticArea, "antibiotics");
    assert.ok(summary.totals.factsDraft >= 2);
    assert.ok(summary.totals.factsPublished >= 1);
  });

  it("requires attestation to publish high-stakes facts", () => {
    const item = buildReviewQueue({ molecules, safetyProfiles: safety }).find(
      (i) => i.fieldPath === "dosingAdult",
    )!;
    assert.equal(
      validateReviewDecision({ item, decision: "publish", attestation: "looks fine" }).ok,
      false,
    );
    assert.equal(
      validateReviewDecision({
        item,
        decision: "publish",
        attestation: "I confirm this is sourced from the label",
      }).ok,
      true,
    );
    assert.equal(nextPublishState("draft", "publish"), "published");
  });
});
