import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

describe("v74 omeprazole multilingual counselling §9", () => {
  it("publishes all five SA launch languages for omeprazole", () => {
    const langs = listCounsellingLangs("mol-omeprazole");
    assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
    const cov = counsellingCoverage("mol-omeprazole");
    assert.equal(cov.length, 5);
    assert.ok(cov.every((c) => c.lineCount === 4));
    assert.ok(listMoleculesWithPublishedCounselling().includes("mol-omeprazole"));
  });

  it("teaches before-food PPI cues without inventing clock times or doses", () => {
    for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
      const script = getCounsellingScript("mol-omeprazole", lang);
      assert.ok(script);
      const blob = script!.lines.join(" ");
      assert.doesNotMatch(blob, /\d+\s*mg/i);
      assert.doesNotMatch(blob, /\d+\s*hour/i);
      assert.doesNotMatch(blob, /\[Draft\]/i);
      assert.match(script!.sourceNote, /founder-reviewed/i);
    }
    const en = getCounsellingScript("mol-omeprazole", "en")!;
    assert.match(en.lines.join(" "), /PPI|before food/i);
    assert.match(en.lines.join(" "), /does not invent a clock schedule|dose/i);
    assert.match(en.lines.join(" "), /diarrhoea|black stools|emergency/i);
  });
});
