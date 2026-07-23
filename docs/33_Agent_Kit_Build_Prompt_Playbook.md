MATERIA
The Agent Build Kit  Â·  Part 3 of 3
Build Prompt Playbook
The sequenced, copy-paste prompts that build Materia
How to use this playbook
Fire these prompts in order (P0 â†’ P9), one per fresh session. Each is self-contained and references the exact strategy docs it needs. Every prompt starts the agent in PLAN mode â€” it proposes an approach and waits for your approval before writing code. Copy everything inside a dark-headed box verbatim.
Prerequisite: the constitution (Part 2) is installed and the 30 docs are in /docs. These prompts assume the agent already has that context.

The universal preface
Optional but recommended â€” paste this once at the top of any session if you want to reinforce the workflow. The task prompts already imply it.
â– Universal preface
You are working on Materia. Obey CLAUDE.md absolutely.
Before this task: read the /docs files I reference, and web-search current
stable versions/APIs for any tool you'll use (don't trust memory on versions).
Work in PLAN mode first: produce your approach, the exact files you'll touch,
and a test plan. Write NO code until I approve. Flag anything touching clinical
safety, POPIA, or SAHPRA classification.
P0 Â· Bootstrap & scaffold
Sets up the monorepo, stack, tooling and CI. The foundation everything else lands on.
â– P0 â€” Bootstrap
Start in PLAN mode. Do not write code until I approve the plan.

TASK: Bootstrap the Materia monorepo.
READ FIRST: /docs/12-technical-architecture.md, /docs/18-development-plan.md, CLAUDE.md.
Before choosing versions, web-search the current stable release + setup docs for
each tool. Do not use memory for versions.

OBJECTIVE: Repo skeleton + tooling so we can build features next.
DELIVERABLES:
- Monorepo: /app (Expo), /web (Next.js), /api, /db, /content, /packages, /tests
- TypeScript strict everywhere; shared tsconfig; lint + format
- /packages/tokens design-token module seeded from /docs/10 (colour/type/spacing)
- Secrets handling (none in repo); .env.example
- CI: install, typecheck, lint, test on push
- README: how to run each app
- /docs folder ready to hold the 30 strategy documents (I will add them)

ACCEPTANCE:
- Each app builds and runs locally; CI passes on an empty test
- No secrets committed; design tokens are the single source of styling

Plan first (approach, exact files, the versions you verified, test plan). Wait.
P1 Â· Data model & schema
The molecule graph with per-fact sourcing â€” the most important build in the product.
â– P1 â€” Data model
Start in PLAN mode. Wait for approval.

TASK: Implement the Materia data model.
READ FIRST: /docs/13-data-model.md (authoritative) + Build Spec 13.

OBJECTIVE: The molecule graph with per-fact sourcing â€” the foundation the whole
product renders from.
REQUIREMENTS:
- Entities: Molecule, Product, Manufacturer, Excipient, SafetyProfile, Interaction,
  PriceRecord, FormularyEntry, Course/Lesson/Quiz, Source, User, Regimen, Progress,
  Organisation, Seat/Cohort, Referral, Subscription.
- CRITICAL (CLAUDE.md 3.2): every clinical field references a Source (citation,
  reviewer, last_reviewed). First-class relation, enforced at schema/type level.
- Content state (draft/reviewed/published) + version history on clinical fields (3.3).
- Organisation -> Seat -> Cohort present NOW (even if unused) â€” do not retrofit later.
- Personal/health data (Regimen etc.) modelled for POPIA: minimal, separable.
- Migrations + typed schema; seedable.

ACCEPTANCE:
- Matches /docs/13; migrations run clean
- Impossible to persist a clinical value without a Source (enforced, tested)
- Types generated + shared via /packages

Plan first (ERD, tables, keys, the sourcing-constraint mechanism, migrations). Wait.
P2 Â· The Medicine 360Â° page
The spine: one molecule across 15 standardized tabs, first seeded, then dynamic.
â– P2 â€” 360Â° page
Start in PLAN mode. Wait.

