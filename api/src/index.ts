import cors from "cors";
import express from "express";
import { z } from "zod";
import { calculateDose, resolveSearch, type UserMode } from "@materia/shared";
import { buildMolecule360 } from "./moleculeView.js";
import { askMolecule } from "./rag.js";
import { db, logConsent, upsertStubUser } from "./store.js";

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(cors());
app.use(express.json({ limit: "32kb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "materia-api", molecules: db.molecules.length });
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
  // Never accept patient identifiers as first-class fields
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
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const result = calculateDose(parsed.data, db.doseRules);
  res.json(result);
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
  res.json({ user });
});

app.listen(PORT, () => {
  console.log(`Materia API listening on http://localhost:${PORT}`);
});
