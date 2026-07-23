import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v65 azithromycin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for azithromycin", () => {
    const langs = listCounsellingLangs("mol-azithro");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-azithro");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-azithro"));
  });

  it("teaches macrolide medicine-check cues without inventing doses or interaction lists", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-azithro", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-azithro", "en")!;
    assert.match(en.lines.join(" "), /macrolide/i);
    assert.match(en.lines.join(" "), /pharmacist|other medicines/i);
    assert.doesNotMatch(en.lines.join(" "), /warfarin|statin|digoxin/i);
  });
});
