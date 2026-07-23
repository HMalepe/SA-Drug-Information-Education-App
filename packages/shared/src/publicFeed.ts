/**
 * Fetch public SEP/SAHPRA-shaped feeds (Doc 16).
 * Always prefer fixture fallback when URL unset or fetch fails — never invent rows.
 */

export interface PublicFeedResult {
  kind: "sahpra" | "sep";
  origin: "live" | "fixture";
  text: string;
  url?: string;
  note: string;
}

export async function loadPublicFeed(input: {
  kind: "sahpra" | "sep";
  url?: string;
  fixtureText: string;
  fetchImpl?: typeof fetch;
}): Promise<PublicFeedResult> {
  const url = input.url?.trim();
  if (!url) {
    return {
      kind: input.kind,
      origin: "fixture",
      text: input.fixtureText,
      note: "No live URL configured — using local fixture. Set SAHPRA_FEED_URL / SEP_FEED_URL to enable live pull.",
    };
  }

  const fetchFn = input.fetchImpl ?? fetch;
  try {
    const res = await fetchFn(url, {
      headers: { Accept: "text/csv,text/plain,*/*" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      return {
        kind: input.kind,
        origin: "fixture",
        text: input.fixtureText,
        url,
        note: `Live feed returned ${res.status} — fell back to fixture.`,
      };
    }
    const text = await res.text();
    if (!text.trim()) {
      return {
        kind: input.kind,
        origin: "fixture",
        text: input.fixtureText,
        url,
        note: "Live feed empty — fell back to fixture.",
      };
    }
    return {
      kind: input.kind,
      origin: "live",
      text,
      url,
      note: "Live feed loaded — validate as draft only before publish.",
    };
  } catch (err) {
    return {
      kind: input.kind,
      origin: "fixture",
      text: input.fixtureText,
      url,
      note: `Live feed error (${err instanceof Error ? err.message : "unknown"}) — fell back to fixture.`,
    };
  }
}
