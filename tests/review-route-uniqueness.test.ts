import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * Express first-match-wins: a second app.get/post for the same path silently
 * shadows the first. That is especially dangerous on founder review/publish
 * routes (decide, publish-stg-batch, decisions journal). Guard via static scan.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const apiIndex = join(root, "api/src/index.ts");
const ROUTE_RE = /app\.(get|post|put|delete|patch)\("([^"]+)"/g;

describe("API route uniqueness (api/src/index.ts)", () => {
  it("registers each method+path at most once", () => {
    const src = readFileSync(apiIndex, "utf8");
    const counts = new Map<string, number>();
    for (const m of src.matchAll(ROUTE_RE)) {
      const key = `${m[1]} ${m[2]}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    assert.ok(counts.size > 20, "expected a non-trivial route set");
    const dupes = [...counts.entries()].filter(([, n]) => n > 1);
    assert.deepEqual(
      dupes,
      [],
      `Duplicate Express routes shadow earlier handlers: ${JSON.stringify(dupes)}`,
    );
  });

  it("keeps a single GET /review/decisions (persisted journal)", () => {
    const src = readFileSync(apiIndex, "utf8");
    const hits = [...src.matchAll(/app\.get\("\/review\/decisions"/g)];
    assert.equal(hits.length, 1);
    assert.match(src, /parseReviewDecisionsJsonl|listRecentReviewDecisions/);
  });
});
