import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  listRecentReviewDecisions,
  parseReviewDecisionsJsonl,
  type ReviewDecision,
} from "@materia/shared";

describe("review decisions audit journal", () => {
  it("parses valid JSONL and skips corrupt lines", () => {
    const raw = [
      JSON.stringify({
        id: "rev-1",
        queueItemId: "q1",
        decision: "publish",
        reviewerLabel: "Founder",
        at: "2026-07-31T08:00:00.000Z",
        attestation: "I confirm sourced",
      }),
      "{not-json",
      JSON.stringify({
        id: "rev-2",
        queueItemId: "q2",
        decision: "keep_draft",
        reviewerLabel: "Founder",
        at: "2026-07-31T09:00:00.000Z",
      }),
      "",
    ].join("\n");
    const rows = parseReviewDecisionsJsonl(raw);
    assert.equal(rows.length, 2);
    assert.equal(rows[0]!.id, "rev-1");
    assert.equal(rows[1]!.decision, "keep_draft");
  });

  it("lists newest first within limit", () => {
    const decisions: ReviewDecision[] = [
      {
        id: "a",
        queueItemId: "q",
        decision: "publish",
        reviewerLabel: "F",
        at: "2026-07-01T00:00:00.000Z",
      },
      {
        id: "b",
        queueItemId: "q",
        decision: "publish",
        reviewerLabel: "F",
        at: "2026-07-02T00:00:00.000Z",
      },
      {
        id: "c",
        queueItemId: "q",
        decision: "mark_reviewed",
        reviewerLabel: "F",
        at: "2026-07-03T00:00:00.000Z",
      },
    ];
    const recent = listRecentReviewDecisions(decisions, 2);
    assert.deepEqual(
      recent.map((d) => d.id),
      ["c", "b"],
    );
  });

  it("clamps limit to 1..200", () => {
    const decisions: ReviewDecision[] = Array.from({ length: 5 }, (_, i) => ({
      id: `r${i}`,
      queueItemId: "q",
      decision: "publish" as const,
      reviewerLabel: "F",
      at: `2026-07-0${i + 1}T00:00:00.000Z`,
    }));
    assert.equal(listRecentReviewDecisions(decisions, 0).length, 1);
    assert.equal(listRecentReviewDecisions(decisions, 999).length, 5);
  });
});