TASK: Build the Medicine 360 page â€” the product spine.
READ FIRST: Build Spec 4, /docs/9-user-experience.md, /docs/10-user-interface.md.

OBJECTIVE: One molecule rendered across the 15 standardized tabs â€” first for a
single seeded molecule, then dynamic from the P1 data model.
REQUIREMENTS:
- 15 tabs, fixed order (Build Spec 4). Same skeleton for EVERY molecule.
- Progressive depth; mode-aware (patient/pharmacist/student): depth+language change,
  structure never does.
- Every clinical value shows its source affordance (3.2; /docs/8 A5).
- Empty states are CONTENT, not errors ('no antidote - supportive').
- Design tokens only; fast on low-end Android; accessible (WCAG AA).

ACCEPTANCE:
- All tabs render for the seeded molecule from real data
- No clinical value renders without a source
- 'Ten-second answer' feel on hot tabs; meets /docs/9 + /docs/19 targets

Plan first (component structure, tab system, data fetching, mode handling). Wait.
P3 Â· Search & resolution
â– P3 â€” Search
Start in PLAN mode. Wait.

TASK: Molecule-first search + resolution.
READ FIRST: Build Spec 5.1, /docs/9.

OBJECTIVE: Any input (brand, molecule, misspelling, class) resolves to the correct
molecule page. 'Panado' lands on Paracetamol.
REQUIREMENTS:
- Brand/alias index -> molecule; fuzzy/misspelling tolerance; keyboard-first; instant feel.
- Design the interface to later extend into the 'Ask Materia' bar (/docs/8 A8).

ACCEPTANCE:
- Brand, generic + misspelled queries resolve for the seeded set
- Sub-second perceived results; resolution logic unit-tested (incl. misspellings)

Plan first. Wait.
P4 Â· Content pipeline + seed the first area
â– P4 â€” Content pipeline + seed
Start in PLAN mode. Wait.

TASK: Content authoring + review pipeline, and seed ONE therapeutic area fully.
READ FIRST: /docs/13, /docs/19-quality-assurance.md, /docs/25-operations.md, Build Spec 14.

OBJECTIVE: The machine that gets molecule content authored, sourced, reviewed and
published â€” plus ~20-40 molecules of one high-frequency area, fully covered.
REQUIREMENTS:
- Workflow: draft -> reviewed -> published (3.3). Unreviewed content cannot render.
- Every clinical field carries a Source (3.2); review audit: who/when/next-review.
- Ingestion for public data (SAHPRA register, SEP) with validation + provenance (/docs/16).
- ORIGINAL, owned content only â€” never reproduce licensed references (/docs/15).
- Seed the chosen area to FULL depth; no half-empty pages.

ACCEPTANCE:
- A molecule flows author -> source -> review -> publish through the pipeline
- Unreviewed content cannot render (enforced)
- Seeded area complete; passes the content-QA checklist (/docs/19)

Plan first (authoring model, review states, ingestion, seed plan). Wait.
P5 Â· Grounded AI explainer (RAG)
The AI layer â€” and the place the grounding contract is enforced in code.
â– P5 â€” Grounded AI
Start in PLAN mode. Wait.

TASK: The grounded AI layer (RAG) â€” explainer + tutor.
READ FIRST: /docs/17-ai-strategy.md, /docs/12, /docs/15 (s72), CLAUDE.md 3.1 + 4.

OBJECTIVE: Ask-anything about a molecule, answered ONLY from cited database content.
REQUIREMENTS (3.1 is the whole point):
- RAG: retrieve sourced chunks -> LLM composes -> citations carried through.
- If no adequate sourced content, the AI DECLINES + routes ('not yet in Materia' /
  'verify clinically'). It NEVER fabricates a clinical value.
