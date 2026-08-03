import { formatApiError, messageFromHttpErrorBody } from "@/lib/formatApiError";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export type StubSessionOpts = {
  email: string;
  mode: "patient" | "student" | "pharmacist" | "doctor" | string;
  tier: "free" | "student" | "professional" | string;
  displayName?: string;
  /** When set, also POST /billing/subscribe after session create. */
  subscribeTier?: "free" | "student" | "professional" | string;
};

async function readJson(res: Response): Promise<Record<string, unknown>> {
  const raw = await res.text();
  if (!raw.trim()) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    throw new Error(messageFromHttpErrorBody(raw, `HTTP ${res.status}`));
  }
}

/**
 * Stub auth session for demo Academy / Pro pages.
 * Always checks !res.ok — never assumes data.user.id exists.
 */
export async function createStubSession(opts: StubSessionOpts): Promise<string> {
  const body: Record<string, string> = {
    email: opts.email,
    mode: opts.mode,
    tier: opts.tier,
  };
  if (opts.displayName) body.displayName = opts.displayName;

  const res = await fetch(`${API}/auth/stub-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await readJson(res);
  if (!res.ok) {
    throw new Error(formatApiError(data.error ?? data, "Could not create session"));
  }
  const user = data.user as { id?: string } | undefined;
  if (!user?.id) throw new Error("Session created without a user id");

  if (opts.subscribeTier) {
    const sub = await fetch(`${API}/billing/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, tier: opts.subscribeTier }),
    });
    if (!sub.ok) {
      const subData = await readJson(sub);
      throw new Error(formatApiError(subData.error ?? subData, "Could not subscribe stub tier"));
    }
  }

  return user.id;
}
