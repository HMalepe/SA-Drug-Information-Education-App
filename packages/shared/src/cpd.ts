export interface CpdModule {
  id: string;
  title: string;
  credits: number;
  courseId: string;
  /** Quiz must be passed before credits award */
  requiredQuizCorrect: number;
  accreditationStatus: "pending_sapc" | "accredited";
  description: string;
}

export interface CpdCreditEvent {
  id: string;
  userId: string;
  moduleId: string;
  credits: number;
  awardedAt: string;
  certificateId: string;
}

export interface CpdCertificate {
  id: string;
  userId: string;
  moduleId: string;
  moduleTitle: string;
  credits: number;
  issuedAt: string;
  holderName: string;
  disclaimer: string;
}

/** In-app CPD modules mapped to Academy courses — NOT SAPC-accredited until approved. */
export const CPD_MODULES: CpdModule[] = [
  {
    id: "cpd-amox-why",
    title: "Amoxicillin — understand the why",
    credits: 1,
    courseId: "course-amox",
    requiredQuizCorrect: 1,
    accreditationStatus: "pending_sapc",
    description: "Complete the Amoxicillin Academy course + pass the quiz gate.",
  },
  {
    id: "cpd-amoxclav-combo",
    title: "Amoxicillin–clavulanate — why the combo",
    credits: 1,
    courseId: "course-amoxclav",
    requiredQuizCorrect: 1,
    accreditationStatus: "pending_sapc",
    description: "Complete the co-amoxiclav Academy course + pass the quiz gate.",
  },
  {
    id: "cpd-doxy-ribosome",
    title: "Doxycycline — ribosome, not cell wall",
    credits: 1,
    courseId: "course-doxy",
    requiredQuizCorrect: 1,
    accreditationStatus: "pending_sapc",
    description: "Complete the Doxycycline Academy course + pass the quiz gate.",
  },
];

export const CPD_DISCLAIMER =
  "Materia CPD certificates are learning records only until SAPC accreditation is granted. Do not submit as accredited CPD until accreditationStatus = accredited.";

export function getCpdModule(id: string): CpdModule | undefined {
  return CPD_MODULES.find((m) => m.id === id);
}

export function canAwardCpd(input: {
  module: CpdModule;
  lessonsCompleted: number;
  lessonsTotal: number;
  quizCorrect: number;
  alreadyAwarded: boolean;
}): { ok: boolean; reason?: string } {
  if (input.alreadyAwarded) return { ok: false, reason: "Credits already awarded for this module." };
  if (input.lessonsCompleted < input.lessonsTotal) {
    return { ok: false, reason: "Complete all published lessons first." };
  }
  if (input.quizCorrect < input.module.requiredQuizCorrect) {
    return { ok: false, reason: "Pass the quiz gate before claiming credits." };
  }
  return { ok: true };
}

export function buildCertificate(input: {
  userId: string;
  holderName: string;
  module: CpdModule;
}): CpdCertificate {
  const issuedAt = new Date().toISOString();
  return {
    id: `cert-${input.module.id}-${input.userId}-${issuedAt.slice(0, 10)}`,
    userId: input.userId,
    moduleId: input.module.id,
    moduleTitle: input.module.title,
    credits: input.module.credits,
    issuedAt,
    holderName: input.holderName,
    disclaimer: CPD_DISCLAIMER,
  };
}

export function annualCreditsTarget(): number {
  /** Placeholder — pharmacists should confirm current SAPC requirement. */
  return 30;
}
