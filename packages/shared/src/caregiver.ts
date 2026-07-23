/**
 * Build Spec §6 — Caregiver / dependant profiles.
 * Manage a parent's or child's regimen from one account.
 * POPIA-minimised: display name + relation + optional birth year only — never ID numbers.
 */

export type DependantRelation = "self" | "parent" | "child" | "spouse" | "other";

export const DEPENDANT_RELATIONS: DependantRelation[] = [
  "self",
  "parent",
  "child",
  "spouse",
  "other",
];

export interface DependantProfile {
  id: string;
  caregiverUserId: string;
  displayName: string;
  relation: DependantRelation;
  /** Optional four-digit year only — not a full date of birth */
  birthYear?: number;
  createdAt: string;
  active: boolean;
}

export interface DependantCreateInput {
  caregiverUserId: string;
  displayName: string;
  relation: DependantRelation;
  birthYear?: number;
  id?: string;
  createdAt?: string;
}

const MAX_DEPENDANTS = 8;
const MAX_NAME = 80;

export function normalizeDisplayName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_NAME);
}

export function isValidBirthYear(year: number | undefined, nowYear = new Date().getFullYear()): boolean {
  if (year == null) return true;
  if (!Number.isInteger(year)) return false;
  return year >= 1900 && year <= nowYear;
}

export function createDependantProfile(
  input: DependantCreateInput,
): { ok: true; profile: DependantProfile } | { ok: false; error: string } {
  const displayName = normalizeDisplayName(input.displayName);
  if (!displayName) return { ok: false, error: "Display name is required." };
  if (!DEPENDANT_RELATIONS.includes(input.relation)) {
    return { ok: false, error: "Relation must be self, parent, child, spouse, or other." };
  }
  if (!isValidBirthYear(input.birthYear)) {
    return { ok: false, error: "Birth year must be a four-digit year (optional)." };
  }
  if (/\b(\d{13}|id\s*number|passport)\b/i.test(displayName)) {
    return { ok: false, error: "Do not store ID numbers or passport numbers in the display name." };
  }

  return {
    ok: true,
    profile: {
      id: input.id ?? `dep-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      caregiverUserId: input.caregiverUserId,
      displayName,
      relation: input.relation,
      birthYear: input.birthYear,
      createdAt: input.createdAt ?? new Date().toISOString(),
      active: true,
    },
  };
}

export function addDependantProfile(
  existing: DependantProfile[],
  profile: DependantProfile,
): { ok: true; profiles: DependantProfile[] } | { ok: false; error: string } {
  const active = existing.filter((p) => p.active && p.caregiverUserId === profile.caregiverUserId);
  if (active.length >= MAX_DEPENDANTS) {
    return { ok: false, error: `Maximum ${MAX_DEPENDANTS} active profiles per account.` };
  }
  return { ok: true, profiles: [...existing, profile] };
}

export function listActiveDependants(
  profiles: DependantProfile[],
  caregiverUserId: string,
): DependantProfile[] {
  return profiles
    .filter((p) => p.caregiverUserId === caregiverUserId && p.active)
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function deactivateDependant(
  profiles: DependantProfile[],
  caregiverUserId: string,
  dependantId: string,
): { ok: true; profiles: DependantProfile[] } | { ok: false; error: string } {
  const idx = profiles.findIndex((p) => p.id === dependantId && p.caregiverUserId === caregiverUserId);
  if (idx < 0) return { ok: false, error: "Profile not found." };
  const next = profiles.map((p, i) => (i === idx ? { ...p, active: false } : p));
  return { ok: true, profiles: next };
}

/** Scope regimens / symptoms per caregiver + optional dependant. */
export function companionScopeKey(caregiverUserId: string, dependantId?: string | null): string {
  const dep = dependantId?.trim();
  return dep ? `${caregiverUserId}::${dep}` : caregiverUserId;
}

export const CAREGIVER_DISCLAIMER =
  "Caregiver mode is a support organiser for reminders and diaries. " +
  "Materia does not prescribe, change doses, or replace the patient's clinician.";
