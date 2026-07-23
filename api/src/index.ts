import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import { z } from "zod";
import {
  CPD_DISCLAIMER,
  CPD_MODULES,
  COUNSELLING_LANGS,
  DEMO_BARCODE_INDEX,
  TIER_PRICES_ZAR,
  annualCreditsTarget,
  buildAnalyticsEvent,
  buildAvailabilityForMolecule,
  buildCertificate,
  buildCounsellingHandout,
  buildLocumBrief,
  buildOfflineEssential,
  buildReferralCredits,
  buildSubstitutionOptions,
  calculateDose,
  assistDoseAdjustment,
  buildClashBoard,
  buildPearlFeed,
  collectPublishedPearls,
  findInsertDocument,
  translateInsert,
  listInsertDocuments,
  appendSymptomLog,
  buildSymptomSummary,
  createSymptomLog,
  addDependantProfile,
  CAREGIVER_DISCLAIMER,
  companionScopeKey,
  createDependantProfile,
  deactivateDependant,
  listActiveDependants,
  canAddSeat,
  canAwardCpd,
  canRedeemReferral,
  checkRegimenInteractions,
  computeCohortAnalytics,
  courseCompletionPercent,
  createOrganisation,
  dueRemindersAt,
  expertLevelFromPercent,
  explainExcipient,
  explainProductExcipients,
  EXCIPIENT_LIBRARY,
  gateFeature,
  generateReferralCode,
  getColdChainNote,
  getCounsellingScript,
  getCpdModule,
  gradeQuizAnswer,
  isBillableTier,
  listActiveShortages,
  listColdChainNotes,
  listCounsellingLangs,
  listSchemes,
  loadPublicFeed,
  matchFormularyAndCoPay,
  buildReviewQueue,
  nextPublishState,
  summarizeCoverage,
  validateReviewDecision,
  normalizeReferralCode,
  parsePaystackChargeSuccess,
  previewUpcoming,
  resolveProductScan,
  resolveSearch,
  sahpraFromCsv,
  sepFromCsv,
  sumCredits,
  summarizeAnalytics,
  toOutboundMessage,
  validateSahpraRows,
  validateSepRows,
  verifyPaystackSignature,
  type CounsellingLang,
  type ReminderChannel,
  type ScheduleCode,
  type Tier,
  type UserMode,
} from "@materia/shared";
import { createCheckoutSession, hmacSha512Hex, paystackConfigured } from "./billing/paystack.js";
import { messagingProvidersStatus, sendOutbound } from "./messaging/dispatch.js";
import { persistReviewDecision, reviewPersistEnabled } from "./reviewPersist.js";
import { buildMolecule360 } from "./moleculeView.js";
import { askMolecule } from "./rag.js";
import {
  activateSubscription,
  applyFactPublishState,
  completeLesson,
  db,
  getCourseById,
  getMoleculeBySlug,
  getOrCreateProgress,
  getSafety,
  getSource,
  logConsent,
  recordQuizAttempt,
  setUserTier,
  upsertStubUser,
} from "./store.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(
  express.json({
    limit: "32kb",
    verify: (req, _res, buf) => {
      const url = req.url ?? "";
      if (url.startsWith("/billing/webhook")) {
        (req as express.Request & { rawBody?: string }).rawBody = buf.toString("utf8");
      }
    },
  }),
);

function requireUser(userId: string | undefined) {
  if (!userId) return null;
  return db.users.find((u) => u.id === userId) ?? null;
}

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "materia-api",
    molecules: db.molecules.length,
    courses: db.courses.filter((c) => c.publishState === "published").length,
  });
});

app.get("/search", (req, res) => {
  const q = String(req.query.q ?? "");
  const hits = resolveSearch(q, db.molecules, db.products);
  res.json({ query: q, hits });
});

app.get("/molecules", (req, res) => {
  const area = String(req.query.area ?? "").trim().toLowerCase();
  res.json({
    molecules: db.molecules
      .filter((m) => m.publishState === "published")
      .filter((m) => !area || m.therapeuticArea.toLowerCase() === area)
      .map((m) => ({
        id: m.id,
        slug: m.slug,
        innName: m.innName,
        className: m.className,
        therapeuticArea: m.therapeuticArea,
        hasCourse: Boolean(db.courses.find((c) => c.moleculeId === m.id && c.publishState === "published")),
      })),
    areas: [...new Set(db.molecules.map((m) => m.therapeuticArea))].sort(),
  });
});

app.get("/molecules/:slug", (req, res) => {
  const mode = String(req.query.mode ?? "pharmacist");
  const view = buildMolecule360(req.params.slug, mode);
  if (!view) {
    res.status(404).json({ error: "Molecule not found or not published" });
    return;
  }
  res.json(view);
});

