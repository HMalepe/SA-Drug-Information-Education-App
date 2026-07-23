/**
 * Preview SAHPRA / SEP feeds (Doc 16).
 * Uses live URL when env set; otherwise fixtures. Always draft-validate.
 *
 * Usage: node content/pipeline/ingest-public.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadPublicFeed,
  sahpraFromCsv,
  sepFromCsv,
  validateSahpraRows,
  validateSepRows,
} from "@materia/shared";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sahpraFixture = readFileSync(join(root, "ingest/fixtures/sahpra-sample.csv"), "utf8");
const sepFixture = readFileSync(join(root, "ingest/fixtures/sep-sample.csv"), "utf8");

const sahpraFeed = await loadPublicFeed({
  kind: "sahpra",
  url: process.env.SAHPRA_FEED_URL,
  fixtureText: sahpraFixture,
});
const sepFeed = await loadPublicFeed({
  kind: "sep",
  url: process.env.SEP_FEED_URL,
  fixtureText: sepFixture,
});

const sahpra = validateSahpraRows(sahpraFromCsv(sahpraFeed.text));
const sep = validateSepRows(sepFromCsv(sepFeed.text));

console.log(
  JSON.stringify(
    {
      feeds: {
        sahpra: { origin: sahpraFeed.origin, note: sahpraFeed.note, url: sahpraFeed.url },
        sep: { origin: sepFeed.origin, note: sepFeed.note, url: sepFeed.url },
      },
      sahpra,
      sep,
    },
    null,
    2,
  ),
);
if (sahpra.rejected > 0 || sep.rejected > 0) {
  console.error("Ingest preview has rejected rows — fix fixtures/feed.");
  process.exit(1);
}
console.error("Ingest preview OK (draft-only). No seed mutation.");
