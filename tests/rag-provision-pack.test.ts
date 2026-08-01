import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildRagProvisionPack } from "@materia/shared";

describe("buildRagProvisionPack", () => {
  it("reports local default with empty stub and verify command", () => {
    const pack = buildRagProvisionPack({});
    assert.equal(pack.status.ok, true);
    assert.equal(pack.status.embedderConfigured, false);
    assert.equal(pack.status.llmConfigured, false);
    assert.equal(pack.verifyCmd, "npm run rag:check-env");
    assert.match(pack.healthPath, /\/health\/rag/);
    assert.ok(pack.envStubLines.some((l) => l.startsWith("MATERIA_IN_REGION_EMBEDDER_URL=")));
    assert.ok(pack.envStubLines.every((l) => !/sk-|secret|token=/i.test(l.split("=")[1] ?? "")));
    assert.ok(pack.steps.length >= 4);
    assert.match(pack.note, /local default|optional/i);
  });

  it("surfaces hosted hosts without leaking auth token", () => {
    const pack = buildRagProvisionPack({
      MATERIA_IN_REGION_EMBEDDER_URL: "https://embed.materia.za/v1",
      MATERIA_IN_REGION_LLM_URL: "https://llm.materia.za/compose",
      MATERIA_IN_REGION_AUTH_TOKEN: "super-secret-token-value",
    });
    assert.equal(pack.status.ok, true);
    assert.equal(pack.status.embedderHost, "embed.materia.za");
    assert.equal(pack.status.llmHost, "llm.materia.za");
    assert.equal(pack.status.authTokenConfigured, true);
    const dumped = JSON.stringify(pack);
    assert.doesNotMatch(dumped, /super-secret-token-value/);
    assert.match(pack.note, /hosted|configured/i);
  });

  it("fails closed on offshore URL and keeps stub empty", () => {
    const pack = buildRagProvisionPack({
      MATERIA_IN_REGION_LLM_URL: "https://api.openai.com/v1/chat",
    });
    assert.equal(pack.status.ok, false);
    assert.ok(pack.status.errors.length > 0);
    assert.match(pack.note, /failed|offshore|refused/i);
    // Stub warns against openai in comments; values after "=" must stay empty.
    for (const line of pack.envStubLines) {
      if (!line.includes("=") || line.trimStart().startsWith("#")) continue;
      const value = line.slice(line.indexOf("=") + 1);
      assert.equal(value, "");
      assert.doesNotMatch(value, /openai/i);
    }
  });
});
