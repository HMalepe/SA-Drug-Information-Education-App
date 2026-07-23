import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v70 metformin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for metformin", () => {
    const langs = listCounsellingLangs("mol-metformin");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-metformin");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-metformin"));
  });

  it("teaches food comfort and illness cues without inventing doses or eGFR cutoffs", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-metformin", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\beGFR\b|\d+\s*mL/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-metformin", "en")!;
    assert.match(en.lines.join(" "), /food|stomach/i);
    assert.match(en.lines.join(" "), /kidney|alcohol|dehydration/i);
    assert.match(en.lines.join(" "), /does not invent a dose/i);
  });
});
