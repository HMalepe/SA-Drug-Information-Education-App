import type { PublishState } from "./types.js";

type Json = Record<string, unknown>;

function isFact(obj: unknown): obj is { publishState: PublishState } {
  return Boolean(obj && typeof obj === "object" && "publishState" in obj && "sourceId" in obj);
}

/**
 * Mutate publishState on a seed document (plain JSON).
 * Never changes clinical text — founder review write-back only.
 */
export function setFactPublishStateInSeedDoc(
  doc: Json,
  moleculeId: string,
  fieldPath: string,
  publishState: PublishState,
): boolean {
  const molecules = doc.molecules;
  if (Array.isArray(molecules)) {
    const mol = molecules.find((m) => (m as Json).id === moleculeId) as Json | undefined;
    if (mol && (fieldPath === "chemistrySummary" || fieldPath === "moaSummary" || fieldPath === "discoveryNote")) {
      const fact = mol[fieldPath];
      if (!isFact(fact)) return false;
      fact.publishState = publishState;
      return true;
    }
  }

  const profiles = doc.safetyProfiles;
  if (!Array.isArray(profiles)) return false;
  const sp = profiles.find((s) => (s as Json).moleculeId === moleculeId) as Json | undefined;
  if (!sp) return false;

  const arrayMatch = fieldPath.match(
    /^(contraindications|warnings|clinicalPearls|counsellingPoints)\[(\d+)\]$/,
  );
  if (arrayMatch) {
    const key = arrayMatch[1]!;
    const idx = Number(arrayMatch[2]);
    const arr = sp[key];
    if (!Array.isArray(arr) || !isFact(arr[idx])) return false;
    (arr[idx] as { publishState: PublishState }).publishState = publishState;
    return true;
  }

  const scalar = [
    "dosingAdult",
    "dosingPaediatric",
    "dosingGeriatric",
    "renalAdjustment",
    "hepaticAdjustment",
    "foodLifestyle",
    "pregnancy",
    "breastfeeding",
    "overdoseEarlySigns",
    "overdoseSevereSigns",
    "antidoteOrSupportive",
    "emergencySteps",
  ];
  if (scalar.includes(fieldPath)) {
    const fact = sp[fieldPath];
    if (!isFact(fact)) return false;
    fact.publishState = publishState;
    return true;
  }
  return false;
}

export function findSeedFileForMolecule(
  files: Array<{ fileName: string; doc: Json }>,
  moleculeId: string,
): string | null {
  for (const f of files) {
    const molecules = f.doc.molecules;
    if (Array.isArray(molecules) && molecules.some((m) => (m as Json).id === moleculeId)) {
      return f.fileName;
    }
  }
  return null;
}
