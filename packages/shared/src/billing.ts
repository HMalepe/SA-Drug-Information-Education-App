import { TIER_PRICES_ZAR, type Tier } from "./tiers.js";

/** Paid tiers that require checkout (Doc 6). */
export type BillableTier = Exclude<Tier, "free" | "institution">;

export interface CheckoutRequest {
  userId: string;
  email: string;
  tier: BillableTier;
  callbackUrl: string;
}

export interface CheckoutSession {
  provider: "stub" | "paystack";
  reference: string;
  amountZar: number;
  /** Paystack amount in cents (ZAR × 100) */
  amountCents: number;
  currency: "ZAR";
  authorizationUrl: string | null;
  message: string;
}

export function isBillableTier(tier: Tier): tier is BillableTier {
  return tier === "student" || tier === "professional";
}

export function amountZarForTier(tier: BillableTier): number {
  return TIER_PRICES_ZAR[tier].monthly;
}

export function amountCentsForTier(tier: BillableTier): number {
  return Math.round(amountZarForTier(tier) * 100);
}

export function buildCheckoutReference(userId: string, tier: BillableTier): string {
  return `mat_${tier}_${userId}_${Date.now().toString(36)}`;
}

export function stubCheckoutSession(input: CheckoutRequest): CheckoutSession {
  const amountZar = amountZarForTier(input.tier);
  const reference = buildCheckoutReference(input.userId, input.tier);
  return {
    provider: "stub",
    reference,
    amountZar,
    amountCents: amountCentsForTier(input.tier),
    currency: "ZAR",
    authorizationUrl: null,
    message:
      "Stub mode — no Paystack keys. Subscription activated locally. Set PAYSTACK_SECRET_KEY to enable live checkout.",
  };
}

/** Verify Paystack webhook HMAC SHA512 signature (hex digest of raw body). */
export function verifyPaystackSignature(
  rawBody: string,
  signatureHeader: string | undefined,
  secret: string,
  hmacSha512Hex: (secret: string, body: string) => string,
): boolean {
  if (!signatureHeader || !secret) return false;
  const expected = hmacSha512Hex(secret, rawBody);
  if (expected.length !== signatureHeader.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signatureHeader.charCodeAt(i);
  }
  return mismatch === 0;
}

export function parsePaystackChargeSuccess(event: {
  event?: string;
  data?: { reference?: string; status?: string; metadata?: { userId?: string; tier?: string } };
}): { ok: true; reference: string; userId: string; tier: BillableTier } | { ok: false; reason: string } {
  if (event.event !== "charge.success") {
    return { ok: false, reason: "Ignored event type" };
  }
  const ref = event.data?.reference;
  const status = event.data?.status;
  const userId = event.data?.metadata?.userId;
  const tier = event.data?.metadata?.tier;
  if (!ref || status !== "success") return { ok: false, reason: "Missing successful charge data" };
  if (!userId || (tier !== "student" && tier !== "professional")) {
    return { ok: false, reason: "Missing Materia metadata (userId/tier)" };
  }
  return { ok: true, reference: ref, userId, tier };
}
