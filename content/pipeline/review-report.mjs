/**
 * Print clinical coverage from seed files (founder deepen progress).
 * Usage: npm run review:report
 */
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { summarizeCoverage } from "@materia/shared";

const seedDir = join(dirname(fileURLToPath(import.meta.url)), "../seed");
const files = readdirSync(seedDir).filter((f) => f.endsWith(".json"));
const docs = files.map((f) => JSON.parse(readFileSync(join(seedDir, f), "utf8")));

const molecules = docs.flatMap((d) => d.molecules ?? []);
const safetyProfiles = docs.flatMap((d) => d.safetyProfiles ?? []);
const summary = summarizeCoverage({ molecules, safetyProfiles });

console.log(
  JSON.stringify(
    {
      files: files.length,
      totals: summary.totals,
      areas: summary.areas,
      note: summary.note,
    },
    null,
    2,
  ),
);
