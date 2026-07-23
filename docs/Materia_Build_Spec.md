# Materia_Build_Spec

> Converted from `Materia_Build_Spec.docx`. Source of truth for Materia strategy.

MATERIA
The South African Medicine Intelligence, Companion & Academy Platform
Master Build Specification
Version 1.0  Â·  Feature & Architecture Bible

Prepared for  Holiday Malepe   â€”   Dispensary Manager (Pharmacist), building out of the matrix.
Working name  â€œMateriaâ€  (from materia medica â€” the classical body of knowledge about medicines). Alternatives shortlisted in Appendix C.

Contents

0 Â· How to read this spec
This is a reference bible, not a linear pitch. It is organised so that any single feature can be found, scoped and handed to a developer (or to yourself) as a self-contained unit of work.
The spine. Everything hangs off one object â€” the Medicine 360Â° page (Â§4). Every molecule in the database renders the same 15 standardized tabs. Build that page well and the rest of the product is mostly data and polish.
The three modules. Intelligence (Â§5), Companion (Â§6) and Academy (Â§7) are three lenses onto the same molecule data. A student, a pharmacist and a patient all look at paracetamol â€” they just land on different tabs.
Tiering. Â§11 defines Free / Student / Professional / Institution and the exact feature matrix. Â§12 is the premium build â€” the features that justify a subscription.
Buildability. Â§13â€“16 are the parts the prior plan was light on: the data model, where the data actually comes from (the real mountain), the stack, and a phased roadmap you can start coding against this week.
1 Â· Vision & core thesis
Materia is a molecule-first medicine platform for South Africa. The insight it is built on is simple and correct: drug references tell you WHAT. They almost never teach you WHY, and none of them assemble the full South African picture of a molecule in one place.
Every existing tool solves one slice. MIMS gives you dosing and scheduling. Snyman's gives you interactions. The SAHPRA register lists what's registered but is unusable at the counter. DailyMed and the eMC have beautiful ingredient and insert data â€” for the wrong countries. Nobody joins the molecule to its originator, its SA generics, its manufacturers, its actual API source, its excipients-explained, its price history, its medical-aid reimbursement, its overdose management, and a teaching layer â€” as one continuous object.
The one-line positioning
Who it is for
2 Â· Design principles (non-negotiable)
These are the rules that keep the product coherent as it grows to thousands of molecules. Every feature decision is checked against them.
Molecule-first, brand-second. The atomic unit is the active ingredient, never the brand. Panado, Pacimol and Empaped are children of paracetamol. Search resolves brands â†’ molecule automatically.
One object, many lenses. A molecule renders identically for everyone. Audience (patient / pharmacist / student) changes depth and language, never structure. This is what makes 3,000 molecules maintainable.
Every clinical claim is sourced. No unsourced dose, antidote or interaction ever renders. Each fact carries a citation to an authoritative reference and a 'last reviewed' date. Trust is the moat (Â§10).
Reference, not prescriber. Materia surfaces guidance and reasoning. It never replaces clinical judgement, and it says so, structurally â€” the app is a decision-support and education tool, not a medical device that directs treatment.
Teach the why. Wherever a fact appears, a one-tap 'why' is available. Every lookup is a potential micro-lesson. This is the feature no competitor has.
Standardized structure. Same 15 tabs on every molecule. Users learn the map once and never get lost. Predictability is a feature.
SA-native. Scheduling, SEP, medical-aid formularies, local manufacturers, local languages. The parts that are hardest to copy are the parts built on South African reality.
3 Â· Product architecture
Four things make up the whole product. One page, three modules that reuse it, and a set of horizontal engines that power all of them.
The map
Notice that the three modules are not three apps â€” they are three entry points into the same molecule graph. That is the whole trick: build the molecule object once, and Intelligence, Companion and Academy are mostly different arrangements of the same underlying data plus their own interaction layer.
4 Â· The Medicine 360Â° page (flagship / spine)
Every molecule renders these 15 tabs, always in the same order. A student revising, a pharmacist counselling, and a doctor prescribing all open the same page and jump to the tab they need. This is the single most important screen in the product â€” spec it first, build it first.

