"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type Note = {
  id: string;
  kind: string;
  body: string;
  authorDisplayName: string;
  authorCredential?: string;
  upvotes: number;
  publishState: string;
  lastReviewed?: string;
};

export default function NotesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [slug, setSlug] = useState("amoxicillin");
  const [body, setBody] = useState(
    "Ask about prior penicillin rash before recommending a brand switch at the counter.",
  );
  const [kind, setKind] = useState("counselling_tip");
  const [notes, setNotes] = useState<Note[]>([]);
  const [drafts, setDrafts] = useState<Note[]>([]);
  const [msg, setMsg] = useState("");

  async function ensurePro() {
    if (userId) return userId;
    const res = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "notes@materiatest.za",
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
    const res = await fetch(
      `${API}/notes?moleculeSlug=${encodeURIComponent(slug)}&includeDraft=1&userId=${uid}`,
    );
    const data = await res.json();
    setNotes(Array.isArray(data.notes) ? data.notes : []);
    setDrafts(Array.isArray(data.drafts) ? data.drafts : []);
    setMsg(data.disclaimer ?? "");
  }

  async function contribute() {
    const uid = await ensurePro();
    const res = await fetch(`${API}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: uid,
        moleculeSlug: slug,
        kind,
        body,
        authorDisplayName: "Demo Pharmacist",
        authorCredential: "BPharm",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Could not submit"));
      return;
    }
    setMsg(data.noteStatus ?? "Draft saved");
    await load();
  }

  async function publish(noteId: string) {
    const uid = await ensurePro();
    const res = await fetch(`${API}/notes/${noteId}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: uid,
        attestation: "Reviewed as local practice context — not dosing advice.",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(String(data.error ?? "Publish failed"));
      return;
    }
    setMsg("Published.");
    await load();
  }

  async function upvote(noteId: string) {
    const uid = await ensurePro();
    // second pro user to avoid self-upvote on own notes after publish-as-same-user demo
    const voter = await fetch(`${API}/auth/stub-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "voter@materiatest.za",
        mode: "pharmacist",
        tier: "professional",
      }),
    });
    const v = await voter.json();
    await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: v.user.id, tier: "professional" }),
    });
    const res = await fetch(`${API}/notes/${noteId}/upvote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: v.user.id }),
    });
    const data = await res.json();
    if (!res.ok) setMsg(String(data.error ?? "Upvote failed"));
    else await load();
    void uid;
  }

  return (
    <>
      <TrackPage name="tool_used" props={{ tool: "pro_notes" }} />
      <h1>Professional notes</h1>
      <p className="tagline">
        Attributed counselling tips and stockout intel — draft until reviewed; never dosing instructions.
      </p>
      <div className="card">
        <label className="muted">Molecule slug</label>
        <input
          style={{ display: "block", width: "100%", margin: "8px 0 12px", padding: 10 }}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <label className="muted">Kind</label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          style={{ display: "block", width: "100%", margin: "8px 0 12px", padding: 10 }}
        >
          <option value="counselling_tip">Counselling tip</option>
          <option value="stockout_intel">Stockout intel</option>
          <option value="practice_pearl">Practice pearl</option>
        </select>
        <label className="muted">Note</label>
        <textarea
          style={{ display: "block", width: "100%", margin: "8px 0 16px", padding: 10, minHeight: 80 }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button className="btn" type="button" onClick={() => void contribute()}>
            Submit draft
          </button>
          <button className="btn" type="button" onClick={() => void load()}>
            Refresh
          </button>
        </div>
      </div>
      {msg && <p className="muted">{msg}</p>}
      <h2>Published</h2>
      <div className="pearl-feed">
        {notes.map((n) => (
          <article key={n.id} className="pearl-card">
            <p className="pearl-reason">{n.kind.replace("_", " ")}</p>
            <p style={{ margin: 0, lineHeight: 1.5 }}>{n.body}</p>
            <p className="muted" style={{ marginTop: 10 }}>
              {n.authorDisplayName}
              {n.authorCredential ? ` · ${n.authorCredential}` : ""} · ▲ {n.upvotes}
              {n.lastReviewed ? ` · reviewed ${n.lastReviewed}` : ""}
            </p>
            <button className="btn" type="button" onClick={() => void upvote(n.id)}>
              Upvote
            </button>
          </article>
        ))}
        {notes.length === 0 && <p className="muted">No published notes yet for this molecule.</p>}
      </div>
      <h2>Your drafts</h2>
      <div className="pearl-feed">
        {drafts.map((n) => (
          <article key={n.id} className="pearl-card">
            <p className="pearl-reason">draft · {n.kind}</p>
            <p style={{ margin: 0 }}>{n.body}</p>
            <button
              className="btn"
              type="button"
              style={{ marginTop: 8 }}
              onClick={() => void publish(n.id)}
            >
              Publish with attestation
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
