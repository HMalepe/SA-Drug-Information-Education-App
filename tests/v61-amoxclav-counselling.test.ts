import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v61 amox-clav multilingual counselling §9", () => {
  it("publishes all five SA launch languages for amoxicillin-clavulanate", () => {
    const langs = listCounsellingLangs("mol-amoxclav");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-amoxclav");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-amoxclav"));
  });

  it("teaches penicillin allergy and food comfort without inventing doses or ratios", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-amoxclav", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*:\s*\d+/);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-amoxclav", "en")!;
    assert.match(en.lines.join(" "), /penicillin|beta-lactam/i);
    assert.match(en.lines.join(" "), /food|stomach/i);
    const zu = getCounsellingScript("mol-amoxclav", "zu")!;
    assert.match(zu.lines.join(" "), /penicillin|allergy/i);
  });
});
