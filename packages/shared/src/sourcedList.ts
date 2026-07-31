import { renderableFact } from "./publish.js";
import type { Source, SourcedFact } from "./types.js";

export interface SourcedListItem {
  text: string;
  level?: string;
  source: Source;
}

/**
 * Normalize published list facts (contraindications / warnings / pearls / counselling)
 * to { text, level?, source }. Skips draft/unsourced — never invents text.
 */
export function buildSourcedListItems(
  facts: Array<SourcedFact<unknown>> | undefined,
  getSource: (sourceId: string) => Source | undefined,
): { items: SourcedListItem[]; sources: Source[] } {
  const items: SourcedListItem[] = [];
  const sourceMap = new Map<string, Source>();
  for (const f of facts ?? []) {
    const r = renderableFact(f);
    if (!r) continue;
    const source = getSource(r.sourceId);
    if (!source) continue;
    let text = "";
    let level: string | undefined;
    if (typeof r.value === "string") {
      text = r.value;
    } else if (r.value && typeof r.value === "object" && "text" in (r.value as object)) {
      const obj = r.value as { text?: unknown; level?: unknown };
      text = String(obj.text ?? "");
      if (typeof obj.level === "string") level = obj.level;
    } else {
      continue;
    }
    if (!text.trim()) continue;
    items.push({ text, level, source });
    sourceMap.set(source.id, source);
  }
  return { items, sources: [...sourceMap.values()] };
}
