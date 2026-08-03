import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const learnDir = join(root, "web/src/app/learn");

describe("shared createStubSession for Academy learn pages", () => {
  it("stubSession helper checks !res.ok and validates user id", () => {
    const src = readFileSync(join(root, "web/src/lib/stubSession.ts"), "utf8");
    assert.match(src, /export async function createStubSession/);
    assert.match(src, /!res\.ok/);
    assert.match(src, /formatApiError/);
    assert.match(src, /messageFromHttpErrorBody/);
    assert.match(src, /Session created without a user id/);
    assert.match(src, /subscribeTier/);
  });

  it("learn demo pages use createStubSession (no raw stub-session fetch)", () => {
    const dirs = readdirSync(learnDir, { withFileTypes: true }).filter((d) => d.isDirectory());
    const wired: string[] = [];
    for (const d of dirs) {
      const f = join(learnDir, d.name, "page.tsx");
      let src: string;
      try {
        src = readFileSync(f, "utf8");
      } catch {
        continue;
      }
      if (!src.includes("ensureStudent")) continue;
      assert.match(src, /createStubSession/, `${d.name} should use createStubSession`);
      assert.doesNotMatch(
        src,
        /fetch\(`\$\{API\}\/auth\/stub-session`/,
        `${d.name} must not raw-fetch stub-session`,
      );
      assert.match(src, /Promise<string \| null>/, `${d.name} ensureStudent returns null on fail`);
      assert.match(src, /if \(!uid\) return/, `${d.name} must guard null uid`);
      wired.push(d.name);
    }
    assert.ok(wired.length >= 10, `expected ≥10 learn pages wired, got ${wired.join(",")}`);
  });

  it("Pro demo pages + CoursePlayer use createStubSession", () => {
    const files = [
      "web/src/app/pearls/page.tsx",
      "web/src/app/cpd/page.tsx",
      "web/src/app/notes/page.tsx",
      "web/src/app/tools/page.tsx",
      "web/src/app/insights/page.tsx",
      "web/src/components/CoursePlayer.tsx",
    ];
    for (const rel of files) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /createStubSession/, `${rel} should use createStubSession`);
      assert.doesNotMatch(
        src,
        /fetch\(`\$\{API\}\/auth\/stub-session`/,
        `${rel} must not raw-fetch stub-session`,
      );
    }
  });
});
