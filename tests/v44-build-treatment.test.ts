import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BUILD_TREATMENT_LIBRARY,
  buildTreatmentRound,
  gradeBuildTreatment,
  listPublishedTreatmentCases,
} from "@materia/shared";

describe("v44 build the treatment §7.3", () => {
  it("exposes only published cases", () => {
    const pub = listPublishedTreatmentCases();
    assert.ok(pub.length >= 4);
    assert.equal(pub.some((c) => c.id === "bt-draft-hidden"), false);
    assert.equal(BUILD_TREATMENT_LIBRARY.some((c) => c.publishState === "draft"), true);
  });

  it("builds a round and grades with teach-from-the-miss copy, no invented doses", () => {
    const round = buildTreatmentRound({ seed: "2026-07-23|u1" });
    assert.ok(round);
    assert.ok(round!.case.vignette.length > 20);
    assert.equal("correctOptionId" in round!.case, false);
    assert.equal("explanation" in round!.case, false);
    assert.doesNotMatch(round!.case.vignette, /\d+\s*mg/i);

    const ace = BUILD_TREATMENT_LIBRARY.find((c) => c.id === "bt-ckd-htn-ace")!;
    const hit = gradeBuildTreatment({ caseId: ace.id, chosenOptionId: "ace" });
    assert.equal("error" in hit, false);
    if ("error" in hit) return;
    assert.equal(hit.correct, true);
    assert.match(hit.explanation, /ACE/i);
    assert.doesNotMatch(hit.explanation, /\d+\s*mg/i);

    const miss = gradeBuildTreatment({ caseId: ace.id, chosenOptionId: "nsaid" });
    if ("error" in miss) return;
    assert.equal(miss.correct, false);
    assert.ok(miss.explanation.length > 40);

    const bad = gradeBuildTreatment({ caseId: ace.id, chosenOptionId: "not-an-option" });
    assert.equal("error" in bad, true);
  });
});