app.get("/molecules/:slug/excipients", (req, res) => {
  const mode = (String(req.query.mode ?? "pharmacist") as UserMode) || "pharmacist";
  const mol = getMoleculeBySlug(req.params.slug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const products = db.products.filter((p) => p.moleculeId === mol.id && p.publishState === "published");
  res.json({
    moleculeSlug: mol.slug,
    mode,
    products: products.map((p) =>
      explainProductExcipients({ product: p, excipients: db.excipients, mode }),
    ),
    note: "Build Spec §5.4 — excipients explained; inactive until the wrong patient context.",
  });
});

app.get("/excipients", (_req, res) => {
  const mode = "pharmacist" as UserMode;
  const fromSeed = db.excipients.map((e) => explainExcipient(e, mode));
  const libraryOnly = Object.entries(EXCIPIENT_LIBRARY)
    .filter(([id]) => !db.excipients.some((e) => e.id === id))
    .map(([id, meta]) => explainExcipient({ id, ...meta }, mode));
  res.json({
    excipients: [...fromSeed, ...libraryOnly],
    note: "Educational library + seed rows. Confirm against the labelled pack.",
  });
});

app.post("/ai/ask", (req, res) => {
  const schema = z.object({
    moleculeSlug: z.string().min(1),
    question: z.string().min(1).max(2000),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  if ("patientName" in req.body || "idNumber" in req.body) {
    res.status(400).json({
      error: "Do not send personal/health identifiers to AI endpoints (POPIA).",
    });
    return;
  }
  const answer = askMolecule(parsed.data.moleculeSlug, parsed.data.question);
  res.json(answer);
});

app.post("/tools/dose-calculator", (req, res) => {
  const schema = z.object({
    moleculeId: z.string(),
    weightKg: z.number(),
    indicationKey: z.string(),
    clinicallyConfirmed: z.boolean(),
    userId: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = parsed.data.userId ? requireUser(parsed.data.userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "dose_calculator");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Dose calculator is a Professional feature",
      upgradeTo: gate.upgradeTo,
      prices: TIER_PRICES_ZAR,
    });
    return;
  }
  const result = calculateDose(parsed.data, db.doseRules);
  res.json(result);
});

/* ── Dose-adjustment assistant (Build Spec §8.5 — Pro) ── */
app.post("/tools/dose-adjustment", (req, res) => {
  const schema = z.object({
    moleculeSlug: z.string().min(1),
    context: z.enum([
      "renal",
      "hepatic",
      "geriatric",
      "pregnancy",
      "dialysis",
      "obesity",
      "underweight",
    ]),
    egfrMlMin: z.number().optional(),
    clinicallyConfirmed: z.boolean(),
    userId: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = parsed.data.userId ? requireUser(parsed.data.userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "dose_calculator");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Dose-adjustment assistant is a Professional feature",
      upgradeTo: gate.upgradeTo,
      prices: TIER_PRICES_ZAR,
    });
    return;
  }
  const mol = getMoleculeBySlug(parsed.data.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const safety = getSafety(mol.id);
  const renal = safety?.renalAdjustment;
  const hepatic = safety?.hepaticAdjustment;
  const geriatric = safety?.dosingGeriatric;
  const pregnancy = safety?.pregnancy;
  const pick = (fact: typeof renal) => {
    if (!fact || fact.publishState !== "published") return null;
    return { text: String(fact.value), sourceId: fact.sourceId, lastReviewed: fact.lastReviewed };
  };
  const renalPub = pick(renal);
  const hepaticPub = pick(hepatic);
  const geriatricPub = pick(geriatric);
  const pregnancyPub = pick(pregnancy);
  const sourceId =
    renalPub?.sourceId ??
    hepaticPub?.sourceId ??
    geriatricPub?.sourceId ??
    pregnancyPub?.sourceId;
  const source = sourceId ? getSource(sourceId) : null;

  const result = assistDoseAdjustment({
    moleculeId: mol.id,
    moleculeName: mol.innName,
    context: parsed.data.context,
    egfrMlMin: parsed.data.egfrMlMin,
    clinicallyConfirmed: parsed.data.clinicallyConfirmed,
    published: {
      renal: renalPub?.text,
      hepatic: hepaticPub?.text,
      geriatric: geriatricPub?.text,
      pregnancy: pregnancyPub?.text,
      source: source ?? undefined,
    },
  });
  res.json(result);
});

/* ── Substitution + SEP (Build Spec §5.6 / §10 — Pro) ── */
app.get("/tools/substitution/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "substitution_sep");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Substitution & SEP engine is a Professional feature",
      upgradeTo: gate.upgradeTo,
      prices: TIER_PRICES_ZAR,
    });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const selectedProductId = req.query.selectedProductId
    ? String(req.query.selectedProductId)
    : undefined;
  const result = buildSubstitutionOptions(
    mol.id,
    db.products,
    db.priceRecords,
    selectedProductId,
  );
  res.json({ molecule: { id: mol.id, slug: mol.slug, innName: mol.innName }, ...result });
});

/* ── Formulary + co-pay switch (Build Spec §12 — Pro) ── */
app.get("/tools/formulary/schemes", (_req, res) => {
  res.json({ schemes: listSchemes(db.formularyEntries) });
});

app.get("/tools/formulary/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "formulary_copay");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Formulary & co-pay calculator is a Professional feature",
      upgradeTo: gate.upgradeTo,
    });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const schemeName = String(req.query.scheme ?? "Discovery Health");
  const selectedProductId = req.query.selectedProductId
    ? String(req.query.selectedProductId)
    : undefined;
  const result = matchFormularyAndCoPay({
    moleculeId: mol.id,
    schemeName,
    products: db.products,
    formulary: db.formularyEntries,
    prices: db.priceRecords,
    selectedProductId,
  });
  res.json({ molecule: { slug: mol.slug, innName: mol.innName }, ...result });
});

/* ── Locum / handover brief (Build Spec §12 — Pro) ── */
app.get("/tools/locum/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "locum_brief");
  if (!gate.allowed) {
    res.status(402).json({ error: "Locum brief is a Professional feature", upgradeTo: gate.upgradeTo });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const brief = buildLocumBrief({
    moleculeId: mol.id,
    innName: mol.innName,
    className: mol.className,
    products: db.products,
    safety: getSafety(mol.id),
  });
  res.json({ brief });
});

/* ── Cold-chain / load-shedding notes (Build Spec §12 — Pro) ── */
app.get("/tools/cold-chain", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "cold_chain_notes");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Cold-chain notes are a Professional feature",
      upgradeTo: gate.upgradeTo,
    });
    return;
  }
  const key = req.query.key ? String(req.query.key) : undefined;
  if (key) {
    const note = getColdChainNote(key);
    if (!note) {
      res.status(404).json({ error: "Note not found", available: listColdChainNotes().map((n) => n.productKey) });
      return;
    }
    res.json({ note });
    return;
  }
  res.json({ notes: listColdChainNotes() });
});

/* ── Multilingual counselling (Build Spec §9 — Pro) ── */
app.get("/tools/counselling/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "multilingual_counselling");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Multilingual counselling is a Professional feature",
      upgradeTo: gate.upgradeTo,
    });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const lang = (String(req.query.lang ?? "en") as CounsellingLang) || "en";
  const script = getCounsellingScript(mol.id, lang);
  if (!script) {
    res.status(404).json({
      error: "No published counselling script for this language",
      available: listCounsellingLangs(mol.id),
      allLangs: COUNSELLING_LANGS,
    });
    return;
  }
  res.json({
    moleculeSlug: mol.slug,
    moleculeName: mol.innName,
    available: listCounsellingLangs(mol.id),
    script,
  });
});

/* ── Offline core pack (Build Spec §12 — Pro) ── */
app.get("/offline/pack", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "offline_core");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Offline core is a Professional feature",
      upgradeTo: gate.upgradeTo,
    });
    return;
  }
  const slugs = String(req.query.slugs ?? "amoxicillin,amoxicillin-clavulanate,doxycycline")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const pack = slugs
    .map((slug) => {
      const mol = getMoleculeBySlug(slug);
      if (!mol) return null;
      const products = db.products.filter(
        (p) => p.moleculeId === mol.id && p.publishState === "published",
      );
      const schedules = [...new Set(products.map((p) => p.schedule))] as ScheduleCode[];
      const script = getCounsellingScript(mol.id, "en");
      return buildOfflineEssential({
        moleculeId: mol.id,
        slug: mol.slug,
        innName: mol.innName,
        className: mol.className,
        scheduleHints: schedules,
        counsellingEn: script?.lines ?? [
          "Counselling not yet published for offline pack — verify online.",
        ],
      });
    })
    .filter(Boolean);

  res.json({
    generatedAt: new Date().toISOString(),
    count: pack.length,
    essentials: pack,
  });
});

