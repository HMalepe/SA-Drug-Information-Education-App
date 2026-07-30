#!/usr/bin/env node
/**
 * Validate MATERIA_IN_REGION_* env for deploy (docs/17, POPIA).
 * Never prints auth tokens. Exit 0 when blank (local default) or valid in-region URLs.
 * Exit 1 when URLs point offshore / fail allowlist.
 *
 * Usage: npm run rag:check-env
 */
import {
  IN_REGION_AUTH_TOKEN_ENV,
  describeInRegionRagEnv,
} from "@materia/shared";

const status = describeInRegionRagEnv(process.env);

// Redundant guard — describe never includes the token, but refuse if someone logs env blindly later.
if (process.env[IN_REGION_AUTH_TOKEN_ENV] && JSON.stringify(status).includes(process.env[IN_REGION_AUTH_TOKEN_ENV])) {
  console.error("Refusing to print status that might contain auth token.");
  process.exit(2);
}

console.log(JSON.stringify(status, null, 2));

if (!status.ok) {
  console.error("\nRAG env check FAILED — fix MATERIA_IN_REGION_* before deploy.");
  process.exit(1);
}

if (!status.embedderConfigured && !status.llmConfigured) {
  console.error("\nOK — using local bag-of-words + template composer (offline default).");
} else {
  console.error(
    `\nOK — hosted mode: embedder=${status.mode.embedder} composer=${status.mode.composer}` +
      (status.embedderHost ? ` embedderHost=${status.embedderHost}` : "") +
      (status.llmHost ? ` llmHost=${status.llmHost}` : ""),
  );
}

process.exit(0);
