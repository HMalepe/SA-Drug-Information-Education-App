import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Pro demo busy gates", () => {
  it("pearls/cpd/notes use busy state and disabled={busy}", () => {
    const files = [
      "web/src/app/pearls/page.tsx",
      "web/src/app/cpd/page.tsx",
      "web/src/app/notes/page.tsx",
    ];
    for (const rel of files) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /const \[busy, setBusy\]/, `${rel} should declare busy`);
      assert.match(src, /if \(busy\) return/, `${rel} should early-return when busy`);
      assert.match(src, /disabled=\{busy\}/, `${rel} should disable controls while busy`);
      assert.match(src, /finally \{\s*setBusy\(false\)/, `${rel} should clear busy in finally`);
    }
  });

  it("pearls loadFeed handles !res.ok beyond 402", () => {
    const src = readFileSync(join(root, "web/src/app/pearls/page.tsx"), "utf8");
    assert.match(src, /res\.status === 402/);
    assert.match(src, /!res\.ok/);
    assert.match(src, /formatApiError/);
  });
});
