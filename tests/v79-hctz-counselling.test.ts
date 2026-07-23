import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v79 hydrochlorothiazide multilingual counselling §9", () => {
  it("publishes all five SA launch languages for hydrochlorothiazide", () => {
    const langs = listCounsellingLangs("mol-hctz");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-hctz");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-hctz"));
  });

  it("teaches diuretic and sun cues without inventing doses, clock times, or potassium targets", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-hctz", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\d+\s*mmol/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-hctz", "en")!;
    assert.match(en.lines.join(" "), /thiazide|urination|sun/i);
    assert.match(en.lines.join(" "), /does not invent a dose|potassium target/i);
    assert.match(en.lines.join(" "), /faint|emergency|dizziness/i);
  });
});