- LLM behind an internal, swappable interface (/docs/16).
- NEVER send identifiable personal/health data to the model (4.2) â€” molecule content only.
- Cache + pre-generate static explanations; rate-limit endpoints.
- Prompt-injection safe: untrusted text can't override grounding or exfiltrate data.

ACCEPTANCE:
- Clinical answers always grounded + cited; unsourced questions declined, not guessed
- The P9 eval set passes: no invented doses; no personal data leaves region

Plan first (retrieval design, grounding enforcement, decline path, caching). Wait.
P6 Â· Public molecule pages (SEO)
â– P6 â€” Public SEO pages
Start in PLAN mode. Wait.

TASK: Public, indexable molecule pages (the SEO growth surface).
READ FIRST: /docs/8 (A1), /docs/5-marketing-strategy.md, /docs/10.

OBJECTIVE: Server-rendered/static public pages per molecule â€” fast, crawlable,
free-tier depth, clean sign-up boundary.
REQUIREMENTS:
- Reads the SAME molecule graph/API as the app (no duplicated content).
- SEO: structured metadata, structured-data markup, canonical URLs per molecule/brand,
  fast load, share cards.
- Free/paywalled boundary respected (/docs/6).
- Same source-visible, review-gated clinical rules apply (3.1-3.3).

ACCEPTANCE:
- Pages statically render, crawlable, strong performance/SEO scores
- Content parity via shared API; clinical rules honoured on the public surface

Plan first. Wait.
P7 Â· Accounts + POPIA consent
â– P7 â€” Accounts + consent
Start in PLAN mode. Wait.

TASK: Accounts, mode selection, and POPIA consent.
READ FIRST: /docs/14-security.md, /docs/15-legal-and-compliance.md, /docs/9, /docs/8 (A2,A3,A10).

OBJECTIVE: Sign-up, first-run mode select (Patient/Student/Pharmacist/Doctor),
student verification, and logged consent â€” POPIA-compliant.
REQUIREMENTS:
- Managed auth; MFA for pro/admin; SSO-ready for institutions.
- RBAC scoped by role x tier x org (/docs/14); users can't see others' data.
- Consent + medical-disclaimer flows, acknowledged and LOGGED (4; /docs/15).
- Health data minimised, separated, encrypted (4.1).
- Student-verification gate for the student tier (/docs/6, /docs/8 A3).

ACCEPTANCE:
- Auth + RBAC enforced and tested; consent captured + logged
- Disclaimer shown before clinical tools; no health data beyond what a feature needs

Plan first. Wait.
P8 Â· Dosing, overdose & the governed calculator
The highest-stakes features. The calculator is the SAHPRA boundary object â€” build it as reference support, never a directive.
â– P8 â€” Dosing/overdose/calculator
Start in PLAN mode. Wait.

TASK: Dosing hub, overdose/emergency block, and the governed dose calculator.
READ FIRST: Build Spec 8, /docs/15 (device line), /docs/9 (emergency flow), CLAUDE.md 3.4.

OBJECTIVE: Clinical decision-SUPPORT â€” informational, cited, human-in-the-loop.
REQUIREMENTS:
- Dosing hub (paed/adult/geriatric, renal/hepatic) from sourced data only (3.1).
- Overdose block: fixed safe template; signs -> labs -> antidote-or-supportive ->
  what-to-do (first-aid + call emergency services). Emergency flow per /docs/9:
  unmistakable, high-contrast, pinned call-for-help, no dead ends.
- Dose calculator MUST: show its working, cite its source, check max dose, and
  REQUIRE clinical confirmation. Never emit a bare directive (3.4 keeps us a
  reference tool, not a regulated device).
- Dosing/safety logic is UNIT-TESTED (9.3).

ACCEPTANCE:
- No dosing/overdose value renders unsourced
- Calculator shows working + source + confirmation gate; never a bare instruction
- Emergency flow meets /docs/9 clarity/speed rules; calc logic fully unit-tested

Plan first (data flow, calculator UX, confirmation gate, tests). Wait.
P9 Â· Testing + clinical QA + eval set
â– P9 â€” Testing + clinical QA
Start in PLAN mode. Wait.

