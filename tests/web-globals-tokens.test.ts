import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("Web globals.css design token vars", () => {
  it("defines --white / --line / --line-soft matching Expo design tokens", () => {
    const css = readFileSync(join(root, "web/src/app/globals.css"), "utf8");
    assert.match(css, /--white:\s*#ffffff/i);
    assert.match(css, /--line:\s*#cbd5e1/i);
    assert.match(css, /--line-soft:\s*#dbe3ea/i);

    const tokens = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(tokens, /line:\s*"#CBD5E1"/);
    assert.match(tokens, /lineSoft:\s*"#DBE3EA"/);
    assert.match(tokens, /white:\s*"#FFFFFF"/);
  });

  it("does not use raw #cbd5e1 / #dbe3ea / bare #fff outside :root token defs", () => {
    const css = readFileSync(join(root, "web/src/app/globals.css"), "utf8");
    const withoutRoot = css.replace(/:root\s*\{[\s\S]*?\n\}/, "");
    assert.doesNotMatch(withoutRoot, /#cbd5e1/i);
    assert.doesNotMatch(withoutRoot, /#dbe3ea/i);
    assert.doesNotMatch(withoutRoot, /(?<![\w-])#fff(?![\w-])/i);
  });
});
