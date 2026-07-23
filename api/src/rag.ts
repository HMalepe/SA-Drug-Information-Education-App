import {
  groundedAnswerFromChunks,
  renderableFact,
  stripIdentifiers,
  type RetrievableChunk,
} from "@materia/shared";
import { db, getMoleculeBySlug, getSafety, getSource } from "./store.js";

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

  // Rate-limit friendly: no LLM call in stub — compose from chunks only (constitution 3.1).
  void db;
  return groundedAnswerFromChunks(safeQuestion, chunks);
}
