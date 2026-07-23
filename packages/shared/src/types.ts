/** Shared Materia domain types — per Build Spec §13 /docs/13_Data_Model.md */

export type PublishState = "draft" | "reviewed" | "published";

export type UserMode = "patient" | "student" | "pharmacist" | "doctor";

export type ScheduleCode = "S0" | "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

export type TrafficLight = "red" | "orange" | "yellow";

export type InteractionSeverity = "minor" | "moderate" | "major" | "contraindicated";

/** Medicine 360° tabs — fixed order (Build Spec §4) */
export const MEDICINE_360_TABS = [
  { id: "chemistry", index: 1, label: "Chemistry" },
  { id: "moa", index: 2, label: "Mechanism of Action" },
  { id: "sa-products", index: 3, label: "SA Products & Strengths" },
  { id: "dosing", index: 4, label: "Dosing" },
  { id: "contraindications", index: 5, label: "Contraindications" },
  { id: "warnings", index: 6, label: "Warnings & Monitoring" },
  { id: "interactions", index: 7, label: "Drug Interactions" },
  { id: "food-lifestyle", index: 8, label: "Food & Lifestyle" },
  { id: "pregnancy", index: 9, label: "Pregnancy & Breastfeeding" },
  { id: "overdose", index: 10, label: "Overdose & Emergency" },
  { id: "pearls", index: 11, label: "Clinical Pearls" },
  { id: "animations", index: 12, label: "Visual ID" },
  { id: "quiz", index: 13, label: "Interactive Quiz" },
  { id: "ai-tutor", index: 14, label: "AI Tutor" },
  { id: "counselling", index: 15, label: "Patient Counselling Points" },
] as const;

export type Medicine360TabId = (typeof MEDICINE_360_TABS)[number]["id"];

export interface Source {
  id: string;
  citation: string;
  sourceType: "guideline" | "register" | "sep" | "insert" | "original_authoring" | "other";
  url?: string;
  lastReviewed: string; // ISO date
  reviewerCredential?: string;
  notes?: string;
}

/** Clinical fact wrapper — every clinical field must carry this */
export interface SourcedFact<T> {
  value: T;
  sourceId: string;
  publishState: PublishState;
  lastReviewed: string;
  aiDrafted?: boolean;
}

export interface Molecule {
  id: string;
  slug: string;
  innName: string;
  className: string;
  atcCode?: string;
  therapeuticArea: string;
  synonyms: string[];
  publishState: PublishState;
  chemistrySummary?: SourcedFact<string>;
  moaSummary?: SourcedFact<string>;
  discoveryNote?: SourcedFact<string>;
}

export interface Manufacturer {
  id: string;
  name: string;
  marketingCompany?: string;
  plantSite?: string;
  apiOrigin?: string;
  packagingSite?: string;
  madeInSa?: boolean;
}

export interface Excipient {
  id: string;
  name: string;
  purpose?: string;
  allergyRisk?: string;
  absorptionNote?: string;
  canBecomeActive?: boolean;
}

export interface Product {
  id: string;
  moleculeId: string;
  manufacturerId: string;
  brandName: string;
  strength: string;
  form: string;
  sahpraRegNo?: string;
  schedule: ScheduleCode;
  isOriginator: boolean;
  isDiscontinued: boolean;
  discontinuedDate?: string;
  bioequivalentFlag?: boolean;
  synonymKeys: string[];
  excipientIds: string[];
  publishState: PublishState;
}

export interface SafetyProfile {
  id: string;
  moleculeId: string;
  dosingAdult?: SourcedFact<string>;
  dosingPaediatric?: SourcedFact<string>;
  dosingGeriatric?: SourcedFact<string>;
  renalAdjustment?: SourcedFact<string>;
  hepaticAdjustment?: SourcedFact<string>;
  contraindications: Array<SourcedFact<{ level: TrafficLight; text: string }>>;
  warnings: Array<SourcedFact<string>>;
  foodLifestyle?: SourcedFact<string>;
  pregnancy?: SourcedFact<string>;
  breastfeeding?: SourcedFact<string>;
  overdoseEarlySigns?: SourcedFact<string>;
  overdoseSevereSigns?: SourcedFact<string>;
  antidoteOrSupportive?: SourcedFact<string>;
  emergencySteps?: SourcedFact<string>;
  clinicalPearls: Array<SourcedFact<string>>;
  counsellingPoints: Array<SourcedFact<string>>;
  publishState: PublishState;
}

export interface Interaction {
  id: string;
  moleculeAId: string;
  moleculeBId: string;
  severity: InteractionSeverity;
  mechanism?: SourcedFact<string>;
  action?: SourcedFact<string>;
  publishState: PublishState;
}

export interface PriceRecord {
  id: string;
  productId: string;
  sepZar?: number;
  effectiveDate: string;
  sourceId: string;
  publishState: PublishState;
  notes?: string;
}

export interface FormularyEntry {
  id: string;
  productId: string;
  schemeName: string;
  reimbursed: boolean;
  coPayEstimateZar?: number;
  sourceId: string;
  publishState: PublishState;
}

export interface Course {
  id: string;
  moleculeId: string;
  title: string;
  publishState: PublishState;
}

export interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  body: string;
  publishState: PublishState;
}

/** Alias kept for seed authors */
export type LessonOrder = Lesson["order"];

export interface QuizQuestion {
  id: string;
  courseId: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  teachFromMiss: string;
  publishState: PublishState;
}

export interface Organization {
  id: string;
  name: string;
  kind: "university" | "hospital" | "pharmacy_chain" | "other";
  seatLimit?: number;
}

export interface Seat {
  id: string;
  orgId: string;
  userId: string;
  role: "member" | "admin";
  joinedAt?: string;
}

export interface Cohort {
  id: string;
  orgId: string;
  name: string;
  memberUserIds: string[];
}

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  mode: UserMode;
  tier: "free" | "student" | "professional" | "institution";
  language: string;
  studentVerified?: boolean;
  popiaConsentAt?: string;
  medicalDisclaimerAcceptedAt?: string;
  orgId?: string;
}

export interface SearchHit {
  kind: "molecule" | "brand" | "class" | "area" | "indication";
  queryMatched: string;
  moleculeId: string;
  moleculeSlug: string;
  moleculeName: string;
  brandName?: string;
  score: number;
}

export interface GroundedCitation {
  sourceId: string;
  citation: string;
  lastReviewed: string;
  fieldPath: string;
}

export interface GroundedAnswer {
  status: "answered" | "refused";
  answer?: string;
  citations: GroundedCitation[];
  refusalReason?: string;
}

export interface DoseCalcRequest {
  moleculeId: string;
  weightKg: number;
  indicationKey: string;
  clinicallyConfirmed: boolean;
}

export interface DoseCalcResult {
  status: "ok" | "needs_confirmation" | "unavailable" | "refused";
  working?: string[];
  suggestedDoseDisplay?: string;
  source?: Source;
  disclaimer: string;
  message?: string;
}
