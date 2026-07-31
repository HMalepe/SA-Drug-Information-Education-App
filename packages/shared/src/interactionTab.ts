import { renderableFact } from "./publish.js";
import type { Interaction, InteractionSeverity, Molecule, PublishState, Source } from "./types.js";

export interface InteractionTabItem {
  id: string;
  otherMoleculeId: string;
  otherMoleculeSlug: string;
  otherMoleculeName: string;
  severity: InteractionSeverity;
  mechanism: string | null;
  action: string | null;
  sources: Source[];
}

export interface InteractionTabBody {
  items: InteractionTabItem[];
  empty: string | null;
  note: string;
}

/**
 * Build the Drug Interactions tab from published pairwise Interaction rows only.
 * Never invents severity/mechanism/action — skips unpublished or unsourced facts.
 */
export function buildInteractionTabBody(input: {
  moleculeId: string;
  interactions: Interaction[];
  molecules: Array<Pick<Molecule, "id" | "slug" | "innName" | "publishState">>;
  getSource: (sourceId: string) => Source | undefined;
}): InteractionTabBody {
  const molById = new Map(
    input.molecules
      .filter((m) => m.publishState === "published")
      .map((m) => [m.id, m] as const),
  );

  const items: InteractionTabItem[] = [];
  const sourceBag = new Map<string, Source>();

  for (const ix of input.interactions) {
    if (ix.publishState !== "published") continue;
    if (ix.moleculeAId !== input.moleculeId && ix.moleculeBId !== input.moleculeId) continue;

    const otherId =
      ix.moleculeAId === input.moleculeId ? ix.moleculeBId : ix.moleculeAId;
    const other = molById.get(otherId);
    if (!other) continue;

    const mechanismFact = ix.mechanism ? renderableFact(ix.mechanism) : null;
    const actionFact = ix.action ? renderableFact(ix.action) : null;
    const rowSources: Source[] = [];
    for (const fact of [mechanismFact, actionFact]) {
      if (!fact) continue;
      const src = input.getSource(fact.sourceId);
      if (src) {
        rowSources.push(src);
        sourceBag.set(src.id, src);
      }
    }

    // Require at least one renderable sourced field — never show severity alone without text.
    if (!mechanismFact && !actionFact) continue;

    items.push({
      id: ix.id,
      otherMoleculeId: other.id,
      otherMoleculeSlug: other.slug,
      otherMoleculeName: other.innName,
      severity: ix.severity,
      mechanism: mechanismFact ? String(mechanismFact.value) : null,
      action: actionFact ? String(actionFact.value) : null,
      sources: rowSources,
    });
  }

  items.sort((a, b) => a.otherMoleculeName.localeCompare(b.otherMoleculeName));

  return {
    items,
    empty:
      items.length === 0
        ? "No published pairwise interactions for this molecule yet."
        : null,
    note:
      "Published educational interaction flags only — confirm clinically; Materia does not invent dose changes.",
  };
}

export function collectInteractionTabSources(body: InteractionTabBody): Source[] {
  const map = new Map<string, Source>();
  for (const item of body.items) {
    for (const s of item.sources) map.set(s.id, s);
  }
  return [...map.values()];
}

/** Narrow publish-state type helper for callers assembling molecule lists. */
export type PublishedMoleculeRef = {
  id: string;
  slug: string;
  innName: string;
  publishState: PublishState;
};
