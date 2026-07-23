# 19_Quality_Assurance

> Converted from `19_Quality_Assurance.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 19 of 30
19
Quality Assurance
Two kinds of quality â€” and the second one can hurt people

1 Â· The two halves of quality
2 Â· Clinical QA â€” the differentiating discipline
This is the workflow that makes Materia trustworthy. Every clinical fact runs this gauntlet before it renders:
Authored (by a person, or AI-drafted then flagged) against the content standard.
Sourced â€” a citation to an authoritative reference attached to the fact (Document 13).
Reviewed by a qualified pharmacist/clinician; reviewer + date recorded.
Published only after sign-off; unreviewed content cannot render.
Re-reviewed on a schedule â€” high-stakes fields (dosing, overdose, interactions) on the shortest cycle.
The AI eval set. A curated bank of clinical questions with expert-verified answers, run on every AI model/prompt change (Document 17) â€” automated clinical regression testing for the AI layer.
Content QA checklist. Every molecule page checked for: sources present, no empty-but-should-be-filled fields, units explicit, disclaimers in place, traffic-light logic correct, no contradictions across tabs.
3 Â· Software test types
4 Â· Bug severity â€” with a clinical class on top
5 Â· Device & context matrix
Test where users actually are, not where developers are:
Low-end Android first â€” the SA majority; if it's fast there, it's fast everywhere.
Constrained data & offline â€” 3G, intermittent, load-shedding scenarios.
Range of screen sizes â€” small phones to tablets (dispensary bench).
Public web â€” the SEO molecule pages across major browsers.
6 Â· Beta testing
7 Â· Release criteria (go / no-go)
All clinical content in the release is sourced, reviewed, and in-date.
No open S0 (clinical-critical) or P0 issues.
Core flows pass end-to-end on a low-end Android device.
Offline behaviour verified for the cached set.
Security checks pass; no known data-exposure paths.

Document 19 of 30 Â· Next: Analytics.
