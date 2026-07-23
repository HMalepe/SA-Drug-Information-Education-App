import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v80 furosemide multilingual counselling §9", () => {
  it("publishes all five SA launch languages for furosemide", () => {
    const langs = listCounsellingLangs("mol-furosemide");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-furosemide");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-furosemide"));
  });

  it("teaches loop-diuretic cues without inventing doses, clock times, or electrolyte targets", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-furosemide", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\d+\s*mmol/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-furosemide", "en")!;
    assert.match(en.lines.join(" "), /loop|urination/i);
    assert.match(en.lines.join(" "), /does not invent a dose|potassium|sodium/i);
    assert.match(en.lines.join(" "), /faint|emergency|dizziness/i);
  });
});
