import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * /docs/10 — magic hex belongs only in @materia/design-tokens.
 * Expo app screens/lib must reference tokens (colors.*), not raw #RRGGBB.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const HEX_RE = /#[0-9A-Fa-f]{3,8}\b/;
const ALLOW_RE = /eng-allow:\s*magic-hex/;

const SCAN_ROOTS = [join(root, "app/app"), join(root, "app/lib")];

function listSourceFiles(dir: string): string[] {
  const out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) {
      out.push(...listSourceFiles(full));
      continue;
    }
    if (name.endsWith(".ts") || name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

describe("Expo design tokens (no magic hex)", () => {
  it("design-tokens exports line / lineSoft border colors", () => {
    const src = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(src, /line:\s*"#CBD5E1"/);
    assert.match(src, /lineSoft:\s*"#DBE3EA"/);
  });

  it("Expo app/app and app/lib have no raw #hex (use colors.*)", () => {
    const files = SCAN_ROOTS.flatMap(listSourceFiles);
    assert.ok(files.length >= 4, `expected Expo sources, got ${files.length}`);

    const violations: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      const rel = relative(root, file).replace(/\\/g, "/");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]!;
        if (ALLOW_RE.test(line)) continue;
        if (HEX_RE.test(line)) violations.push(`${rel}:${i + 1}`);
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Magic hex in Expo UI (use @materia/design-tokens):\n${violations.join("\n")}`,
    );
  });

  it("Expo root layout uses colors.mist / colors.ink", () => {
    const src = readFileSync(join(root, "app/app/_layout.tsx"), "utf8");
    assert.match(src, /colors\.mist/);
    assert.match(src, /colors\.ink/);
    assert.match(src, /@materia\/design-tokens/);
  });

  it("Expo stack titles + home/auth and molecule/dosing nav links", () => {
    const layout = readFileSync(join(root, "app/app/_layout.tsx"), "utf8");
    assert.match(layout, /Stack\.Screen name="index"/);
    assert.match(layout, /Stack\.Screen name="auth"/);
    assert.match(layout, /Stack\.Screen name="molecule\/\[slug\]"/);
    assert.match(layout, /Stack\.Screen name="dosing\/\[slug\]"/);

    const home = readFileSync(join(root, "app/app/index.tsx"), "utf8");
    assert.match(home, /href="\/auth"/);

    const mol = readFileSync(join(root, "app/app/molecule/[slug].tsx"), "utf8");
    assert.match(mol, /href=\{`\/dosing\/\$\{/);
  });

  it("Expo UI uses radius tokens (no magic borderRadius 8/12/999)", () => {
    const tokens = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(tokens, /pill:\s*999/);

    const theme = readFileSync(join(root, "app/lib/theme.ts"), "utf8");
    assert.match(theme, /radius/);

    const files = SCAN_ROOTS.flatMap(listSourceFiles);
    const MAGIC_RADIUS = /borderRadius:\s*(8|12|999)\b/;
    const violations: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      const rel = relative(root, file).replace(/\\/g, "/");
      for (let i = 0; i < lines.length; i++) {
        if (MAGIC_RADIUS.test(lines[i]!)) violations.push(`${rel}:${i + 1}`);
      }
    }
    assert.deepEqual(
      violations,
      [],
      `Use radius.md/lg/pill instead of magic borderRadius:\n${violations.join("\n")}`,
    );
  });

  it("Expo inputs use colors.line borders; chip text uses typography.size.sm", () => {
    for (const rel of [
      "app/app/auth.tsx",
      "app/app/molecule/[slug].tsx",
      "app/app/dosing/[slug].tsx",
    ]) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /borderColor:\s*(theme\.)?colors\.line/, `${rel} input border`);
      assert.doesNotMatch(
        src,
        /borderColor:\s*(theme\.)?colors\.slate/,
        `${rel} must not use slate for borders`,
      );
    }

    const home = readFileSync(join(root, "app/app/index.tsx"), "utf8");
    assert.match(home, /fontSize:\s*typography\.size\.sm/);
    assert.doesNotMatch(home, /fontSize:\s*13\b/, "home must not use magic fontSize 13");
  });

  it("Expo UI uses space.chipX/chipY instead of magic padding 6/12", () => {
    const tokens = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(tokens, /chipY:\s*6/);
    assert.match(tokens, /chipX:\s*12/);

    const files = SCAN_ROOTS.flatMap(listSourceFiles);
    const MAGIC_PAD = /padding(Horizontal|Vertical):\s*(6|12)\b/;
    const violations: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      const rel = relative(root, file).replace(/\\/g, "/");
      for (let i = 0; i < lines.length; i++) {
        if (MAGIC_PAD.test(lines[i]!)) violations.push(`${rel}:${i + 1}`);
      }
    }
    assert.deepEqual(
      violations,
      [],
      `Use space.chipX/chipY instead of magic padding 6/12:\n${violations.join("\n")}`,
    );

    const home = readFileSync(join(root, "app/app/index.tsx"), "utf8");
    assert.match(home, /space\.chipX/);
    assert.match(home, /space\.chipY/);
  });

  it("Expo UI uses typography.lineHeightPx instead of magic lineHeight 20/22", () => {
    const tokens = readFileSync(join(root, "packages/design-tokens/src/index.ts"), "utf8");
    assert.match(tokens, /lineHeightPx:\s*\{[\s\S]*?sm:\s*20/);
    assert.match(tokens, /lineHeightPx:\s*\{[\s\S]*?md:\s*22/);

    const files = SCAN_ROOTS.flatMap(listSourceFiles);
    const MAGIC_LH = /lineHeight:\s*(20|22)\b/;
    const violations: string[] = [];
    for (const file of files) {
      const lines = readFileSync(file, "utf8").split(/\r?\n/);
      const rel = relative(root, file).replace(/\\/g, "/");
      for (let i = 0; i < lines.length; i++) {
        if (MAGIC_LH.test(lines[i]!)) violations.push(`${rel}:${i + 1}`);
      }
    }
    assert.deepEqual(
      violations,
      [],
      `Use typography.lineHeightPx instead of magic lineHeight 20/22:\n${violations.join("\n")}`,
    );

    for (const rel of [
      "app/lib/MoleculeTabBody.tsx",
      "app/app/molecule/[slug].tsx",
      "app/app/dosing/[slug].tsx",
    ]) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.match(src, /lineHeightPx/, `${rel} should use lineHeightPx`);
    }
  });
});
