import type { RegimenItem } from "./companion.js";

/**
 * Build Spec §6 — Symptom & side-effect tracking.
 * Patient-authored logs against regimen medicines. Spot temporal patterns.
 * Never diagnoses causality. Never invents clinical advice or dose changes.
 */

export type SymptomSeverity = 1 | 2 | 3 | 4 | 5;

export interface SymptomLogEntry {
  id: string;
  userId: string;
  /** ISO date or datetime of the symptom experience */
  at: string;
  /** Short patient label (e.g. "nausea", "rash") */
  label: string;
  severity: SymptomSeverity;
  moleculeId?: string;
  moleculeName?: string;
  /** Optional free note — capped; not clinical advice */
  note?: string;
  createdAt: string;
}

export interface SymptomCoOccurrence {
  label: string;
  moleculeId: string;
  moleculeName: string;
  count: number;
  note: string;
}

export interface SymptomSummary {
  entries: SymptomLogEntry[];
  coOccurrences: SymptomCoOccurrence[];
  exportText: string;
  note: string;
  disclaimer: string;
}

const DISCLAIMER =
  "Symptom logs are patient-authored support notes for discussion with a clinician. " +
  "Materia does not diagnose causes, link causality, or tell you to change or stop a medicine.";

const MAX_LABEL = 80;
const MAX_NOTE = 280;
const MAX_ENTRIES_PER_USER = 200;

export function normalizeSymptomLabel(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_LABEL);
}

export function isValidIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}(T[\d:.+-Z]+)?$/.test(value.trim())) return false;
  const t = Date.parse(value);
  return Number.isFinite(t);
}

export function createSymptomLog(input: {
  userId: string;
  at: string;
  label: string;
  severity: number;
  moleculeId?: string;
  moleculeName?: string;
  note?: string;
  id?: string;
  createdAt?: string;
}): { ok: true; entry: SymptomLogEntry } | { ok: false; error: string } {
  const label = normalizeSymptomLabel(input.label);
  if (!label) return { ok: false, error: "Symptom label is required." };
  if (!isValidIsoDate(input.at)) return { ok: false, error: "Symptom date must be a valid ISO date." };
  if (![1, 2, 3, 4, 5].includes(input.severity)) {
    return { ok: false, error: "Severity must be 1–5." };
  }
  const note = input.note?.trim().slice(0, MAX_NOTE) || undefined;
  if (note && /\b(take|stop|increase|decrease|mg\/|dose)\b/i.test(note)) {
    return {
      ok: false,
      error: "Notes cannot include dosing or stop/change instructions — speak to your clinician.",
    };
  }

  return {
    ok: true,
    entry: {
      id: input.id ?? `sym-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      userId: input.userId,
      at: input.at.trim(),
      label,
      severity: input.severity as SymptomSeverity,
      moleculeId: input.moleculeId,
      moleculeName: input.moleculeName,
      note,
      createdAt: input.createdAt ?? new Date().toISOString(),
    },
  };
}

export function appendSymptomLog(
  existing: SymptomLogEntry[],
  entry: SymptomLogEntry,
): { ok: true; entries: SymptomLogEntry[] } | { ok: false; error: string } {
  if (existing.length >= MAX_ENTRIES_PER_USER) {
    return { ok: false, error: `Maximum ${MAX_ENTRIES_PER_USER} symptom logs per account.` };
  }
  const entries = [...existing, entry].sort((a, b) => a.at.localeCompare(b.at));
  return { ok: true, entries };
}

/** Tag counts where the patient linked a symptom to a regimen molecule — not causality. */
export function detectCoOccurrences(entries: SymptomLogEntry[]): SymptomCoOccurrence[] {
  const map = new Map<string, SymptomCoOccurrence>();
  for (const e of entries) {
    if (!e.moleculeId) continue;
    const key = `${e.label.toLowerCase()}|${e.moleculeId}`;
    const prev = map.get(key);
    if (prev) {
      prev.count += 1;
    } else {
      map.set(key, {
        label: e.label,
        moleculeId: e.moleculeId,
        moleculeName: e.moleculeName ?? e.moleculeId,
        count: 1,
        note: "Patient-linked association only — not proof the medicine caused the symptom.",
      });
    }
  }
  return [...map.values()].filter((c) => c.count >= 1).sort((a, b) => b.count - a.count);
}

export function buildSymptomSummary(input: {
  entries: SymptomLogEntry[];
  regimen?: RegimenItem[];
}): SymptomSummary {
  const entries = [...input.entries].sort((a, b) => a.at.localeCompare(b.at));
  const coOccurrences = detectCoOccurrences(entries);
  const lines = [
    "Materia symptom diary export (patient-authored)",
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    "",
    DISCLAIMER,
    "",
    "Timeline:",
  ];
  if (entries.length === 0) {
    lines.push("(no entries)");
  } else {
    for (const e of entries) {
      const med = e.moleculeName ? ` · linked med: ${e.moleculeName}` : "";
      const note = e.note ? ` · note: ${e.note}` : "";
      lines.push(`- ${e.at.slice(0, 10)} · ${e.label} · severity ${e.severity}/5${med}${note}`);
    }
  }
  if (coOccurrences.length) {
    lines.push("", "Patient-linked patterns (not diagnoses):");
    for (const c of coOccurrences) {
      lines.push(`- ${c.label} with ${c.moleculeName}: ${c.count} log(s)`);
    }
  }
  if (input.regimen?.length) {
    lines.push("", "Current regimen names on file (support only):");
    for (const r of input.regimen) {
      lines.push(`- ${r.moleculeName}${r.brandName ? ` (${r.brandName})` : ""}`);
    }
  }

  return {
    entries,
    coOccurrences,
    exportText: lines.join("\n"),
    note:
      entries.length === 0
        ? "No symptom logs yet. Empty diary is intentional."
        : "Patterns reflect what you tagged — they are not clinical causality findings.",
    disclaimer: DISCLAIMER,
  };
}
