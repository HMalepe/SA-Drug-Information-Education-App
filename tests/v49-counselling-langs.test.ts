import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COUNSELLING_LANGS,
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
} from "@materia/shared";

describe("v49 published Sesotho + isiXhosa counselling §9", () => {
  it("lists all five SA launch languages for amoxicillin", () => {
    assert.equal(COUNSELLING_LANGS.length, 5);
    const langs = listCounsellingLangs("mol-amox");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-amox");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
  });

  it("keeps emergency / allergy teaching points without inventing doses", () => {
    for (const lang of ["st", "xh"] as const) {
      const script = getCounsellingScript("mol-amox", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.match(blob, /penicillin|allergy|allerg/i);
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
  });
});
