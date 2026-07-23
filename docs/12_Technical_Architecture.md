# 12_Technical_Architecture

> Converted from `12_Technical_Architecture.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 12 of 30
12
Technical Architecture
The system that has to stay simple while doing a lot

1 Â· Architecture principles
Data-model-centric. The molecule graph (Document 13) is the heart; everything else is a service over it. Get the schema right and features become 'render a field'.
AI-grounded, never free-floating. AI reads from the curated database and cites it; it never invents clinical values. This is an architectural constraint, not a prompt (Â§4).
Mobile-first, offline-capable. Designed for a low-end Android phone on 3G during load-shedding, not a demo on fibre.
POPIA-by-design. Personal/health data is minimised, separated, encrypted and kept in-region by default (Documents 14, 15).
Boring and replaceable. Managed services for the hard commodity problems (auth, billing, vector search); custom code only where Materia is differentiated (content, graph, domain logic).
Simple until proven otherwise. Start close to a modular monolith; extract services only when a real bottleneck demands it. Premature microservices kill small teams.
2 Â· System at a glance
3 Â· Frontend
App â€” React Native / Expo. One codebase â†’ iOS + Android + web, with clean access to camera (pill/box scan) and voice. Large community, gentle learning curve, fast iteration â€” the right choice for a founder learning to build.
Public web â€” a static-first framework (e.g. Next.js). Server-rendered/statically-generated molecule pages for speed and SEO. This surface is where organic acquisition comes from; it must be fast, crawlable and cheap to serve.
Design tokens in code. Colour/type/spacing tokens (Document 10) shared across clients keep thousands of molecule pages visually identical and make theming/dark-mode trivial.
4 Â· Backend & the AI-grounding contract
A pragmatic API-plus-Postgres backend (a managed platform such as Supabase, or a lean Node/Postgres service) exposing the services above. The one architectural rule that must never bend:
5 Â· Data stores
6 Â· AI architecture
Retrieval-augmented generation: user question â†’ retrieve relevant cited chunks from the curated DB â†’ LLM composes a grounded, sourced answer.
Pre-generate the static, template-based explanations (excipients, pharmacology) once, review them, and store them as owned content â€” cheaper and safer than live generation.
Reserve heavy/live AI calls for paid tiers; cache aggressively; pick the smallest model that does each job (Document 17).
Personal health data is not sent to offshore models without a POPIA lawful basis; anonymise/minimise first (Documents 14, 15, 17).
7 Â· Hosting, region & offline
Cloud & region. Host in a region that supports POPIA data-residency comfort; keep personal/health data in-region by default. Cross-border processing (e.g. offshore AI) is a deliberate, documented decision under POPIA s72 (Document 15).
Offline. Cache core molecule essentials (dosing, interactions, scheduling) locally for read-access offline; sync when connectivity returns. A first-class requirement, not a nice-to-have, given SA infrastructure.
8 Â· Build vs buy

Document 12 of 30 Â· Next: Data Model.
