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

/**
 * Turn an HTTP error response body (JSON or plain text) into a short UI message.
 * Never dumps multi-line JSON blobs into status / toast surfaces.
 */
export function messageFromHttpErrorBody(
  bodyText: string,
  fallback = "Request failed",
): string {
  const trimmed = bodyText.trim();
  if (!trimmed) return fallback;
  try {
    const parsed: unknown = JSON.parse(trimmed);
    if (parsed && typeof parsed === "object") {
      const rec = parsed as Record<string, unknown>;
      if ("error" in rec) return formatApiError(rec.error, fallback);
      return formatApiError(parsed, fallback);
    }
    return formatApiError(parsed, fallback);
  } catch {
    // Plain text — refuse huge dumps (likely HTML/JSON mishaps)
    if (trimmed.length > 280) return fallback;
    return trimmed;
  }
}
