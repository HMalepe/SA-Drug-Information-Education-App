import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildDragDropRound,
  collectClassMembers,
  gradeDragDrop,
  listSortableClasses,
  publicDragDropRound,
  type Molecule,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-e1",
    slug: "enalapril",
    innName: "Enalapril",
    className: "ACE inhibitor",
    therapeuticArea: "cardiovascular",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-e2",
    slug: "lisinopril",
    innName: "Lisinopril",
    className: "ACE inhibitor",
    therapeuticArea: "cardiovascular",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-a1",
    slug: "azithromycin",
    innName: "Azithromycin",
    className: "Macrolide antibiotic",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-a2",
    slug: "clarithromycin",
    innName: "Clarithromycin",
    className: "Macrolide antibiotic",
    therapeuticArea: "antibiotics",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-draft",
    slug: "drafty",
    innName: "Drafty",
    className: "ACE inhibitor",
    therapeuticArea: "x",
    synonyms: [],
    publishState: "draft",
  },
];

describe("v43 drag-drop class sort §7.3", () => {
  it("collects published class members only", () => {
    const members = collectClassMembers(molecules);
    assert.equal(members.length, 4);
    assert.equal(members.some((m) => m.moleculeSlug === "drafty"), false);
    const classes = listSortableClasses(molecules, 2);
    assert.equal(classes.length, 2);
  });

  it("builds a public round and grades without inventing classes", () => {
    const round = buildDragDropRound({
      molecules,
      seed: "2026-07-23|u1",
      bucketCount: 2,
      perBucket: 2,
    });
    assert.ok(round);
    assert.equal(round!.bucketCount, 2);
    assert.equal(round!.itemCount, 4);
    const pub = publicDragDropRound(round!);
    assert.equal("answerKey" in pub, false);
    assert.ok(pub.buckets.every((b) => b.label.length >= 3));
    assert.doesNotMatch(JSON.stringify(pub), /\d+\s*mg/i);

    const perfect = gradeDragDrop({
      answerKey: round!.answerKey,
      mapping: { ...round!.answerKey },
    });
    assert.equal(perfect.correct, true);
    assert.equal(perfect.score, 4);

    const miss = gradeDragDrop({
      answerKey: round!.answerKey,
      mapping: {
        "mol-e1": "Macrolide antibiotic",
        "mol-e2": "Macrolide antibiotic",
        "mol-a1": "ACE inhibitor",
        "mol-a2": "ACE inhibitor",
      },
    });
    assert.equal(miss.correct, false);
    assert.equal(miss.score, 0);
  });
});
