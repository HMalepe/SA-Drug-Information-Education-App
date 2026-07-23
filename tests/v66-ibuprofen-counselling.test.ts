import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v66 ibuprofen multilingual counselling §9", () => {
  it("publishes all five SA launch languages for ibuprofen", () => {
    const langs = listCounsellingLangs("mol-ibuprofen");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-ibuprofen");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-ibuprofen"));
  });

  it("teaches NSAID food and history cues without inventing doses or combination rules", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-ibuprofen", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-ibuprofen", "en")!;
    assert.match(en.lines.join(" "), /NSAID|food|stomach/i);
    assert.match(en.lines.join(" "), /ulcer|asthma|bleeding/i);
  });
});
