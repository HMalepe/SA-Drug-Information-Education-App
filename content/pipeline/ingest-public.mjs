/**
 * Preview SAHPRA / SEP fixture ingest (Doc 16).
 * Outputs draft validation report — never mutates published seed.
 *
 * Usage: node content/pipeline/ingest-public.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  sahpraFromCsv,
  sepFromCsv,
  validateSahpraRows,
  validateSepRows,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sahpraText = readFileSync(join(root, "ingest/fixtures/sahpra-sample.csv"), "utf8");
const sepText = readFileSync(join(root, "ingest/fixtures/sep-sample.csv"), "utf8");

const sahpra = validateSahpraRows(sahpraFromCsv(sahpraText));
const sep = validateSepRows(sepFromCsv(sepText));

console.log(JSON.stringify({ sahpra, sep }, null, 2));
if (sahpra.rejected > 0 || sep.rejected > 0) {
  console.error("Ingest preview has rejected rows — fix fixtures.");
  process.exit(1);
}
console.error("Ingest preview OK (draft-only). No seed mutation.");
