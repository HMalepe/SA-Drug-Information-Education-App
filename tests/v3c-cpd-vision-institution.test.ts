import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  CPD_DISCLAIMER,
  CPD_MODULES,
  DEMO_BARCODE_INDEX,
  annualCreditsTarget,
  buildCertificate,
  canAddSeat,
  canAwardCpd,
  computeCohortAnalytics,
  createOrganisation,
  gateFeature,
  resolveProductScan,
  tierAllows,
  type Molecule,
  type Product,
} from "@materia/shared";

const molecules: Molecule[] = [
  {
    id: "mol-amox",
    slug: "amoxicillin",
    innName: "Amoxicillin",
    className: "Penicillin",
    therapeuticArea: "antibiotics",
    synonyms: ["amox"],
    publishState: "published",
  },
];

const products: Product[] = [
  {
    id: "prod-amoxil",
    moleculeId: "mol-amox",
    manufacturerId: "m1",
    brandName: "Amoxil",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: true,
    isDiscontinued: false,
    synonymKeys: ["amoxil"],
    excipientIds: [],
    publishState: "published",
  },
];

describe("v3c CPD", () => {
  it("gates CPD to professional+", () => {
    assert.equal(tierAllows("free", "cpd_dashboard"), false);
    assert.equal(gateFeature("free", "cpd_dashboard").upgradeTo, "professional");
    assert.equal(tierAllows("professional", "cpd_dashboard"), true);
  });

  it("requires lessons + quiz before award", () => {
    const mod = CPD_MODULES[0]!;
    assert.equal(
      canAwardCpd({
        module: mod,
        lessonsCompleted: 0,
        lessonsTotal: 2,
        quizCorrect: 0,
        alreadyAwarded: false,
      }).ok,
      false,
    );
    assert.equal(
      canAwardCpd({
        module: mod,
        lessonsCompleted: 2,
        lessonsTotal: 2,
        quizCorrect: mod.requiredQuizCorrect,
        alreadyAwarded: false,
      }).ok,
      true,
    );
  });

  it("builds certificate with pending_sapc disclaimer", () => {
    const mod = CPD_MODULES[0]!;
    const cert = buildCertificate({
      userId: "u1",
      holderName: "Test Pharmacist",
      module: mod,
    });
    assert.equal(cert.credits, mod.credits);
    assert.match(cert.disclaimer, /SAPC/);
    assert.match(CPD_DISCLAIMER, /learning records only/i);
    assert.equal(annualCreditsTarget(), 30);
  });
});

describe("v3c vision + voice gates", () => {
  it("resolves demo barcode to molecule", () => {
    const hits = resolveProductScan("6001234567890", molecules, products, DEMO_BARCODE_INDEX);
    assert.equal(hits.length, 1);
    const hit = hits[0]!;
    assert.equal(hit.kind, "barcode");
    assert.equal(hit.moleculeSlug, "amoxicillin");
    assert.equal(hit.confidence, "high");
  });

  it("resolves brand text suggestively", () => {
    const hits = resolveProductScan("Amoxil", molecules, products);
    assert.ok(hits.length >= 1);
    assert.equal(hits[0]!.moleculeId, "mol-amox");
  });

  it("gates vision to pro and voice to student+", () => {
    assert.equal(tierAllows("student", "voice_mode"), true);
    assert.equal(tierAllows("free", "voice_mode"), false);
    assert.equal(tierAllows("student", "vision_scan"), false);
    assert.equal(tierAllows("professional", "vision_scan"), true);
  });
});

describe("v3c institution", () => {
  it("creates org and enforces seat limit", () => {
    const org = createOrganisation("UCT Pharmacy", "university", 2);
    assert.equal(org.seatLimit, 2);
    const seats = [
      { id: "s1", orgId: org.id, userId: "a", role: "admin" as const },
      { id: "s2", orgId: org.id, userId: "b", role: "member" as const },
    ];
    assert.equal(canAddSeat(org, seats), false);
  });

  it("computes cohort analytics", () => {
    const analytics = computeCohortAnalytics(
      {
        id: "c1",
        orgId: "o1",
        name: "Year 3",
        memberUserIds: ["u1", "u2"],
      },
      [
        { userId: "u1", completionPercent: 100, quizAttempts: 2, quizCorrect: 1 },
        { userId: "u2", completionPercent: 50, quizAttempts: 1, quizCorrect: 0 },
      ],
    );
    assert.equal(analytics.avgCompletionPercent, 75);
    assert.equal(analytics.totalQuizAttempts, 3);
  });

  it("gates institution console", () => {
    assert.equal(tierAllows("professional", "institution_console"), false);
    assert.equal(tierAllows("institution", "institution_console"), true);
  });
});
