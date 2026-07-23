import { appendFileSync, copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  findSeedFileForMolecule,
  setFactPublishStateInSeedDoc,
  type PublishState,
  type ReviewDecision,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const seedDir = join(root, "content/seed");
const dbSeedDir = join(root, "db/seed");
const reviewDir = join(root, "content/review");
const decisionsPath = join(reviewDir, "decisions.jsonl");

function loadSeedFiles() {
  return readdirSync(seedDir)
    .filter((f) => f.endsWith(".json"))
    .map((fileName) => ({
      fileName,
      path: join(seedDir, fileName),
      doc: JSON.parse(readFileSync(join(seedDir, fileName), "utf8")) as Record<string, unknown>,
    }));
}

/**
 * Persist a founder review decision:
 * 1) append audit line to content/review/decisions.jsonl
 * 2) write publishState into the owning content/seed/*.json
 * 3) mirror to db/seed for parity
 *
 * Never invents clinical text.
 */
export function persistReviewDecision(input: {
  decision: ReviewDecision;
  moleculeId: string;
  fieldPath: string;
  publishState: PublishState;
}): { ok: true; seedFile: string } | { ok: false; reason: string } {
  mkdirSync(reviewDir, { recursive: true });
  appendFileSync(decisionsPath, `${JSON.stringify(input.decision)}\n`, "utf8");

  const files = loadSeedFiles();
  const seedFile = findSeedFileForMolecule(files, input.moleculeId);
  if (!seedFile) {
    return { ok: false, reason: `No seed file contains molecule ${input.moleculeId}` };
  }
  const entry = files.find((f) => f.fileName === seedFile)!;
  const mutated = setFactPublishStateInSeedDoc(
    entry.doc,
    input.moleculeId,
    input.fieldPath,
    input.publishState,
  );
  if (!mutated) {
    return { ok: false, reason: `Fact ${input.fieldPath} not found on ${input.moleculeId}` };
  }
  writeFileSync(entry.path, `${JSON.stringify(entry.doc, null, 2)}\n`, "utf8");
  try {
    mkdirSync(dbSeedDir, { recursive: true });
    copyFileSync(entry.path, join(dbSeedDir, seedFile));
  } catch {
    // db mirror is best-effort
  }
  return { ok: true, seedFile };
}

export function reviewPersistEnabled(): boolean {
  return process.env.REVIEW_PERSIST !== "false";
}
