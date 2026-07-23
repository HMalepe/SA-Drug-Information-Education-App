"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

type ExcipientRow = {
  id: string;
  name: string;
  purpose: string;
  allergyRisk: string;
  absorptionNote?: string;
  canBecomeActive: boolean;
  inactiveUntilNote: string;
  plainLanguage: string;
  counsellingCue: string;
};

export default function ExcipientsPage() {
  const [rows, setRows] = useState<ExcipientRow[] | null>(null);
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch(`${API}/excipients`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as { excipients: ExcipientRow[]; note?: string };
        setRows(data.excipients ?? []);
        setNote(data.note ?? "");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
  }, []);

  return (
    <>
      <h1>Excipient explainer</h1>
      <p className="tagline">
        Inactive until the wrong patient context — Build Spec §5.4 educational library.
      </p>
      {note ? <p className="muted">{note}</p> : null}
      {error ? <p className="muted">Could not load: {error}</p> : null}
      {!rows && !error ? <p className="muted">Loading…</p> : null}
      {rows?.map((e) => (
        <article key={e.id} className="card" style={{ marginTop: 12 }}>
          <h2 style={{ marginTop: 0, fontSize: "1.15rem" }}>{e.name}</h2>
          <p>{e.purpose}</p>
          <p className="muted">{e.inactiveUntilNote}</p>
          <p>
            <strong>Allergy lens:</strong> {e.allergyRisk}
          </p>
          {e.absorptionNote ? (
            <p className="muted" style={{ fontSize: 14 }}>
              Absorption: {e.absorptionNote}
            </p>
          ) : null}
          <p className="muted" style={{ fontSize: 14 }}>
            Counselling: {e.counsellingCue}
          </p>
        </article>
      ))}
    </>
  );
}
