import type { RegimenItem } from "./companion.js";
import { buildRefillSepPrompt } from "./pharmacyLocator.js";
import { buildSubstitutionOptions, type SubstitutionResult } from "./substitution.js";
import type { PriceRecord, Product } from "./types.js";

/**
 * Build Spec §6 — Refill dates on the personal regimen.
 * Dates are user-authored (or calendar arithmetic from user-entered pack days).
 * Materia never invents a clinical due date, dose, or days-of-supply from labels.
 */

export type RefillStatus = "unset" | "upcoming" | "due_soon" | "due_today" | "overdue";

export interface RefillRow {
  moleculeId: string;
  moleculeName: string;
  brandName?: string;
  refillDueOn: string | null;
  lastFilledOn: string | null;
  /** User-entered pack length only — never from clinical seed */
  packDaysUser: number | null;
  status: RefillStatus;
  daysUntilDue: number | null;
  statusLabel: string;
  /** Published SEP prompt when due/soon/overdue — educational only */
  sepPrompt: string | null;
}

export interface RefillBoard {
  asOf: string;
  rows: RefillRow[];
  dueCount: number;
  unsetCount: number;
  note: string;
  disclaimer: string;
}

export const REFILL_DISCLAIMER =
  "Refill dates are yours to set. Materia does not invent a clinical due date, days of supply, or dose from product labels. When a date you set is near, it can surface published SEP / bioequivalent education — confirm live DoH SEP, stock, and your script with a pharmacist.";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const parts = value.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function parseUtcDay(iso: string): number {
  const parts = iso.split("-");
  const y = Number(parts[0]);
  const m = Number(parts[1]);
  const d = Number(parts[2]);
  return Date.UTC(y, m - 1, d) / 86_400_000;
}

function formatUtcDay(dayNumber: number): string {
  const ms = dayNumber * 86_400_000;
  const dt = new Date(ms);
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const d = String(dt.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Resolve the calendar due date from user fields only.
 * Prefer explicit refillDueOn; else lastFilledOn + packDaysUser (user arithmetic).
 */
export function resolveRefillDueOn(item: Pick<RegimenItem, "refillDueOn" | "lastFilledOn" | "packDaysUser">): string | null {
  if (item.refillDueOn && isIsoDate(item.refillDueOn)) return item.refillDueOn;
  if (
    item.lastFilledOn &&
    isIsoDate(item.lastFilledOn) &&
    typeof item.packDaysUser === "number" &&
    Number.isInteger(item.packDaysUser) &&
    item.packDaysUser > 0 &&
    item.packDaysUser <= 366
  ) {
    return formatUtcDay(parseUtcDay(item.lastFilledOn) + item.packDaysUser);
  }
  return null;
}

export function classifyRefillStatus(dueOn: string | null, asOf: string): {
  status: RefillStatus;
  daysUntilDue: number | null;
  statusLabel: string;
} {
  if (!dueOn || !isIsoDate(asOf)) {
    return {
      status: "unset",
      daysUntilDue: null,
      statusLabel: "No refill date set — add one you got from your script or pharmacy.",
    };
  }
  const delta = parseUtcDay(dueOn) - parseUtcDay(asOf);
  if (delta < 0) {
    return {
      status: "overdue",
      daysUntilDue: delta,
      statusLabel: `Your marked refill date was ${Math.abs(delta)} day(s) ago — confirm with your pharmacist; Materia did not invent this date.`,
    };
  }
  if (delta === 0) {
    return {
      status: "due_today",
      daysUntilDue: 0,
      statusLabel: "Your marked refill date is today — support nudge only.",
    };
  }
  if (delta <= 7) {
    return {
      status: "due_soon",
      daysUntilDue: delta,
      statusLabel: `Your marked refill date is in ${delta} day(s) — support nudge only.`,
    };
  }
  return {
    status: "upcoming",
    daysUntilDue: delta,
    statusLabel: `Your marked refill date is in ${delta} day(s).`,
  };
}

const NUDGE_STATUSES: RefillStatus[] = ["due_soon", "due_today", "overdue"];

export function buildRefillBoard(input: {
  regimen: RegimenItem[];
  asOf: string;
  products?: Product[];
  prices?: PriceRecord[];
}): RefillBoard {
  const asOf = isIsoDate(input.asOf) ? input.asOf : new Date().toISOString().slice(0, 10);
  const rows: RefillRow[] = [];

  for (const item of input.regimen) {
    const refillDueOn = resolveRefillDueOn(item);
    const { status, daysUntilDue, statusLabel } = classifyRefillStatus(refillDueOn, asOf);

    let sepPrompt: string | null = null;
    if (NUDGE_STATUSES.includes(status) && input.products && input.prices) {
      const sub: SubstitutionResult = buildSubstitutionOptions(
        item.moleculeId,
        input.products,
        input.prices,
        item.productId,
      );
      sepPrompt = buildRefillSepPrompt(sub);
    }

    rows.push({
      moleculeId: item.moleculeId,
      moleculeName: item.moleculeName,
      brandName: item.brandName,
      refillDueOn,
      lastFilledOn: item.lastFilledOn && isIsoDate(item.lastFilledOn) ? item.lastFilledOn : null,
      packDaysUser:
        typeof item.packDaysUser === "number" && Number.isInteger(item.packDaysUser) && item.packDaysUser > 0
          ? item.packDaysUser
          : null,
      status,
      daysUntilDue,
      statusLabel,
      sepPrompt,
    });
  }

  const dueCount = rows.filter((r) => NUDGE_STATUSES.includes(r.status)).length;
  const unsetCount = rows.filter((r) => r.status === "unset").length;

  return {
    asOf,
    rows,
    dueCount,
    unsetCount,
    note:
      dueCount > 0
        ? `${dueCount} medicine(s) on your list have a user-marked refill window — SEP prompts are educational only.`
        : unsetCount === rows.length && rows.length > 0
          ? "No refill dates on this regimen yet. Set dates from your script or pharmacy — Materia will not invent them."
          : "No refill nudges in the next week from dates you set.",
    disclaimer: REFILL_DISCLAIMER,
  };
}
