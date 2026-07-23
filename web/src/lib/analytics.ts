const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

const SESSION_KEY = "materia_analytics_session";

function sessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = `sess-${Math.random().toString(36).slice(2, 10)}`;
    window.sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return "anon";
  }
}

/** Fire-and-forget product event (Doc 20). Never send clinical free text. */
export function track(
  name: string,
  props?: Record<string, string | number | boolean | undefined>,
  meta?: { tier?: string; mode?: string },
): void {
  if (typeof window === "undefined") return;
  void fetch(`${API}/analytics/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      events: [
        {
          name,
          props,
          sessionId: sessionId(),
          tier: meta?.tier,
          mode: meta?.mode,
        },
      ],
    }),
    keepalive: true,
  }).catch(() => {
    /* analytics must never break UX */
  });
}
