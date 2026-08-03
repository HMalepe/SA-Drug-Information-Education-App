"use client";

import { useState } from "react";
import { TrackPage } from "@/components/TrackPage";
import { formatApiError } from "@/lib/formatApiError";
import { createStubSession } from "@/lib/stubSession";

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
  const [busy, setBusy] = useState(false);

  async function ensurePro(): Promise<string | null> {
    if (userId) return userId;
    try {
      const id = await createStubSession({
        email: "notes@materiatest.za",
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

  async function refreshNotes(uid: string) {
    const res = await fetch(
      `${API}/notes?moleculeSlug=${encodeURIComponent(slug)}&includeDraft=1&userId=${uid}`,
    );
    const data = await res.json();
    if (!res.ok) {
      setMsg(formatApiError(data.error ?? data, "Could not load notes"));
      return;
    }
    setNotes(Array.isArray(data.notes) ? data.notes : []);
    setDrafts(Array.isArray(data.drafts) ? data.drafts : []);
    setMsg(data.disclaimer ?? "");
  }

  async function load() {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensurePro();
      if (!uid) return;
      await refreshNotes(uid);
    } finally {
      setBusy(false);
    }
  }

  async function contribute() {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensurePro();
      if (!uid) return;
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
        setMsg(formatApiError(data.error, "Could not submit"));
        return;
      }
      setMsg(data.noteStatus ?? "Draft saved");
      await refreshNotes(uid);
    } finally {
      setBusy(false);
    }
  }

  async function publish(noteId: string) {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensurePro();
      if (!uid) return;
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
        setMsg(formatApiError(data.error, "Publish failed"));
        return;
      }
      setMsg("Published.");
      await refreshNotes(uid);
    } finally {
      setBusy(false);
    }
  }

  async function upvote(noteId: string) {
    if (busy) return;
    setBusy(true);
    try {
      const uid = await ensurePro();
      if (!uid) return;
      // second pro user to avoid self-upvote on own notes after publish-as-same-user demo
      let voterId: string;
      try {
        voterId = await createStubSession({
          email: "voter@materiatest.za",
          mode: "pharmacist",
          tier: "professional",
          subscribeTier: "professional",
        });
      } catch (e) {
        setMsg(e instanceof Error ? e.message : "Could not create voter session");
        return;
      }
      const res = await fetch(`${API}/notes/${noteId}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: voterId }),
      });
      const data = await res.json();
      if (!res.ok) setMsg(formatApiError(data.error, "Upvote failed"));
      else await refreshNotes(uid);
    } finally {
      setBusy(false);
    }
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
          disabled={busy}
        />
        <label className="muted">Kind</label>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          style={{ display: "block", width: "100%", margin: "8px 0 12px", padding: 10 }}
          disabled={busy}
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
          disabled={busy}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button className="btn" type="button" disabled={busy} onClick={() => void contribute()}>
            Submit draft
          </button>
          <button className="btn" type="button" disabled={busy} onClick={() => void load()}>
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
            <button className="btn" type="button" disabled={busy} onClick={() => void upvote(n.id)}>
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
              disabled={busy}
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
