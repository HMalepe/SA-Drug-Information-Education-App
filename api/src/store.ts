import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Cohort,
  Course,
  Excipient,
  FormularyEntry,
  Interaction,
  Lesson,
  Manufacturer,
  Molecule,
  Organization,
  PriceRecord,
  Product,
  QuizQuestion,
  SafetyProfile,
  Seat,
  Source,
  Tier,
  UserMode,
  UserProfile,
} from "@materia/shared";
import type {
  AnalyticsEvent,
  AvailabilitySignal,
  CpdCertificate,
  CpdCreditEvent,
  DoseRule,
  ReferralCode,
  ReferralCredit,
  ReferralRedemption,
  ReminderPreferences,
  ReviewDecision,
  RegimenItem,
  SendResult,
  SymptomLogEntry,
  DependantProfile,
  ProfessionalNote,
  CardState,
  AdherenceEvent,
} from "@materia/shared";
import type { MysteryRound } from "@materia/shared";

type SpotRoundMeta = { roundId: string; cardId: string };
type TreatmentRoundMeta = { roundId: string; caseId: string };

export interface MatchRoundRecord {
  roundId: string;
  mechanisms: Array<{ id: string; text: string }>;
  medicines: Array<{ id: string; name: string; slug: string }>;
  pairCount: number;
  note: string;
  disclaimer: string;
  answerKey: Record<string, string>;
}

export interface PackagingRoundRecord {
  roundId: string;
  packs: Array<{
    cueId: string;
    brandName: string;
    formLabel: string;
    schedule: string;
    hint: string;
  }>;
  medicines: Array<{ id: string; name: string; slug: string }>;
  pairCount: number;
  note: string;
  disclaimer: string;
  answerKey: Record<string, string>;
}

export interface DragDropRoundRecord {
  roundId: string;
  medicines: Array<{ id: string; name: string; slug: string }>;
  buckets: Array<{ id: string; label: string }>;
  itemCount: number;
  bucketCount: number;
  note: string;
  disclaimer: string;
  answerKey: Record<string, string>;
}

interface SeedFile {
  sources: Source[];
  manufacturers: Manufacturer[];
  excipients: Excipient[];
  molecules: Molecule[];
  products: Product[];
  safetyProfiles: SafetyProfile[];
  priceRecords: PriceRecord[];
  doseRules?: DoseRule[];
  interactions?: Interaction[];
  formularyEntries?: FormularyEntry[];
  availabilitySignals?: AvailabilitySignal[];
  courses?: Array<
    Course & {
      lessons: Array<Omit<Lesson, "courseId"> & { order: number }>;
      quiz: Array<Omit<QuizQuestion, "courseId">>;
    }
  >;
}

const seedDir = join(dirname(fileURLToPath(import.meta.url)), "../../content/seed");

function loadSeedFile(name: string): SeedFile {
  return JSON.parse(readFileSync(join(seedDir, name), "utf8")) as SeedFile;
}

function byId<T extends { id: string }>(items: T[]): T[] {
  const map = new Map<string, T>();
  for (const item of items) map.set(item.id, item);
  return [...map.values()];
}

function mergeSeeds(...parts: SeedFile[]): SeedFile {
  return {
    sources: byId(parts.flatMap((p) => p.sources)),
    manufacturers: byId(parts.flatMap((p) => p.manufacturers)),
    excipients: byId(parts.flatMap((p) => p.excipients)),
    molecules: byId(parts.flatMap((p) => p.molecules)),
    products: byId(parts.flatMap((p) => p.products)),
    safetyProfiles: byId(parts.flatMap((p) => p.safetyProfiles)),
    priceRecords: byId(parts.flatMap((p) => p.priceRecords)),
    doseRules: parts.flatMap((p) => p.doseRules ?? []),
    interactions: byId(parts.flatMap((p) => p.interactions ?? [])),
    formularyEntries: byId(parts.flatMap((p) => p.formularyEntries ?? [])),
    availabilitySignals: byId(parts.flatMap((p) => p.availabilitySignals ?? [])),
    courses: byId(parts.flatMap((p) => p.courses ?? [])),
  };
}

/** Load every `content/seed/*.json` so new therapeutic areas auto-merge. */
function loadAllSeeds(): SeedFile {
  const files = readdirSync(seedDir)
    .filter((f) => f.endsWith(".json"))
    .sort();
  if (files.length === 0) {
    throw new Error(`No seed JSON files in ${seedDir}`);
  }
  return mergeSeeds(...files.map((f) => loadSeedFile(f)));
}

