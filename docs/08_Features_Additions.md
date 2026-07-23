# 08_Features_Additions

> Converted from `08_Features_Additions.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 8 of 30
08
Features & Specifications â€” Additions
New specs surfaced since the Build Spec

1 Â· Purpose of this document
Per instruction, the feature spec is not re-done here â€” see the Master Build Specification v1.0 for the complete screen-by-screen feature set. Building the Strategy documents (1â€“6) surfaced a handful of features and specification refinements that were implied by the go-to-market, pricing and business model but not written into the original spec. Those additions are collected below, each with a one-paragraph spec and the reason it emerged.
2 Â· Additions
A1 Â· Public molecule pages (the SEO surface)
Belongs in. Â§5 Intelligence + new 'Public web' surface
Spec. A public, unauthenticated, richly-structured web version of each molecule page â€” indexable by search engines, with a share card, that shows free-tier depth and invites sign-up for the rest. Distinct from the in-app authed view. Needs: SEO metadata, structured data markup, canonical URLs per molecule/brand, and a clean free/paywalled content boundary.
Why it emerged. Document 5 identified programmatic SEO as the primary growth loop. That only works if molecule pages exist as public, indexable web pages â€” a surface the Build Spec (app-centric) didn't define.

A2 Â· Onboarding mode selector + first-run 'aha'
Belongs in. Â§ New: Onboarding (feeds UX, Document 9)
Spec. First-run flow that asks who the user is (Patient / Student / Pharmacist / Doctor) and sets default depth, language and home tab accordingly â€” then routes them to a single delightful first action (search a molecule they know, or start one lesson) within 60 seconds.
Why it emerged. The 'one object, many lenses' principle needs an explicit moment where the lens is chosen. Personas (Document 3) made clear the first-run experience must differ by audience.

A3 Â· Student verification
Belongs in. Â§ Accounts / Billing
Spec. Verify student status (institution email or SAPC student registration) to unlock the discounted Student tier and prevent leakage from Professional. Lightweight, privacy-respecting, re-verified annually.
Why it emerged. The pricing tiers (Document 6) depend on a credible student/professional split; without verification the cheaper tier cannibalises the profitable one.

A4 Â· Ambassador & referral tooling
Belongs in. Â§ New: Growth features
Spec. In-app referral codes, an ambassador dashboard (invites, conversions, rewards/credit), and shareable content assets. Attribution tracked to the referring user/campus.
Why it emerged. Campus ambassadors and referral loops are core to GTM (Document 5); they need product support, not just spreadsheets.

A5 Â· Trust surfaces (source + review visibility)
Belongs in. Â§10 Trust layer â€” make it visible UI
Spec. Every clinical field shows an inline 'source Â· last reviewed' affordance; a molecule-level 'How we source this' panel; and a visible reviewer credential. Not a footer disclaimer â€” a first-class, tappable UI element.
Why it emerged. Documents 1, 2 and 4 all identified trust as the moat and a paid-conversion driver. Trust has to be seen to be sold, so it needs UI, not just process.

A6 Â· Waitlist + content head-start
Belongs in. Â§ Launch / Growth
Spec. A pre-launch waitlist page tied to the public molecule pages, capturing email + segment, with a referral position boost. Doubles as the SEO base before the app ships.
Why it emerged. The launch sequence (Document 5) begins with a waitlist and pre-published content; needs a lightweight spec of its own.

A7 Â· â€˜Molecule of the dayâ€™ content engine
Belongs in. Â§ New: Content/Marketing feature
Spec. A scheduler that surfaces a daily molecule with a shareable fact/animation, usable in-app (habit) and auto-formatted for social. Draws from existing molecule data â€” no new content type.
Why it emerged. The social growth loop (Document 5) needs a repeatable, low-effort content source; reusing molecule data makes it near-free.

A8 Â· Global 'Ask Materia' bar
Belongs in. Â§9 AI layer â€” surface refinement
Spec. A persistent global assistant/search bar that accepts natural-language questions ('cheapest generic of atorvastatin?', 'is amoxicillin safe in pregnancy?') and routes to the grounded, cited answer or the right molecule tab.
Why it emerged. Document 2's trend analysis (users expect to ask, not search) implies a single conversational entry point above the tab structure.

A9 Â· Institutional admin console (spec stub)
Belongs in. Â§ New: Institution tier detail
Spec. Seat management, cohort/class creation, usage & mastery analytics, custom formulary upload, SSO. Stubbed now, built in Phase 4 â€” but the data model (Document 13) must accommodate org â†’ seats â†’ cohorts from the start.
Why it emerged. The business model (Document 4) makes institutions the scalable revenue; the Build Spec listed the features but not the console that operates them.

A10 Â· Consent & medical-disclaimer gating
Belongs in. Â§10 Trust + Â§15 Legal
Spec. First-run and context-sensitive disclaimers (this is a reference/education tool, not a substitute for clinical judgement or emergency care), acknowledged and logged; stronger gating before dosing calculators and overdose actions.
Why it emerged. Legal/compliance (Document 15) and the regulatory-positioning need (reference tool vs medical device) require explicit, logged consent surfaces the Build Spec only implied.

3 Â· Net effect on the Build Spec

Document 8 of 30 Â· Next: User Experience (UX).
