import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("CoursePlayer error harden", () => {
  it("checks !res.ok, uses formatApiError, and busy-gates lesson/quiz actions", () => {
    const src = readFileSync(join(root, "web/src/components/CoursePlayer.tsx"), "utf8");
    assert.match(src, /formatApiError/);
    assert.match(src, /messageFromHttpErrorBody/);
    assert.match(src, /!res\.ok/);
    assert.match(src, /setBusy/);
    assert.match(src, /role="alert"/);
    assert.match(src, /disabled=\{busy\}/);
    assert.match(src, /function readJson/);
  });
});
