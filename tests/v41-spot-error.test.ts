import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildSpotErrorRound,
  gradeSpotError,
  listPublishedSpotCards,
  SPOT_ERROR_LIBRARY,
} from "@materia/shared";

describe("v41 spot the error §7.3", () => {
  it("exposes only published cards", () => {
    const pub = listPublishedSpotCards();
    assert.ok(pub.length >= 4);
    assert.equal(pub.some((c) => c.id === "spot-draft-hidden"), false);
    assert.equal(SPOT_ERROR_LIBRARY.some((c) => c.publishState === "draft"), true);
  });

  it("builds a round and grades without inventing doses", () => {
    const round = buildSpotErrorRound({ seed: "2026-07-23|u1" });
    assert.ok(round);
    assert.ok(round!.card.statement.length > 10);
    assert.equal("verdict" in round!.card, false);

    const dox = SPOT_ERROR_LIBRARY.find((c) => c.id === "spot-doxy-milk")!;
    const hit = gradeSpotError({ cardId: dox.id, choice: "error" });
    assert.equal("error" in hit, false);
    if ("error" in hit) return;
    assert.equal(hit.correct, true);
    assert.match(hit.explanation, /chelat/i);
    assert.doesNotMatch(hit.explanation, /\d+\s*mg/i);

    const miss = gradeSpotError({ cardId: dox.id, choice: "correct_statement" });
    if ("error" in miss) return;
    assert.equal(miss.correct, false);
  });
});
