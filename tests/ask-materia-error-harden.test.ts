import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Web AskMateria + api client error harden", () => {
  it("AskMateria uses busy gate, !res.ok handling, and formatApiError", () => {
    const src = readFileSync(join(root, "web/src/components/AskMateria.tsx"), "utf8");
    assert.match(src, /setAsking/);
    assert.match(src, /formatApiError/);
    assert.match(src, /messageFromHttpErrorBody/);
    assert.match(src, /!res\.ok/);
    assert.match(src, /catch\s*\(/);
    assert.match(src, /role="alert"/);
    assert.doesNotMatch(src, /setStatus\(data\.status\)/);
  });

  it("web apiGet/apiPost use messageFromHttpErrorBody on !res.ok", () => {
    const src = readFileSync(join(root, "web/src/lib/api.ts"), "utf8");
    assert.match(src, /messageFromHttpErrorBody/);
    assert.match(src, /export async function apiGet/);
    assert.match(src, /export async function apiPost/);
    assert.doesNotMatch(src, /throw new Error\(`API \$\{path\} failed: \$\{res\.status\}`\)/);
  });
});
