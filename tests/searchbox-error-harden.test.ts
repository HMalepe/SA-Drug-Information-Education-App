import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Web SearchBox error harden", () => {
  it("uses formatApiError, !res.ok, busy gate, and alert on failure", () => {
    const src = readFileSync(join(root, "web/src/components/SearchBox.tsx"), "utf8");
    assert.match(src, /formatApiError/);
    assert.match(src, /messageFromHttpErrorBody/);
    assert.match(src, /!res\.ok/);
    assert.match(src, /setBusy/);
    assert.match(src, /role="alert"/);
    assert.match(src, /query\.trim\(\)|q\.trim\(\)/);
    assert.doesNotMatch(src, /setHits\(data\.hits\)/);
  });
});

describe("Expo dosing ↔ molecule nav", () => {
  it("dosing hub links back to Medicine 360", () => {
    const src = readFileSync(join(root, "app/app/dosing/[slug].tsx"), "utf8");
    assert.match(src, /href=\{`\/molecule\/\$\{/);
    assert.match(src, /Medicine 360/);
  });
});
