import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * Guard: web + Expo app must stay in the typecheck net.
 * SourceTag drift in app/ shipped silently when CI only checked workspaces.
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("CI typecheck coverage", () => {
  it("root typecheck includes @materia/web", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as {
      scripts: Record<string, string>;
    };
    assert.match(pkg.scripts.typecheck ?? "", /@materia\/web/);
    assert.match(pkg.scripts["typecheck:app"] ?? "", /prefix app/);
  });

  it("CI workflow typechecks Expo app/", () => {
    const yml = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8");
    assert.match(yml, /typecheck:app|npm run typecheck --prefix app/);
    assert.match(yml, /npm install --prefix app/);
  });

  it("Expo app has a single SourceTag export used by consumers", () => {
    const api = readFileSync(join(root, "app/lib/api.ts"), "utf8");
    assert.match(api, /export type SourceTag/);
    assert.match(api, /sources: SourceTag\[\]/);
    for (const rel of [
      "app/app/molecule/[slug].tsx",
      "app/app/dosing/[slug].tsx",
      "app/lib/MoleculeTabBody.tsx",
    ]) {
      const src = readFileSync(join(root, rel), "utf8");
      assert.doesNotMatch(src, /type SourceTag =/);
      assert.match(src, /SourceTag/);
    }
  });
});
