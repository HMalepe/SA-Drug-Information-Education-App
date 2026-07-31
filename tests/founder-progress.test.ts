import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { summarizeFounderProgress } from "@materia/shared";

describe("summarizeFounderProgress", () => {
  it("orders STG blocked before eligible, then dosing, then optional RAG", () => {
    const snap = summarizeFounderProgress({
      stgTotals: { alreadyPublished: 10, eligible: 5, blocked: 2 },
      dosingTotals: { placeholderAbsent: 8, numericSuspect: 1, otherDraft: 0 },
      rag: {
        ok: true,
        mode: { embedder: "local-bow", composer: "template" },
        embedderConfigured: false,
        llmConfigured: false,
      },
    });
    assert.equal(snap.scope, "all");
    assert.equal(snap.stg.blocked, 2);
    assert.equal(snap.dosing.placeholderAbsent, 8);
    assert.match(snap.nextActions[0]!, /blocked STG.*Batches A–I/i);
    assert.match(snap.nextActions[1]!, /eligible STG/i);
    assert.match(snap.nextActions[2]!, /numeric_suspect/i);
    assert.match(snap.nextActions[3]!, /export-dosing-cli|placeholder/i);
    assert.match(snap.nextActions[4]!, /in-region|rag:check-env/i);
    assert.match(snap.note, /read-only/i);
  });

  it("scopes next-actions to a single batch letter", () => {
    const snap = summarizeFounderProgress({
      scope: "A",
      stgTotals: { alreadyPublished: 2, eligible: 3, blocked: 0 },
      dosingTotals: { placeholderAbsent: 4, numericSuspect: 0, otherDraft: 0 },
    });
    assert.equal(snap.scope, "a");
    assert.match(snap.nextActions[0]!, /Batch A/i);
    assert.match(snap.nextActions[0]!, /publish-stg-batch A/i);
    assert.match(snap.nextActions[1]!, /export-dosing-cli A/i);
    assert.match(snap.note, /Batch A/i);
  });

  it("reports clear when STG/dosing done and hosted RAG already configured", () => {
    const snap = summarizeFounderProgress({
      stgTotals: { alreadyPublished: 80, eligible: 0, blocked: 0 },
      dosingTotals: { placeholderAbsent: 0, numericSuspect: 0, otherDraft: 0 },
      rag: {
        ok: true,
        mode: { embedder: "http", composer: "http" },
        embedderConfigured: true,
        llmConfigured: true,
      },
    });
    assert.equal(snap.nextActions.length, 1);
    assert.match(snap.nextActions[0]!, /Batches A–I.*gates clear/i);
    assert.equal(snap.rag.hostedConfigured, true);
  });

  it("suggests optional in-region provision when local RAG default", () => {
    const snap = summarizeFounderProgress({
      stgTotals: { alreadyPublished: 80, eligible: 0, blocked: 0 },
      dosingTotals: { placeholderAbsent: 0, numericSuspect: 0, otherDraft: 0 },
      rag: {
        ok: true,
        mode: { embedder: "local-bow", composer: "template" },
        embedderConfigured: false,
        llmConfigured: false,
      },
    });
    assert.equal(snap.nextActions.length, 1);
    assert.match(snap.nextActions[0]!, /in-region|rag:check-env/i);
  });

  it("flags failed RAG env ahead of optional provision note", () => {
    const snap = summarizeFounderProgress({
      stgTotals: { alreadyPublished: 80, eligible: 0, blocked: 0 },
      dosingTotals: { placeholderAbsent: 0, numericSuspect: 0, otherDraft: 0 },
      rag: {
        ok: false,
        mode: { embedder: "error", composer: "error" },
        embedderConfigured: true,
        llmConfigured: true,
      },
    });
    assert.match(snap.nextActions[0]!, /Fix MATERIA_IN_REGION_/i);
  });
});