/* ── Academy (playbook v2 / Build Spec §7) ── */
app.get("/academy/courses", (_req, res) => {
  const courses = db.courses
    .filter((c) => c.publishState === "published")
    .map((c) => {
      const mol = db.molecules.find((m) => m.id === c.moleculeId);
      return {
        id: c.id,
        title: c.title,
        moleculeId: c.moleculeId,
        moleculeSlug: mol?.slug,
        moleculeName: mol?.innName,
        lessonCount: c.lessons.filter((l) => l.publishState === "published").length,
        quizCount: c.quiz.filter((q) => q.publishState === "published").length,
      };
    });
  res.json({ courses });
});

app.get("/academy/courses/:courseId", (req, res) => {
  const course = getCourseById(req.params.courseId);
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  const mol = db.molecules.find((m) => m.id === course.moleculeId);
  const userId = String(req.query.userId ?? "");
  const progress = userId ? getOrCreateProgress(userId, course.id) : null;
  const lessons = course.lessons
    .filter((l) => l.publishState === "published")
    .sort((a, b) => a.order - b.order);
  const pct = progress
    ? courseCompletionPercent(progress.completedLessonIds, lessons.length)
    : 0;

  res.json({
    course: {
      id: course.id,
      title: course.title,
      moleculeSlug: mol?.slug,
      moleculeName: mol?.innName,
      lessons,
      quiz: course.quiz
        .filter((q) => q.publishState === "published")
        .map((q) => ({
          id: q.id,
          prompt: q.prompt,
          choices: q.choices,
          // correctIndex + teachFromMiss withheld until answer POST
        })),
    },
    progress: progress
      ? {
          ...progress,
          completionPercent: pct,
          expertLevel: expertLevelFromPercent(pct),
        }
      : null,
  });
});

app.post("/academy/lessons/complete", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    courseId: z.string(),
    lessonId: z.string(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user — create a stub session first" });
    return;
  }
  const course = getCourseById(parsed.data.courseId);
  if (!course) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  const lesson = course.lessons.find((l) => l.id === parsed.data.lessonId);
  if (!lesson || lesson.publishState !== "published") {
    res.status(404).json({ error: "Lesson not found or not published" });
    return;
  }
  // Free tier: sample = first course only (amoxicillin); full academy needs student+
  const isSample = course.id === "course-amox";
  const gate = gateFeature(user.tier as Tier, isSample ? "academy_sample" : "academy_full");
  if (!gate.allowed) {
    res.status(402).json({ error: "Upgrade for full Academy", upgradeTo: gate.upgradeTo });
    return;
  }
  const progress = completeLesson(user.id, course.id, lesson.id);
  const lessons = course.lessons.filter((l) => l.publishState === "published");
  const pct = courseCompletionPercent(progress.completedLessonIds, lessons.length);
  res.json({
    progress: { ...progress, completionPercent: pct, expertLevel: expertLevelFromPercent(pct) },
  });
});

app.post("/academy/quiz/answer", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    courseId: z.string(),
    questionId: z.string(),
    selectedIndex: z.number().int().min(0),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const course = getCourseById(parsed.data.courseId);
  const question = course?.quiz.find((q) => q.id === parsed.data.questionId);
  if (!course || !question) {
    res.status(404).json({ error: "Question not found" });
    return;
  }
  const grade = gradeQuizAnswer(question, parsed.data.selectedIndex);
  const progress = recordQuizAttempt(user.id, course.id, grade.correct);
  res.json({ grade, progress });
});

/* ── Companion (Build Spec §6) ── */
function companionScope(userId: string, dependantId?: string | null): string | { error: string } {
  const dep = dependantId?.trim();
  if (!dep) return companionScopeKey(userId);
  const profile = db.dependants.find((d) => d.id === dep && d.caregiverUserId === userId && d.active);
  if (!profile) return { error: "Dependant profile not found or inactive" };
  return companionScopeKey(userId, dep);
}

app.get("/companion/dependants/:userId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  res.json({
    profiles: listActiveDependants(db.dependants, user.id),
    disclaimer: CAREGIVER_DISCLAIMER,
  });
});

app.post("/companion/dependants/:userId", (req, res) => {
  const schema = z.object({
    displayName: z.string().min(1).max(80),
    relation: z.enum(["self", "parent", "child", "spouse", "other"]),
    birthYear: z.number().int().optional(),
  });
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const created = createDependantProfile({
    caregiverUserId: user.id,
    displayName: parsed.data.displayName,
    relation: parsed.data.relation,
    birthYear: parsed.data.birthYear,
  });
  if (!created.ok) {
    res.status(400).json({ error: created.error });
    return;
  }
  const added = addDependantProfile(db.dependants, created.profile);
  if (!added.ok) {
    res.status(400).json({ error: added.error });
    return;
  }
  db.dependants = added.profiles;
  res.status(201).json({
    profile: created.profile,
    profiles: listActiveDependants(db.dependants, user.id),
    disclaimer: CAREGIVER_DISCLAIMER,
  });
});

app.delete("/companion/dependants/:userId/:dependantId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const result = deactivateDependant(db.dependants, user.id, req.params.dependantId);
  if (!result.ok) {
    res.status(404).json({ error: result.error });
    return;
  }
  db.dependants = result.profiles;
  res.json({
    profiles: listActiveDependants(db.dependants, user.id),
    disclaimer: CAREGIVER_DISCLAIMER,
  });
});

app.get("/companion/regimen/:userId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const scope = companionScope(user.id, String(req.query.dependantId ?? "") || null);
  if (typeof scope === "object") {
    res.status(404).json(scope);
    return;
  }
  res.json({
    dependantId: String(req.query.dependantId ?? "") || null,
    regimen: db.regimens.get(scope) ?? [],
    disclaimer:
      "Reminders are support only. Materia never tells you to change or stop a medicine — speak to your pharmacist or doctor.",
    caregiverNote: CAREGIVER_DISCLAIMER,
  });
});

app.put("/companion/regimen/:userId", (req, res) => {
  const schema = z.object({
    dependantId: z.string().optional(),
    items: z.array(
      z.object({
        moleculeId: z.string(),
        moleculeName: z.string(),
        productId: z.string().optional(),
        brandName: z.string().optional(),
        reminderTimes: z.array(z.string()),
      }),
    ),
  });
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const scope = companionScope(user.id, parsed.data.dependantId ?? null);
  if (typeof scope === "object") {
    res.status(404).json(scope);
    return;
  }
  db.regimens.set(scope, parsed.data.items);
  res.json({
    dependantId: parsed.data.dependantId ?? null,
    regimen: parsed.data.items,
    caregiverNote: CAREGIVER_DISCLAIMER,
  });
});

/* ── Symptom & side-effect tracking (Build Spec §6) ── */
app.get("/companion/symptoms/:userId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const scope = companionScope(user.id, String(req.query.dependantId ?? "") || null);
  if (typeof scope === "object") {
    res.status(404).json(scope);
    return;
  }
  const entries = db.symptomLogs.get(scope) ?? [];
  res.json(buildSymptomSummary({ entries, regimen: db.regimens.get(scope) ?? [] }));
});

