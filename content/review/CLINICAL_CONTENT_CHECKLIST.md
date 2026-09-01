# Clinical content depth checklist (safety profiles / interactions / dosing)

> Tracks the "add meat to the bones" push: filling `safetyProfiles` and
> `interactions` per molecule across every `content/seed/*.json` area, on top
> of the moleculeSummary-level content that already exists.
>
> **Rule this checklist can never override (constitution 3.1):** no numeric
> dose/frequency value gets written, drafted, or published without a real,
> checkable citation. Every area below already carries an honest
> `dosingAdult` / `dosingPaediatric` **draft placeholder** — numeric dosing is
> a separate, founder-led workstream (STG lookup + `publish-dosing`
> attestation per `content/pipeline/README.md`), not something this checklist
> unblocks by itself.
>
> Each area = one batch. Each batch has three checkpoints:
> - **SP** — safety profile authored for every molecule (contraindications,
>   warnings, food/lifestyle, overdose signs, antidote/supportive, pearls,
>   counselling — all qualitative, all sourced, no invented numbers)
> - **IX** — at least the clinically obvious interaction(s) authored
> - **DOSE** — numeric dose rules sourced from real SA EML/STG/WHO/SAHPRA PI
>   and attested by founder review (separate from SP/IX — always last)

## Already complete (prior EML batches, Batches A-I)

These areas already have full safety-profile coverage from earlier work —
no SP/IX gap, only the DOSE step remains, tracked via
`npm run review:batches -- progress`.

- [x] emergency-supportive
- [x] hospital-chronic-eml
- [x] infectious-disease-eml
- [x] paediatric-cardio-neuro-eml
- [x] paediatric-eml
- [x] paediatric-supportive-eml
- [x] phc-eml
- [x] phc-hiv-tb-eml
- [x] phc-supportive-eml

## This session

- [x] **antibiotics** (20 molecules) — SP: done (18 profiles added) · IX: done (5 added: clarithromycin+statins x2, metronidazole+warfarin, co-trimoxazole+warfarin, ciprofloxacin+warfarin) · DOSE: pending founder
- [x] **analgesics** (10 molecules) — SP: done (8 profiles added) · IX: done (3 added: ibuprofen+warfarin, ibuprofen+enalapril, tramadol+fluoxetine) · DOSE: pending founder
- [x] **cardiovascular** (10 molecules) — SP: done (8 profiles added) · IX: done (4 added: clopidogrel+omeprazole, digoxin+furosemide, digoxin+hctz, isosorbide+sildenafil) · DOSE: pending founder
- [x] **antihypertensives** (10 molecules) — SP: done (8 profiles added) · IX: done (3 added: enalapril+spironolactone, furosemide+gentamicin, atenolol+gliclazide) · DOSE: pending founder
- [x] **diabetes** (10 molecules) — SP: done (8 profiles added) · IX: done (2 added: glimepiride+atenolol masked hypoglycaemia, empagliflozin+furosemide volume depletion) · DOSE: pending founder
- [x] **gastrointestinal** (12 molecules) — SP: done (9 profiles added) · IX: done (2 added: domperidone+clarithromycin QT/CYP3A4, ondansetron+azithromycin additive QT) · DOSE: pending founder
- [x] **respiratory** (10 molecules) — SP: done (8 profiles added) · IX: done (2 added: theophylline+clarithromycin, theophylline+ciprofloxacin) · DOSE: pending founder
- [x] **mental-health** (13 molecules) — SP: done (10 profiles added) · IX: done (3 added: sertraline+ibuprofen, lithium+hctz, haloperidol+azithromycin) · DOSE: pending founder
- [x] **hiv-tb** (10 molecules) — SP: done (8 profiles added) · IX: done (2 added: ritonavir+simvastatin contraindicated combo, rifampicin+dolutegravir TB/HIV co-treatment) · DOSE: pending founder
- [x] **neurology** (13 molecules) — SP: done (10 profiles added) · IX: done (3 added: lamotrigine+valproate, phenytoin+isoniazid, donepezil+atenolol bradycardia) · DOSE: pending founder
- [x] **rheumatology** (13 molecules) — SP: done (8 profiles added, incl. meloxicam) · IX: done (3 added: azathioprine+allopurinol, colchicine+clarithromycin, febuxostat+azathioprine) · DOSE: pending founder. Note: naproxen/celecoxib in this file reuse the same `mol-id` as their analgesics.json entries, which already carry a profile — not re-authored here to avoid duplicate/conflicting content under one ID.

## Remaining batches (10 areas, ~75 molecules)

| Area | Molecules | SP | IX | DOSE |
|------|-----------|----|----|------|
| anaesthetics | 13 | [ ] | [ ] | [ ] |
| dermatology | 13 | [ ] | [ ] | [ ] |
| endocrine | 13 | [ ] | [ ] | [ ] |
| ent-allergy | 13 | [ ] | [ ] | [ ] |
| haematology | 13 | [ ] | [ ] | [ ] |
| oncology-supportive | 13 | [ ] | [ ] | [ ] |
| ophthalmology | 13 | [ ] | [ ] | [ ] |
| urology | 13 | [ ] | [ ] | [ ] |
| vaccines | 13 | [ ] | [ ] | [ ] |
| womens-health | 13 | [ ] | [ ] | [ ] |

(16 rows above + 5 already done this session + 9 EML batches = the ~30
`content/seed` files / therapeutic areas in the repo. Each SP/IX/DOSE
checkpoint is its own sub-task, so this is genuinely 50-90+ checklist points
end to end, matching the founder's requested granularity.)

## Working method per batch (repeatable)

1. Open `content/seed/<area>.json`, list molecules missing a `safetyProfiles`
   entry (`moleculeId` not present in the array).
2. For each: author `contraindications`, `warnings`, `foodLifestyle`,
   `overdoseEarlySigns`, `overdoseSevereSigns`, `antidoteOrSupportive`,
   `clinicalPearls`, `counsellingPoints` as **qualitative, well-established
   pharmacology** (drug-class safety signals, not dose numbers), sourced to
   `src-materia-edu` (original authoring) or `src-doh-stg` where directly
   citing the guideline. `dosingAdult` / `dosingPaediatric` / `pregnancy`
   stay `draft` placeholders — never filled with a number here.
3. Add interactions (`interactions[]`) for the clinically obvious
   combinations (can cross-reference molecule IDs in other `content/seed`
   files — already an established pattern, e.g. `mol-warfarin` in
   `cardiovascular.json` × `mol-aspirin` in `analgesics.json`).
4. Run `npm run seed:check` — the gate refuses any published field that
   looks like an invented numeric dose (`classifyDosingPreview ===
   "numeric_suspect"`). A failure here means stop and fix, not override.
5. Run `npm run test -w @materia/tests` and `npm run typecheck`.
6. Update this checklist's row, commit.

## Explicitly out of scope for this checklist

- Writing any `mgPerKgPerDose`, frequency number, or numeric STG dose text
  as `published`. That is founder-attested work via
  `npm run review:batches -- publish-dosing` / `/review` — see
  `content/pipeline/README.md`.
- Copying text from SAMF, MIMS, or Lexicomp — forbidden regardless of
  publish state (CLAUDE.md §12).
