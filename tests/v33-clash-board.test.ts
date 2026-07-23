import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildClashBoard, type Interaction, type Molecule, type SafetyProfile } from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-a",
    slug: "alpha",
    innName: "Alpha",
    className: "Demo class",
    therapeuticArea: "demo",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-b",
    slug: "beta",
    innName: "Beta",
    className: "Demo class",
    therapeuticArea: "demo",
    synonyms: [],
    publishState: "published",
  },
  {
    id: "mol-c",
    slug: "gamma",
    innName: "Gamma",
    className: "Other",
    therapeuticArea: "demo",
    synonyms: [],
    publishState: "published",
  },
];

const interactions: Interaction[] = [
  {
    id: "ix-1",
    moleculeAId: "mol-a",
    moleculeBId: "mol-c",
    severity: "contraindicated",
    action: {
      value: "Do not combine — educational fixture.",
      sourceId: "src-x",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
    publishState: "published",
  },
  {
    id: "ix-draft",
    moleculeAId: "mol-a",
    moleculeBId: "mol-b",
    severity: "major",
    publishState: "draft",
  },
];

const safetyByMoleculeId = new Map<string, SafetyProfile>([
  [
    "mol-a",
    {
      id: "saf-a",
      moleculeId: "mol-a",
      renalAdjustment: {
        value: "Educational renal caution (fixture).",
        sourceId: "src-x",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
      foodLifestyle: {
        value: "Take with food — educational fixture.",
        sourceId: "src-x",
        publishState: "published",
        lastReviewed: "2026-07-01",
      },
      contraindications: [],
      warnings: [],
      clinicalPearls: [],
      counsellingPoints: [],
      publishState: "published",
    },
  ],
]);

describe("v33 clash board §12", () => {
  it("surfaces published interactions, not draft ones", () => {
    const board = buildClashBoard({
      regimen: [
        { moleculeId: "mol-a", moleculeName: "Alpha" },
        { moleculeId: "mol-c", moleculeName: "Gamma" },
      ],
      molecules,
      interactions,
      safetyByMoleculeId,
    });
    assert.ok(board.rows.some((r) => r.kind === "interaction" && r.tone === "red"));
    assert.equal(
      board.rows.some((r) => r.title.includes("Alpha") && r.title.includes("Beta")),
      false,
    );
  });

  it("flags duplications and same-class educationally", () => {
    const board = buildClashBoard({
      regimen: [
        { moleculeId: "mol-a", moleculeName: "Alpha" },
        { moleculeId: "mol-a", moleculeName: "Alpha" },
        { moleculeId: "mol-b", moleculeName: "Beta" },
      ],
      molecules,
      interactions,
      safetyByMoleculeId,
    });
    assert.ok(board.rows.some((r) => r.kind === "duplication"));
    assert.ok(board.rows.some((r) => r.kind === "same_class"));
    assert.match(board.disclaimer, /does not direct treatment/i);
  });

  it("adds renal and food flags only from published safety", () => {
    const board = buildClashBoard({
      regimen: [{ moleculeId: "mol-a", moleculeName: "Alpha" }],
      molecules,
      interactions: [],
      safetyByMoleculeId,
    });
    assert.ok(board.rows.some((r) => r.kind === "renal_flag"));
    assert.ok(board.rows.some((r) => r.kind === "food_flag"));
    assert.equal(board.rows.some((r) => r.kind === "hepatic_flag"), false);
  });

  it("empty board is not a safety guarantee", () => {
    const board = buildClashBoard({
      regimen: [{ moleculeId: "mol-c", moleculeName: "Gamma" }],
      molecules,
      interactions: [],
      safetyByMoleculeId: new Map(),
    });
    assert.equal(board.summary.total, 0);
    assert.match(board.note, /not a guarantee/i);
  });
});