app.post("/companion/symptoms/:userId", (req, res) => {
  const schema = z.object({
    dependantId: z.string().optional(),
    at: z.string().min(8),
    label: z.string().min(1).max(80),
    severity: z.number().int().min(1).max(5),
    moleculeId: z.string().optional(),
    moleculeName: z.string().optional(),
    note: z.string().max(280).optional(),
  });
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const scope = companionScope(user.id, parsed.data.dependantId ?? null);
  if (typeof scope === "object") {
    res.status(404).json(scope);
    return;
  }

  let moleculeName = parsed.data.moleculeName;
  const moleculeId = parsed.data.moleculeId;
  if (moleculeId) {
    const onRegimen = (db.regimens.get(scope) ?? []).find((r) => r.moleculeId === moleculeId);
    const mol = db.molecules.find((m) => m.id === moleculeId);
    moleculeName = onRegimen?.moleculeName ?? mol?.innName ?? moleculeName;
  }

  const created = createSymptomLog({
    userId: user.id,
    at: parsed.data.at,
    label: parsed.data.label,
    severity: parsed.data.severity,
    moleculeId,
    moleculeName,
    note: parsed.data.note,
  });
  if (!created.ok) {
    res.status(400).json({ error: created.error });
    return;
  }
  const appended = appendSymptomLog(db.symptomLogs.get(scope) ?? [], created.entry);
  if (!appended.ok) {
    res.status(400).json({ error: appended.error });
    return;
  }
  db.symptomLogs.set(scope, appended.entries);
  res.status(201).json(
    buildSymptomSummary({ entries: appended.entries, regimen: db.regimens.get(scope) ?? [] }),
  );
});

app.get("/companion/symptoms/:userId/export", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const scope = companionScope(user.id, String(req.query.dependantId ?? "") || null);
  if (typeof scope === "object") {
    res.status(404).json(scope);
    return;
  }
  const summary = buildSymptomSummary({
    entries: db.symptomLogs.get(scope) ?? [],
    regimen: db.regimens.get(scope) ?? [],
  });
  const format = String(req.query.format ?? "json");
  if (format === "text") {
    res.type("text/plain").send(summary.exportText);
    return;
  }
  res.json(summary);
});

app.post("/companion/interactions/check", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    moleculeIds: z.array(z.string()).optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_interaction_check");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Full interaction check requires Student or Professional",
      upgradeTo: gate.upgradeTo,
    });
    return;
  }
  const ids =
    parsed.data.moleculeIds ??
    (db.regimens.get(user.id) ?? []).map((r) => r.moleculeId);
  const nameById = new Map(db.molecules.map((m) => [m.id, m.innName]));
  const result = checkRegimenInteractions(ids, db.interactions, nameById);
  res.json(result);
});

/* ── Full-regimen clash board (Build Spec §12 — Pro) ── */
app.post("/tools/clash-board", (req, res) => {
  const schema = z.object({
    userId: z.string().optional(),
    moleculeIds: z.array(z.string()).optional(),
    moleculeSlugs: z.array(z.string()).optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = parsed.data.userId ? requireUser(parsed.data.userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "clash_board");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Clash board is a Professional feature",
      upgradeTo: gate.upgradeTo,
      prices: TIER_PRICES_ZAR,
    });
    return;
  }

  const fromSlugs = (parsed.data.moleculeSlugs ?? [])
    .map((slug) => getMoleculeBySlug(slug.trim()))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => m.id);

  const fromIds = parsed.data.moleculeIds ?? [];
  const fromRegimen = user ? (db.regimens.get(user.id) ?? []).map((r) => r.moleculeId) : [];
  const ids = [...(fromSlugs.length || fromIds.length ? [...fromSlugs, ...fromIds] : fromRegimen)];
  if (ids.length === 0) {
    res.status(400).json({
      error: "Provide moleculeSlugs, moleculeIds, or a saved companion regimen",
    });
    return;
  }

  const regimen = ids.map((id) => {
    const mol = db.molecules.find((m) => m.id === id);
    const fromSaved = user
      ? (db.regimens.get(user.id) ?? []).find((r) => r.moleculeId === id)
      : undefined;
    return {
      moleculeId: id,
      moleculeName: fromSaved?.moleculeName ?? mol?.innName ?? id,
    };
  });

  const safetyByMoleculeId = new Map(
    db.safetyProfiles.filter((s) => ids.includes(s.moleculeId)).map((s) => [s.moleculeId, s] as const),
  );

  const board = buildClashBoard({
    regimen,
    molecules: db.molecules,
    interactions: db.interactions,
    safetyByMoleculeId,
  });
  res.json(board);
});

/* ── Clinical pearl feed (Build Spec §12 — Pro) ── */
app.get("/pearls/today", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "pearl_feed");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Clinical pearl feed is a Professional feature",
      upgradeTo: gate.upgradeTo,
      prices: TIER_PRICES_ZAR,
    });
    return;
  }

  const specialtyAreas = String(req.query.specialty ?? "")
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const weakAreas = String(req.query.weak ?? "")
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const limit = Number(req.query.limit ?? 5);

  const catalog = collectPublishedPearls(db.molecules, db.safetyProfiles);
  const feed = buildPearlFeed({
    catalog,
    sources: db.sources,
    specialtyAreas,
    weakAreas,
    userKey: user?.id ?? "anon",
    limit: Number.isFinite(limit) ? limit : 5,
  });
  res.json(feed);
});

/* ── Plain-English insert translator (Build Spec §9) ── */
app.get("/tools/insert/:moleculeSlug", (req, res) => {
  const levelRaw = String(req.query.level ?? "grade5");
  const level = levelRaw === "professional" ? "professional" : "grade5";
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "insert_translator");
  if (!gate.allowed) {
    res.status(402).json({
      error: "Insert translator not available on this tier",
      upgradeTo: gate.upgradeTo,
      prices: TIER_PRICES_ZAR,
    });
    return;
  }

  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  const doc = findInsertDocument({
    moleculeSlug: req.params.moleculeSlug,
    moleculeId: mol?.id,
    productId: String(req.query.productId ?? "") || undefined,
  });
  const result = translateInsert({
    document: doc,
    level,
    sources: db.sources,
  });
  res.json({
    moleculeSlug: req.params.moleculeSlug,
    moleculeName: mol?.innName,
    ...result,
  });
});

app.get("/tools/inserts", (_req, res) => {
  res.json({
    documents: listInsertDocuments().map((d) => ({
      id: d.id,
      moleculeSlug: d.moleculeSlug,
      brandName: d.brandName,
      levels: d.passages.filter((p) => p.publishState === "published").map((p) => p.level),
    })),
    note: "Educational Materia excerpts only — not commercial PIL reproductions.",
  });
});

/* ── Companion reminders + messaging (Doc 16 WhatsApp/SMS/email) ── */
app.get("/companion/messaging/status", (_req, res) => {
  res.json({
    providers: messagingProvidersStatus(),
    note: "Stub logs locally until Resend/Twilio keys + DPA are configured. No clinical free-text to model providers.",
  });
});

