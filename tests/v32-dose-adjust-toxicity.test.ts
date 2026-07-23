import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  assistDoseAdjustment,
  buildToxicityTimeline,
  classifyEgfr,
  DEFAULT_TOXICITY_MILESTONES,
  type Source,
} from "@materia/shared";

const source: Source = {
  id: "src-renal",
  citation: "Demo STG renal note — test fixture",
  sourceType: "guideline",
  lastReviewed: "2026-07-01",
};

describe("v32 dose-adjustment §8.5", () => {
  it("classifies educational renal bands", () => {
    assert.equal(classifyEgfr(95), "normal_or_high");
    assert.equal(classifyEgfr(45), "moderate");
    assert.equal(classifyEgfr(10), "kidney_failure");
    assert.equal(classifyEgfr(-1), null);
  });

  it("requires confirmation and never invents an adjusted dose", () => {
    const pending = assistDoseAdjustment({
      moleculeId: "mol-amox",
      moleculeName: "Amoxicillin",
      context: "renal",
      egfrMlMin: 28,
      clinicallyConfirmed: false,
      published: {
        renal: "Educational renal caution note (fixture).",
        source,
      },
    });
    assert.equal(pending.status, "needs_confirmation");
    assert.equal(pending.renalBand, "severe");
    assert.equal(pending.inventedAdjustedDose, null);

    const ok = assistDoseAdjustment({
      moleculeId: "mol-amox",
      context: "renal",
      egfrMlMin: 28,
      clinicallyConfirmed: true,
      published: {
        renal: "Educational renal caution note (fixture).",
        source,
      },
    });
    assert.equal(ok.status, "ok");
    assert.equal(ok.inventedAdjustedDose, null);
    assert.match(ok.publishedGuidance ?? "", /renal caution/i);
  });

  it("refuses contexts without published guidance", () => {
    const r = assistDoseAdjustment({
      moleculeId: "mol-x",
      context: "obesity",
      clinicallyConfirmed: true,
      published: {},
    });
    assert.equal(r.status, "unavailable");
    assert.match(r.message, /will not invent/i);
  });
});

describe("v32 toxicity timeline §8.7", () => {
  it("builds educational default arc", () => {
    const t = buildToxicityTimeline({ moleculeLabel: "Paracetamol" });
    assert.equal(t.educationalOnly, true);
    assert.equal(t.milestones.length, DEFAULT_TOXICITY_MILESTONES.length);
    assert.match(t.note, /teaching arc|§8\.7|educational/i);
    assert.equal(t.milestones[0]?.offsetMinutes, 0);
  });

  it("accepts published custom milestones only when substantive", () => {
    const thin = buildToxicityTimeline({
      publishedMilestones: [{ offsetLabel: "0", offsetMinutes: 0, title: "a", teachingPoint: "b" }],
    });
    assert.equal(thin.milestones.length, DEFAULT_TOXICITY_MILESTONES.length);

    const custom = buildToxicityTimeline({
      publishedMilestones: [
        { offsetLabel: "0", offsetMinutes: 0, title: "Start", teachingPoint: "t0" },
        { offsetLabel: "1 h", offsetMinutes: 60, title: "Mid", teachingPoint: "t1" },
        { offsetLabel: "24 h", offsetMinutes: 1440, title: "Late", teachingPoint: "t2" },
      ],
    });
    assert.equal(custom.milestones.length, 3);
    assert.match(custom.note, /Published molecule-specific/i);
  });
});
