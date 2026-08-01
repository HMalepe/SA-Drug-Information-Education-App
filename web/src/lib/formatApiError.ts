/**
 * Human-readable API error line — never JSON.stringifies opaque payloads into the UI.
 * Prefer string / .message / .error / .code; otherwise a short fallback.
 */
export function formatApiError(
  error: unknown,
  fallback = "Request failed",
): string {
  if (typeof error === "string") {
    const t = error.trim();
    return t || fallback;
  }
  if (error && typeof error === "object") {
    const rec = error as Record<string, unknown>;
    for (const key of ["message", "error", "code"] as const) {
      const v = rec[key];
      if (typeof v === "string") {
        const t = v.trim();
        if (t) return t;
      }
    }
  }
  return fallback;
}