5 Â· Module 1 â€” Medicine Intelligence
The database product. This is what a pharmacist opens twenty times a shift. Everything here is a structured field on the molecule or brand object â€” which is what makes it queryable, comparable and, later, AI-groundable.
5.1  Molecule-first search & resolution
Search resolves any input â€” brand, molecule, misspelling, class â€” to the correct molecule page. Type 'Panado' â†’ land on Paracetamol.
Synonym/brand index maps every registered brand and common misspelling to its molecule.
â˜… Class & indication search: 'ACE inhibitors', 'first-line SA hypertension' â†’ filtered molecule lists.
5.2  The lineage view â—†
The signature screen. For each molecule, the full South African family tree:
Originator / first-to-market â€” e.g. Panadol (GSK â†’ Haleon): first launched, patent status/expiry.
Top 3â€“5 registered SA generics â€” e.g. Panado (Adcock Ingram), Pacimol, Empaped.
Discontinued products â€” originator or generic, with de-registration date where available. This is genuinely hard-to-find data and a differentiator.
5.3  The brand dossier
Every brand in the lineage expands into a full record:
Manufacturer & marketing company â€” who legally makes it vs. who markets it (often different)
Actual manufacturing plant â€” the physical site producing the finished product
Made in SA vs imported whole â€” finished-product origin
â—† API origin â€” where the active ingredient itself comes from (India / China / Europe â€¦)
Packaging site â€” where it's packed (e.g. 'API India, packaged Midrand')
Excipients â€” full inactive-ingredient list â€” explained, see 5.4
Product & packaging images â€” tablet, box, blister, vial, inhaler, patch, syrup bottle
Package insert â€” the PIL/professional insert, plus a plain-English AI summary (Â§9)
â˜…â—† Price & SEP â€” Single Exit Price, price history, cheapest bioequivalent (Â§10)
â˜…â—† Medical-aid reimbursement â€” which schemes reimburse this brand, co-payment estimate
Availability â€” wholesaler stock signal & shortage flag
5.4  The excipient explainer â—†
The feature pharmacists will actually love. Instead of a dead list, each inactive ingredient is explained by the AI against a fixed template so it's consistent across the whole database:
That last row is the clever part: excipients are only 'inactive' until they meet the wrong patient. Surfacing that turns a boring list into a safety tool.
5.5  Visual identification
Scroll a molecule and see the real thing: ðŸ“¦ box Â· ðŸ’Š tablet Â· ðŸ’‰ vial Â· ðŸŒ¬ inhaler Â· ðŸ©¹ patch Â· ðŸ’§ syrup bottle.
â˜… Pill / product identifier via camera â€” photograph a loose tablet or a box; vision model returns the likely product(s). Full spec in Â§9.5.
5.6  Substitution & availability engine â˜…â—†
The stockout-solver â€” arguably the highest-value counter feature in the whole product:
Therapeutic & generic alternatives when a brand is out of stock.
SAHPRA bioequivalence flag â€” which generics are declared bioequivalent, not just 'same molecule'.
Live price delta on switch (SEP-based) â€” 'switch saves the patient R84'.
Shortage alerts â€” subscribe to a molecule/brand and get notified when it goes out of, or back into, supply.
5.7  Modes
Patient mode / Pharmacist mode toggle. Same molecule, different depth and vocabulary. Pharmacist mode shows monitoring, off-label, kinetics; patient mode shows plain-English how-to-take and counselling. The toggle is global and remembered per user.
6 Â· Module 2 â€” Personal Medicine Companion
The consumer-facing adherence product. Turns the reference into something a patient (or a caregiver) uses daily. This is what widens the audience past professionals and creates habitual return visits.
Medication schedule & reminders. A patient's real regimen with dosing times, refill dates, adherence streaks.
Full-list interaction checking. Not pairwise â€” check the entire personal med list at once, including OTC and supplements, and surface the clinically significant conflicts with plain-English actions.
Symptom & side-effect tracking. Log symptoms against medicines started; spot temporal patterns; export a summary for the doctor.
Nutrition & adherence support. Food-timing rules (dairy/grapefruit/empty stomach) pulled from the molecule's Food & Lifestyle tab, surfaced as reminders.
â˜… Caregiver / dependant profiles. Manage a parent's or child's regimen from one account.
â˜… Refill & SEP-aware pharmacy prompts â—†. 'Your script is due; cheapest bioequivalent near you' â€” links Companion to the price engine.
Electronic prescriptions (future). Roadmap item â€” receive and manage e-scripts once the regulatory/interoperability path exists in SA.
7 Â· Module 3 â€” Medicine Academy
The learning product â€” and the one with the biggest upside, because it converts curiosity into daily habit and reaches students, not just working professionals. The brief is explicit: make it feel like Duolingo Ã— Brilliant Ã— a pharmacology simulator, not a textbook.
7.1  Every molecule is a course
Each molecule carries a course with completion % and Expert Level (e.g. 'Amoxicillin â€” 42% Â· Level 2'). The lessons are standardized so authoring scales:
7.2  Gamification
Achievement badges: ðŸ… Antibiotic Explorer (learn 20), Cardiologist (master antihypertensives), Endocrine Expert (diabetes meds), Pharmacokinetics Master (all ADME), â—† Generic Genius (identify 100 SA brands).
â˜… Streaks, XP and leaderboards (individual + institution/class cohorts).
7.3  Mini-games
Match. Mechanism â†” medicine pairing.
Drag & drop. Sort molecules into ACE inhibitors / beta blockers / ARBs / CCBs.
Build the Treatment. Patient case (e.g. 72 y/o, T2DM, hypertension, CKD) â†’ pick the appropriate class; AI explains the reasoning after, not just right/wrong.
Spot the Error. 'Take doxycycline with milk' â€” correct or not? Explain why (chelation).
Mystery Molecule. Only the structure shows; unlock hints â€” mechanism â†’ class â†’ indication â†’ brands â†’ answer.
7.4  AI Tutor â€” the flagship of the module
The Academy's most valuable feature. It never just marks an answer wrong; it teaches from the miss.
7.5  Adaptive learning â˜…
The app tracks weak areas (antibiotics, renal dosing, CYP interactionsâ€¦) and builds tomorrow's session around them.
â˜… Spaced-repetition scheduling (Anki-style) on every fact and pearl, so knowledge is retained, not just seen once â€” a genuine upgrade over the original plan.
7.6  South African focus â—†
What no international learning app can do. Every lesson ends by grounding theory in the products learners actually handle:
Originator product + common SA generic brands for the molecule just learned.
Packaging-recognition exercise (match the box to the molecule).
Typical strengths stocked locally, scheduling category (S0â€“S6), and the counselling points used in SA practice.
7.7  â˜… SAPC-accredited CPD mode
The professional upgrade of Academy: package learning modules as accredited Continuing Professional Development with logged credits, quiz gates and downloadable certificates. Pharmacists and pharmacist's assistants have mandatory CPD â€” being the place they earn it is a strong retention and monetisation hook, and turns a 'nice to learn' into a professional necessity.
8 Â· Engine â€” Dosing & Safety
A horizontal engine every module calls. This is the highest-stakes part of the product, so it is also the most rigorously sourced and reviewed (see Â§10). Everything here renders on tab 4 and tab 10 of the 360Â° page and inside Academy cases.
8.1  Dosing Hub
8.2  Avoid / Use-with-caution â€” traffic-light visual
ðŸ”´ Contraindicated â€” conditions where the medicine must not be used.
ðŸŸ  Specialist / close monitoring only â€” e.g. pregnancy, breastfeeding, severe hepatic/renal impairment.
ðŸŸ¡ Dose adjustment may be needed â€” reduced renal/hepatic function, frail elderly.
8.3  Smart Dose Calculator â˜…
Guided, transparent, and safer than showing a bare number â€” because it shows its working:
Ask patient weight (e.g. 18 kg) and indication (e.g. fever).
Compute the dose from the sourced reference.
Show the working, not just the answer.
Check against max recommended dose; flag when clinical review is required.
8.4  AI Dose Tutor â˜…
Explains the why behind the number. 'This is weight-based because children clear it differently from adults; your calculated dose sits within the recommended range for this indication.' Every calculation becomes a lesson.
8.5  Dose-Adjustment Assistant â˜…
The feature the brief correctly notes is rarely done well. It doesn't just say 'reduce the dose' â€” it explains why adjustment is needed and points to the specific recommendation, for: renal impairment, hepatic impairment, obesity, underweight, dialysis, pregnancy, and older adults.
â˜… Optional eGFR/CrCl input â†’ renal band â†’ adjusted guidance, always shown with source and a 'confirm clinically' gate.
8.6  Overdose & Emergency (tab 10)
Structured identically for every molecule so it's usable under pressure. Illustrative fields (content sourced & reviewed, not authored here):
8.7  Toxicity Timeline animation
An animated arc: 0 min swallowed â†’ 30 min absorption begins â†’ 2 h symptoms likely â†’ 6 h potential organ injury â†’ 24 h highest-risk window â†’ 72 h recovery/ongoing monitoring. Per-molecule timing. Teaches the crucial idea that feeling fine early does not mean safe.
9 Â· Engine â€” the AI layer
The intelligence that ties everything together. Critically, the AI is grounded in Materia's own sourced database (retrieval-augmented), not free-floating â€” so answers are traceable to references and don't hallucinate doses.
Grounded clinical Q&A (RAG). Ask any molecule anything; the model answers only from the cited Materia record and links the source. Powers the 360Â° AI Tutor tab and Academy tutor.
Plain-English insert translator. Turns a dense professional package insert into readable language, with a reading-level toggle (professional â†” Grade-5).
Excipient & pharmacology auto-explainer. Generates the fixed-template excipient and active-ingredient explanations (Â§5.4) consistently across the whole DB.
â˜…â—† Multilingual counselling scripts. Generate the counselling script for tab 15 in English, isiZulu, Afrikaans, Sesotho, isiXhosa (+ more). Nobody else does SA-language patient counselling â€” a real moat.
â˜… Voice mode. Reads and explains aloud ('Amoxicillin belongs to the beta-lactam antibiotics; it inhibits bacterial cell-wall synthesisâ€¦') â€” usable while driving or studying. Two-way voice Q&A on Pro.
Adaptive-learning brain. Chooses tomorrow's Academy content from the user's weak areas and spaced-repetition schedule (Â§7.5).
9.5  Vision / camera features â˜…
Pill identifier â€” photograph a loose tablet/capsule; return likely product(s) by imprint, shape, colour.
Box / barcode scanner â€” scan packaging â†’ jump straight to the brand dossier.
Insert scanner â€” photograph a paper insert â†’ plain-English AI summary.
Future: handwritten-script assist (read a prescription â†’ resolve to molecules) â€” flagged as a later, carefully-governed feature.
10 Â· Engine â€” SA data & the trust moat
The features here are simultaneously the hardest to build and the hardest to copy â€” which is exactly why they're the defensible core. They're all built on South African reality.
10.1  SA-native data features â—†
Single Exit Price (SEP) tracker â—†. Current SEP, price history, and trend per product â€” publicly published data, legitimately usable.
Cheapest-bioequivalent finder â—†. Across a molecule, rank registered products by SEP and flag SAHPRA-declared bioequivalents.
Medical-aid formulary matcher â—†. Which schemes reimburse which brand; co-payment estimate; formulary/non-formulary flag.
Scheduling front-and-centre â—†. S0â€“S6 shown on every product; drives what may be sold/counselled and how it's stored.
Wholesaler availability â—†. Stock signal across major wholesalers; shortage & back-in-stock alerts.
Manufacturing transparency â—†. Originator â†’ current owner â†’ finished-product origin â†’ API origin â†’ packaging site.
10.2  The trust layer (this is a premium moat, not overhead)
For a medicine platform, credibility IS the product. The following aren't compliance chores â€” they're the reason a pharmacist will pay for Materia over a free chatbot, and they should be visible in the UI:
Every clinical fact shows its source and a 'last reviewed' date.
Clinical content reviewed by qualified pharmacists/clinicians before publish; high-stakes tabs (dosing, overdose) on a scheduled re-review cycle.
Clear reference-tool framing: Materia supports clinical judgement and education; it does not direct treatment or replace emergency care. Structural disclaimers on dosing, overdose and calculator outputs.
â—† Regulatory awareness up front: understand where a 'reference & education tool' sits vs. a regulated medical device / clinical decision-support tool under SAHPRA, and design to stay on the reference side until/unless you deliberately pursue device classification. Worth a short consult with someone who knows SA medical-software regulation before the dosing calculator ships â€” it's cheaper than finding out later.
11 Â· Monetisation & tiers
Four tiers, mapped to the audiences in Â§1. Free is the funnel and the student on-ramp; Professional is where the money is; Institution is the scalable B2B play (schools, hospital groups, pharmacy chains, pharma reps).
11.1  Feature Ã— tier matrix
Key: âœ“ included Â· â˜… core paid value Â· â€” not in tier Â· â—† SA-only moat.
12 Â· The Premium (Professional) build â€” the â€˜better featuresâ€™
You asked specifically for a premium tier with features beyond the original plan. These are the additions that turn Materia from an impressive reference into a tool a professional pays for monthly and can't work without. Each is new relative to the PDF.
â˜… Handover / Locum mode. A pharmacist covering an unfamiliar dispensary gets a one-screen brief on any molecule: SA brands stocked, scheduling, top interactions, counselling script. Built for the reality of locum shifts.
â˜…â—† Co-payment & switch calculator. Enter the patient's scheme â†’ see reimbursed brand, co-pay, and the cheapest bioequivalent that clears formulary. Saves the patient money at the counter in real time.
â˜… Full-regimen clash board. Paste or scan a whole script; get an at-a-glance board of every interaction, duplication, renal/hepatic flag and food conflict across the entire regimen â€” colour-coded by severity.
â˜… Clinical-pearl feed. A daily, personalised feed of high-yield pearls tuned to the user's specialty and weak areas â€” the habit loop that keeps Pro users opening the app when they don't 'need' it.
â˜… Verified professional notes / community layer. Pharmacists contribute counselling tips and stockout intel; contributions are attributed and upvoted, building a moat of local knowledge no static database has.
â˜… CPD dashboard. Track accredited credits earned in-app toward SAPC requirements; download certificates; get reminded before the annual deadline.
â˜… Offline core. Cached molecule essentials (dosing, interactions, scheduling) that work when the dispensary Wi-Fi or the load-shedding does not. â—† A genuinely SA-shaped feature.
â˜… Export & share. Generate a clean patient counselling handout or a monograph PDF in a tap â€” for the patient, the ward, or a colleague.
â˜… Personal analytics. Your learning curve, mastery by therapeutic class, most-looked-up molecules â€” self-knowledge for the professional (and, at Institution tier, for the class or team).
â˜…â—† Load-shedding cold-chain notes. For insulin, vaccines and other cold-chain products: storage tolerance windows and what to do during an outage. Small, specific, unmistakably South African.
13 Â· Data model (the skeleton to build against)
Since you're learning to code, this is the part that turns the vision into something a database can hold. Everything in the product is one of a small number of objects, related to each other. Get these entities right and every feature above becomes 'render a field'.
14 Â· Data sourcing â€” the real mountain
Building the app is feasible. Building and maintaining the DATA is the actual company. Be clear-eyed: this is where 80% of the effort lives, and where competitors fail. Here is what is free, what is licensed, and what has to be built.
Strategic implication: the MVP should lean on the free, ownable layers â€” SAHPRA register, SEP, DoH guidelines, your own excipient/pharmacology authoring, and the Academy content â€” and treat licensed clinical databases as a later partnership, not a launch dependency. That keeps you shippable without a six-figure licensing bill on day one.
15 Â· Recommended technical stack
Opinionated defaults chosen for a solo/small builder who's learning â€” bias toward things with huge communities, good docs, and a gentle path from prototype to production. Swap freely; the data model matters more than the framework.
Learning-to-code note: don't build all of this at once. Build the Molecule â†’ Product â†’ 360Â° page slice end-to-end for ONE therapeutic area first (see Â§16). One vertical slice that works beats ten half-built modules â€” and it's the fastest way to actually learn the stack.
16 Â· Build roadmap (start here Monday)
Phased so that each stage ships something real and usable, and so you learn by building the spine before the flourishes. Resist the urge to start with animations and gamification â€” start with the object.
Phase 0 â€” Prove the spine (weeks)
Model Molecule + Product + Manufacturer + Excipient + Source in Postgres.
Build ONE Medicine 360Â° page, hard-coded tabs, for ~20 molecules in a single class (e.g. common analgesics or antibiotics).
Molecule-first search with brandâ†’molecule resolution.
Ship it to yourself and five pharmacist colleagues. Learn from real use.
Phase 1 â€” MVP: the reference (Intelligence core)
Full lineage view (originator â†’ generics â†’ discontinued) + brand dossier + excipient explainer.
SEP price + scheduling (free, ownable data). â—†
Basic overdose/emergency tab (fixed safe template) + sourced dosing for the covered set.
AI layer v1: grounded Q&A + plain-English insert summary, cited.
Phase 2 â€” Academy + Companion
Course/Lesson/Quiz model; the 5-lesson standard course for the covered molecules; badges & streaks.
AI Tutor (teach-from-the-miss) + Mystery Molecule.
Companion: med schedule, reminders, full-list interaction check.
Introduce Free/Student tiers + billing.
Phase 3 â€” Professional tier & the moats
Smart Dose Calculator + Dose-Adjustment Assistant (with Â§8/Â§10 governance in place first).
Substitution engine, medical-aid matcher, shortage alerts, multilingual counselling. â—†
Voice mode, vision scanners, SAPC CPD, the Â§12 premium features.
Phase 4 â€” Institution & scale
Multi-seat, admin console, cohort analytics, custom formularies, API, SSO.
Licensed-data partnerships (SAMF/MIMS/interactions) once revenue justifies them.
Broaden molecule coverage toward the full SA register.
Appendix A Â· Full feature checklist (every PDF feature, accounted for)
Confirmation that nothing from the planning session was dropped. Each maps to a section above.
âœ“  Molecule-first search (brand â†’ molecule) â†’ Â§5.1
âœ“  Originator / first-to-market product â†’ Â§5.2
âœ“  Top 3â€“5 SA registered generics â†’ Â§5.2
âœ“  Discontinued products (originator/generic) â†’ Â§5.2
âœ“  Manufacturer & marketing company â†’ Â§5.3
âœ“  Actual manufacturing plant / made-in-SA vs imported â†’ Â§5.3
âœ“  API origin (India/China/Europe) + packaging site â†’ Â§5.3, Â§10.1
âœ“  Excipients listed AND explained (purpose/allergy/absorption/inactiveâ†’active) â†’ Â§5.4
âœ“  Active ingredients + quick pharmacology of each â†’ Â§9, Â§5.4
âœ“  Product & packaging images (tablet/box/vial/inhaler/patch/syrup) â†’ Â§5.5
âœ“  Package insert + plain-English AI explanation â†’ Â§5.3, Â§9
âœ“  Cost comparison / SEP / price history â†’ Â§5.3, Â§10.1
âœ“  Medical-aid reimbursement â†’ Â§5.3, Â§10.1
âœ“  Availability / shortage alerts â†’ Â§5.6
âœ“  Therapeutic alternatives on stockout + SAHPRA bioequivalence â†’ Â§5.6
âœ“  Pill identifier (camera) / box scanner â†’ Â§5.5, Â§9.5
âœ“  Pharmacist mode vs patient mode â†’ Â§5.7
âœ“  Voice mode (read & explain aloud) â†’ Â§9
âœ“  Dosing hub: paediatric / adult / geriatric â†’ Â§8.1
âœ“  Renal / hepatic / pregnancy / breastfeeding adjustment â†’ Â§8.1, Â§8.5
âœ“  Traffic-light contraindications (red/orange/yellow) â†’ Â§8.2
âœ“  Smart Dose Calculator (shows working, checks max) â†’ Â§8.3
âœ“  AI Dose Tutor (explains why) â†’ Â§8.4
âœ“  Dose-Adjustment Assistant (renal/hepatic/obesity/dialysis/â€¦) â†’ Â§8.5
âœ“  Available SA strengths / all SKUs â†’ Â§5.3, Â§8.6
âœ“  Overdose: early/severe signs, lab findings â†’ Â§8.6
âœ“  Antidote (or 'supportive') â†’ Â§8.6
âœ“  What-to-do emergency first-aid steps â†’ Â§8.6
âœ“  Toxicity timeline animation â†’ Â§8.7
âœ“  360Â° Clinical View â€” 15 standardized tabs â†’ Â§4
âœ“  Personal Companion: schedule, interactions, symptom tracking, nutrition, e-scripts â†’ Â§6
âœ“  Academy: per-molecule courses, completion %, expert levels â†’ Â§7.1
âœ“  Lessons 1â€“5 (Story / Structure / MOA / Inside Body / Pearls) â†’ Â§7.1
âœ“  Interactive chemical structure (tap functional groups) â†’ Â§4, Â§7.1
âœ“  MOA & ADME animations â†’ Â§7.1, Â§8.7, Â§4
âœ“  Gamification: badges (Antibiotic Explorer, Cardiologist, â€¦) â†’ Â§7.2
âœ“  Mini-games: Match / Drag-drop / Build-the-Treatment / Spot-the-Error / Mystery Molecule â†’ Â§7.3
âœ“  AI Tutor (teach from the miss) â†’ Â§7.4
âœ“  Adaptive learning (weak-area targeting) â†’ Â§7.5
âœ“  SA focus per lesson (generics, packaging, scheduling, counselling) â†’ Â§7.6
âœ“  Quiz-like fast pharmacology facts (discovery, synthesis, structure significance) â†’ Â§7.1, Â§7.3
Appendix B Â· New features added beyond the plan
What this document contributes on top of the original session:
ï¼‹  Four-tier model (Free / Student / Professional / Institution) + full feature Ã— tier matrix â†’ Â§11
ï¼‹  10 premium Professional features (locum mode, co-pay calculator, clash board, pearl feed, community layer, CPD dashboard, offline core, export, analytics, cold-chain notes) â†’ Â§12
ï¼‹  Multilingual (isiZulu/Afrikaans/Sesotho/isiXhosa) counselling â€” a real SA moat â†’ Â§9
ï¼‹  Spaced-repetition retention layer on Academy â†’ Â§7.5
ï¼‹  SAPC-accredited CPD as a monetised professional hook â†’ Â§7.7
ï¼‹  Explicit data model & entity relationships â†’ Â§13
ï¼‹  Honest free-vs-licensed data sourcing map + copyright reality â†’ Â§14
ï¼‹  Recommended stack + phased, learn-as-you-build roadmap â†’ Â§15, Â§16
ï¼‹  The trust/sourcing layer reframed as a premium moat with per-fact citations â†’ Â§10, Â§13
Appendix C Â· Name shortlist & open questions
Working name candidates
Materia. from materia medica â€” the classical term for drug knowledge. Serious, ownable, professional.
Molecule / MoleculeZA. literal, on-brand with molecule-first, easy to say.
Panacea. the mythological cure-all; memorable but slightly grandiose.
Pharos. 'lighthouse' + pharma echo; guidance/clarity connotation.
 Subo / Muthi-wise â—†. local-language angle for the patient-facing consumer brand (worth a native-speaker gut-check).
Open questions to resolve before Phase 1
First therapeutic area to cover completely? (Suggestion: something you dispense constantly â€” analgesics, common antibiotics, or antihypertensives.)
Consumer-first (patients) or professional-first (pharmacists) as the launch wedge? They imply different Phase-1 priorities.
Who is your clinical reviewer of record? (You qualify â€” but a second reviewer strengthens the trust layer.)
Is CPD accreditation worth pursuing early? It's a strong professional hook but has its own approval process.

End of Master Build Specification v1.0 Â· Next document: positioning, pricing & go-to-market.