const seed = loadAllSeeds();
const sourceById = new Map(seed.sources.map((s) => [s.id, s]));

export interface ProgressRow {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  quizCorrect: number;
  quizAttempts: number;
  streak: number;
  updatedAt: string;
}

export interface SubscriptionStub {
  userId: string;
  tier: Tier;
  status: "active" | "pending_payment" | "cancelled";
  provider: "stub" | "paystack";
  renewsAt?: string;
  reference?: string;
}

export const db = {
  sources: seed.sources,
  manufacturers: seed.manufacturers,
  excipients: seed.excipients,
  molecules: seed.molecules,
  products: seed.products,
  safetyProfiles: seed.safetyProfiles,
  priceRecords: seed.priceRecords,
  doseRules: seed.doseRules ?? [],
  interactions: seed.interactions ?? [],
  formularyEntries: seed.formularyEntries ?? [],
  availabilitySignals: (seed.availabilitySignals ?? []) as AvailabilitySignal[],
  courses: (seed.courses ?? []).map((c) => ({
    ...c,
    lessons: c.lessons.map((l) => ({ ...l, courseId: c.id })),
    quiz: c.quiz.map((q) => ({ ...q, courseId: c.id })),
  })),
  users: [] as UserProfile[],
  consentLogs: [] as Array<{
    id: string;
    userId: string;
    consentType: string;
    acceptedAt: string;
    version: string;
  }>,
  progress: [] as ProgressRow[],
  regimens: new Map<string, RegimenItem[]>(),
  symptomLogs: new Map<string, SymptomLogEntry[]>(),
  adherenceLogs: new Map<string, AdherenceEvent[]>(),
  dependants: [] as DependantProfile[],
  professionalNotes: [] as ProfessionalNote[],
  reviewCardStates: [] as CardState[],
  mysteryRounds: new Map<string, MysteryRound>(),
  mysteryUnlocks: new Map<string, number>(),
  spotRounds: new Map<string, SpotRoundMeta>(),
  matchRounds: new Map<string, MatchRoundRecord>(),
  packagingRounds: new Map<string, PackagingRoundRecord>(),
  dragDropRounds: new Map<string, DragDropRoundRecord>(),
  treatmentRounds: new Map<string, TreatmentRoundMeta>(),
  subscriptions: [] as SubscriptionStub[],
  organisations: [] as Organization[],
  seats: [] as Seat[],
  cohorts: [] as Cohort[],
  cpdEvents: [] as CpdCreditEvent[],
  cpdCertificates: [] as CpdCertificate[],
  referralCodes: [] as ReferralCode[],
  referralRedemptions: [] as ReferralRedemption[],
  referralCredits: [] as ReferralCredit[],
  reminderPrefs: new Map<string, ReminderPreferences>(),
  reminderDispatchLog: [] as Array<SendResult & { at: string; moleculeId: string }>,
  analyticsEvents: [] as AnalyticsEvent[],
  reviewDecisions: [] as ReviewDecision[],
};

export function getSource(id: string): Source | undefined {
  return sourceById.get(id);
}

export function getMoleculeBySlug(slug: string): Molecule | undefined {
  return db.molecules.find((m) => m.slug === slug && m.publishState === "published");
}

export function getSafety(moleculeId: string): SafetyProfile | undefined {
  return db.safetyProfiles.find((s) => s.moleculeId === moleculeId);
}

export function getCourseById(id: string) {
  return db.courses.find((c) => c.id === id && c.publishState === "published");
}

export function getCourseForMolecule(moleculeId: string) {
  return db.courses.find((c) => c.moleculeId === moleculeId && c.publishState === "published");
}

export function upsertStubUser(input: {
  email: string;
  mode: UserMode;
  displayName?: string;
  tier?: Tier;
}): UserProfile {
  const existing = db.users.find((u) => u.email === input.email);
  if (existing) {
    existing.mode = input.mode;
    if (input.displayName) existing.displayName = input.displayName;
    if (input.tier) existing.tier = input.tier;
    return existing;
  }
  const user: UserProfile = {
    id: `user-${db.users.length + 1}`,
    email: input.email,
    displayName: input.displayName,
    mode: input.mode,
    tier: input.tier ?? "free",
    language: "en",
  };
  db.users.push(user);
  return user;
}

