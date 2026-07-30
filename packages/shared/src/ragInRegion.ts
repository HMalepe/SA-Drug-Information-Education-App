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
