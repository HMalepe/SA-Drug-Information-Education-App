import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

/**
 * Durable guard: raw API JSON must not be dumped into UI state or <pre> blocks.
 * Complements per-page formatter tests (ops-pages / tools / review) with a tree walk
 * so a new page cannot reintroduce the anti-pattern without failing CI.
 *
 * Exempt a line with: // eng-allow: raw-json-dump
 */
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_ROOTS = [
  join(root, "web/src/app"),
  join(root, "web/src/components"),
  join(root, "app/app"),
  join(root, "app/lib"),
];

const SETTER_DUMP_RE = /\bset[A-Za-z0-9_]+\(\s*JSON\.stringify/;
const PRE_DUMP_RE = /<pre[^>]*>\s*\{?\s*JSON\.stringify/;
const ALLOW_RE = /eng-allow:\s*raw-json-dump/;

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

function offendingLines(src: string, re: RegExp): number[] {
  const lines = src.split(/\r?\n/);
  const hits: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    if (ALLOW_RE.test(line)) continue;
    if (re.test(line)) hits.push(i + 1);
  }
  return hits;
}

describe("Generic guard: no raw JSON dumps in web/app UI trees", () => {
  it("scans known trees and finds no setX(JSON.stringify) or <pre> JSON dumps", () => {
    const files = SCAN_ROOTS.flatMap(listSourceFiles);
    assert.ok(files.length > 40, `expected a non-trivial scan set, got ${files.length}`);

    const violations: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      const rel = relative(root, file).replace(/\\/g, "/");
      for (const line of offendingLines(src, SETTER_DUMP_RE)) {
        violations.push(`${rel}:${line} set*(JSON.stringify)`);
      }
      for (const line of offendingLines(src, PRE_DUMP_RE)) {
        violations.push(`${rel}:${line} <pre> JSON.stringify`);
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Raw JSON UI dumps found (add "// eng-allow: raw-json-dump" only if justified):\n${violations.join("\n")}`,
    );
  });
});
