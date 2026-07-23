import type { PublishState, SourcedFact } from "./types.js";

/** Only published clinical facts may render to end users (constitution 3.3). */
export function isRenderablePublishState(state: PublishState): boolean {
  return state === "published";
}

export function renderableFact<T>(fact: SourcedFact<T> | undefined): SourcedFact<T> | undefined {
  if (!fact) return undefined;
  if (!isRenderablePublishState(fact.publishState)) return undefined;
  if (fact.aiDrafted && fact.publishState !== "published") return undefined;
  return fact;
}

export function emptyStateMessage(tabLabel: string): string {
  return `Content for ${tabLabel} is not yet published. Empty states are intentional — Materia never invents clinical values.`;
}
