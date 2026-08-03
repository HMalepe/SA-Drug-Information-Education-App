"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { TrackPage } from "@/components/TrackPage";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

/** Short status line for pricing/subscribe — never dumps raw API JSON. */
function formatPricingMsg(data: {
  error?: unknown;
  tier?: string;
  provider?: string;
  checkout?: { authorizationUrl?: string; reference?: string };
  note?: string;
}): string {
  if (data.error) {
    return `Error: ${formatApiError(data.error)}`;
  }
  const parts: string[] = [];
  if (data.tier) parts.push(`tier=${data.tier}`);
  if (data.provider) parts.push(`provider=${data.provider}`);
  if (data.checkout?.authorizationUrl) parts.push("redirecting to checkout…");
  else if (data.checkout?.reference) parts.push(`ref=${data.checkout.reference}`);
  if (data.note) parts.push(data.note);
  return parts.join(" · ") || "Subscribed";
}

export default function PricingPage() {
  const [prices, setPrices] = useState<Record<string, { monthly: number; annual: number; label: string }>>({});
  const [provider, setProvider] = useState("stub");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void fetch(`${API}/billing/tiers`)
      .then((r) => r.json())
      .then((d) => {
        setPrices(d.prices ?? {});
        setProvider(d.provider ?? "stub");
      });
  }, []);

  async function subscribe(tier: "free" | "student" | "professional") {
    try {
      const userId = await createStubSession({
        email: `${tier}@materiatest.za`,
        mode: tier === "student" ? "student" : "pharmacist",
        tier: "free",
      });
      const res = await fetch(`${API}/billing/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          tier,
          studentVerified: tier === "student",
          callbackUrl: `${window.location.origin}/pricing?paid=1`,
        }),
      });
      const data = await res.json();
      track("subscription_started", { tier }, { tier });
      setMsg(formatPricingMsg({ ...data, tier }));
      const url = data.checkout?.authorizationUrl as string | undefined;
      if (url) window.location.href = url;
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not create session");
    }
  }

  return (
    <>
      <TrackPage name="pricing_viewed" />
      <h1>Pricing</h1>
      <p className="tagline">
        Launch hypothesis (Doc 6) — provider: {provider}
        {provider === "stub" ? " (no charges until Paystack keys)." : " (live checkout)."}.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        {Object.entries(prices).map(([key, p]) => (
          <div key={key} className="card">
            <strong>{p.label}</strong>
            <div className="muted">
              R{p.monthly}/mo · R{p.annual}/yr
            </div>
            {key !== "institution" && (
              <button
                className="btn"
                type="button"
                style={{ marginTop: 12 }}
                onClick={() => void subscribe(key as "free" | "student" | "professional")}
              >
                Choose {p.label}
              </button>
            )}
          </div>
        ))}
      </div>
      {msg && (
        <p className="card muted" style={{ whiteSpace: "pre-wrap", marginTop: 16 }} aria-live="polite">
          {msg}
        </p>
      )}
    </>
  );
}
