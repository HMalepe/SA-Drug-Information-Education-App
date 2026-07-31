/**
 * Direct grounding tests for buildMolecule360 — the page users see.
 * Draft / unsourced facts must never appear as rendered clinical text.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyStateMessage } from "@materia/shared";
import { buildMolecule360 } from "../api/src/moleculeView.ts";

describe("buildMolecule360 grounding contract", () => {
  it("returns null for unknown slug", () => {
    assert.equal(buildMolecule360("not-a-real-molecule-xyz"), null);
  });

  it("warfarin interactions tab surfaces published sourced pairwise rows", () => {
    const view = buildMolecule360("warfarin");
    assert.ok(view);
    const body = view!.tabs.interactions.body as {
      items: Array<{ otherMoleculeSlug: string; action: string | null; sources: unknown[] }>;
      empty: string | null;
    };
    assert.ok(body.items.length >= 1);
    assert.ok(
      body.items.some(
        (i) =>
          i.otherMoleculeSlug === "acetylsalicylic-acid" ||
          i.otherMoleculeSlug === "aspirin",
      ),
    );
    assert.ok(body.items.every((i) => (i.sources?.length ?? 0) > 0 || i.action));
    assert.equal(body.empty, null);
    assert.ok(view!.tabs.interactions.sources.length >= 1);
  });

  it("pregnancy tab attaches resolved sources when content is published", () => {
    const view = buildMolecule360("amoxicillin");
    assert.ok(view);
    const preg = view!.tabs.pregnancy;
    const body = preg.body as { pregnancy: string; breastfeeding: string };
    assert.ok(typeof body.pregnancy === "string" && body.pregnancy.length > 0);
    // If text is the intentional empty-state, sources may be empty; otherwise must cite.
    const emptyMarker = emptyStateMessage("this field");
    if (body.pregnancy !== emptyMarker || body.breastfeeding !== emptyMarker) {
      assert.ok(
        preg.sources.length >= 1,
        "published pregnancy/breastfeeding text must carry tab-level sources",
      );
    }
  });

  it("never renders draft dosing as invented numeric mg on published page", () => {
    const view = buildMolecule360("amoxicillin");
    assert.ok(view);
    const dosing = view!.tabs.dosing.body as {
      adult: string;
      paediatric: string;
    };
    // Published page may show honest absence placeholders — must not invent mg scaffolds.
    for (const text of [dosing.adult, dosing.paediatric]) {
      if (/\d+\s*mg/i.test(text)) {
        assert.fail(`dosing tab leaked inventable mg text: ${text.slice(0, 120)}`);
      }
    }
  });

  it("contraindications list items each carry a source when present", () => {
    const view = buildMolecule360("amoxicillin");
    assert.ok(view);
    const body = view!.tabs.contraindications.body as {
      items: Array<{ text: string; source: { id: string } | null }>;
    };
    for (const item of body.items) {
      assert.ok(item.text.trim().length > 0);
      assert.ok(item.source?.id, `missing source on: ${item.text.slice(0, 60)}`);
    }
  });
});
