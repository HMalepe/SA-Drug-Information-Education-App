"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface Hit {
  kind: string;
  moleculeSlug: string;
  moleculeName: string;
  brandName?: string;
  score: number;
}

export function SearchBox() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
      const data = (await res.json()) as { hits: Hit[] };
      setHits(data.hits);
      const top = data.hits[0];
      if (top && data.hits.length === 1) {
        router.push(`/molecules/${top.moleculeSlug}`);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <form className="search-box" onSubmit={onSearch}>
        <input
          aria-label="Search medicines"
          placeholder="Search brand or molecule — e.g. Augmentin, amoxicillin"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit" disabled={busy}>
          {busy ? "…" : "Search"}
        </button>
      </form>
      {hits.length > 0 && (
        <div className="card">
          {hits.map((h) => (
            <div key={`${h.kind}-${h.moleculeSlug}-${h.brandName ?? ""}`}>
              <a href={`/molecules/${h.moleculeSlug}`}>
                {h.brandName ? `${h.brandName} → ${h.moleculeName}` : h.moleculeName}
              </a>
              <span className="muted"> · {h.kind}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
