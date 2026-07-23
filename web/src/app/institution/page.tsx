"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type BoardRow = {
  rank: number;
  displayLabel: string;
  xp: number;
  bestStreak: number;
  lessonsCompleted: number;
  badgesEarned: number;
  isViewer: boolean;
};

type Board = {
  scopeLabel: string;
  rows: BoardRow[];
  viewerRank: number | null;
  note: string;
  disclaimer: string;
};

type LeaderboardBundle = {
  orgName: string;
  orgBoard: Board;
  cohortBoards: Array<{ cohortId: string; cohortName: string; board: Board }>;
  note: string;
  disclaimer: string;
};

export default function InstitutionPage() {
  const [adminId, setAdminId] = useState<string | null>(null);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("Demo Pharmacy School");
  const [memberEmail, setMemberEmail] = useState("student1@materiatest.za");
  const [cohortName, setCohortName] = useState("Year 3 antibiotics");
  const [lastCohortId, setLastCohortId] = useState<string | null>(null);
  const [boards, setBoards] = useState<LeaderboardBundle | null>(null);
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
    setBoards(null);
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
        memberUserIds: memberId ? [memberId, uid] : [uid],
      }),
    });
    const cohortPayload = await res.json();
    if (cohortPayload.cohort?.id) setLastCohortId(cohortPayload.cohort.id);
    setOut(JSON.stringify({ seat: seatData, cohort: cohortPayload }, null, 2));
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

  async function loadLeaderboards() {
    if (!orgId) {
      setOut("Create an organisation first.");
      return;
    }
    const uid = await ensureAdmin();
    try {
      const list = await fetch(`${API}/academy/courses`).then((r) => r.json());
      const first = Array.isArray(list.courses) ? list.courses[0] : null;
      if (first?.id) {
        const detail = await fetch(`${API}/academy/courses/${first.id}?userId=${uid}`).then((r) =>
          r.json(),
        );
        const lessonId = detail.lessons?.[0]?.id;
        if (lessonId) {
          await fetch(`${API}/academy/courses/${first.id}/lessons/${lessonId}/complete`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: uid }),
          });
        }
      }
    } catch {
      /* best-effort seed XP for demo dean */
    }
    const res = await fetch(`${API}/institution/${orgId}/leaderboards?userId=${encodeURIComponent(uid)}`);
    const data = await res.json();
    if (!res.ok) {
      setBoards(null);
      setOut(JSON.stringify(data, null, 2));
      return;
    }
    setBoards(data);
    setOut("");
  }

  function renderBoard(board: Board, key: string) {
    return (
      <div key={key} className="card" style={{ marginTop: 12 }}>
        <strong>{board.scopeLabel}</strong>
        {board.viewerRank != null && (
          <span className="muted"> · your rank #{board.viewerRank}</span>
        )}
        <p className="muted">{board.note}</p>
        {board.rows.map((r) => (
          <article
            key={`${key}-${r.rank}-${r.displayLabel}`}
            style={{
              marginTop: 10,
              paddingTop: 8,
              borderTop: "1px solid color-mix(in srgb, var(--ink) 12%, transparent)",
              outline: r.isViewer ? "2px solid var(--deep-teal)" : undefined,
              outlineOffset: 4,
            }}
          >
            <div className="muted">
              #{r.rank}
              {r.isViewer ? " · you" : ""}
            </div>
            <strong>{r.displayLabel}</strong>
            <div className="muted">
              {r.xp} XP · streak {r.bestStreak} · {r.lessonsCompleted} lessons · {r.badgesEarned}{" "}
              badges
            </div>
          </article>
        ))}
        {board.rows.length === 0 && <p className="muted">No ranked learners in this scope yet.</p>}
      </div>
    );
  }

  return (
    <>
      <h1>Institution console</h1>
      <p className="tagline">Org seats, cohorts, completion analytics, and XP leaderboards (§7.2).</p>

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
          <button className="btn" type="button" onClick={() => void loadLeaderboards()}>
            Load XP leaderboards
          </button>
        </div>
        {lastCohortId && (
          <p className="muted" style={{ marginTop: 8 }}>
            Last cohort: {lastCohortId} · also on{" "}
            <a href="/learn/leaderboard">Academy leaderboard</a>
          </p>
        )}
      </div>

      {boards && (
        <>
          <div className="card" style={{ marginTop: 12 }}>
            <h2 style={{ marginTop: 0 }}>{boards.orgName} — XP boards</h2>
            <p className="muted">{boards.note}</p>
            <p className="muted">{boards.disclaimer}</p>
          </div>
          {renderBoard(boards.orgBoard, "org")}
          {boards.cohortBoards.map((c) => renderBoard(c.board, c.cohortId))}
          {boards.cohortBoards.length === 0 && (
            <p className="muted" style={{ marginTop: 12 }}>
              No cohorts yet — create one to see a class board.
            </p>
          )}
        </>
      )}

      {out && (
        <pre className="card" style={{ marginTop: 16, whiteSpace: "pre-wrap", fontSize: 13 }}>
          {out}
        </pre>
      )}
    </>
  );
}
