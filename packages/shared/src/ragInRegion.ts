/**
 * In-region RAG adapter guards (docs/15, docs/17, POPIA s72).
 * Hosted embedder/LLM calls may only target founder-approved in-region endpoints.
 * Never silently fall through to known offshore model hosts.
 */

const OFFSHORE_HOST_PATTERNS: RegExp[] = [
  /(?:^|\.)openai\.com$/i,
  /(?:^|\.)anthropic\.com$/i,
  /(?:^|\.)googleapis\.com$/i,
  /(?:^|\.)google\.com$/i,
  /(?:^|\.)ai\.google\.dev$/i,
  /(?:^|\.)cohere\.com$/i,
  /(?:^|\.)mistral\.ai$/i,
  /(?:^|\.)together\.ai$/i,
  /(?:^|\.)groq\.com$/i,
  /(?:^|\.)fireworks\.ai$/i,
  /(?:^|\.)perplexity\.ai$/i,
  /(?:^|\.)azure\.com$/i,
  /(?:^|\.)amazonaws\.com$/i,
  /(?:^|\.)cloudflare\.com$/i,
];

function isPrivateOrLocalHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "0.0.0.0") return true;
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  return false;
}

function isZaComfortHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return h.endsWith(".za") || h === "za";
}

export function isKnownOffshoreHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return OFFSHORE_HOST_PATTERNS.some((re) => re.test(h));
}

/**
 * Throws if the URL is missing, non-HTTPS (except localhost), or targets a known offshore host.
 * Extra allowHosts may be passed for founder-approved in-region vendors (still never offshore list).
 */
export function assertInRegionEndpoint(
  endpointUrl: string,
  opts?: { allowHosts?: string[] },
): URL {
  const raw = endpointUrl.trim();
  if (!raw) {
    throw new Error(
      "In-region endpoint URL is empty. Set a founder-approved in-region URL — never send health text offshore.",
    );
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`Invalid in-region endpoint URL: ${raw}`);
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`In-region endpoint must be http(s); got ${url.protocol}`);
  }
  const host = url.hostname;
  if (isKnownOffshoreHost(host)) {
    throw new Error(
      `Refusing offshore host "${host}". Falling open to offshore models is forbidden (POPIA / docs/17).`,
    );
  }
  const allow = (opts?.allowHosts ?? []).map((h) => h.toLowerCase());
  const allowed =
    isPrivateOrLocalHost(host) ||
    isZaComfortHost(host) ||
    allow.some((a) => host === a || host.endsWith(`.${a}`));
  if (!allowed) {
    throw new Error(
      `Host "${host}" is not on the in-region allowlist (localhost / private / .za / founder allowHosts). Offshore silent fallback is forbidden.`,
    );
  }
  if (url.protocol === "http:" && !isPrivateOrLocalHost(host)) {
    throw new Error(
      `Non-local in-region endpoint must use HTTPS (got http for ${host}).`,
    );
  }
  return url;
}

export type FetchLike = (
  input: string,
  init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  },
) => Promise<{
  ok: boolean;
  status: number;
  text(): Promise<string>;
  json(): Promise<unknown>;
}>;

/** Env keys for founder-approved in-region RAG HTTP adapters (API boundary only). */
export const IN_REGION_EMBEDDER_URL_ENV = "MATERIA_IN_REGION_EMBEDDER_URL";
export const IN_REGION_LLM_URL_ENV = "MATERIA_IN_REGION_LLM_URL";
export const IN_REGION_ALLOW_HOSTS_ENV = "MATERIA_IN_REGION_ALLOW_HOSTS";
export const IN_REGION_AUTH_TOKEN_ENV = "MATERIA_IN_REGION_AUTH_TOKEN";

export interface InRegionRagEnvConfig {
  embedderUrl?: string;
  llmUrl?: string;
  allowHosts: string[];
  authToken?: string;
}

/**
 * Parse optional in-region RAG URLs from env.
 * Empty = local bag-of-words embedder + template composer (offline-safe default).
 * Non-empty URLs are validated immediately (refuse known offshore hosts).
 */
export function parseInRegionRagEnv(
  env: Record<string, string | undefined> = {},
): InRegionRagEnvConfig {
  const allowHosts = (env[IN_REGION_ALLOW_HOSTS_ENV] ?? "")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  const embedderRaw = env[IN_REGION_EMBEDDER_URL_ENV]?.trim() ?? "";
  const llmRaw = env[IN_REGION_LLM_URL_ENV]?.trim() ?? "";
  const authToken = env[IN_REGION_AUTH_TOKEN_ENV]?.trim() || undefined;

  const embedderUrl = embedderRaw
    ? assertInRegionEndpoint(embedderRaw, { allowHosts }).toString()
    : undefined;
  const llmUrl = llmRaw
    ? assertInRegionEndpoint(llmRaw, { allowHosts }).toString()
    : undefined;

  return { embedderUrl, llmUrl, allowHosts, authToken };
}

