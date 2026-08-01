"use client";

import { useState } from "react";
import { formatApiError, messageFromHttpErrorBody } from "@/lib/formatApiError";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export function AskMateria({ moleculeSlug }: { moleculeSlug: string }) {
  const [question, setQuestion] = useState("How does this medicine work?");
  const [answer, setAnswer] = useState<string>("");
  const [citations, setCitations] = useState<Array<{ citation: string; fieldPath: string }>>([]);
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [asking, setAsking] = useState(false);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    if (asking) return;
    const q = question.trim();
    if (!q) return;
    setAsking(true);
    setError("");
    setStatus("");
    setAnswer("");
    setCitations([]);
    try {
      const res = await fetch(`${API}/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moleculeSlug, question: q }),
      });
      const raw = await res.text();
      let data: Record<string, unknown> = {};
      try {
        data = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      } catch {
        if (!res.ok) {
          setError(messageFromHttpErrorBody(raw, "Ask failed"));
          return;
        }
        setError("Could not parse Ask response");
        return;
      }
      if (!res.ok) {
        setError(formatApiError(data.error ?? data, "Ask failed"));
        return;
      }
      setStatus(typeof data.status === "string" ? data.status : "");
      const answerText =
        typeof data.answer === "string"
          ? data.answer
          : typeof data.refusalReason === "string"
            ? data.refusalReason
            : "";
      setAnswer(answerText);
      const cites = Array.isArray(data.citations) ? data.citations : [];
      setCitations(
        cites.filter(
          (c): c is { citation: string; fieldPath: string } =>
            !!c &&
            typeof c === "object" &&
            typeof (c as { citation?: unknown }).citation === "string" &&
            typeof (c as { fieldPath?: unknown }).fieldPath === "string",
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ask failed");
    } finally {
      setAsking(false);
    }
  }

  return (
    <section className="card" style={{ marginTop: 16 }}>
      <h2 style={{ marginTop: 0 }}>Ask Materia</h2>
      <p className="muted">Grounded answers only — refuses when unsourced (constitution 3.1).</p>
      <form className="search-box" onSubmit={ask}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          aria-label="Ask"
          disabled={asking}
        />
        <button type="submit" disabled={asking}>
          {asking ? "Asking…" : "Ask"}
        </button>
      </form>
      {error ? <p className="muted" role="alert">{error}</p> : null}
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
