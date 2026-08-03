"use client";

import { useState } from "react";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type ModuleRow = {
  id: string;
  title: string;
  credits: number;
  description: string;
  accreditationStatus: string;
  eligibility: { ok: boolean; reason?: string };
};

type CertRow = {
  id?: string;
  title?: string;
  moduleId?: string;
  issuedAt?: string;
  credits?: number;
};

/** Short status line for CPD actions — never dumps raw API JSON. */
function formatCpdMsg(data: {
  error?: unknown;
  moduleId?: string;
  creditsEarned?: number;
  certificate?: { title?: string; moduleId?: string; issuedAt?: string };
  note?: string;
}): string {
  if (data.error) {
    return `Error: ${formatApiError(data.error)}`;
  }
  const parts: string[] = [];
  if (data.certificate?.title) parts.push(`cert=${data.certificate.title}`);
  else if (data.moduleId) parts.push(`claimed=${data.moduleId}`);
  if (typeof data.creditsEarned === "number") parts.push(`total=${data.creditsEarned}`);
  if (data.note) parts.push(data.note);
  return parts.join(" · ") || "OK";
}

export default function CpdPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [disclaimer, setDisclaimer] = useState("");
  const [credits, setCredits] = useState(0);
  const [target, setTarget] = useState(30);
  const [modules, setModules] = useState<ModuleRow[]>([]);
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function ensurePro(): Promise<string | null> {
    if (userId) return userId;
    try {
      const id = await createStubSession({
        email: "cpd@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
        subscribeTier: "professional",
      });
      setUserId(id);
      return id;
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Could not create session");
      return null;
    }
  }

  async function refreshDashboard(uid: string) {
    const res = await fetch(`${API}/cpd/dashboard/${uid}`);
    const data = await res.json();
    if (!res.ok) {
      setMsg(formatCpdMsg(data));
      return;
    }
    setDisclaimer(data.disclaimer ?? "");
    setCredits(data.creditsEarned ?? 0);
    setTarget(data.annualTarget ?? 30);
    setModules(data.modules ?? []);
    setCerts((data.certificates ?? []) as CertRow[]);
    setMsg("");
  }

  async function load() {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensurePro();
      if (!uid) return;
      await refreshDashboard(uid);
    } finally {
      setBusy(false);
    }
  }

  async function claim(moduleId: string) {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensurePro();
      if (!uid) return;
      const res = await fetch(`${API}/cpd/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, moduleId }),
      });
      const data = await res.json();
      setMsg(formatCpdMsg({ ...data, moduleId }));
      await refreshDashboard(uid);
    } finally {
      setBusy(false);
    }
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
        <button className="btn" type="button" disabled={busy} onClick={() => void load()}>
          {busy ? "Loading…" : "Load dashboard"}
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
              <button
                className="btn"
                type="button"
                disabled={busy}
                onClick={() => void claim(m.id)}
              >
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
          <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
            {certs.map((c, i) => (
              <li key={c.id ?? `${c.moduleId ?? "cert"}-${i}`}>
                {c.title ?? c.moduleId ?? "Certificate"}
                {typeof c.credits === "number" ? ` · ${c.credits} credit` : ""}
                {c.issuedAt ? ` · issued ${c.issuedAt}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {msg && (
        <p className="card muted" style={{ marginTop: 16 }} aria-live="polite">
          {msg}
        </p>
      )}
    </>
  );
}
