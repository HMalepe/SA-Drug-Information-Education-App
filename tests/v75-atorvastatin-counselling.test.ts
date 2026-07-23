import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v75 atorvastatin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for atorvastatin", () => {
    const langs = listCounsellingLangs("mol-atorvastatin");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-atorvastatin");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-atorvastatin"));
  });

  it("teaches muscle and grapefruit cues without inventing doses or lipid targets", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-atorvastatin", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*mmol/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-atorvastatin", "en")!;
    assert.match(en.lines.join(" "), /muscle|statin/i);
    assert.match(en.lines.join(" "), /grapefruit/i);
    assert.match(en.lines.join(" "), /does not invent a dose|lipid target/i);
  });
});
