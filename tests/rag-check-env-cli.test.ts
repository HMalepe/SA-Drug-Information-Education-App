import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cli = join(root, "content/pipeline/check-in-region-env.mjs");

function run(envExtra: Record<string, string | undefined> = {}) {
  const env = { ...process.env, ...envExtra };
  // Ensure blank defaults for these keys unless overridden
  for (const k of [
    "MATERIA_IN_REGION_EMBEDDER_URL",
    "MATERIA_IN_REGION_LLM_URL",
    "MATERIA_IN_REGION_ALLOW_HOSTS",
    "MATERIA_IN_REGION_AUTH_TOKEN",
  ]) {
    if (!(k in envExtra)) delete env[k];
  }
  return spawnSync(process.execPath, [cli], { cwd: root, encoding: "utf8", env });
}

describe("rag:check-env CLI", () => {
  it("passes with blank env (local default)", () => {
    const r = run({});
    assert.equal(r.status, 0, r.stderr);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.ok, true);
    assert.equal(doc.mode.embedder, "local-bow");
    assert.equal(doc.mode.composer, "template");
  });

  it("fails on offshore LLM URL", () => {
    const r = run({ MATERIA_IN_REGION_LLM_URL: "https://api.openai.com/v1/chat" });
    assert.equal(r.status, 1);
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.ok, false);
    assert.match(doc.errors[0] ?? "", /offshore|openai/i);
  });

  it("passes for .za hosts and never prints token", () => {
    const r = run({
      MATERIA_IN_REGION_EMBEDDER_URL: "https://embed.materia.za/v1",
      MATERIA_IN_REGION_LLM_URL: "https://llm.materia.za/compose",
      MATERIA_IN_REGION_AUTH_TOKEN: "do-not-leak-this-token",
    });
    assert.equal(r.status, 0, r.stderr);
    const blob = `${r.stdout}\n${r.stderr}`;
    assert.ok(!blob.includes("do-not-leak-this-token"));
    const doc = JSON.parse(r.stdout);
    assert.equal(doc.authTokenConfigured, true);
    assert.equal(doc.embedderHost, "embed.materia.za");
  });
});
