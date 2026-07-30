import {
  chunksFromInsertDocuments,
  chunksFromPublishedInteractions,
  chunksFromStgExtracts,
  getCounsellingScript,
  groundedAskFromCorpusAsync,
  INSERT_LIBRARY,
  renderableFact,
  stripIdentifiers,
  type RetrievableChunk,
  type Source,
  type SourcedFact,
  type StgExtract,
} from "@materia/shared";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getMoleculeBySlug,
  getMoleculeName,
  getSafety,
  getSource,
  listPublishedInteractionsForMolecule,
} from "./store.js";
import { getInRegionRagRuntime } from "./ragInRegionRuntime.js";

function loadStgExtracts(): StgExtract[] {
  const path = join(dirname(fileURLToPath(import.meta.url)), "../../content/rag/stg-extracts.json");
  try {
    const doc = JSON.parse(readFileSync(path, "utf8")) as { extracts?: StgExtract[] };
    return doc.extracts ?? [];
  } catch {
    return [];
  }
}

const stgExtracts = loadStgExtracts();

function pushFact(
  chunks: RetrievableChunk[],
  fieldPath: string,
  fact: { value: string; sourceId: string; publishState: string; lastReviewed: string } | undefined,
) {
  if (!fact) return;
  const rendered = renderableFact(fact as never);
  if (!rendered) return;
  const source = getSource(rendered.sourceId);
  if (!source) return;
  chunks.push({
    fieldPath,
    text: String(rendered.value),
    fact: rendered as never,
    source,
  });
}

function pushPublishedStringFact(
  chunks: RetrievableChunk[],
  fieldPath: string,
  text: string,
  source: Source,
  lastReviewed: string,
) {
  const fact: SourcedFact<string> = {
    value: text,
    sourceId: source.id,
    publishState: "published",
    lastReviewed,
  };
  chunks.push({ fieldPath, text, fact, source });
}

/**
 * Molecule Q&A — hybrid RAG over published, sourced, license-allowed chunks only.
 * Includes interactions, STG extracts, and owned insert paraphrases.
 * Optional in-region HTTP embedder/LLM via MATERIA_IN_REGION_* env (chunks-only).
 */
export async function askMolecule(moleculeSlug: string, question: string) {
  const safeQuestion = stripIdentifiers(question);
  const molecule = getMoleculeBySlug(moleculeSlug);
  if (!molecule) {
    return {
      status: "refused" as const,
      citations: [],
      refusalReason: "Molecule not found or not published.",
    };
  }

  const chunks: RetrievableChunk[] = [];
  pushFact(chunks, "chemistry", molecule.chemistrySummary);
  pushFact(chunks, "moa", molecule.moaSummary);
  pushFact(chunks, "discovery", molecule.discoveryNote);

  const safety = getSafety(molecule.id);
  if (safety) {
    pushFact(chunks, "dosing.adult", safety.dosingAdult);
    pushFact(chunks, "foodLifestyle", safety.foodLifestyle);
    pushFact(chunks, "overdose.early", safety.overdoseEarlySigns);
    pushFact(chunks, "overdose.antidote", safety.antidoteOrSupportive);
    for (const [i, w] of (safety.warnings ?? []).entries()) {
      const r = renderableFact(w);
      if (r) {
        const source = getSource(r.sourceId);
        if (source) {
          chunks.push({
            fieldPath: `warnings[${i}]`,
            text: r.value,
            fact: r,
            source,
          });
        }
      }
    }
    for (const [i, p] of (safety.clinicalPearls ?? []).entries()) {
      const r = renderableFact(p);
      if (r) {
        const source = getSource(r.sourceId);
        if (source) {
          chunks.push({
            fieldPath: `pearls[${i}]`,
            text: r.value,
            fact: r,
            source,
          });
        }
      }
    }
    for (const [i, c] of (safety.counsellingPoints ?? []).entries()) {
      const r = renderableFact(c);
      if (r) {
        const source = getSource(r.sourceId);
        if (source) {
          chunks.push({
            fieldPath: `counselling[${i}]`,
            text: r.value,
            fact: r,
            source,
          });
        }
      }
    }
  }

  const counselling = getCounsellingScript(molecule.id, "en");
  const eduSource = getSource("src-materia-edu");
  if (counselling && eduSource) {
    for (const [i, line] of counselling.lines.entries()) {
      pushPublishedStringFact(
        chunks,
        `counselling.script.en[${i}]`,
        line,
        eduSource,
        counselling.sourceNote.includes("founder") ? "2026-07-30" : "2026-07-01",
      );
    }
  }

  chunks.push(
    ...chunksFromPublishedInteractions(
      molecule.id,
      listPublishedInteractionsForMolecule(molecule.id),
      getSource,
      getMoleculeName,
    ),
  );

  chunks.push(...chunksFromStgExtracts(molecule.id, stgExtracts, getSource));

  chunks.push(...chunksFromInsertDocuments(molecule.id, INSERT_LIBRARY, getSource));

  const runtime = getInRegionRagRuntime();
  return groundedAskFromCorpusAsync(safeQuestion, chunks, {
    topK: 8,
    answerTopK: 3,
    minScore: 0.1,
    asyncEmbedder: runtime.asyncEmbedder,
    composeAsync: runtime.composeAsync,
  });
}