app.put("/companion/reminders/prefs/:userId", (req, res) => {
  const schema = z.object({
    channels: z.array(z.enum(["in_app", "email", "sms", "whatsapp"])).min(1),
    phoneE164: z.string().optional(),
    email: z.string().email().optional(),
    timezone: z.string().default("Africa/Johannesburg"),
    consentMessaging: z.boolean(),
  });
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  if (!parsed.data.consentMessaging) {
    res.status(400).json({
      error: "POPIA messaging consent required before enabling reminders off-device.",
      code: "MESSAGING_CONSENT_REQUIRED",
    });
    return;
  }
  const prefs = {
    userId: user.id,
    channels: parsed.data.channels as ReminderChannel[],
    phoneE164: parsed.data.phoneE164,
    email: parsed.data.email ?? user.email,
    timezone: parsed.data.timezone,
    popiaMessagingConsentAt: new Date().toISOString(),
  };
  db.reminderPrefs.set(user.id, prefs);
  res.json({ prefs });
});

app.get("/companion/reminders/:userId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const regimen = db.regimens.get(user.id) ?? [];
  const fromHhmm = String(req.query.from ?? "08:00");
  res.json({
    upcoming: previewUpcoming({ regimen, fromHhmm, hoursAhead: 24 }),
    prefs: db.reminderPrefs.get(user.id) ?? null,
    recent: db.reminderDispatchLog.filter((l) => l.to === user.id || l.to === user.email).slice(-20),
    disclaimer: "Reminders are support only and never change your dose.",
  });
});

app.post("/companion/reminders/dispatch", async (req, res) => {
  const schema = z.object({
    userId: z.string(),
    nowHhmm: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "companion_schedule");
  if (!gate.allowed) {
    res.status(402).json({ error: "Companion not available", upgradeTo: gate.upgradeTo });
    return;
  }
  const prefs = db.reminderPrefs.get(user.id);
  if (!prefs?.popiaMessagingConsentAt) {
    res.status(400).json({
      error: "Set reminder preferences with messaging consent first.",
      code: "MESSAGING_CONSENT_REQUIRED",
    });
    return;
  }
  const regimen = db.regimens.get(user.id) ?? [];
  const due = dueRemindersAt({
    userId: user.id,
    regimen,
    prefs,
    nowHhmm: parsed.data.nowHhmm,
  });
  const results = [];
  for (const reminder of due) {
    const outbound = toOutboundMessage(reminder, {
      email: prefs.email ?? user.email,
      phoneE164: prefs.phoneE164,
    });
    if (!outbound) {
      results.push({
        channel: reminder.channel,
        provider: "stub" as const,
        status: "skipped" as const,
        to: "",
        detail: "Missing destination for channel",
      });
      continue;
    }
    const sent = await sendOutbound(outbound);
    db.reminderDispatchLog.push({
      ...sent,
      at: new Date().toISOString(),
      moleculeId: reminder.moleculeId,
    });
    results.push(sent);
  }
  res.json({
    nowHhmm: parsed.data.nowHhmm,
    dueCount: due.length,
    results,
    note: "Support reminders only. Confirm against the labelled product.",
  });
});

/* ── Tiers / Paystack billing (Doc 6 / Doc 16) ── */
app.get("/billing/tiers", (_req, res) => {
  res.json({
    prices: TIER_PRICES_ZAR,
    provider: paystackConfigured() ? "paystack" : "stub",
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || null,
    note: paystackConfigured()
      ? "Paystack live initialize enabled. Tier activates on charge.success webhook."
      : "Stub checkout — no charges. Set PAYSTACK_SECRET_KEY for live checkout.",
  });
});

app.post("/billing/subscribe", async (req, res) => {
  const schema = z.object({
    userId: z.string(),
    tier: z.enum(["free", "student", "professional"]),
    studentVerified: z.boolean().optional(),
    callbackUrl: z.string().url().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  if (parsed.data.tier === "student" && !parsed.data.studentVerified && !user.studentVerified) {
    res.status(403).json({
      error: "Student tier requires verification (institution email or SAPC student registration).",
      code: "STUDENT_VERIFICATION_REQUIRED",
    });
    return;
  }
  if (parsed.data.studentVerified) {
    user.studentVerified = true;
  }

  if (parsed.data.tier === "free") {
    const result = setUserTier(user.id, "free", { provider: "stub", status: "active", applyTierNow: true });
    res.json({ ...result, checkout: null });
    return;
  }

  if (!isBillableTier(parsed.data.tier)) {
    res.status(400).json({ error: "Tier not billable via self-serve checkout" });
    return;
  }

  const callbackUrl =
    parsed.data.callbackUrl ??
    `${process.env.PUBLIC_WEB_URL ?? "http://localhost:3000"}/pricing?paid=1`;

  try {
    const checkout = await createCheckoutSession({
      userId: user.id,
      email: user.email,
      tier: parsed.data.tier,
      callbackUrl,
    });
    const live = checkout.provider === "paystack";
    const result = setUserTier(user.id, parsed.data.tier, {
      provider: checkout.provider,
      status: live ? "pending_payment" : "active",
      reference: checkout.reference,
      applyTierNow: !live,
    });
    res.json({ ...result, checkout });
  } catch (err) {
    res.status(502).json({
      error: err instanceof Error ? err.message : "Checkout initialize failed",
    });
  }
});

app.post("/billing/webhook/paystack", (req, res) => {
  const raw =
    (req as express.Request & { rawBody?: string }).rawBody ?? JSON.stringify(req.body ?? {});
  const secret = process.env.PAYSTACK_SECRET_KEY?.trim() ?? "";
  const signature = req.header("x-paystack-signature") ?? undefined;
  if (paystackConfigured() && !verifyPaystackSignature(raw, signature, secret, hmacSha512Hex)) {
    res.status(401).json({ error: "Invalid Paystack signature" });
    return;
  }
  const event = (raw ? JSON.parse(raw) : req.body) as Parameters<typeof parsePaystackChargeSuccess>[0];
  const parsed = parsePaystackChargeSuccess(event);
  if (!parsed.ok) {
    res.json({ received: true, handled: false, reason: parsed.reason });
    return;
  }
  const activated = activateSubscription(parsed.reference, parsed.userId, parsed.tier);
  if (!activated) {
    res.status(404).json({ error: "User not found for webhook metadata" });
    return;
  }
  res.json({ received: true, handled: true, subscription: activated.subscription });
});

app.post("/auth/stub-session", (req, res) => {
  if (process.env.AUTH_STUB_MODE === "false") {
    res.status(501).json({ error: "Stub auth disabled — configure Supabase" });
    return;
  }
  const schema = z.object({
    email: z.string().email(),
    mode: z.enum(["patient", "student", "pharmacist", "doctor"]),
    displayName: z.string().optional(),
    tier: z.enum(["free", "student", "professional", "institution"]).optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = upsertStubUser(parsed.data);
  res.json({ user });
});

app.post("/consent", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    consentType: z.enum(["popia", "medical_disclaimer"]),
    version: z.string().default("2026-07-01"),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const entry = logConsent(parsed.data.userId, parsed.data.consentType, parsed.data.version);
  res.json({ entry });
});

app.get("/users/:id", (req, res) => {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json({
    user,
    subscription: db.subscriptions.find((s) => s.userId === user.id) ?? null,
  });
});

/* ── CPD dashboard (Build Spec §7.7 / §12 — Pro) ── */
app.get("/cpd/modules", (_req, res) => {
  res.json({ modules: CPD_MODULES, disclaimer: CPD_DISCLAIMER, annualTarget: annualCreditsTarget() });
});

app.get("/cpd/dashboard/:userId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "cpd_dashboard");
  if (!gate.allowed) {
    res.status(402).json({ error: "CPD dashboard is a Professional feature", upgradeTo: gate.upgradeTo });
    return;
  }
  const earned = db.cpdEvents.filter((e) => e.userId === user.id);
  const total = earned.reduce((a, e) => a + e.credits, 0);
  res.json({
    disclaimer: CPD_DISCLAIMER,
    annualTarget: annualCreditsTarget(),
    creditsEarned: total,
    events: earned,
    certificates: db.cpdCertificates.filter((c) => c.userId === user.id),
    modules: CPD_MODULES.map((m) => {
      const course = getCourseById(m.courseId);
      const progress = getOrCreateProgress(user.id, m.courseId);
      const lessonsTotal = course?.lessons.filter((l) => l.publishState === "published").length ?? 0;
      const gateStatus = canAwardCpd({
        module: m,
        lessonsCompleted: progress.completedLessonIds.length,
        lessonsTotal,
        quizCorrect: progress.quizCorrect,
        alreadyAwarded: earned.some((e) => e.moduleId === m.id),
      });
      return { ...m, progress, eligibility: gateStatus };
    }),
  });
});

app.post("/cpd/claim", (req, res) => {
  const schema = z.object({ userId: z.string(), moduleId: z.string() });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "cpd_dashboard");
  if (!gate.allowed) {
    res.status(402).json({ error: "CPD is a Professional feature", upgradeTo: gate.upgradeTo });
    return;
  }
  const mod = getCpdModule(parsed.data.moduleId);
  if (!mod) {
    res.status(404).json({ error: "Module not found" });
    return;
  }
  const course = getCourseById(mod.courseId);
  const progress = getOrCreateProgress(user.id, mod.courseId);
  const lessonsTotal = course?.lessons.filter((l) => l.publishState === "published").length ?? 0;
  const eligibility = canAwardCpd({
    module: mod,
    lessonsCompleted: progress.completedLessonIds.length,
    lessonsTotal,
    quizCorrect: progress.quizCorrect,
    alreadyAwarded: db.cpdEvents.some((e) => e.userId === user.id && e.moduleId === mod.id),
  });
  if (!eligibility.ok) {
    res.status(400).json({ error: eligibility.reason, disclaimer: CPD_DISCLAIMER });
    return;
  }
  const cert = buildCertificate({
    userId: user.id,
    holderName: user.displayName ?? user.email,
    module: mod,
  });
  const event = {
    id: `cpd-evt-${db.cpdEvents.length + 1}`,
    userId: user.id,
    moduleId: mod.id,
    credits: mod.credits,
    awardedAt: cert.issuedAt,
    certificateId: cert.id,
  };
  db.cpdEvents.push(event);
  db.cpdCertificates.push(cert);
  res.json({ event, certificate: cert, disclaimer: CPD_DISCLAIMER });
});

/* ── Vision scan resolve (Build Spec §9.5 — Pro) ── */
app.post("/tools/vision/resolve", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    input: z.string().min(1).max(200),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "vision_scan");
  if (!gate.allowed) {
    res.status(402).json({ error: "Vision scan is a Professional feature", upgradeTo: gate.upgradeTo });
    return;
  }
  const hits = resolveProductScan(
    parsed.data.input,
    db.molecules,
    db.products,
    DEMO_BARCODE_INDEX,
  );
  res.json({
    hits,
    note: "Suggestive only — confirm the physical pack. Try a barcode, brand, or form cue (e.g. inhaler). Camera capture hooks later; imprint codes are never invented.",
  });
});

