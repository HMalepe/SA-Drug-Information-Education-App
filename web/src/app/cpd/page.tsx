"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type ModuleRow = {
  id: string;
  title: string;
  credits: number;
  description: string;
  accreditationStatus: string;
  eligibility: { ok: boolean; reason?: string };
};

export default function CpdPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState("");
  const [credits, setCredits] = useState(0);
  const [target, setTarget] = useState(30);
  const [modules, setModules] = useState<ModuleRow[]>([]);
  const [certs, setCerts] = useState<unknown[]>([]);
  const [msg, setMsg] = useState("");

  async function ensurePro() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "cpd@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
      }),
    });
    const data = await res.json();
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id, tier: "professional" }),
    });
    setUserId(data.user.id);
    return data.user.id as string;
  }

  async function load() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/cpd/dashboard/${uid}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(JSON.stringify(data, null, 2));
      return;
    }
    setDisclaimer(data.disclaimer ?? "");
    setCredits(data.creditsEarned ?? 0);
    setTarget(data.annualTarget ?? 30);
    setModules(data.modules ?? []);
    setCerts(data.certificates ?? []);
    setMsg("");
  }

  async function claim(moduleId: string) {
    const uid = await ensurePro();
    const res = await fetch(`${API}/cpd/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, moduleId }),
    });
    const data = await res.json();
    setMsg(JSON.stringify(data, null, 2));
    await load();
  }

  return (
    <>
      <h1>CPD dashboard</h1>
      <p className="tagline">Learning credits from Academy — Professional tier.</p>
      <p className="muted" style={{ maxWidth: 640 }}>
        {disclaimer ||
          "Certificates are learning records only until SAPC accreditation is granted."}
      </p>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <button className="btn" type="button" onClick={() => void load()}>
          Load dashboard
        </button>
        <a className="btn" href="/learn">
          Open Academy
        </a>
      </div>

      <div className="card">
        <strong>
          {credits} / {target} credits (target placeholder)
        </strong>
        <div className="muted">Confirm current SAPC annual requirement yourself.</div>
      </div>

      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {modules.map((m) => (
          <div key={m.id} className="card">
            <strong>{m.title}</strong>
            <div className="muted">
              {m.credits} credit · {m.accreditationStatus.replace("_", " ")}
            </div>
            <p style={{ margin: "8px 0" }}>{m.description}</p>
            {m.eligibility?.ok ? (
              <button className="btn" type="button" onClick={() => void claim(m.id)}>
                Claim credit
              </button>
            ) : (
              <span className="muted">{m.eligibility?.reason ?? "Not eligible yet"}</span>
            )}
          </div>
        ))}
      </div>

      {certs.length > 0 && (
        <div className="card" style={{ marginTop: 16 }}>
          <strong>Certificates</strong>
          <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>{JSON.stringify(certs, null, 2)}</pre>
        </div>
      )}

      {msg && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {msg}
        </pre>
      )}
    </>
  );
}