export interface InRegionRagPublicStatus {
  ok: boolean;
  mode: {
    embedder: "local-bow" | "hosted-in-region";
    composer: "template" | "hosted-in-region-llm";
  };
  embedderConfigured: boolean;
  llmConfigured: boolean;
  /** Hostname only — never full URL with credentials. */
  embedderHost: string | null;
  llmHost: string | null;
  allowHostsCount: number;
  authTokenConfigured: boolean;
  errors: string[];
  note: string;
}

/**
 * Safe deploy/health summary for in-region RAG env.
 * Never returns auth tokens or patient data.
 */
export function describeInRegionRagEnv(
  env: Record<string, string | undefined> = {},
): InRegionRagPublicStatus {
  const note =
    "Blank URLs = local bag-of-words + template composer. Hosted adapters must be founder-approved in-region hosts — never openai.com/anthropic.com (POPIA / docs/17).";
  try {
    const cfg = parseInRegionRagEnv(env);
    const embedderHost = cfg.embedderUrl ? new URL(cfg.embedderUrl).hostname : null;
    const llmHost = cfg.llmUrl ? new URL(cfg.llmUrl).hostname : null;
    return {
      ok: true,
      mode: {
        embedder: cfg.embedderUrl ? "hosted-in-region" : "local-bow",
        composer: cfg.llmUrl ? "hosted-in-region-llm" : "template",
      },
      embedderConfigured: Boolean(cfg.embedderUrl),
      llmConfigured: Boolean(cfg.llmUrl),
      embedderHost,
      llmHost,
      allowHostsCount: cfg.allowHosts.length,
      authTokenConfigured: Boolean(cfg.authToken),
      errors: [],
      note,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid in-region RAG env";
    return {
      ok: false,
      mode: { embedder: "local-bow", composer: "template" },
      embedderConfigured: Boolean(env[IN_REGION_EMBEDDER_URL_ENV]?.trim()),
      llmConfigured: Boolean(env[IN_REGION_LLM_URL_ENV]?.trim()),
      embedderHost: null,
      llmHost: null,
      allowHostsCount: (env[IN_REGION_ALLOW_HOSTS_ENV] ?? "")
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean).length,
      authTokenConfigured: Boolean(env[IN_REGION_AUTH_TOKEN_ENV]?.trim()),
      errors: [message],
      note,
    };
  }
}

/** Copy-ready founder pack for optional in-region RAG — never invents hosts or secrets. */
export interface RagProvisionPack {
  status: InRegionRagPublicStatus;
  verifyCmd: string;
  healthPath: string;
  /** Placeholder env stub only — empty values; never real tokens or invented URLs. */
  envStubLines: string[];
  steps: string[];
  note: string;
}

/**
 * Founder gate-3 helper: status + copy stub + verify command.
 * Blank env remains a valid local default; hosted URLs are founder-supplied only.
 */
export function buildRagProvisionPack(
  env: Record<string, string | undefined> = {},
): RagProvisionPack {
  const status = describeInRegionRagEnv(env);
  const hosted = status.embedderConfigured || status.llmConfigured;
  let note: string;
  if (!status.ok) {
    note =
      "Env check failed — fix MATERIA_IN_REGION_* before deploy. Offshore hosts are refused (POPIA / docs/17).";
  } else if (hosted) {
    note =
      "Hosted in-region URLs configured (hosts only in status — no secrets). Re-run verify after deploy.";
  } else {
    note =
      "Local default OK. Hosted provision is optional until you have founder-approved in-region endpoints.";
  }
  return {
    status,
    verifyCmd: "npm run rag:check-env",
    healthPath: "GET /health/rag",
    envStubLines: [
      "# Copy into .env.local — never commit secrets (POPIA / docs/17)",
      "# Blank = local bag-of-words + template (OK for offline default)",
      `${IN_REGION_EMBEDDER_URL_ENV}=`,
      `${IN_REGION_LLM_URL_ENV}=`,
      `${IN_REGION_ALLOW_HOSTS_ENV}=`,
      `${IN_REGION_AUTH_TOKEN_ENV}=`,
      "# Fill only founder-approved in-region HTTPS hosts (.za / private / allowHosts).",
      "# Never openai.com, anthropic.com, or other known offshore hosts.",
    ],
    steps: [
      "Choose founder-approved in-region embedder + LLM HTTPS endpoints (or leave blank for local default).",
      "Paste URLs into .env.local using the stub — never commit MATERIA_IN_REGION_AUTH_TOKEN.",
      "If the host is not .za / private / localhost, add it to MATERIA_IN_REGION_ALLOW_HOSTS.",
      "Run: npm run rag:check-env (must exit 0; refuses known offshore hosts).",
      "Restart API; confirm GET /health/rag shows hosted-in-region when URLs are set.",
    ],
    note,
  };
}
