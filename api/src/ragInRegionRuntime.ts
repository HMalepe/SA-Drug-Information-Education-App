/**
 * API wiring for founder-approved in-region RAG HTTP adapters (docs/17, POPIA).
 * URLs/tokens come from env only — never hard-code secrets.
 */

import {
  createHostedInRegionEmbedder,
  createHostedInRegionLlmComposer,
  parseInRegionRagEnv,
  type AsyncEmbedder,
  type ComposeInput,
  type ComposeOutput,
  type FetchLike,
  type InRegionRagEnvConfig,
} from "@materia/shared";

export interface InRegionRagRuntime {
  config: InRegionRagEnvConfig;
  asyncEmbedder?: AsyncEmbedder;
  composeAsync?: (input: ComposeInput) => Promise<ComposeOutput>;
  mode: {
    embedder: "local-bow" | "hosted-in-region";
    composer: "template" | "hosted-in-region-llm";
  };
}

function defaultFetch(): FetchLike {
  if (typeof fetch !== "function") {
    throw new Error(
      "Global fetch unavailable — cannot call in-region RAG adapters. Use Node 18+ or unset MATERIA_IN_REGION_* URLs.",
    );
  }
  return fetch as FetchLike;
}

/**
 * Build optional hosted adapters from env.
 * Blank env → local bag-of-words + template composer (offline default).
 */
export function createInRegionRagRuntime(
  env: Record<string, string | undefined> = process.env,
  fetchImpl: FetchLike = defaultFetch(),
): InRegionRagRuntime {
  const config = parseInRegionRagEnv(env);
  let asyncEmbedder: AsyncEmbedder | undefined;
  let composeAsync: ((input: ComposeInput) => Promise<ComposeOutput>) | undefined;

  if (config.embedderUrl) {
    asyncEmbedder = createHostedInRegionEmbedder({
      endpointUrl: config.embedderUrl,
      fetchImpl,
      allowHosts: config.allowHosts,
      authToken: config.authToken,
    });
  }

  if (config.llmUrl) {
    const llm = createHostedInRegionLlmComposer({
      endpointUrl: config.llmUrl,
      fetchImpl,
      allowHosts: config.allowHosts,
      authToken: config.authToken,
      requireGroundingCheck: true,
    });
    composeAsync = (input) => llm.composeAsync(input);
  }

  return {
    config,
    asyncEmbedder,
    composeAsync,
    mode: {
      embedder: asyncEmbedder ? "hosted-in-region" : "local-bow",
      composer: composeAsync ? "hosted-in-region-llm" : "template",
    },
  };
}

/** Process-wide runtime — re-resolved on first ask; tests may call reset. */
let runtime: InRegionRagRuntime | null = null;

export function getInRegionRagRuntime(): InRegionRagRuntime {
  if (!runtime) runtime = createInRegionRagRuntime();
  return runtime;
}

export function resetInRegionRagRuntime(): void {
  runtime = null;
}

export function setInRegionRagRuntimeForTests(next: InRegionRagRuntime | null): void {
  runtime = next;
}
