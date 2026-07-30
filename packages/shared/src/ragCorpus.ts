/**
 * Build RAG corpora from curated tables (docs/17).
 * Interactions + STG extracts only when published + sourced; never invent clinical values.
 */

import type { Interaction, PublishState, Source, SourcedFact } from "./types.js";
import type { RetrievableChunk } from "./grounding.js";
import { renderableFact } from "./publish.js";
import { licenseClassForSourceId, isIndexableLicense } from "./ragLicense.js";

/** Founder-approved DoH STG/EML extract — educational paraphrase or pointer, not a dose invent. */
export interface StgExtract {
  id: string;
  moleculeId: string;
  moleculeSlug: string;
  edition: string;
  /** Owned educational text or public-guideline pointer — never SAMF/MIMS copy. */
  text: string;
  sourceId: string;
  publishState: PublishState;
  lastReviewed: string;
  reviewerCredential?: string;
  /** Optional topic tag for fieldPath (e.g. dosing-pointer, essential-list). */
  topic?: string;
}

function pushSourced(
  chunks: RetrievableChunk[],
  fieldPath: string,
  fact: SourcedFact<string> | undefined,
  sourceById: (id: string) => Source | undefined,
) {
  if (!fact) return;
  const rendered = renderableFact(fact);
  if (!rendered) return;
  const source = sourceById(rendered.sourceId);
  if (!source) return;
  const license = licenseClassForSourceId(source.id);
  if (!license || !isIndexableLicense(license)) return;
  chunks.push({
    fieldPath,
    text: String(rendered.value),
    fact: rendered,
    source,
  });
}

/**
 * Published pairwise interactions involving moleculeId → mechanism + action chunks.
 * Empty result is fine (empty ≠ invent a clash).
 */
export function chunksFromPublishedInteractions(
  moleculeId: string,
  interactions: Interaction[],
  sourceById: (id: string) => Source | undefined,
  nameById?: (id: string) => string | undefined,
): RetrievableChunk[] {
  const chunks: RetrievableChunk[] = [];
  for (const ix of interactions) {
    if (ix.publishState !== "published") continue;
    if (ix.moleculeAId !== moleculeId && ix.moleculeBId !== moleculeId) continue;

    const aName = nameById?.(ix.moleculeAId) ?? ix.moleculeAId;
    const bName = nameById?.(ix.moleculeBId) ?? ix.moleculeBId;
    const pair = `${aName} ↔ ${bName} (${ix.severity})`;

    if (ix.mechanism) {
      const withPair: SourcedFact<string> = {
        ...ix.mechanism,
        value: `${pair}: ${ix.mechanism.value}`,
      };
      pushSourced(chunks, `interaction.${ix.id}.mechanism`, withPair, sourceById);
    }
    if (ix.action) {
      const withPair: SourcedFact<string> = {
        ...ix.action,
        value: `${pair}: ${ix.action.value}`,
      };
      pushSourced(chunks, `interaction.${ix.id}.action`, withPair, sourceById);
    }
  }
  return chunks;
}

/**
 * Index founder-approved STG/EML extracts for a molecule (published + src-doh-stg only).
 * Draft extracts never retrieve. Does not invent doses — text must already be reviewed.
 */
export function chunksFromStgExtracts(
  moleculeId: string,
  extracts: StgExtract[],
  sourceById: (id: string) => Source | undefined,
): RetrievableChunk[] {
  const chunks: RetrievableChunk[] = [];
  for (const ex of extracts) {
    if (ex.moleculeId !== moleculeId) continue;
    if (ex.publishState !== "published") continue;
    if (ex.sourceId !== "src-doh-stg") continue;

    const source = sourceById(ex.sourceId);
    if (!source) continue;
    const license = licenseClassForSourceId(source.id);
    if (!license || !isIndexableLicense(license)) continue;

    const topic = ex.topic ?? "extract";
    const fact: SourcedFact<string> = {
      value: `[STG/EML ${ex.edition}] ${ex.text}`,
      sourceId: ex.sourceId,
      publishState: "published",
      lastReviewed: ex.lastReviewed,
    };
    const rendered = renderableFact(fact);
    if (!rendered) continue;

    chunks.push({
      fieldPath: `stg.${ex.id}.${topic}`,
      text: String(rendered.value),
      fact: rendered,
      source,
    });
  }
  return chunks;
}
