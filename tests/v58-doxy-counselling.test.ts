import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v58 doxycycline multilingual counselling §9", () => {
  it("publishes all five SA launch languages for doxycycline", () => {
    const langs = listCounsellingLangs("mol-doxy");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-doxy");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-amox"));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-doxy"));
  });

  it("teaches dairy/mineral and sun points without inventing doses or spacing hours", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-doxy", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-doxy", "en")!;
    assert.match(en.lines.join(" "), /dairy|mineral|antacid/i);
    assert.match(en.lines.join(" "), /sun/i);
    const st = getCounsellingScript("mol-doxy", "st")!;
    assert.match(st.lines.join(" "), /rakhemisi|leibole|tšohanyetso/i);
  });
});
