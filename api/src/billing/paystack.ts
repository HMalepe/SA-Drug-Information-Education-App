import { createHmac } from "node:crypto";
import {
  amountCentsForTier,
  buildCheckoutReference,
  stubCheckoutSession,
  type BillableTier,
  type CheckoutRequest,
  type CheckoutSession,
} from "@materia/shared";

export function paystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY?.trim());
}

export function hmacSha512Hex(secret: string, body: string): string {
  return createHmac("sha512", secret).update(body).digest("hex");
}

/**
 * Initialize Paystack transaction, or fall back to stub when keys unset.
 * Live HTTP only when PAYSTACK_SECRET_KEY is set — no charges in stub mode.
 */
export async function createCheckoutSession(input: CheckoutRequest): Promise<CheckoutSession> {
  if (!paystackConfigured()) {
    return stubCheckoutSession(input);
  }

  const secret = process.env.PAYSTACK_SECRET_KEY!.trim();
  const reference = buildCheckoutReference(input.userId, input.tier);
  const amount = amountCentsForTier(input.tier);

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      amount,
      currency: "ZAR",
      reference,
      callback_url: input.callbackUrl,
      metadata: {
        userId: input.userId,
        tier: input.tier,
        product: "materia_subscription",
      },
    }),
  });

  const data = (await res.json()) as {
    status?: boolean;
    message?: string;
    data?: { authorization_url?: string; reference?: string };
  };

  if (!res.ok || !data.status || !data.data?.authorization_url) {
    throw new Error(data.message ?? `Paystack initialize failed (${res.status})`);
  }

  return {
    provider: "paystack",
    reference: data.data.reference ?? reference,
    amountZar: amount / 100,
    amountCents: amount,
    currency: "ZAR",
    authorizationUrl: data.data.authorization_url,
    message: "Redirect the user to authorizationUrl to complete payment.",
  };
}

export type { BillableTier, CheckoutRequest, CheckoutSession };
