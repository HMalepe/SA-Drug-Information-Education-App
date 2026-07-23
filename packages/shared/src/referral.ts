/** Campus ambassador & referral loop (Doc 5 / Doc 29 v2). */

export interface ReferralCode {
  code: string;
  ownerUserId: string;
  createdAt: string;
  /** Soft label — campus ambassadors get status, not clinical privilege */
  kind: "ambassador" | "standard";
  campusLabel?: string;
}

export interface ReferralRedemption {
  id: string;
  code: string;
  referrerUserId: string;
  refereeUserId: string;
  redeemedAt: string;
}

export interface ReferralCredit {
  id: string;
  userId: string;
  amount: number;
  reason: "referral_signup" | "ambassador_bonus" | "redeemed_reward";
  createdAt: string;
  relatedRedemptionId?: string;
}

/** Placeholder reward units — not cash until billing wired. */
export const REFERRAL_SIGNUP_CREDITS = 1;
export const AMBASSADOR_BONUS_CREDITS = 2;

export function generateReferralCode(ownerUserId: string, kind: ReferralCode["kind"] = "standard"): string {
  const suffix = ownerUserId.replace(/[^a-z0-9]/gi, "").slice(-4).toUpperCase() || "USER";
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  const prefix = kind === "ambassador" ? "AMB" : "MAT";
  return `${prefix}-${suffix}-${rand}`;
}

export function normalizeReferralCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function canRedeemReferral(input: {
  code: ReferralCode | undefined;
  refereeUserId: string;
  existingRedemptions: ReferralRedemption[];
}): { ok: boolean; reason?: string } {
  if (!input.code) return { ok: false, reason: "Unknown referral code." };
  if (input.code.ownerUserId === input.refereeUserId) {
    return { ok: false, reason: "You cannot redeem your own code." };
  }
  if (input.existingRedemptions.some((r) => r.refereeUserId === input.refereeUserId)) {
    return { ok: false, reason: "This account already used a referral code." };
  }
  return { ok: true };
}

export function buildReferralCredits(input: {
  redemption: ReferralRedemption;
  code: ReferralCode;
}): ReferralCredit[] {
  const now = input.redemption.redeemedAt;
  const credits: ReferralCredit[] = [
    {
      id: `cred-${input.redemption.id}-ref`,
      userId: input.redemption.referrerUserId,
      amount: REFERRAL_SIGNUP_CREDITS,
      reason: "referral_signup",
      createdAt: now,
      relatedRedemptionId: input.redemption.id,
    },
  ];
  if (input.code.kind === "ambassador") {
    credits.push({
      id: `cred-${input.redemption.id}-amb`,
      userId: input.redemption.referrerUserId,
      amount: AMBASSADOR_BONUS_CREDITS,
      reason: "ambassador_bonus",
      createdAt: now,
      relatedRedemptionId: input.redemption.id,
    });
  }
  return credits;
}

export function sumCredits(credits: ReferralCredit[], userId: string): number {
  return credits.filter((c) => c.userId === userId).reduce((a, c) => a + c.amount, 0);
}
