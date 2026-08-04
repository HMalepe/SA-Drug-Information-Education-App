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

  it("defines radius scale vars and avoids magic 8/12/999px radii outside :root", () => {
    const css = readFileSync(join(root, "web/src/app/globals.css"), "utf8");
    assert.match(css, /--radius-sm:\s*4px/);
    assert.match(css, /--radius-md:\s*8px/);
    assert.match(css, /--radius-lg:\s*12px/);
    assert.match(css, /--radius-pill:\s*999px/);
    assert.match(css, /--radius:\s*var\(--radius-md\)/);

    const tokens = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(tokens, /sm:\s*4/);
    assert.match(tokens, /md:\s*8/);
    assert.match(tokens, /lg:\s*12/);
    assert.match(tokens, /pill:\s*999/);

    const withoutRoot = css.replace(/:root\s*\{[\s\S]*?\n\}/, "");
    assert.doesNotMatch(withoutRoot, /border-radius:\s*(8|12|999)px/);
  });

  it("defines space scale vars aligned with design-tokens (incl. chipX/chipY)", () => {
    const css = readFileSync(join(root, "web/src/app/globals.css"), "utf8");
    assert.match(css, /--space-xs:\s*4px/);
    assert.match(css, /--space-chip-y:\s*6px/);
    assert.match(css, /--space-sm:\s*8px/);
    assert.match(css, /--space-chip-x:\s*12px/);
    assert.match(css, /--space-md:\s*16px/);
    assert.match(css, /--space-lg:\s*24px/);
    assert.match(css, /--space-xl:\s*32px/);
    assert.match(css, /--space-xxl:\s*48px/);

    const tokens = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(tokens, /chipY:\s*6/);
    assert.match(tokens, /chipX:\s*12/);

    const withoutRoot = css.replace(/:root\s*\{[\s\S]*?\n\}/, "");
    // Core scale values must come from vars — not bare 8/12/16/24px spacing props
    assert.doesNotMatch(withoutRoot, /(?:padding|margin|gap|column-gap):\s*(?:8|12|16|24)px\b/);
    assert.doesNotMatch(withoutRoot, /(?:padding|margin|gap):\s*\d+px\s+(?:8|12|16|24)px\b/);
    assert.match(withoutRoot, /var\(--space-chip-x\)/);
    assert.match(withoutRoot, /var\(--space-chip-y\)/);
    assert.match(withoutRoot, /var\(--space-md\)/);
  });
});
