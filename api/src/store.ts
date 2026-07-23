import { readFileSync } from "node:fs";
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
  RegimenItem,
  SendResult,
} from "@materia/shared";

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

const seed = mergeSeeds(loadSeedFile("antibiotics.json"), loadSeedFile("analgesics.json"));
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
