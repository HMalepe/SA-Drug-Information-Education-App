import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, it } from "node:test";
import {
  amountCentsForTier,
  buildAvailabilityForMolecule,
  listActiveShortages,
  parsePaystackChargeSuccess,
  stubCheckoutSession,
  tierAllows,
  verifyPaystackSignature,
  type AvailabilitySignal,
  type Product,
} from "@materia/shared";

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
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
  {
    id: "prod-aspen",
    moleculeId: "mol-amox",
    manufacturerId: "m2",
    brandName: "Amoxicillin Aspen",
    strength: "500 mg",
    form: "capsule",
    schedule: "S4",
    isOriginator: false,
    isDiscontinued: false,
    bioequivalentFlag: true,
    synonymKeys: [],
    excipientIds: [],
    publishState: "published",
  },
];

const signals: AvailabilitySignal[] = [
  {
    id: "a1",
    productId: "prod-amoxil",
    wholesaler: "Demo",
    signal: "shortage",
    observedAt: "2026-07-20T00:00:00.000Z",
    sourceId: "src",
    publishState: "published",
  },
  {
    id: "a2",
    productId: "prod-aspen",
    wholesaler: "Demo",
    signal: "in_stock",
    observedAt: "2026-07-20T00:00:00.000Z",
    sourceId: "src",
    publishState: "published",
  },
];

describe("v4 Paystack billing helpers", () => {
  it("builds stub checkout with ZAR cents", () => {
    const session = stubCheckoutSession({
      userId: "u1",
      email: "u1@test.za",
      tier: "professional",
      callbackUrl: "http://localhost:3000/pricing",
    });
    assert.equal(session.provider, "stub");
    assert.equal(session.amountCents, amountCentsForTier("professional"));
    assert.equal(session.authorizationUrl, null);
  });

  it("verifies Paystack HMAC signature", () => {
    const body = '{"event":"charge.success"}';
    const secret = "sk_test_demo";
    const sig = createHmac("sha512", secret).update(body).digest("hex");
    assert.equal(
      verifyPaystackSignature(body, sig, secret, (s, b) =>
        createHmac("sha512", s).update(b).digest("hex"),
      ),
      true,
    );
    assert.equal(
      verifyPaystackSignature(body, "deadbeef", secret, (s, b) =>
        createHmac("sha512", s).update(b).digest("hex"),
      ),
      false,
    );
  });

  it("parses charge.success metadata", () => {
    const ok = parsePaystackChargeSuccess({
      event: "charge.success",
      data: {
        reference: "mat_pro_u1",
        status: "success",
        metadata: { userId: "u1", tier: "professional" },
      },
    });
    assert.equal(ok.ok, true);
    if (ok.ok) {
      assert.equal(ok.tier, "professional");
      assert.equal(ok.userId, "u1");
    }
  });
});

describe("v4 shortage alerts", () => {
  it("flags shortage brands and lists active shortages", () => {
    const rows = buildAvailabilityForMolecule({
      moleculeId: "mol-amox",
      products,
      signals,
    });
    const amoxil = rows.find((r) => r.productId === "prod-amoxil");
    assert.equal(amoxil?.isShortage, true);
    assert.equal(amoxil?.worstSignal, "shortage");
    const shortages = listActiveShortages(products, signals);
    assert.equal(shortages.length, 1);
    assert.equal(tierAllows("professional", "shortage_alerts"), true);
    assert.equal(tierAllows("free", "shortage_alerts"), false);
  });
});
