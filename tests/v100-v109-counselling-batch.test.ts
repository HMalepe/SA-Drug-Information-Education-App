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
    id: "mol-lamivudine",
    enCue: /NRTI|adherence/i,
  },
  {
    id: "mol-tdf",
    enCue: /tenofovir|kidney|bone/i,
  },
  {
    id: "mol-pyrazinamide",
    enCue: /liver|antimycobacterial/i,
  },
  {
    id: "mol-ethambutol",
    enCue: /vision|eye/i,
  },
  {
    id: "mol-sertraline",
    enCue: /SSRI|suicid/i,
  },
  {
    id: "mol-insulin-glargine",
    enCue: /insulin|hypoglycaemia/i,
  },
  {
    id: "mol-rivaroxaban",
    enCue: /DOAC|bleeding/i,
  },
  {
    id: "mol-carbamazepine",
    enCue: /antiepileptic|rash|interaction/i,
  },
  {
    id: "mol-valproate",
    enCue: /pregnancy|liver/i,
  },
  {
    id: "mol-montelukast",
    enCue: /leukotriene|mood|controller/i,
  },
] as const;

describe("v100–v109 counselling batch §9", () => {
  for (const { id, enCue } of BATCH) {
    it(`publishes five langs with safety gates for ${id}`, () => {
      const langs = listCounsellingLangs(id);
      assert.deepEqual(langs.sort(), ["af", "en", "st", "xh", "zu"]);
      const cov = counsellingCoverage(id);
      assert.equal(cov.length, 5);
      assert.ok(cov.every((c) => c.lineCount === 6));

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
