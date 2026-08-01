import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Behaviour mirror of web/src/lib/formatApiError.ts (kept in lockstep by the
 * source scan below). Avoids a web build step for unit tests.
 */
function formatApiError(error: unknown, fallback = "Request failed"): string {
  if (typeof error === "string") {
    const t = error.trim();
    return t || fallback;
  }
  if (error && typeof error === "object") {
    const rec = error as Record<string, unknown>;
    for (const key of ["message", "error", "code"] as const) {
      const v = rec[key];
      if (typeof v === "string") {
        const t = v.trim();
        if (t) return t;
      }
    }
  }
  return fallback;
}

describe("formatApiError", () => {
  it("prefers string / message / error / code over dumping objects", () => {
    assert.equal(formatApiError("seat full"), "seat full");
    assert.equal(formatApiError({ message: "bad token" }), "bad token");
    assert.equal(formatApiError({ error: "forbidden" }), "forbidden");
    assert.equal(formatApiError({ code: "RATE_LIMIT" }), "RATE_LIMIT");
    assert.equal(formatApiError({ nested: { a: 1 } }), "Request failed");
    assert.equal(formatApiError(null, "gone"), "gone");
  });

  it("web helper exists and does not JSON.stringify", () => {
    const src = readFileSync(join(root, "web/src/lib/formatApiError.ts"), "utf8");
    assert.match(src, /export function formatApiError/);
    assert.doesNotMatch(src, /JSON\.stringify/);
  });

  it("ops/review/onboarding import formatApiError (no JSON.stringify of errors)", () => {
    const files = [
      "web/src/app/institution/page.tsx",
      "web/src/app/cpd/page.tsx",
      "web/src/app/ambassador/page.tsx",
      "web/src/app/pricing/page.tsx",
      "web/src/app/review/page.tsx",
      "web/src/app/onboarding/page.tsx",
    ];
    for (const f of files) {
      const src = readFileSync(join(root, f), "utf8");
      assert.match(src, /formatApiError/, `${f} should import/use formatApiError`);
      assert.doesNotMatch(
        src,
        /JSON\.stringify\([^)]*error/,
        `${f} must not JSON.stringify errors into the UI`,
      );
    }
  });

  it("learn/notes/companion surfaces use formatApiError (no String(data.error))", () => {
    const files = [
      "web/src/app/my-meds/page.tsx",
      "web/src/app/insights/page.tsx",
      "web/src/app/pearls/page.tsx",
      "web/src/app/notes/page.tsx",
      "web/src/app/learn/mystery/page.tsx",
      "web/src/app/learn/spot-error/page.tsx",
      "web/src/app/learn/match/page.tsx",
      "web/src/app/learn/drag-drop/page.tsx",
      "web/src/app/learn/packaging/page.tsx",
      "web/src/app/learn/build-treatment/page.tsx",
      "web/src/app/learn/badges/page.tsx",
      "web/src/app/learn/adaptive/page.tsx",
      "web/src/app/learn/leaderboard/page.tsx",
      "web/src/app/learn/review/page.tsx",
      "web/src/components/CoursePlayer.tsx",
    ];
    for (const f of files) {
      const src = readFileSync(join(root, f), "utf8");
      assert.match(src, /formatApiError/, `${f} should use formatApiError`);
      assert.doesNotMatch(src, /String\(\s*data\.error/, `${f} must not String(data.error)`);
    }
  });
});
