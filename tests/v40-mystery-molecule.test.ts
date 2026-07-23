import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildMysteryRound,
  gradeMysteryGuess,
  publicMysteryRound,
  type Molecule,
  type Product,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-amox",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Penicillin / beta-lactam",
    therapeuticArea: "antibiotics",
    synonyms: ["amox"],
    publishState: "published",
    moaSummary: {
      value: "Inhibits bacterial cell-wall synthesis.",
      sourceId: "src-edu",
      publishState: "published",
      lastReviewed: "2026-07-01",
    },
  },
];

const products: Product[] = [
  {
    id: "prod-amoxil",
    moleculeId: "mol-amox",
    manufacturerId: "mfr-x",
    brandName: "Amoxil",
    strength: "250 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: ["amoxil"],
    excipientIds: [],
    publishState: "published",
  },
];

describe("v40 mystery molecule §7.3", () => {
  it("builds ordered hints from published facts only", () => {
    const round = buildMysteryRound({
      molecules,
      products,
      seed: "2026-07-23|u1",
    });
    assert.ok(round);
    assert.equal(round!.hints[0]?.kind, "mechanism");
    assert.ok(round!.hints.some((h) => h.kind === "brands" && h.text.includes("Amoxil")));
    assert.equal(round!.hints.at(-1)?.kind, "reveal");
  });

  it("hides reveal text until unlocked and grades guesses", () => {
    const round = buildMysteryRound({
      molecules,
      products,
      seed: "2026-07-23|u1",
    })!;
    const pub = publicMysteryRound(round, 1);
    assert.equal(pub.unlockedHints.length, 1);
    assert.match(pub.hints.find((h) => h.kind === "reveal")?.text ?? "", /Locked/i);

    const miss = gradeMysteryGuess({ round, guess: "ibuprofen" });
    assert.equal(miss.correct, false);

    const hit = gradeMysteryGuess({ round, guess: "Amoxicillin" });
    assert.equal(hit.correct, true);
    assert.match(hit.teachNote, /molecules\/amoxicillin/);
  });
});
