import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * /review action feedback must not dump clinical queue item JSON into the status box.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const reviewPage = join(root, "web/src/app/review/page.tsx");

describe("Review page action status (no clinical JSON dump)", () => {
  it("uses formatReviewActionMsg instead of JSON.stringify for decide/publish", () => {
    const src = readFileSync(reviewPage, "utf8");
    assert.match(src, /function formatReviewActionMsg/);
    assert.match(src, /setMsg\(formatReviewActionMsg/);
    assert.doesNotMatch(src, /setMsg\(JSON\.stringify/);
  });
});
