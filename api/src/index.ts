import cors from "cors";
import express from "express";
import { z } from "zod";
import {
  TIER_PRICES_ZAR,
  calculateDose,
  checkRegimenInteractions,
  courseCompletionPercent,
  expertLevelFromPercent,
  gateFeature,
  gradeQuizAnswer,
  resolveSearch,
  type Tier,
  type UserMode,
} from "@materia/shared";
import { buildMolecule360 } from "./moleculeView.js";
import { askMolecule } from "./rag.js";
import {
  completeLesson,
  db,
  getCourseById,
  getOrCreateProgress,
  logConsent,
  recordQuizAttempt,
  setUserTier,
  upsertStubUser,
} from "./store.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json({ limit: "32kb" }));

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

/* ── Tiers / billing stub (Doc 6 — Paystack later) ── */
app.get("/billing/tiers", (_req, res) => {
  res.json({
    prices: TIER_PRICES_ZAR,
    provider: process.env.PAYSTACK_SECRET_KEY ? "paystack" : "stub",
    note: "Launch pricing hypothesis — wire Paystack when ready. No charges in stub mode.",
  });
});

app.post("/billing/subscribe", (req, res) => {
  const schema = z.object({
    userId: z.string(),
    tier: z.enum(["free", "student", "professional"]),
    studentVerified: z.boolean().optional(),
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
    // soft gate — Doc 8 A3
    res.status(403).json({
      error: "Student tier requires verification (institution email or SAPC student registration).",
      code: "STUDENT_VERIFICATION_REQUIRED",
    });
    return;
  }
  if (parsed.data.studentVerified) {
    user.studentVerified = true;
  }
  const result = setUserTier(user.id, parsed.data.tier, "stub");
  res.json({
    ...result,
    checkout:
      parsed.data.tier === "free"
        ? null
        : {
            provider: "stub",
            amountZar: TIER_PRICES_ZAR[parsed.data.tier].monthly,
            message: "Paystack checkout URL will appear here when keys are configured.",
          },
  });
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

app.listen(PORT, () => {
  console.log(`Materia API listening on http://localhost:${PORT}`);
});
