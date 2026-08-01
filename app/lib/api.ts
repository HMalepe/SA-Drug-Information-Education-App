import Constants from "expo-constants";
import { messageFromHttpErrorBody } from "@materia/shared";

const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  (Constants.expoConfig?.extra?.apiBaseUrl as string | undefined) ??
  "http://localhost:4000";

/** Canonical citation tag from Medicine 360 / dose calculator — never invent text. */
export type SourceTag = {
  citation?: string;
  lastReviewed?: string;
  id?: string;
};

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      messageFromHttpErrorBody(text, res.statusText || "Request failed"),
    );
  }
  return res.json() as Promise<T>;
}

export function searchMolecules(q: string) {
  return api<{
    hits: Array<{ moleculeSlug: string; moleculeName: string; brandName?: string; kind: string }>;
  }>(`/search?q=${encodeURIComponent(q)}`);
}

export function listMolecules(area?: string) {
  const qs = area ? `?area=${encodeURIComponent(area)}` : "";
  return api<{
    molecules: Array<{ slug: string; innName: string; className: string }>;
    areas?: string[];
  }>(`/molecules${qs}`);
}

export function getMedicine360(slug: string) {
  return api<{
    molecule: { id: string; innName: string; slug: string; className: string };
    tabOrder: Array<{ id: string; label: string; index: number }>;
    tabs: Record<string, { title: string; body: unknown; sources: SourceTag[] }>;
    defaultTab: string;
  }>(`/molecules/${slug}`);
}

export function askAi(moleculeSlug: string, question: string) {
  return api<{
    status: string;
    answer?: string;
    refusalReason?: string;
    citations: Array<{ citation: string; lastReviewed: string; fieldPath: string }>;
  }>("/ai/ask", {
    method: "POST",
    body: JSON.stringify({ moleculeSlug, question }),
  });
}

export function stubRegister(email: string, mode: string) {
  return api<{ user: { id: string } }>("/auth/stub-session", {
    method: "POST",
    body: JSON.stringify({ email, mode }),
  });
}

export function acceptConsent(userId: string, consentType: "popia" | "medical_disclaimer") {
  return api<{ entry: unknown }>("/consent", {
    method: "POST",
    body: JSON.stringify({ userId, consentType, version: "2026-07-01" }),
  });
}

export function calculateDose(body: {
  moleculeId: string;
  weightKg: number;
  indicationKey: string;
  clinicallyConfirmed: boolean;
}) {
  return api<{
    status: "ok" | "needs_confirmation" | "unavailable" | "refused" | string;
    working?: string[];
    suggestedDoseDisplay?: string;
    source?: { citation?: string; lastReviewed?: string; id?: string };
    message?: string;
    disclaimer: string;
  }>("/tools/dose-calculator", { method: "POST", body: JSON.stringify(body) });
}
