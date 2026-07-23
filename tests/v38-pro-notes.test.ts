import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createProfessionalNote,
  listPublishedNotesForMolecule,
  PROFESSIONAL_NOTES_DISCLAIMER,
  publishProfessionalNote,
  upvoteProfessionalNote,
} from "@materia/shared";

describe("v38 professional notes §12", () => {
  it("creates draft notes and rejects dosing language", () => {
    const ok = createProfessionalNote({
      moleculeId: "mol-amox",
      moleculeSlug: "amoxicillin",
      moleculeName: "Amoxicillin",
      kind: "counselling_tip",
      body: "Ask about prior penicillin rash before recommending a brand switch.",
      authorUserId: "u1",
      authorDisplayName: "A. Pharmacist",
      authorCredential: "BPharm",
    });
    assert.equal(ok.ok, true);
    if (ok.ok) assert.equal(ok.note.publishState, "draft");

    const bad = createProfessionalNote({
      moleculeId: "mol-amox",
      moleculeSlug: "amoxicillin",
      moleculeName: "Amoxicillin",
      kind: "counselling_tip",
      body: "Tell the patient to take 500 mg three times daily.",
      authorUserId: "u1",
      authorDisplayName: "A. Pharmacist",
    });
    assert.equal(bad.ok, false);
  });

  it("publishes with attestation and ranks by upvotes", () => {
    const created = createProfessionalNote({
      moleculeId: "mol-amox",
      moleculeSlug: "amoxicillin",
      moleculeName: "Amoxicillin",
      kind: "stockout_intel",
      body: "Amoxil 250 syrup was limited at our wholesaler this morning — check local stock before counselling a switch.",
      authorUserId: "u1",
      authorDisplayName: "A. Pharmacist",
      id: "n1",
    });
    assert.equal(created.ok, true);
    if (!created.ok) return;

    const published = publishProfessionalNote(created.note, {
      reviewerUserId: "founder",
      attestation: "Reviewed as local stockout context — not dosing advice.",
      reviewedAt: "2026-07-23",
    });
    assert.equal(published.ok, true);
    if (!published.ok) return;

    const up = upvoteProfessionalNote(published.note, "u2");
    assert.equal(up.ok, true);
    if (!up.ok) return;
    assert.equal(up.note.upvotes, 1);

    const self = upvoteProfessionalNote(up.note, "u1");
    assert.equal(self.ok, false);

    const listed = listPublishedNotesForMolecule([up.note, created.note], "amoxicillin");
    assert.equal(listed.length, 1);
    assert.equal(listed[0]?.upvotes, 1);
    assert.match(PROFESSIONAL_NOTES_DISCLAIMER, /not a substitute/i);
  });
});