TASK: The test + clinical-QA harness.
READ FIRST: /docs/19-quality-assurance.md, /docs/17 (eval set), CLAUDE.md 3.5 + 10.

OBJECTIVE: Make quality enforceable â€” software tests AND clinical accuracy.
REQUIREMENTS:
- Unit/integration/e2e for the /docs/9 flows; dosing/safety fully unit-tested.
- Performance test on a low-end Android profile; offline-behaviour test; security
  checks (auth, RBAC, injection) per /docs/14.
- CLINICAL EVAL SET: bank of clinical questions with expert-verified answers, run on
  every AI model/prompt change; proves the AI declines unsourced questions and never
  invents a value (3.1).
- Wire an S0 ('clinical-critical') severity into triage (3.5).
- All gates run in CI; a failing clinical eval or open S0 BLOCKS release.

ACCEPTANCE:
- CI runs the full suite incl. clinical eval; red blocks merge/release
- The eval catches an intentionally-planted wrong dose (test the test)
- Complete coverage on dosing/safety logic

Plan first. Wait.

Reusable meta-prompts
Fire these any time, between or during the P-prompts.
Plan-only (force the plan step)
â– /plan
Produce a plan for the following, and write NO code: [describe task].
Give: the approach, the exact files you'll create/change, the data/edge cases,
the tests you'll write, and any risk to clinical safety / POPIA / SAHPRA.
Then stop and wait for my approval.
Clinical-content review (or use the clinical-reviewer subagent)
â– Clinical review
Review this diff strictly against CLAUDE.md section 3. Confirm, with evidence:
(a) no clinical value is generated/guessed/hard-coded â€” all are retrieved + sourced;
(b) every clinical field has a Source and passes the review gate;
(c) nothing directs treatment for a specific patient;
(d) the calculator (if touched) shows working + source + confirmation.
List any violation as an S0 and propose the fix. Do not approve if any (a)-(d) fails.
Debug (systematic, not flailing)
â– Debug
Bug: [describe + repro steps + expected vs actual].
First, investigate and state your hypothesis for the root cause with evidence from
the code â€” do not change anything yet. Then propose the smallest fix + a test that
would have caught it. Wait for approval before editing. If it touches clinical
output, treat as S0.
Keep-current check
â– Keep current
Before implementing, web-search the current stable version and official docs for
[tool/library]. Report what you found (version + any breaking changes vs your
assumptions), then proceed against the current API â€” not from memory.
End-of-chunk review
â– Definition-of-done check
Self-review this work against CLAUDE.md section 10 (Definition of Done) and section
3 (clinical directives). List each criterion and whether it's met, with evidence.
Run the tests and report results. Only then tell me it's done.
After P9 â€” where to go next
P0â€“P9 gets you the MVP spine (Documents 7, 29: NOW / v1). From there, continue with the same prompt pattern, driven by the roadmap:
v2 (NEXT): Academy engine + AI tutor, Companion (schedules/reminders/interactions), tiers + billing, ambassador tooling â€” write P10+ prompts the same way, each pointing at Build Spec Â§6/Â§7 and /docs/29.
v3 (LATER): substitution + SEP + medical-aid engines, voice/vision, CPD, institution console â€” each with its governance doc referenced (/docs/15) before build.
The pattern is the product
Every future feature follows the same shape: name the outcome, point at the strategy doc, restate the non-negotiable directives, define acceptance criteria, and force a plan first. You now have a repeatable machine â€” the 30 documents supply the direction, the constitution supplies the discipline, and this playbook supplies the motion. Keep the loop tight and Materia builds itself, one governed chunk at a time.

Agent Build Kit Â· Part 3 of 3 Â· End of kit. Sources for tool conventions: Cursor rules docs & community best-practice guides (2025-26); Claude Code best practices (Anthropic, 2025) & community guides (2026). Now go build it.
