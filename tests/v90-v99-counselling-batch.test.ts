import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  counsellingCoverage,
  getCounsellingScript,
  listCounsellingLangs,
  listMoleculesWithPublishedCounselling,
} from "@materia/shared";

const BATCH = [
  {
    id: "mol-prednisone",
    enCue: /corticosteroid|taper/i,
  },
  {
    id: "mol-diclofenac",
    enCue: /NSAID|black stools/i,
  },
  {
    id: "mol-cetirizine",
    enCue: /antihistamine|drowsiness/i,
  },
  {
    id: "mol-gliclazide",
    enCue: /sulfonylurea|hypoglycaemia/i,
  },
  {
    id: "mol-dolutegravir",
    enCue: /INSTI|calcium|iron|antacid/i,
  },
  {
    id: "mol-efavirenz",
    enCue: /NNRTI|vivid dreams/i,
  },
  {
    id: "mol-allopurinol",
    enCue: /rash|xanthine/i,
  },
  {
    id: "mol-pantoprazole",
    enCue: /PPI|before food/i,
  },
  {
    id: "mol-clopidogrel",
    enCue: /antiplatelet|bleeding/i,
  },
  {
    id: "mol-codeine",
    enCue: /opioid|breathing/i,
  },
] as const;

describe("v90–v99 counselling batch §9", () => {
  for (const { id, enCue } of BATCH) {
    it(`publishes five langs with safety gates for ${id}`, () => {
      const langs = listCounsellingLangs(id);
      assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
      const cov = counsellingCoverage(id);
      assert.equal(cov.length, 5);
      assert.ok(cov.every((c) => c.lineCount === 4));

      for (const lang of ["en", "zu", "af", "st", "xh"] as const) {
        const script = getCounsellingScript(id, lang);
        assert.ok(script);
        const blob = script!.lines.join(" ");
        assert.doesNotMatch(blob, /\d+\s*mg/i);
        assert.doesNotMatch(blob, /\[Draft\]/i);
        assert.match(script!.sourceNote, /founder-reviewed/i);
      }

      const en = getCounsellingScript(id, "en")!;
      assert.match(en.lines.join(" "), enCue);
    });
  }

  it("lists all ten batch molecules in published counselling coverage", () => {
    const published = listMoleculesWithPublishedCounselling();
    for (const { id } of BATCH) {
      assert.ok(published.includes(id), `${id} missing from published list`);
    }
  });
});
