# Materia

**Every medicine, understood.**

Molecule-first South African medicine intelligence, companion, and academy. First vertical: common antibiotics (~20 molecules). Repo: [HMalepe/SA-Drug-Information-Education-App](https://github.com/HMalepe/SA-Drug-Information-Education-App).

> Reference & education tool — **not** a medical device. Clinical values are retrieved, sourced, and review-gated. AI never invents doses, antidotes, or interactions.

## Stack (verified Jul 2026)

| Layer | Choice |
|-------|--------|
| App | Expo (scaffold in `/app`; install locally — see `app/README.md`) |
| Public SEO | Next.js **16.2.11** |
| API | Node/TypeScript Express |
| DB | PostgreSQL schema in `/db/migrations` (local API uses JSON seed) |
| Shared | `@materia/shared` + `@materia/design-tokens` |
| Auth | Stub sessions; Supabase-ready via `.env.example` |

## Repo layout

```
/docs       33 strategy docs (from .docx) + Build Spec
/app        Expo client (360°, search, auth, dosing)
/web        Next.js public molecule SEO pages
/api        Backend (search, 360, RAG, auth stub, dosing)
/db         SQL migrations + seed mirror
/content    Antibiotic seed + authoring/review pipeline
/packages   Shared types, grounding, design tokens
/tests      Unit + clinical-eval (S0 gate)
```

## Quick start

```bash
npm install --force   # Windows workspaces may need --force for symlinks
npm run build -w @materia/design-tokens -w @materia/shared
npm run seed:check
npm test && npm run test:clinical

# Terminal A
npm run dev:api

# Terminal B
npm run dev:web

# Expo (separate)
cd app && npm install && npx expo start
```

Copy `.env.example` → `.env.local` when you have Supabase keys.

## Sacred constraints

See `CLAUDE.md` and `.cursor/rules/*`.

## What’s real vs stubbed

| Area | Status |
|------|--------|
| Docs (33 → `/docs`) | Real |
| Schema / migrations | Real SQL |
| Antibiotic seed (~20 molecules) | Scaffold; clinical doses mostly **draft** |
| Medicine 360° (15 tabs) | Real API + Expo/Web UI; empty states intentional |
| Brand → molecule (Augmentin → amox-clav) | Real |
| Grounded AI RAG | Real retrieve+cite/refuse (no LLM required) |
| Next.js SEO + JSON-LD | Real |
| Auth / POPIA / disclaimer | Stub sessions; Supabase-ready |
| Dose calculator | Governance real; no published rules → unavailable |
| Supabase project keys | **Blocker** for hosted auth/DB |
| Founder clinical review | **Blocker** for publishing doses |

## CI / S0

GitHub Actions runs seed validation, typecheck, unit tests, and clinical eval. See `tests/clinical-eval/S0_GATE.md`.