/* ── Voice script payload (TTS client-side — Student+) ── */
app.get("/tools/voice/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "voice_mode");
  if (!gate.allowed) {
    res.status(402).json({ error: "Voice mode requires Student or Professional", upgradeTo: gate.upgradeTo });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const lang = (String(req.query.lang ?? "en") as CounsellingLang) || "en";
  const script = getCounsellingScript(mol.id, lang);
  const moa = mol.moaSummary?.publishState === "published" ? mol.moaSummary.value : "";
  const text = [
    `${mol.innName}.`,
    moa,
    ...(script?.lines ?? []),
    "This is a reference tool. Confirm clinically before acting.",
  ]
    .filter(Boolean)
    .join(" ");
  res.json({
    moleculeSlug: mol.slug,
    lang,
    text,
    note: "Client should use browser speechSynthesis / device TTS. No patient identifiers in payload.",
  });
});

/* ── Institution console (Build Spec §11 / Doc 8 A9) ── */
app.post("/institution/orgs", (req, res) => {
  const schema = z.object({
    adminUserId: z.string(),
    name: z.string().min(2),
    kind: z.enum(["university", "hospital", "pharmacy_chain", "other"]),
    seatLimit: z.number().int().positive().default(50),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const admin = requireUser(parsed.data.adminUserId);
  if (!admin) {
    res.status(401).json({ error: "Unknown admin user" });
    return;
  }
  // Elevate to institution tier for console access
  admin.tier = "institution";
  const org = createOrganisation(parsed.data.name, parsed.data.kind, parsed.data.seatLimit);
  db.organisations.push(org);
  admin.orgId = org.id;
  const seat = {
    id: `seat-${db.seats.length + 1}`,
    orgId: org.id,
    userId: admin.id,
    role: "admin" as const,
    joinedAt: new Date().toISOString(),
  };
  db.seats.push(seat);
  res.json({ org, seat });
});

app.post("/institution/seats", (req, res) => {
  const schema = z.object({
    orgId: z.string(),
    adminUserId: z.string(),
    memberEmail: z.string().email(),
    memberMode: z.enum(["patient", "student", "pharmacist", "doctor"]).default("student"),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const admin = requireUser(parsed.data.adminUserId);
  const org = db.organisations.find((o) => o.id === parsed.data.orgId);
  if (!admin || !org) {
    res.status(404).json({ error: "Org or admin not found" });
    return;
  }
  const gate = gateFeature(admin.tier as Tier, "institution_console");
  if (!gate.allowed) {
    res.status(402).json({ error: "Institution console required", upgradeTo: "institution" });
    return;
  }
  const isAdmin = db.seats.some(
    (s) => s.orgId === org.id && s.userId === admin.id && s.role === "admin",
  );
  if (!isAdmin) {
    res.status(403).json({ error: "Admin seat required" });
    return;
  }
  if (!canAddSeat(org, db.seats)) {
    res.status(400).json({ error: "Seat limit reached" });
    return;
  }
  const member = upsertStubUser({
    email: parsed.data.memberEmail,
    mode: parsed.data.memberMode,
    tier: "student",
  });
  member.orgId = org.id;
  const seat = {
    id: `seat-${db.seats.length + 1}`,
    orgId: org.id,
    userId: member.id,
    role: "member" as const,
    joinedAt: new Date().toISOString(),
  };
  db.seats.push(seat);
  res.json({ member, seat });
});

app.post("/institution/cohorts", (req, res) => {
  const schema = z.object({
    orgId: z.string(),
    adminUserId: z.string(),
    name: z.string().min(2),
    memberUserIds: z.array(z.string()).default([]),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const admin = requireUser(parsed.data.adminUserId);
  if (!admin || !gateFeature(admin.tier as Tier, "institution_console").allowed) {
    res.status(402).json({ error: "Institution console required" });
    return;
  }
  const cohort = {
    id: `cohort-${db.cohorts.length + 1}`,
    orgId: parsed.data.orgId,
    name: parsed.data.name,
    memberUserIds: parsed.data.memberUserIds,
  };
  db.cohorts.push(cohort);
  res.json({ cohort });
});

app.get("/institution/:orgId/analytics", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = requireUser(userId);
  if (!user || !gateFeature(user.tier as Tier, "institution_console").allowed) {
    res.status(402).json({ error: "Institution console required" });
    return;
  }
  const org = db.organisations.find((o) => o.id === req.params.orgId);
  if (!org) {
    res.status(404).json({ error: "Org not found" });
    return;
  }
  const seats = db.seats.filter((s) => s.orgId === org.id);
  const cohorts = db.cohorts.filter((c) => c.orgId === org.id);
  const analytics = cohorts.map((c) => {
    const progress = c.memberUserIds.flatMap((uid) =>
      db.progress
        .filter((p) => p.userId === uid)
        .map((p) => {
          const course = getCourseById(p.courseId);
          const total = course?.lessons.filter((l) => l.publishState === "published").length ?? 1;
          return {
            userId: uid,
            completionPercent: courseCompletionPercent(p.completedLessonIds, total),
            quizAttempts: p.quizAttempts,
            quizCorrect: p.quizCorrect,
          };
        }),
    );
    return computeCohortAnalytics(c, progress);
  });
  res.json({ org, seats, cohorts, analytics });
});

/* ── Ambassador / referral (Doc 5 growth loop) ── */
app.post("/ambassador/code", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    kind: z.enum(["ambassador", "standard"]).default("standard"),
    campusLabel: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "ambassador_tools");
  if (!gate.allowed) {
    res.status(402).json({ error: "Ambassador tools unavailable", upgradeTo: gate.upgradeTo });
    return;
  }
  const existing = db.referralCodes.find((c) => c.ownerUserId === user.id && c.kind === parsed.data.kind);
  if (existing) {
    res.json({ code: existing });
    return;
  }
  const code = {
    code: generateReferralCode(user.id, parsed.data.kind),
    ownerUserId: user.id,
    createdAt: new Date().toISOString(),
    kind: parsed.data.kind,
    campusLabel: parsed.data.campusLabel,
  };
  db.referralCodes.push(code);
  res.json({ code });
});

app.post("/ambassador/redeem", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    code: z.string().min(3),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const user = requireUser(parsed.data.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const normalized = normalizeReferralCode(parsed.data.code);
  const code = db.referralCodes.find((c) => c.code === normalized);
  const eligibility = canRedeemReferral({
    code,
    refereeUserId: user.id,
    existingRedemptions: db.referralRedemptions,
  });
  if (!eligibility.ok || !code) {
    res.status(400).json({ error: eligibility.reason ?? "Invalid code" });
    return;
  }
  const redemption = {
    id: `red-${db.referralRedemptions.length + 1}`,
    code: code.code,
    referrerUserId: code.ownerUserId,
    refereeUserId: user.id,
    redeemedAt: new Date().toISOString(),
  };
  db.referralRedemptions.push(redemption);
  const credits = buildReferralCredits({ redemption, code });
  db.referralCredits.push(...credits);
  res.json({
    redemption,
    credits,
    note: "Referral credits are in-app units until Paystack rewards are configured.",
  });
});

app.get("/ambassador/dashboard/:userId", (req, res) => {
  const user = requireUser(req.params.userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const codes = db.referralCodes.filter((c) => c.ownerUserId === user.id);
  const redemptions = db.referralRedemptions.filter((r) => r.referrerUserId === user.id);
  const credits = db.referralCredits.filter((c) => c.userId === user.id);
  res.json({
    codes,
    redemptions,
    credits,
    creditBalance: sumCredits(db.referralCredits, user.id),
    note: "Campus ambassadors: status + referral credit. No clinical privilege.",
  });
});

/* ── Counselling handout export (Build Spec §12) ── */
app.get("/tools/handout/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = userId ? requireUser(userId) : null;
  const tier = (user?.tier ?? "free") as Tier;
  const gate = gateFeature(tier, "handout_export");
  if (!gate.allowed) {
    res.status(402).json({ error: "Handout export gated", upgradeTo: gate.upgradeTo });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const lang = (String(req.query.lang ?? "en") as CounsellingLang) || "en";
  const script = getCounsellingScript(mol.id, lang);
  if (!script || script.publishState !== "published") {
    res.status(404).json({
      error: "No published counselling script for this language",
      available: listCounsellingLangs(mol.id),
    });
    return;
  }
  const handout = buildCounsellingHandout({
    molecule: mol,
    lang,
    lines: script.lines,
    sourceNote: script.sourceNote,
  });
  if (String(req.query.format ?? "") === "html") {
    res.type("html").send(handout.html);
    return;
  }
  res.json(handout);
});

/* ── Shortage / availability (Build Spec §5.6 — Pro) ── */
app.get("/tools/availability/:moleculeSlug", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = requireUser(userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "shortage_alerts");
  if (!gate.allowed) {
    res.status(402).json({ error: "Shortage alerts are a Professional feature", upgradeTo: gate.upgradeTo });
    return;
  }
  const mol = getMoleculeBySlug(req.params.moleculeSlug);
  if (!mol) {
    res.status(404).json({ error: "Molecule not found" });
    return;
  }
  const rows = buildAvailabilityForMolecule({
    moleculeId: mol.id,
    products: db.products,
    signals: db.availabilitySignals,
  });
  res.json({
    moleculeSlug: mol.slug,
    rows,
    note: "Illustrative wholesaler signals until live feeds. Confirm stock locally before substituting.",
  });
});

app.get("/tools/shortages", (req, res) => {
  const userId = String(req.query.userId ?? "");
  const user = requireUser(userId);
  if (!user) {
    res.status(401).json({ error: "Unknown user" });
    return;
  }
  const gate = gateFeature(user.tier as Tier, "shortage_alerts");
  if (!gate.allowed) {
    res.status(402).json({ error: "Shortage alerts are a Professional feature", upgradeTo: gate.upgradeTo });
    return;
  }
  res.json({
    shortages: listActiveShortages(db.products, db.availabilitySignals),
    note: "Published shortage/limited signals only. Not a wholesaler order system.",
  });
});

/* ── Product analytics (Doc 20 — POPIA-minimised) ── */
app.post("/analytics/events", (req, res) => {
  const schema = z.object({
    events: z
      .array(
        z.object({
          name: z.string(),
          props: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
          sessionId: z.string().optional(),
          tier: z.string().optional(),
          mode: z.string().optional(),
        }),
      )
      .min(1)
      .max(50),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const accepted = [];
  const rejected = [];
  for (const raw of parsed.data.events) {
    const built = buildAnalyticsEvent(raw);
    if (!built.ok) {
      rejected.push({ name: raw.name, reason: built.reason });
      continue;
    }
    db.analyticsEvents.push(built.event);
    // Cap in-memory buffer
    if (db.analyticsEvents.length > 5000) {
      db.analyticsEvents.splice(0, db.analyticsEvents.length - 5000);
    }
    accepted.push(built.event.id);
  }
  res.json({ accepted: accepted.length, rejected, note: "No clinical free-text stored." });
});

app.get("/analytics/summary", (_req, res) => {
  res.json(summarizeAnalytics(db.analyticsEvents));
});

/* ── Founder clinical review console (constitution 3.2–3.3) ── */
app.get("/review/coverage", (_req, res) => {
  res.json(
    summarizeCoverage({
      molecules: db.molecules,
      safetyProfiles: db.safetyProfiles,
    }),
  );
});

app.get("/review/queue", (req, res) => {
  const area = String(req.query.area ?? "").trim();
  const statesRaw = String(req.query.states ?? "draft,reviewed");
  const states = statesRaw
    .split(",")
    .map((s) => s.trim())
    .filter((s): s is "draft" | "reviewed" | "published" =>
      s === "draft" || s === "reviewed" || s === "published",
    );
  let items = buildReviewQueue({
    molecules: db.molecules,
    safetyProfiles: db.safetyProfiles,
    states: states.length ? states : ["draft", "reviewed"],
  });
  if (area) items = items.filter((i) => i.therapeuticArea === area);
  res.json({
    count: items.length,
    items,
    note: "Founder gate only. Publishing never invents clinical text — it only changes publishState.",
  });
});

app.post("/review/decide", (req, res) => {
  const schema = z.object({
    queueItemId: z.string(),
    decision: z.enum(["keep_draft", "mark_reviewed", "publish"]),
    reviewerLabel: z.string().min(2),
    attestation: z.string().optional(),
    note: z.string().optional(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const queue = buildReviewQueue({
    molecules: db.molecules,
    safetyProfiles: db.safetyProfiles,
    states: ["draft", "reviewed", "published"],
  });
  const item = queue.find((i) => i.id === parsed.data.queueItemId);
  if (!item) {
    res.status(404).json({ error: "Queue item not found" });
    return;
  }
  const gate = validateReviewDecision({
    item,
    decision: parsed.data.decision,
    attestation: parsed.data.attestation,
  });
  if (!gate.ok) {
    res.status(400).json({ error: gate.reason });
    return;
  }
  const next = nextPublishState(item.publishState, parsed.data.decision);
  const applied = applyFactPublishState(item.moleculeId, item.fieldPath, next);
  if (!applied) {
    res.status(500).json({ error: "Could not locate fact to update" });
    return;
  }
  const decision = {
    id: `rev-${db.reviewDecisions.length + 1}`,
    queueItemId: item.id,
    decision: parsed.data.decision,
    reviewerLabel: parsed.data.reviewerLabel,
    attestation: parsed.data.attestation,
    at: new Date().toISOString(),
    note: parsed.data.note,
  };
  db.reviewDecisions.push(decision);

  let persisted: { ok: true; seedFile: string } | { ok: false; reason: string } | null = null;
  if (reviewPersistEnabled()) {
    persisted = persistReviewDecision({
      decision,
      moleculeId: item.moleculeId,
      fieldPath: item.fieldPath,
      publishState: next,
    });
    if (!persisted.ok) {
      res.status(500).json({
        error: "In-memory update ok but seed write-back failed",
        reason: persisted.reason,
        decision,
      });
      return;
    }
  }

  res.json({
    decision,
    item: { ...item, publishState: next },
    persisted: persisted?.ok ? { seedFile: persisted.seedFile } : null,
    note: reviewPersistEnabled()
      ? "publishState written to content/seed + decisions.jsonl (text unchanged)."
      : "In-memory only (REVIEW_PERSIST=false).",
  });
});

app.get("/review/decisions", (_req, res) => {
  res.json({ decisions: db.reviewDecisions.slice(-100) });
});

/* ── Ingest preview (Doc 16 — admin/content tooling) ── */
app.post("/ingest/preview", (req, res) => {
  const schema = z.object({
    kind: z.enum(["sahpra", "sep"]),
    csv: z.string().min(10).max(200_000),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const preview =
    parsed.data.kind === "sahpra"
      ? validateSahpraRows(sahpraFromCsv(parsed.data.csv))
      : validateSepRows(sepFromCsv(parsed.data.csv));
  res.json({
    preview,
    warning: "Draft-only. Does not mutate published seed or live prices.",
  });
});

app.post("/ingest/fetch-preview", async (req, res) => {
  const schema = z.object({
    kind: z.enum(["sahpra", "sep"]),
  });
  const parsed = schema.safeParse(req.body ?? {});
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const fixtureName = parsed.data.kind === "sahpra" ? "sahpra-sample.csv" : "sep-sample.csv";
  const fixturePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "../../content/ingest/fixtures",
    fixtureName,
  );
  const fixtureText = readFileSync(fixturePath, "utf8");
  const feed = await loadPublicFeed({
    kind: parsed.data.kind,
    url: parsed.data.kind === "sahpra" ? process.env.SAHPRA_FEED_URL : process.env.SEP_FEED_URL,
    fixtureText,
  });
  const preview =
    parsed.data.kind === "sahpra"
      ? validateSahpraRows(sahpraFromCsv(feed.text))
      : validateSepRows(sepFromCsv(feed.text));
  res.json({
    feed: { origin: feed.origin, note: feed.note, url: feed.url },
    preview,
    warning: "Draft-only. Live pulls never auto-publish.",
  });
});

app.listen(PORT, () => {
  console.log(`Materia API listening on http://localhost:${PORT}`);
});
