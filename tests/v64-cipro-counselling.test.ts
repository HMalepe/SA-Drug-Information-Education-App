import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v64 ciprofloxacin multilingual counselling §9", () => {
  it("publishes all five SA launch languages for ciprofloxacin", () => {
    const langs = listCounsellingLangs("mol-cipro");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-cipro");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-cipro"));
  });

  it("teaches dairy/mineral and fluoroquinolone cues without inventing doses or hours", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-cipro", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-cipro", "en")!;
    assert.match(en.lines.join(" "), /dairy|mineral|antacid/i);
    assert.match(en.lines.join(" "), /fluoroquinolone|tendon|sun/i);
  });
});