export function logConsent(userId: string, consentType: string, version: string) {
  const entry = {
    id: `consent-${db.consentLogs.length + 1}`,
    userId,
    consentType,
    acceptedAt: new Date().toISOString(),
    version,
  };
  db.consentLogs.push(entry);
  const user = db.users.find((u) => u.id === userId);
  if (user) {
    if (consentType === "popia") user.popiaConsentAt = entry.acceptedAt;
    if (consentType === "medical_disclaimer") user.medicalDisclaimerAcceptedAt = entry.acceptedAt;
  }
  return entry;
}

export function getOrCreateProgress(userId: string, courseId: string): ProgressRow {
  let row = db.progress.find((p) => p.userId === userId && p.courseId === courseId);
  if (!row) {
    row = {
      userId,
      courseId,
      completedLessonIds: [],
      quizCorrect: 0,
      quizAttempts: 0,
      streak: 0,
      updatedAt: new Date().toISOString(),
    };
    db.progress.push(row);
  }
  return row;
}

export function completeLesson(userId: string, courseId: string, lessonId: string): ProgressRow {
  const row = getOrCreateProgress(userId, courseId);
  if (!row.completedLessonIds.includes(lessonId)) {
    row.completedLessonIds.push(lessonId);
    row.streak += 1;
  }
  row.updatedAt = new Date().toISOString();
  return row;
}

export function recordQuizAttempt(userId: string, courseId: string, correct: boolean): ProgressRow {
  const row = getOrCreateProgress(userId, courseId);
  row.quizAttempts += 1;
  if (correct) row.quizCorrect += 1;
  row.updatedAt = new Date().toISOString();
  return row;
}

export function setUserTier(
  userId: string,
  tier: Tier,
  opts: {
    provider?: "stub" | "paystack";
    status?: SubscriptionStub["status"];
    reference?: string;
    /** When false, keep current tier until payment confirms (live Paystack). */
    applyTierNow?: boolean;
  } = {},
) {
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  const provider = opts.provider ?? "stub";
  const applyNow = opts.applyTierNow ?? true;
  if (applyNow || tier === "free") {
    user.tier = tier;
  }
  const sub: SubscriptionStub = {
    userId,
    tier,
    status: opts.status ?? (tier === "free" ? "active" : "pending_payment"),
    provider,
    renewsAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
    reference: opts.reference,
  };
  if (tier === "free") sub.status = "active";
  db.subscriptions = db.subscriptions.filter((s) => s.userId !== userId);
  db.subscriptions.push(sub);
  return { user, subscription: sub };
}

export function activateSubscription(reference: string, userId: string, tier: Tier) {
  const user = db.users.find((u) => u.id === userId);
  if (!user) return null;
  user.tier = tier;
  const sub: SubscriptionStub = {
    userId,
    tier,
    status: "active",
    provider: "paystack",
    renewsAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
    reference,
  };
  db.subscriptions = db.subscriptions.filter((s) => s.userId !== userId);
  db.subscriptions.push(sub);
  return { user, subscription: sub };
}

/** Mutate a sourced fact's publishState in memory (founder review console). Does not invent text. */
export function applyFactPublishState(
  moleculeId: string,
  fieldPath: string,
  publishState: "draft" | "reviewed" | "published",
): boolean {
  const mol = db.molecules.find((m) => m.id === moleculeId);
  if (mol && (fieldPath === "chemistrySummary" || fieldPath === "moaSummary" || fieldPath === "discoveryNote")) {
    const fact = mol[fieldPath];
    if (!fact) return false;
    fact.publishState = publishState;
    return true;
  }
  const sp = db.safetyProfiles.find((s) => s.moleculeId === moleculeId);
  if (!sp) return false;

  const arrayMatch = fieldPath.match(/^(contraindications|warnings|clinicalPearls|counsellingPoints)\[(\d+)\]$/);
  if (arrayMatch) {
    const key = arrayMatch[1] as "contraindications" | "warnings" | "clinicalPearls" | "counsellingPoints";
    const idx = Number(arrayMatch[2]);
    const fact = sp[key]?.[idx];
    if (!fact) return false;
    fact.publishState = publishState;
    return true;
  }

  const scalarKeys = [
    "dosingAdult",
    "dosingPaediatric",
    "dosingGeriatric",
    "renalAdjustment",
    "hepaticAdjustment",
    "foodLifestyle",
    "pregnancy",
    "breastfeeding",
    "overdoseEarlySigns",
    "overdoseSevereSigns",
    "antidoteOrSupportive",
    "emergencySteps",
  ] as const;
  if ((scalarKeys as readonly string[]).includes(fieldPath)) {
    const fact = sp[fieldPath as (typeof scalarKeys)[number]];
    if (!fact) return false;
    fact.publishState = publishState;
    return true;
  }
  return false;
}

