import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildInteractionTabBody,
  collectInteractionTabSources,
  type Interaction,
  type Molecule,
  type Source,
} from "@materia/shared";

const edu: Source = {
  id: "src-materia-edu",
  citation: "Materia educational authoring",
  sourceType: "original_authoring",
  lastReviewed: "2026-07-01",
};

const molecules: Array<Pick<Molecule, "id" | "slug" | "innName" | "publishState">> = [
  {
    id: "mol-warfarin",
    slug: "warfarin",
    innName: "Warfarin",
    publishState: "published",
  },
  {
    id: "mol-aspirin",
    slug: "aspirin",
    innName: "Aspirin",
    publishState: "published",
  },
  {
    id: "mol-draft",
    slug: "draft-mol",
    innName: "Draft",
    publishState: "draft",
  },
];

const publishedIx: Interaction = {
  id: "ix-warfarin-aspirin",
  moleculeAId: "mol-warfarin",
  moleculeBId: "mol-aspirin",
  severity: "major",
  mechanism: {
    value: "Additive bleeding risk — educational flag only.",
    sourceId: "src-materia-edu",
    publishState: "published",
    lastReviewed: "2026-07-01",
  },
  action: {
    value: "Do not invent a dose change — confirm clinically.",
    sourceId: "src-materia-edu",
    publishState: "published",
    lastReviewed: "2026-07-01",
  },
  publishState: "published",
};

describe("buildInteractionTabBody (molecule 360 interactions tab)", () => {
  it("surfaces published sourced interactions with the other molecule named", () => {
    const body = buildInteractionTabBody({
      moleculeId: "mol-warfarin",
      interactions: [publishedIx],
      molecules,
      getSource: (id) => (id === edu.id ? edu : undefined),
    });
    assert.equal(body.items.length, 1);
    assert.equal(body.items[0]!.otherMoleculeSlug, "aspirin");
    assert.equal(body.items[0]!.severity, "major");
    assert.match(body.items[0]!.action ?? "", /Do not invent/i);
    assert.equal(body.empty, null);
    assert.ok(collectInteractionTabSources(body).some((s) => s.id === "src-materia-edu"));
  });

  it("honest empty state when no published interactions", () => {
    const body = buildInteractionTabBody({
      moleculeId: "mol-warfarin",
      interactions: [],
      molecules,
      getSource: () => edu,
    });
    assert.equal(body.items.length, 0);
    assert.match(body.empty ?? "", /No published pairwise/i);
  });

  it("skips draft interactions and draft partner molecules", () => {
    const draftIx: Interaction = {
      ...publishedIx,
      id: "ix-draft",
      publishState: "draft",
    };
    const orphanIx: Interaction = {
      ...publishedIx,
      id: "ix-orphan",
      moleculeBId: "mol-draft",
    };
    const body = buildInteractionTabBody({
      moleculeId: "mol-warfarin",
      interactions: [draftIx, orphanIx],
      molecules,
      getSource: (id) => (id === edu.id ? edu : undefined),
    });
    assert.equal(body.items.length, 0);
  });

  it("skips rows when mechanism/action are not renderable published facts", () => {
    const unsourced: Interaction = {
      id: "ix-bad",
      moleculeAId: "mol-warfarin",
      moleculeBId: "mol-aspirin",
      severity: "major",
      mechanism: {
        value: "Secret invent",
        sourceId: "src-materia-edu",
        publishState: "draft",
        lastReviewed: "2026-07-01",
      },
      publishState: "published",
    };
    const body = buildInteractionTabBody({
      moleculeId: "mol-warfarin",
      interactions: [unsourced],
      molecules,
      getSource: () => edu,
    });
    assert.equal(body.items.length, 0);
  });
});
