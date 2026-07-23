import type { PriceRecord, Product, PublishState, ScheduleCode } from "./types.js";

/**
 * Public data ingest helpers (Doc 16) — SAHPRA register + DoH SEP.
 * Always lands as draft until founder review. Never invents clinical facts.
 */

export interface SahpraIngestRow {
  sahpraRegNo: string;
  brandName: string;
  innName: string;
  strength: string;
  form: string;
  schedule: ScheduleCode;
  manufacturerName: string;
  bioequivalentFlag?: boolean;
}

export interface SepIngestRow {
  sahpraRegNo: string;
  brandName: string;
  sepZar: number;
  effectiveDate: string;
}

export interface IngestIssue {
  row: number;
  field: string;
  message: string;
}

export interface IngestPreview {
  source: "sahpra" | "sep";
  accepted: number;
  rejected: number;
  issues: IngestIssue[];
  /** Draft-only suggestions — do not auto-publish */
  draftProducts: Array<Partial<Product> & { brandName: string; sahpraRegNo: string }>;
  draftPrices: Array<Partial<PriceRecord> & { brandName: string; sahpraRegNo: string }>;
  note: string;
}

const SCHEDULES = new Set(["S0", "S1", "S2", "S3", "S4", "S5", "S6"]);

export function validateSahpraRows(rows: SahpraIngestRow[]): IngestPreview {
  const issues: IngestIssue[] = [];
  const draftProducts: IngestPreview["draftProducts"] = [];

  rows.forEach((row, i) => {
    const n = i + 1;
    if (!row.sahpraRegNo?.trim()) issues.push({ row: n, field: "sahpraRegNo", message: "Required" });
    if (!row.brandName?.trim()) issues.push({ row: n, field: "brandName", message: "Required" });
    if (!row.innName?.trim()) issues.push({ row: n, field: "innName", message: "Required" });
    if (!SCHEDULES.has(row.schedule)) {
      issues.push({ row: n, field: "schedule", message: `Invalid schedule ${row.schedule}` });
    }
    const rowIssues = issues.filter((x) => x.row === n);
    if (rowIssues.length) return;
    draftProducts.push({
      brandName: row.brandName.trim(),
      sahpraRegNo: row.sahpraRegNo.trim(),
      strength: row.strength?.trim() || "unknown",
      form: row.form?.trim() || "unknown",
      schedule: row.schedule,
      bioequivalentFlag: row.bioequivalentFlag,
      isOriginator: false,
      isDiscontinued: false,
      synonymKeys: [row.brandName.trim().toLowerCase()],
      excipientIds: [],
      publishState: "draft" as PublishState,
    });
  });

  return {
    source: "sahpra",
    accepted: draftProducts.length,
    rejected: rows.length - draftProducts.length,
    issues,
    draftProducts,
    draftPrices: [],
    note: "SAHPRA rows validated as draft only — map to molecule + founder publish required.",
  };
}

export function validateSepRows(rows: SepIngestRow[], sourceId = "src-sep-doh"): IngestPreview {
  const issues: IngestIssue[] = [];
  const draftPrices: IngestPreview["draftPrices"] = [];

  rows.forEach((row, i) => {
    const n = i + 1;
    if (!row.sahpraRegNo?.trim() && !row.brandName?.trim()) {
      issues.push({ row: n, field: "key", message: "Need sahpraRegNo or brandName" });
    }
    if (!(row.sepZar > 0) || !Number.isFinite(row.sepZar)) {
      issues.push({ row: n, field: "sepZar", message: "Must be a positive number" });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(row.effectiveDate ?? "")) {
      issues.push({ row: n, field: "effectiveDate", message: "Use YYYY-MM-DD" });
    }
    const rowIssues = issues.filter((x) => x.row === n);
    if (rowIssues.length) return;
    draftPrices.push({
      brandName: row.brandName.trim(),
      sahpraRegNo: row.sahpraRegNo.trim(),
      sepZar: row.sepZar,
      effectiveDate: row.effectiveDate,
      sourceId,
      publishState: "draft" as PublishState,
      notes: "Ingested from public SEP fixture — review before publish.",
    });
  });

  return {
    source: "sep",
    accepted: draftPrices.length,
    rejected: rows.length - draftPrices.length,
    issues,
    draftProducts: [],
    draftPrices,
    note: "SEP rows validated as draft only — never show as live SEP until publishState=published.",
  };
}

/** Minimal CSV line parser (no quoted commas in fixtures). */
export function parseCsvLines(text: string): string[][] {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split(",").map((c) => c.trim()));
}

export function sahpraFromCsv(text: string): SahpraIngestRow[] {
  const [header, ...rows] = parseCsvLines(text);
  if (!header) return [];
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));
  return rows.map((cols) => ({
    sahpraRegNo: cols[idx.sahpraRegNo ?? 0] ?? "",
    brandName: cols[idx.brandName ?? 1] ?? "",
    innName: cols[idx.innName ?? 2] ?? "",
    strength: cols[idx.strength ?? 3] ?? "",
    form: cols[idx.form ?? 4] ?? "",
    schedule: (cols[idx.schedule ?? 5] ?? "S4") as ScheduleCode,
    manufacturerName: cols[idx.manufacturerName ?? 6] ?? "",
    bioequivalentFlag: (cols[idx.bioequivalentFlag ?? 7] ?? "").toLowerCase() === "true",
  }));
}

export function sepFromCsv(text: string): SepIngestRow[] {
  const [header, ...rows] = parseCsvLines(text);
  if (!header) return [];
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));
  return rows.map((cols) => ({
    sahpraRegNo: cols[idx.sahpraRegNo ?? 0] ?? "",
    brandName: cols[idx.brandName ?? 1] ?? "",
    sepZar: Number(cols[idx.sepZar ?? 2] ?? NaN),
    effectiveDate: cols[idx.effectiveDate ?? 3] ?? "",
  }));
}
