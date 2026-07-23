import type { Interaction, InteractionSeverity, PublishState } from "./types.js";
import { isRenderablePublishState } from "./publish.js";

export interface RegimenItem {
  moleculeId: string;
  moleculeName: string;
  productId?: string;
  brandName?: string;
  /** Reminder times as HH:mm — support feature only, not dosing advice */
  reminderTimes: string[];
  /** User-authored ISO date (YYYY-MM-DD) — never invented from clinical data */
  refillDueOn?: string;
  /** User-authored last-filled date for calendar arithmetic with packDaysUser */
  lastFilledOn?: string;
  /** User-entered pack length in days — never sourced from labels as clinical fact */
  packDaysUser?: number;
}

export interface ClashFlag {
  moleculeAId: string;
  moleculeBId: string;
  moleculeAName: string;
  moleculeBName: string;
  severity: InteractionSeverity;
  action?: string;
  publishState: PublishState;
}

/**
 * Full-list interaction check — only published Interaction rows.
 * Never invents clashes. Empty list ≠ "safe"; it means "none published yet".
 */
export function checkRegimenInteractions(
  regimenMoleculeIds: string[],
  interactions: Interaction[],
  nameById: Map<string, string>,
): { clashes: ClashFlag[]; note: string } {
  const set = new Set(regimenMoleculeIds);
  const clashes: ClashFlag[] = [];

  for (const ix of interactions) {
    if (!isRenderablePublishState(ix.publishState)) continue;
    if (!set.has(ix.moleculeAId) || !set.has(ix.moleculeBId)) continue;
    const action = ix.action?.publishState === "published" ? ix.action.value : undefined;
    clashes.push({
      moleculeAId: ix.moleculeAId,
      moleculeBId: ix.moleculeBId,
      moleculeAName: nameById.get(ix.moleculeAId) ?? ix.moleculeAId,
      moleculeBName: nameById.get(ix.moleculeBId) ?? ix.moleculeBId,
      severity: ix.severity,
      action,
      publishState: ix.publishState,
    });
  }

  return {
    clashes,
    note:
      clashes.length === 0
        ? "No published interactions found for this list. That is not a guarantee of safety — verify clinically."
        : "Published interactions only. Confirm clinically before acting.",
  };
}
