"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

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
    const session = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `${tier}@materiatest.za`,
        mode: tier === "student" ? "student" : "pharmacist",
        tier: "free",
      }),
    });
    const { user } = await session.json();
    const res = await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        tier,
        studentVerified: tier === "student",
        callbackUrl: `${window.location.origin}/pricing?paid=1`,
      }),
    });
    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
    const url = data.checkout?.authorizationUrl as string | undefined;
    if (url) window.location.href = url;
  }

  return (
    <>
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
        <pre className="card" style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
          {msg}
        </pre>
      )}
    </>
  );
}
