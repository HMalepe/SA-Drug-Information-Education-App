import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildMatchRound,
  collectMatchPairs,
  gradeMatch,
  publicMatchRound,
  type Molecule,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-a",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Penicillin",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
    moaSummary: {
      value: "Inhibits bacterial cell-wall synthesis.",
      sourceId: "src-edu",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
  },
  {
    id: "mol-b",
    slug: "metformin",
    innName: "Metformin",
    className: "Biguanide",
    therapeuticArea: "diabetes",
    synonyms: [],
    publishState: "published",
    moaSummary: {
      value: "Decreases hepatic glucose production and improves insulin sensitivity.",
      sourceId: "src-edu",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
  },
  {
    id: "mol-c",
    slug: "drafty",
    innName: "Drafty",
    className: "X",
    therapeuticArea: "x",
    synonyms: [],
    publishState: "draft",
    moaSummary: {
      value: "Should not appear.",
      sourceId: "src-edu",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
  },
];

describe("v42 match game §7.3", () => {
  it("collects published MOA pairs only", () => {
    const pairs = collectMatchPairs(molecules);
    assert.equal(pairs.length, 2);
    assert.equal(pairs.some((p) => p.moleculeSlug === "drafty"), false);
  });

  it("builds a public round and grades mappings", () => {
    const round = buildMatchRound({ molecules, seed: "2026-07-23|u1", size: 2 });
    assert.ok(round);
    assert.equal(round!.pairCount, 2);
    const pub = publicMatchRound(round!);
    assert.equal("answerKey" in pub, false);
    assert.equal(pub.mechanisms.length, 2);

    const perfect = gradeMatch({
      answerKey: round!.answerKey,
      mapping: {
        "mol-a": "mol-a",
        "mol-b": "mol-b",
      },
    });
    assert.equal(perfect.correct, true);
    assert.equal(perfect.score, 2);

    const miss = gradeMatch({
      answerKey: round!.answerKey,
      mapping: { "mol-a": "mol-b", "mol-b": "mol-a" },
    });
    assert.equal(miss.correct, false);
    assert.equal(miss.score, 0);
  });
});
