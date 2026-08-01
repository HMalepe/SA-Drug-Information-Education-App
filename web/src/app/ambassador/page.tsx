"use client";

import { useState } from "react";
import { formatApiError } from "@/lib/formatApiError";

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

  async function ensureOwner() {
    if (ownerId) return ownerId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "ambassador@materiatest.za",
        mode: "student",
        tier: "student",
        displayName: "Campus Ambassador",
      }),
    });
    const data = await res.json();
    setOwnerId(data.user.id);
    return data.user.id as string;
  }

  async function ensureReferee() {
    if (refereeId) return refereeId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `classmate-${Date.now()}@materiatest.za`,
        mode: "student",
        tier: "free",
      }),
    });
    const data = await res.json();
    setRefereeId(data.user.id);
    return data.user.id as string;
  }

  async function createCode(kind: "ambassador" | "standard") {
    const uid = await ensureOwner();
    const res = await fetch(`${API}/ambassador/code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, kind, campusLabel: campus }),
    });
    const data = await res.json();
    if (data.code?.code) setCode(data.code.code);
    setOut(formatAmbassadorMsg(data));
  }

  async function redeem() {
    const uid = await ensureReferee();
    const res = await fetch(`${API}/ambassador/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: uid, code }),
    });
    setOut(formatAmbassadorMsg(await res.json()));
  }

  async function dashboard() {
    const uid = await ensureOwner();
    const res = await fetch(`${API}/ambassador/dashboard/${uid}`);
    setOut(formatAmbassadorMsg(await res.json()));
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
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button className="btn" type="button" onClick={() => void createCode("ambassador")}>
            Create ambassador code
          </button>
          <button className="btn" type="button" onClick={() => void createCode("standard")}>
            Create standard code
          </button>
          <button className="btn" type="button" onClick={() => void dashboard()}>
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
        />
        <button className="btn" type="button" onClick={() => void redeem()}>
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
