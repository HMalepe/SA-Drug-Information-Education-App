# 07_Product_Requirements

> Converted from `07_Product_Requirements.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 7 of 30
07
Product Requirements
What the first version must do â€” and, harder, what it must not

1 Â· MVP definition
The MVP is not 'a smaller version of everything'. It is the spine (the 360Â° page) done completely for a narrow molecule set, proving the one claim the whole company rests on: that molecule-first + SA-native + explained is something people reach for daily. Everything else waits.
Scope of the MVP set. One high-frequency therapeutic area you dispense constantly â€” analgesics, common antibiotics, or antihypertensives â€” covered to full depth (~20â€“40 molecules), not 3,000 covered shallowly.
2 Â· Functional requirements
Grouped by capability. 'Must' items are MVP; 'Should/Could' are staged later (see prioritisation, Â§5).
Search & navigation
Resolve brand, molecule, class or misspelling â†’ correct molecule page. [Must]
Molecule-first 360Â° page with standardized tabs. [Must]
Class/indication filtering. [Should]
Medicine Intelligence
Lineage: originator â†’ SA generics â†’ discontinued. [Must]
Brand dossier: manufacturer, images, insert, scheduling. [Must]
Excipient explainer (templated). [Should]
SEP price + cheapest bioequivalent. [Must for SA differentiation]
Substitution engine, medical-aid matcher, shortage alerts. [Should/Could]
Dosing & safety
Dosing hub (paed/adult/geriatric) + renal/hepatic notes, sourced. [Must]
Overdose & emergency block with fixed safe template. [Must]
Smart dose calculator (shows working). [Should â€” only with review/governance in place]
AI layer
Grounded Q&A + plain-English explanations, cited to the record. [Must]
Multilingual counselling; voice mode. [Could]
Academy & Companion
One standardized 5-lesson course per molecule + basic quiz. [Should]
Companion: med schedule + reminders + interaction check. [Should]
Accounts & platform
Sign-up, mode select (patient/pharmacist/student), student verification. [Must]
Free tier + paywall gating + billing. [Should â€” needed before charging]
3 Â· Non-functional requirements
4 Â· Representative user stories + acceptance criteria
Format: As a [persona], I want [capability], so that [outcome]. Acceptance criteria in Given/When/Then. A representative slice â€” the full backlog lives in the tracker (Document 18).
Story. As a pharmacist, I want to type a brand name and land on the molecule page, so that I get every answer in one place.
Given I search 'Panado', when results load, then I land on the Paracetamol 360Â° page.
Given a misspelling 'panadoll', when I search, then the correct molecule is still resolved or suggested.

Story. As a pharmacist, I want the cheapest bioequivalent for an out-of-stock brand, so that I can substitute safely and save the patient money.
Given a molecule page, when I open substitution, then registered alternatives are listed with SEP and a bioequivalence flag.
Given a switch, when I select it, then the price difference to the patient is shown.

Story. As a student, I want an interactive lesson on a molecule's mechanism, so that I finally understand it.
Given a molecule course, when I start Lesson 3, then an animation plays and a check-question follows.
Given a wrong answer, when I submit, then the AI tutor explains why and corrects the model.

Story. As a patient, I want a plain-language explanation in my language, so that I take my medicine correctly.
Given a molecule, when I select isiZulu patient mode, then the how-to-take and counselling render in isiZulu.

Story. As anyone, I want overdose guidance that's fast and unambiguous, so that I act correctly in an emergency.
Given the overdose tab, when it opens, then early/severe signs, antidote-or-supportive, and the fixed what-to-do steps show immediately, with a clear 'call emergency services' prompt.

5 Â· Prioritisation â€” MoSCoW for v1
6 Â· Definition of done (MVP)
Every rendered clinical value carries a source + review date. (Non-negotiable.)
The chosen therapeutic area is 100% covered â€” no half-empty pages in the set.
A pharmacist and a student, unprompted, complete a real task faster than their current method.
It works offline for the cached set and loads fast on a low-end Android phone.

Document 7 of 30 Â· Next: Features & Specifications (additions to the Build Spec only).
