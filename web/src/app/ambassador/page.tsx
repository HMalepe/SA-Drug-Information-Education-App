"use client";

import { useState } from "react";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

/** Short status line for ambassador actions — never dumps raw API JSON. */
function formatAmbassadorMsg(data: {
  error?: unknown;
  code?: { code?: string; kind?: string; campusLabel?: string };
  credit?: { amount?: number; kind?: string };
  redeemed?: boolean;
  stats?: { codes?: number; redemptions?: number; credits?: number };
  note?: string;
}): string {
  if (data.error) {
    return `Error: ${formatApiError(data.error)}`;
  }
  const parts: string[] = [];
  if (data.code?.code) {
    parts.push(`code=${data.code.code}`);
    if (data.code.kind) parts.push(`kind=${data.code.kind}`);
  }
  if (data.redeemed || data.credit) {
    parts.push("redeemed");
    if (typeof data.credit?.amount === "number") {
      parts.push(`credit=${data.credit.amount}`);
    }
  }
  if (data.stats) {
    if (typeof data.stats.codes === "number") parts.push(`codes=${data.stats.codes}`);
    if (typeof data.stats.redemptions === "number") {
      parts.push(`redemptions=${data.stats.redemptions}`);
    }
    if (typeof data.stats.credits === "number") parts.push(`credits=${data.stats.credits}`);
  }
  if (data.note) parts.push(data.note);
  return parts.join(" · ") || "OK";
}

export default function AmbassadorPage() {
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [refereeId, setRefereeId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [campus, setCampus] = useState("Wits Pharmacy");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  async function ensureOwner(): Promise<string | null> {
    if (ownerId) return ownerId;
    try {
      const id = await createStubSession({
        email: "ambassador@materiatest.za",
        mode: "student",
        tier: "student",
        displayName: "Campus Ambassador",
      });
      setOwnerId(id);
      return id;
    } catch (e) {
      setOut(e instanceof Error ? e.message : "Could not create session");
      return null;
    }
  }

  async function ensureReferee(): Promise<string | null> {
    if (refereeId) return refereeId;
    try {
      const id = await createStubSession({
        email: `classmate-${Date.now()}@materiatest.za`,
        mode: "student",
        tier: "free",
      });
      setRefereeId(id);
      return id;
    } catch (e) {
      setOut(e instanceof Error ? e.message : "Could not create session");
      return null;
    }
  }

  async function createCode(kind: "ambassador" | "standard") {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensureOwner();
      if (!uid) return;
      const res = await fetch(`${API}/ambassador/code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, kind, campusLabel: campus }),
      });
      const data = await res.json();
      if (data.code?.code) setCode(data.code.code);
      setOut(formatAmbassadorMsg(data));
    } finally {
      setBusy(false);
    }
  }

  async function redeem() {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensureReferee();
      if (!uid) return;
      const res = await fetch(`${API}/ambassador/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, code }),
      });
      setOut(formatAmbassadorMsg(await res.json()));
    } finally {
      setBusy(false);
    }
  }

  async function dashboard() {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensureOwner();
      if (!uid) return;
      const res = await fetch(`${API}/ambassador/dashboard/${uid}`);
      setOut(formatAmbassadorMsg(await res.json()));
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1>Ambassador</h1>
      <p className="tagline">Campus referral loop — status, codes, credits (Doc 5).</p>

      <div className="card">
        <label className="muted">Campus label</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={campus}
          onChange={(e) => setCampus(e.target.value)}
          disabled={busy}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button
            className="btn"
            type="button"
            disabled={busy}
            onClick={() => void createCode("ambassador")}
          >
            Create ambassador code
          </button>
          <button
            className="btn"
            type="button"
            disabled={busy}
            onClick={() => void createCode("standard")}
          >
            Create standard code
          </button>
          <button className="btn" type="button" disabled={busy} onClick={() => void dashboard()}>
            Dashboard
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <label className="muted">Redeem as classmate</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="AMB-…"
          disabled={busy}
        />
        <button className="btn" type="button" disabled={busy} onClick={() => void redeem()}>
          Redeem code
        </button>
      </div>

      {out && (
        <p className="card muted" style={{ marginTop: 16 }} aria-live="polite">
          {out}
        </p>
      )}
    </>
  );
}
