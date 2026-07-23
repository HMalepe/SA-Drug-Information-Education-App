import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  Course,
  Excipient,
  Lesson,
  Manufacturer,
  Molecule,
  PriceRecord,
  Product,
  QuizQuestion,
  SafetyProfile,
  Source,
  UserMode,
  UserProfile,
} from "@materia/shared";
import type { DoseRule } from "@materia/shared";

interface SeedFile {
  sources: Source[];
  manufacturers: Manufacturer[];
  excipients: Excipient[];
  molecules: Molecule[];
  products: Product[];
  safetyProfiles: SafetyProfile[];
  priceRecords: PriceRecord[];
  doseRules: DoseRule[];
  courses: Array<
    Course & {
      lessons: Lesson[];
      quiz: QuizQuestion[];
    }
  >;
}

const seedPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../content/seed/antibiotics.json",
);

function loadSeed(): SeedFile {
  return JSON.parse(readFileSync(seedPath, "utf8")) as SeedFile;
}

const seed = loadSeed();

const sourceById = new Map(seed.sources.map((s) => [s.id, s]));

export const db = {
  sources: seed.sources,
  manufacturers: seed.manufacturers,
  excipients: seed.excipients,
  molecules: seed.molecules,
  products: seed.products,
  safetyProfiles: seed.safetyProfiles,
  priceRecords: seed.priceRecords,
  doseRules: seed.doseRules ?? [],
  courses: seed.courses,
  users: [] as UserProfile[],
  consentLogs: [] as Array<{
    id: string;
    userId: string;
    consentType: string;
    acceptedAt: string;
    version: string;
  }>,
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

export function upsertStubUser(input: {
  email: string;
  mode: UserMode;
  displayName?: string;
}): UserProfile {
  const existing = db.users.find((u) => u.email === input.email);
  if (existing) {
    existing.mode = input.mode;
    if (input.displayName) existing.displayName = input.displayName;
    return existing;
  }
  const user: UserProfile = {
    id: `user-${db.users.length + 1}`,
    email: input.email,
    displayName: input.displayName,
    mode: input.mode,
    tier: "free",
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
