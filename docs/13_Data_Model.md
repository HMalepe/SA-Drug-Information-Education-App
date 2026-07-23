# 13_Data_Model

> Converted from `13_Data_Model.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 13 of 30
13
Data Model
The schema everything else is rendered from

1 Â· Core entities
A small number of well-shaped objects. Everything in the product is one of these, or a relationship between them.
2 Â· User, org & growth entities
3 Â· The per-fact sourcing rule
The single most important schema decision, restated because it defines the whole trust architecture:
4 Â· Content versioning & review audit
Clinical content is not static data â€” it changes as evidence changes, and every change must be traceable. The model must support:
Version history on every clinical field â€” what changed, when, from what to what.
Review audit â€” who reviewed a fact, their credential, the date, and the next-review-due date. High-stakes fields (dosing, overdose) on a scheduled cycle.
Publish state â€” draft â†’ reviewed â†’ published, so nothing unreviewed ever renders.
AI-authorship provenance â€” flag content initially drafted by AI vs human, so reviewers know what needs closer scrutiny (Document 17).
5 Â· Backups, retention & data governance
6 Â· Portability (SADC & beyond)
The spine is country-agnostic by design. A new market is a new Product catalogue, a new set of PriceRecords and FormularyEntries, and localised SafetyProfile notes â€” hung on the same Molecule graph. The data model was built portable so that expansion (Document 3, Phase 3) is a data exercise, not a re-architecture.

Document 13 of 30 Â· Next: Security.
