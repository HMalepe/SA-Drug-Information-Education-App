"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export default function InstitutionPage() {
  const [adminId, setAdminId] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("Demo Pharmacy School");
  const [memberEmail, setMemberEmail] = useState("student1@materiatest.za");
  const [cohortName, setCohortName] = useState("Year 3 antibiotics");
  const [out, setOut] = useState("");

  async function ensureAdmin() {
    if (adminId) return adminId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "dean@materiatest.za",
        mode: "pharmacist",
        tier: "institution",
        displayName: "Demo Dean",
      }),
    });
    const data = await res.json();
    setAdminId(data.user.id);
    return data.user.id as string;
  }

  async function createOrg() {
    const uid = await ensureAdmin();
    const res = await fetch(`${API}/institution/orgs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminUserId: uid,
        name: orgName,
        kind: "university",
        seatLimit: 50,
      }),
    });
    const data = await res.json();
    if (data.org?.id) setOrgId(data.org.id);
    setOut(JSON.stringify(data, null, 2));
  }

  async function addSeat() {
    if (!orgId) {
      setOut("Create an organisation first.");
      return;
    }
    const uid = await ensureAdmin();
    const res = await fetch(`${API}/institution/seats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orgId,
        adminUserId: uid,
        memberEmail,
        memberMode: "student",
      }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function createCohort() {
    if (!orgId) {
      setOut("Create an organisation first.");
      return;
    }
    const uid = await ensureAdmin();
    const seatRes = await fetch(`${API}/institution/seats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orgId,
        adminUserId: uid,
        memberEmail: `cohort-${Date.now()}@materiatest.za`,
        memberMode: "student",
      }),
    });
    const seatData = await seatRes.json();
    const memberId = seatData.member?.id as string | undefined;
    const res = await fetch(`${API}/institution/cohorts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orgId,
        adminUserId: uid,
        name: cohortName,
        memberUserIds: memberId ? [memberId] : [],
      }),
    });
    setOut(JSON.stringify({ seat: seatData, cohort: await res.json() }, null, 2));
  }

  async function loadAnalytics() {
    if (!orgId) {
      setOut("Create an organisation first.");
      return;
    }
    const uid = await ensureAdmin();
    const res = await fetch(`${API}/institution/${orgId}/analytics?userId=${uid}`);
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <>
      <h1>Institution console</h1>
      <p className="tagline">Org seats, cohorts, and completion analytics.</p>

      <div className="card">
        <label className="muted">Organisation name</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <button className="btn" type="button" onClick={() => void createOrg()}>
          Create org
        </button>
        {orgId && <div className="muted" style={{ marginTop: 8 }}>Org id: {orgId}</div>}
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <label className="muted">Add seat (email)</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
        />
        <button className="btn" type="button" onClick={() => void addSeat()}>
          Add seat
        </button>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <label className="muted">Cohort name</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10 }}
          value={cohortName}
          onChange={(e) => setCohortName(e.target.value)}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button className="btn" type="button" onClick={() => void createCohort()}>
            Create cohort + member
          </button>
          <button className="btn" type="button" onClick={() => void loadAnalytics()}>
            Load analytics
          </button>
        </div>
      </div>

      {out && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {out}
        </pre>
      )}
    </>
  );
}
