"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export function AskMateria({ moleculeSlug }: { moleculeSlug: string }) {
  const [question, setQuestion] = useState("How does this medicine work?");
  const [answer, setAnswer] = useState<string>("");
  const [citations, setCitations] = useState<Array<{ citation: string; fieldPath: string }>>([]);
  const [status, setStatus] = useState<string>("");

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`${API}/ai/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ moleculeSlug, question }),
    });
    const data = await res.json();
    setStatus(data.status);
    setAnswer(data.answer ?? data.refusalReason ?? "");
    setCitations(data.citations ?? []);
  }

  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Ask Materia</h2>
      <p className="muted">Grounded answers only — refuses when unsourced (constitution 3.1).</p>
      <form className="search-box" onSubmit={ask}>
        <input value={question} onChange={(e) => setQuestion(e.target.value)} aria-label="Ask" />
        <button type="submit">Ask</button>
      </form>
      {status && (
        <div>
          <p>
            <strong>Status:</strong> {status}
          </p>
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{answer}</pre>
          {citations.map((c) => (
            <div key={c.fieldPath + c.citation} className="source-tag">
              {c.fieldPath} · {c.citation}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
