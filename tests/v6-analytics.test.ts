import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildAnalyticsEvent,
  sanitizeAnalyticsProps,
  summarizeAnalytics,
} from "@materia/shared";

describe("v6 product analytics", () => {
  it("rejects unknown events and strips unsafe props", () => {
    assert.equal(buildAnalyticsEvent({ name: "not_a_real_event" }).ok, false);
    const props = sanitizeAnalyticsProps({
      moleculeSlug: "amoxicillin",
      email: "leak@test.za",
      question: "what dose should I take?",
      phone: "+27821234567",
      queryLen: 12,
      hitCount: 3,
    });
    assert.equal(props.moleculeSlug, "amoxicillin");
    assert.equal(props.email, undefined);
    assert.equal(props.question, undefined);
    assert.equal(props.phone, undefined);
    assert.equal(props.queryLen, 12);
  });

  it("summarises searches, molecule views, tools, gated hits", () => {
    const events = [
      buildAnalyticsEvent({ name: "search_performed", props: { queryLen: 4, hitCount: 1 } }),
      buildAnalyticsEvent({ name: "molecule_viewed", props: { moleculeSlug: "amoxicillin" } }),
      buildAnalyticsEvent({ name: "molecule_viewed", props: { moleculeSlug: "amoxicillin" } }),
      buildAnalyticsEvent({ name: "tool_used", props: { tool: "substitution" } }),
      buildAnalyticsEvent({ name: "gated_feature_hit", props: { feature: "dose_calculator" } }),
    ]
      .filter((e) => e.ok)
      .map((e) => (e.ok ? e.event : null))
      .filter(Boolean);

    const summary = summarizeAnalytics(events as NonNullable<(typeof events)[number]>[]);
    assert.equal(summary.searchCount, 1);
    assert.equal(summary.gatedHits, 1);
    assert.equal(summary.topMolecules[0]?.slug, "amoxicillin");
    assert.equal(summary.topMolecules[0]?.views, 2);
    assert.equal(summary.topTools[0]?.tool, "substitution");
  });
});
