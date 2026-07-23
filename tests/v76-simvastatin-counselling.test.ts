import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v76 simvastatin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for simvastatin", () => {
    const langs = listCounsellingLangs("mol-simvastatin");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-simvastatin");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-simvastatin"));
  });

  it("teaches muscle and interaction-check cues without inventing doses or interaction lists", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-simvastatin", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*mmol/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-simvastatin", "en")!;
    assert.match(en.lines.join(" "), /muscle|statin/i);
    assert.match(en.lines.join(" "), /interaction|pharmacist/i);
    assert.doesNotMatch(en.lines.join(" "), /amiodarone|clarithromycin|gemfibrozil/i);
    assert.match(en.lines.join(" "), /does not invent a dose|lipid target|interaction list/i);
  });
});
