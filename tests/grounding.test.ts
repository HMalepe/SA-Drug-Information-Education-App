import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  groundedAnswerFromChunks,
  stripIdentifiers,
  type RetrievableChunk,
  type Source,
} from "@materia/shared";

const source: Source = {
  id: "src1",
  citation: "Materia educational authoring",
  sourceType: "original_authoring",
  lastReviewed: "2026-07-01",
};

const chunk: RetrievableChunk = {
  fieldPath: "moa",
  text: "Amoxicillin blocks bacterial cell-wall synthesis.",
  fact: {
    value: "Amoxicillin blocks bacterial cell-wall synthesis.",
    sourceId: "src1",
    publishState: "published",
    lastReviewed: "2026-07-01",
  },
  source,
};

describe("grounding contract", () => {
  it("answers from published chunks with citations", () => {
    const ans = groundedAnswerFromChunks("How does amoxicillin cell wall work?", [chunk]);
    assert.equal(ans.status, "answered");
    assert.ok((ans.citations?.length ?? 0) > 0);
    assert.match(ans.answer ?? "", /cell-wall/);
  });

  it("refuses when no sourced chunks", () => {
    const ans = groundedAnswerFromChunks("What is the exact mg dose?", []);
    assert.equal(ans.status, "refused");
    assert.match(ans.refusalReason ?? "", /will not invent/i);
  });

  it("refuses when question does not match chunks", () => {
    const ans = groundedAnswerFromChunks("xyzzy quux vancomycin trough target?", [chunk]);
    assert.equal(ans.status, "refused");
  });

  it("strips identifiers before model path (POPIA)", () => {
    assert.match(stripIdentifiers("Patient Thabo Molefe email a@b.com"), /\[NAME\]/);
    assert.match(stripIdentifiers("ID 8001015009087"), /\[ID\]/);
  });
});
