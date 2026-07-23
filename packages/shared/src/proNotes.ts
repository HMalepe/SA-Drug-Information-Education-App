import type { PublishState } from "./types.js";

/**
 * Build Spec §12 — Verified professional notes / community layer.
 * Attributed counselling tips & stockout intel. Draft until reviewed.
 * Never accepts dosing/stop instructions as publishable clinical fact.
 */

export type ProfessionalNoteKind = "counselling_tip" | "stockout_intel" | "practice_pearl";

export interface ProfessionalNote {
  id: string;
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  kind: ProfessionalNoteKind;
  body: string;
  authorUserId: string;
  authorDisplayName: string;
  authorCredential?: string;
  publishState: PublishState;
  upvotes: number;
  upvotedBy: string[];
  createdAt: string;
  lastReviewed?: string;
  reviewerUserId?: string;
  reviewerAttestation?: string;
}

export interface ProfessionalNoteCreateInput {
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  kind: ProfessionalNoteKind;
  body: string;
  authorUserId: string;
  authorDisplayName: string;
  authorCredential?: string;
  id?: string;
  createdAt?: string;
}

const MAX_BODY = 500;
const FORBIDDEN =
  /\b(take\s+\d|stop\s+(the\s+)?(medicine|drug)|increase\s+dose|decrease\s+dose|\d+\s*mg\b|mg\/kg)\b/i;

export function sanitizeNoteBody(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, MAX_BODY);
}

export function createProfessionalNote(
  input: ProfessionalNoteCreateInput,
): { ok: true; note: ProfessionalNote } | { ok: false; error: string } {
  const body = sanitizeNoteBody(input.body);
  if (body.length < 12) return { ok: false, error: "Note is too short to be useful." };
  if (FORBIDDEN.test(body)) {
    return {
      ok: false,
      error:
        "Notes cannot include dosing or stop/change instructions. Share counselling or stock context only — confirm clinically elsewhere.",
    };
  }
  if (!["counselling_tip", "stockout_intel", "practice_pearl"].includes(input.kind)) {
    return { ok: false, error: "Unknown note kind." };
  }
  const authorDisplayName = input.authorDisplayName.trim().slice(0, 80);
  if (!authorDisplayName) return { ok: false, error: "Author display name is required." };

  return {
    ok: true,
    note: {
      id: input.id ?? `pnote-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      moleculeId: input.moleculeId,
      moleculeSlug: input.moleculeSlug,
      moleculeName: input.moleculeName,
      kind: input.kind,
      body,
      authorUserId: input.authorUserId,
      authorDisplayName,
      authorCredential: input.authorCredential?.trim().slice(0, 80) || undefined,
      publishState: "draft",
      upvotes: 0,
      upvotedBy: [],
      createdAt: input.createdAt ?? new Date().toISOString(),
    },
  };
}

export function upvoteProfessionalNote(
  note: ProfessionalNote,
  userId: string,
): { ok: true; note: ProfessionalNote } | { ok: false; error: string } {
  if (note.publishState !== "published") {
    return { ok: false, error: "Only published notes can be upvoted." };
  }
  if (note.upvotedBy.includes(userId)) {
    return { ok: false, error: "Already upvoted." };
  }
  if (note.authorUserId === userId) {
    return { ok: false, error: "Authors cannot upvote their own note." };
  }
  return {
    ok: true,
    note: {
      ...note,
      upvotes: note.upvotes + 1,
      upvotedBy: [...note.upvotedBy, userId],
    },
  };
}

export function publishProfessionalNote(
  note: ProfessionalNote,
  input: { reviewerUserId: string; attestation: string; reviewedAt?: string },
): { ok: true; note: ProfessionalNote } | { ok: false; error: string } {
  if (!input.attestation.trim() || input.attestation.trim().length < 8) {
    return { ok: false, error: "Reviewer attestation is required to publish." };
  }
  if (FORBIDDEN.test(note.body)) {
    return { ok: false, error: "Cannot publish a note that includes dosing language." };
  }
  return {
    ok: true,
    note: {
      ...note,
      publishState: "published",
      lastReviewed: (input.reviewedAt ?? new Date().toISOString()).slice(0, 10),
      reviewerUserId: input.reviewerUserId,
      reviewerAttestation: input.attestation.trim().slice(0, 240),
    },
  };
}

export function listPublishedNotesForMolecule(
  notes: ProfessionalNote[],
  moleculeIdOrSlug: string,
): ProfessionalNote[] {
  const key = moleculeIdOrSlug.trim().toLowerCase();
  return notes
    .filter(
      (n) =>
        n.publishState === "published" &&
        (n.moleculeId === moleculeIdOrSlug || n.moleculeSlug.toLowerCase() === key),
    )
    .sort((a, b) => b.upvotes - a.upvotes || b.createdAt.localeCompare(a.createdAt));
}

export const PROFESSIONAL_NOTES_DISCLAIMER =
  "Community notes are peer contributions for local practice context. " +
  "They are not a substitute for the labelled product, STGs, or clinical judgement. " +
  "Only published notes are shown to patients/students.";
