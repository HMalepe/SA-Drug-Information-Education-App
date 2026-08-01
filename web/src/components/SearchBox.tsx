"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { formatApiError, messageFromHttpErrorBody } from "@/lib/formatApiError";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface Hit {
  kind: string;
  moleculeSlug: string;
  moleculeName: string;
  brandName?: string;
  queryMatched?: string;
  score: number;
}

export function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    const query = q.trim();
    if (!query) return;
    setBusy(true);
    setError("");
    setHits([]);
    try {
      const res = await fetch(`${API}/search?q=${encodeURIComponent(query)}&limit=20`);
      const raw = await res.text();
      let data: { hits?: Hit[]; error?: unknown } = {};
      try {
        data = raw ? (JSON.parse(raw) as { hits?: Hit[]; error?: unknown }) : {};
      } catch {
        setError(messageFromHttpErrorBody(raw, "Search failed"));
        return;
      }
      if (!res.ok) {
        setError(formatApiError(data.error ?? data, "Search failed"));
        return;
      }
      const nextHits = Array.isArray(data.hits) ? data.hits : [];
      setHits(nextHits);
      track("search_performed", {
        queryLen: query.length,
        hitCount: nextHits.length,
        hasResults: nextHits.length > 0,
      });
      const top = nextHits[0];
      const onlyExact =
        nextHits.length === 1 && (top?.kind === "molecule" || top?.kind === "brand");
      if (top && onlyExact) {
        router.push(`/molecules/${top.moleculeSlug}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <form className="search-box" onSubmit={onSearch}>
        <input
          aria-label="Search medicines"
          placeholder="Brand, molecule, class, or indication — e.g. ACE inhibitors, Augmentin"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          disabled={busy}
        />
        <button type="submit" disabled={busy}>
          {busy ? "…" : "Search"}
        </button>
      </form>
      {error ? (
        <p className="muted" role="alert">
          {error}
        </p>
      ) : null}
      {hits.length > 0 && (
        <div className="card">
          {hits.map((h) => (
            <div key={`${h.kind}-${h.moleculeSlug}-${h.brandName ?? ""}-${h.queryMatched ?? ""}`}>
              <a href={`/molecules/${h.moleculeSlug}`}>
                {h.brandName ? `${h.brandName} → ${h.moleculeName}` : h.moleculeName}
              </a>
              <span className="muted">
                {" "}
                · {h.kind}
                {h.queryMatched && h.kind !== "molecule" && h.kind !== "brand"
                  ? ` · ${h.queryMatched}`
                  : ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
