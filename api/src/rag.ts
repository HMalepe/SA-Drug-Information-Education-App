import {
  getCounsellingScript,
  groundedAskFromCorpus,
  renderableFact,
  stripIdentifiers,
  type RetrievableChunk,
  type Source,
  type SourcedFact,
} from "@materia/shared";
import { getMoleculeBySlug, getSafety, getSource } from "./store.js";

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
 * No LLM composition yet: retrieve + cite (constitution 3.1). POPIA: strip IDs first.
 */
export function askMolecule(moleculeSlug: string, question: string) {
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

  // Multilingual counselling scripts (owned authoring) — EN lines as RAG chunks.
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

  return groundedAskFromCorpus(safeQuestion, chunks, {
    topK: 8,
    answerTopK: 3,
    minScore: 0.1,
  });
}
