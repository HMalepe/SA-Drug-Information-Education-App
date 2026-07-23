/**
 * Product analytics starter set (Doc 20) — measure to decide, POPIA-minimised.
 * Never store free-text clinical questions, phone numbers, or regimen contents.
 */

export const ANALYTICS_EVENTS = [
  "search_performed",
  "molecule_viewed",
  "tab_opened",
  "lesson_started",
  "lesson_completed",
  "quiz_answered",
  "tool_used",
  "gated_feature_hit",
  "pricing_viewed",
  "subscription_started",
  "referral_sent",
  "referral_converted",
  "reminder_dispatched",
  "error_client",
] as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsProps = Record<string, string | number | boolean | undefined>;

export interface AnalyticsEvent {
  id: string;
  name: AnalyticsEventName;
  props: AnalyticsProps;
  /** Opaque session bucket — not a medical record id */
  sessionId?: string;
  /** Tier label only — never email/phone */
  tier?: string;
  mode?: string;
  at: string;
}

export interface AnalyticsSummary {
  totalEvents: number;
  byName: Record<string, number>;
  topMolecules: Array<{ slug: string; views: number }>;
  topTools: Array<{ tool: string; uses: number }>;
  gatedHits: number;
  searchCount: number;
  note: string;
}

const ALLOWED = new Set<string>(ANALYTICS_EVENTS);

/** Props keys that may be retained after sanitisation. */
const SAFE_PROP_KEYS = new Set([
  "moleculeSlug",
  "tabId",
  "tool",
  "feature",
  "tier",
  "hitCount",
  "correct",
  "courseId",
  "lessonId",
  "channel",
  "provider",
  "code",
  "hasResults",
  "queryLen",
]);

const FORBIDDEN_PROP_KEYS = /^(email|phone|name|dose|question|answer|regimen|idNumber|saId)/i;

export function isAnalyticsEventName(name: string): name is AnalyticsEventName {
  return ALLOWED.has(name);
}

export function sanitizeAnalyticsProps(raw: AnalyticsProps | undefined): AnalyticsProps {
  if (!raw) return {};
  const out: AnalyticsProps = {};
  for (const [key, value] of Object.entries(raw)) {
    if (FORBIDDEN_PROP_KEYS.test(key)) continue;
    if (!SAFE_PROP_KEYS.has(key)) continue;
    if (value === undefined) continue;
    if (typeof value === "string") {
      // Cap length; never keep free-text clinical content
      out[key] = value.slice(0, 64);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function buildAnalyticsEvent(input: {
  name: string;
  props?: AnalyticsProps;
  sessionId?: string;
  tier?: string;
  mode?: string;
  id?: string;
  at?: string;
}): { ok: true; event: AnalyticsEvent } | { ok: false; reason: string } {
  if (!isAnalyticsEventName(input.name)) {
    return { ok: false, reason: `Unknown event: ${input.name}` };
  }
  return {
    ok: true,
    event: {
      id: input.id ?? `evt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      name: input.name,
      props: sanitizeAnalyticsProps(input.props),
      sessionId: input.sessionId?.slice(0, 64),
      tier: input.tier?.slice(0, 32),
      mode: input.mode?.slice(0, 32),
      at: input.at ?? new Date().toISOString(),
    },
  };
}

export function summarizeAnalytics(events: AnalyticsEvent[]): AnalyticsSummary {
  const byName: Record<string, number> = {};
  const molViews = new Map<string, number>();
  const toolUses = new Map<string, number>();
  let gatedHits = 0;
  let searchCount = 0;

  for (const e of events) {
    byName[e.name] = (byName[e.name] ?? 0) + 1;
    if (e.name === "search_performed") searchCount += 1;
    if (e.name === "gated_feature_hit") gatedHits += 1;
    if (e.name === "molecule_viewed" && typeof e.props.moleculeSlug === "string") {
      const slug = e.props.moleculeSlug;
      molViews.set(slug, (molViews.get(slug) ?? 0) + 1);
    }
    if (e.name === "tool_used" && typeof e.props.tool === "string") {
      const tool = e.props.tool;
      toolUses.set(tool, (toolUses.get(tool) ?? 0) + 1);
    }
  }

  const topMolecules = [...molViews.entries()]
    .map(([slug, views]) => ({ slug, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);
  const topTools = [...toolUses.entries()]
    .map(([tool, uses]) => ({ tool, uses }))
    .sort((a, b) => b.uses - a.uses)
    .slice(0, 10);

  return {
    totalEvents: events.length,
    byName,
    topMolecules,
    topTools,
    gatedHits,
    searchCount,
    note: "In-memory starter analytics — no health free-text. Swap to privacy-respecting warehouse later.",
  };
}
