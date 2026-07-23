# 09_User_Experience

> Converted from `09_User_Experience.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 9 of 30
09
User Experience (UX)
Flows, onboarding, accessibility and the ten-second answer

1 Â· UX principles
The ten-second answer. The core promise. From open to answer in ~10 seconds for the top pharmacist tasks. Every extra tap on a hot path is a design failure.
One object, many lenses. The molecule page is identical for everyone; the lens (patient/student/pharmacist) changes depth, language and default tab â€” never the map.
Progressive depth. Show the essential answer first; let the curious drill down. A patient sees 'take with food'; a pharmacist expands to kinetics. Depth on demand, never dumped.
Trust, visible. Sources and review dates are part of the interface, not buried. Seeing 'why we say this' is what converts skeptical professionals.
Graceful under bad conditions. Offline, load-shedding, 3G, low-end Android, one-handed at a counter. Design for the worst realistic context, not a demo on fibre.
Calm, not clinical-cold. Serious content, humane delivery. Reassuring for patients, efficient for pros, never sterile or alarming.
2 Â· Information architecture
A shallow, predictable structure. Five primary destinations; the molecule page is the gravitational centre they all lead back to.
3 Â· Core user flows
The hot paths, each designed to its persona's job. Steps are the target â€” fewer is better.
Flow A Â· Pharmacist looks up a medicine (the ten-second path)
Open app â†’ cursor already in search.
Type brand/molecule â†’ instant results with molecule pinned at top.
Tap â†’ 360Â° page opens on the most-used tab for pharmacist mode (e.g. Dosing/Interactions).
Answer visible without scrolling; deeper detail one tap away.

Flow B Â· Stockout substitution
On the molecule page, tap 'Substitute'.
See registered alternatives ranked, each with SEP + bioequivalence flag + stock signal.
Select one â†’ patient price difference + counselling note shown.

Flow C Â· Student learns a molecule
Open Learn â†’ pick molecule / continue streak.
Lesson plays (story â†’ structure â†’ animation â†’ body â†’ pearls).
Check-question; wrong answers trigger the AI tutor's correction.
Progress + badge update; next lesson suggested (adaptive).

Flow D Â· Patient sets up a medicine
Add medicine (search or scan box).
Plain-language explanation in chosen language.
Set reminder schedule; see food/interaction flags.

Flow E Â· Emergency / suspected overdose (special care)
This flow must be unmistakable, fast, and impossible to get lost in. It is the one place where speed and clarity are life-relevant.
Overdose tab (or emergency shortcut) opens instantly to a single, scannable screen.
Early signs / severe signs / antidote-or-supportive shown top-down, no scrolling to the critical part.
A persistent, high-contrast 'Call emergency services / Poisons Centre' action is always visible.
The fixed 5-step what-to-do list; explicitly frames itself as first-aid, not treatment.
4 Â· Onboarding
First run decides retention. The goal: from install to a genuine 'aha' in under 60 seconds, with almost no friction.
Ask one thing: who are you? (Patient / Student / Pharmacist / Doctor.) This sets the lens.
Skip the tour. Drop them straight into one delightful action â€” search a medicine they know, or play one 90-second lesson.
Defer sign-up until after value is felt (let them taste before the account gate).
Log the medical-disclaimer consent once, clearly, without a wall of legalese.
5 Â· Accessibility & inclusion
WCAG 2.2 AA as the baseline â€” contrast, focus states, semantic structure, screen-reader labels on every clinical field.
Language. Multilingual patient content (isiZulu, Afrikaans, Sesotho, isiXhosa, English to start) â€” not a translation afterthought but a first-class mode.
Low-literacy & health-literacy. Plain-language patient mode, icons alongside text, the 'Grade-5' reading toggle.
Low-end devices & data. Lightweight, offline-capable, image-optional modes; designed for the Android majority on constrained data.
One-handed use. Reachable primary actions; pharmacists work standing, holding stock, mid-conversation.
6 Â· Empty, error & edge states

Document 9 of 30 Â· Next: User Interface (UI).
