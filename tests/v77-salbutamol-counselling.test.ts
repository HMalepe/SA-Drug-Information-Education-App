import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v77 salbutamol multilingual counselling §9", () => {
  it("publishes all five SA launch languages for salbutamol", () => {
    const langs = listCounsellingLangs("mol-salbutamol");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-salbutamol");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-salbutamol"));
  });

  it("teaches inhaler technique and worsening cues without inventing puff counts or doses", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-salbutamol", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*puff/i);
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*mcg/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-salbutamol", "en")!;
    assert.match(en.lines.join(" "), /SABA|inhaler|technique/i);
    assert.match(en.lines.join(" "), /does not invent a puff count|dose/i);
    assert.match(en.lines.join(" "), /emergency|not helping|worse/i);
  });
});
