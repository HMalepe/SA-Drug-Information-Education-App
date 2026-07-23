import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildOverdoseEmergencyTemplate,
  calculateDose,
  type DoseRule,
  type Source,
} from "@materia/shared";

const source: Source = {
  id: "src-dose",
  citation: "Demo rule — founder must replace with verified STG source",
  sourceType: "guideline",
  lastReviewed: "2026-07-01",
};

const publishedRule: DoseRule = {
  indicationKey: "demo-fever",
  mgPerKgPerDose: 15,
  maxMgPerDose: 500,
  frequencyNote: "Demo frequency only",
  displayTemplate: "{dose} mg per dose (verify clinically)",
  fact: {
    value: "Demo published factor 15 mg/kg/dose (NOT for clinical use — test fixture)",
    sourceId: "src-dose",
    publishState: "published",
    lastReviewed: "2026-07-01",
  },
  source,
};

describe("governed dose calculator", () => {
  it("requires clinical confirmation before showing calculated dose", () => {
    const r = calculateDose(
      {
        moleculeId: "mol-amox",
        weightKg: 20,
        indicationKey: "demo-fever",
        clinicallyConfirmed: false,
      },
      [publishedRule],
    );
    assert.equal(r.status, "needs_confirmation");
    assert.equal(r.suggestedDoseDisplay, undefined);
    assert.match(r.working?.join(" ") ?? "", /Source/);
  });

  it("shows working + source when confirmed", () => {
    const r = calculateDose(
      {
        moleculeId: "mol-amox",
        weightKg: 20,
        indicationKey: "demo-fever",
        clinicallyConfirmed: true,
      },
      [publishedRule],
    );
    assert.equal(r.status, "ok");
    assert.match(r.suggestedDoseDisplay ?? "", /300/);
    assert.ok(r.working?.some((w) => w.includes("15")));
    assert.match(r.disclaimer, /not a medical device/i);
  });

  it("never invents a dose when no published rule", () => {
    const r = calculateDose(
      {
        moleculeId: "mol-amox",
        weightKg: 20,
        indicationKey: "missing",
        clinicallyConfirmed: true,
      },
      [],
    );
    assert.equal(r.status, "unavailable");
    assert.match(r.message ?? "", /will not invent/i);
  });
});

describe("overdose emergency template", () => {
  it("always includes call-for-help and first-aid framing", () => {
    const view = buildOverdoseEmergencyTemplate({});
    assert.match(view.callEmergency, /emergency/i);
    assert.match(view.whatToDo[0] ?? "", /poison|emergency/i);
    assert.match(view.antidoteOrSupportive, /supportive/i);
  });
});
