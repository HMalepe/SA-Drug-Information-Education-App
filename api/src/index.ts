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
  buildAvailabilityForMolecule,
  buildCertificate,
  buildCounsellingHandout,
  buildLocumBrief,
  buildOfflineEssential,
  buildReferralCredits,
  buildSubstitutionOptions,
  calculateDose,
  canAddSeat,
  canAwardCpd,
  canRedeemReferral,
  checkRegimenInteractions,
  computeCohortAnalytics,
  courseCompletionPercent,
  createOrganisation,
  expertLevelFromPercent,
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
  matchFormularyAndCoPay,
  normalizeReferralCode,
  parsePaystackChargeSuccess,
  resolveProductScan,
  resolveSearch,
  sahpraFromCsv,
  sepFromCsv,
  sumCredits,
  validateSahpraRows,
  validateSepRows,
  verifyPaystackSignature,
  type CounsellingLang,
  type ScheduleCode,
  type Tier,
  type UserMode,
} from "@materia/shared";
import { createCheckoutSession, hmacSha512Hex, paystackConfigured } from "./billing/paystack.js";
import { buildMolecule360 } from "./moleculeView.js";
import { askMolecule } from "./rag.js";
import {
  activateSubscription,
  completeLesson,
  db,
  getCourseById,
  getMoleculeBySlug,
  getOrCreateProgress,
  getSafety,
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

app.get("/molecules", (_req, res) => {
  res.json({
    molecules: db.molecules
      .filter((m) => m.publishState === "published")
      .map((m) => ({
        id: m.id,
        slug: m.slug,
        innName: m.innName,
        className: m.className,
        therapeuticArea: m.therapeuticArea,
        hasCourse: Boolean(db.courses.find((c) => c.moleculeId === m.id && c.publishState === "published")),
      })),
  });
});

app.get("/molecules/:slug", (req, res) => {
  const mode = (String(req.query.mode ?? "pharmacist") as UserMode) || "pharmacist";
  const view = buildMolecule360(req.params.slug, mode);
  if (!view) {
    res.status(404).json({ error: "Molecule not found or not published" });
    return;
  }
  res.json(view);
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
  res.json({
    regimen: db.regimens.get(user.id) ?? [],
    disclaimer:
      "Reminders are support only. Materia never tells you to change or stop a medicine — speak to your pharmacist or doctor.",
  });
});

app.put("/companion/regimen/:userId", (req, res) => {
  const schema = z.object({
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
  db.regimens.set(user.id, parsed.data.items);
  res.json({ regimen: parsed.data.items });
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
    note: "Suggestive only — confirm the physical pack. Camera capture hooks in next iteration.",
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

app.listen(PORT, () => {
  console.log(`Materia API listening on http://localhost:${PORT}`);
});
