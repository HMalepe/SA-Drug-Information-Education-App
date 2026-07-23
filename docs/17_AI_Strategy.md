# 17_AI_Strategy

> Converted from `17_AI_Strategy.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 17 of 30
17
AI Strategy
How Materia uses AI â€” powerfully, and safely

1 Â· AI philosophy
Augment, never replace. AI supports the pharmacist, student and patient; it does not make the clinical decision. This is also what keeps Materia a reference tool, not a regulated decision-making device (Document 15).
Grounded or nothing. If the database doesn't have a sourced answer, the AI says so and routes the user â€” it never fills the gap with a plausible guess.
Cheap where it can be, smart where it must be. Pre-generate and cache the predictable; reserve live, expensive generation for where it genuinely adds value.
2 Â· Where AI is used
3 Â· RAG architecture (the grounding pipeline)
User asks a question (or a molecule tab is opened).
Retrieve the relevant, sourced chunks from the curated database (vector + structured lookup).
The LLM composes an answer strictly from those chunks, carrying their citations through.
If retrieval returns nothing adequate â†’ the AI declines and routes ('not yet in Materia' / 'verify clinically'), never fabricates.
The answer renders with its sources visible (Document 8, A5).
4 Â· Guardrails
No invented clinical values â€” enforced in the pipeline; the model cannot answer a dosing question without a retrieved, sourced value.
Uncertainty is surfaced, not hidden â€” low-confidence or unsourced â†’ flag and route to clinical verification.
Human-in-the-loop for clinical content â€” AI-drafted content is reviewed and marked before it renders (Document 13).
Never 'direct treatment' â€” outputs inform a professional's judgement; they don't instruct a specific action for a specific patient. This keeps AI features off the high-risk SaMD classification (Document 15).
Prompt-injection defence â€” untrusted content (inserts, user input, scanned text) can't override the grounding rule or exfiltrate data (Document 14).
5 Â· Privacy & POPIA in AI
6 Â· Cost management
Pre-generate static explanations (excipients, pharmacology) once; store as owned content â€” near-zero marginal cost thereafter.
Cache common questions and answers; most counter questions repeat.
Tier-gate heavy/live generation to paid users (Documents 4, 6).
Right-size the model per task â€” a small model for classification/rephrasing, a larger one only where reasoning is needed.
Rate-limit AI endpoints to prevent runaway spend and abuse (Document 14).
7 Â· Evaluation & safety testing
Clinical-accuracy eval set â€” a curated bank of questions with expert-verified answers; run on every model/prompt change.
Grounding tests â€” verify the model refuses to answer clinical questions the DB can't source.
Red-teaming â€” actively try to make it hallucinate a dose, leak data, or be injection-hijacked; fix what works.
Ongoing human review â€” sample live answers for quality; feed errors back into content and prompts.
8 Â· The AI content flywheel
Materia's smartest use of AI is building its own moat:
AI drafts molecule content (explanations, translations, lesson scaffolds) fast.
A pharmacist reviews, corrects and approves it â€” the expensive step, made cheaper.
Approved content becomes owned, sourced database content.
That content then grounds future AI answers â€” better retrieval, better answers, less generation.
9 Â· Model choice & regulatory alignment
Vendor-flexible. Abstract the LLM behind an interface (Document 16); choose per task; avoid lock-in; adopt in-region/on-device options as they mature for privacy-sensitive features.
Aligned with SAHPRA's direction. SAHPRA's 2025 AI/ML guidance signals scrutiny of decision-influencing medical AI. Materia's grounded, explanatory, human-in-the-loop posture is deliberately designed to stay informational â€” powerful for users, off the high-risk device pathway.

Document 17 of 30 Â· End of the Engineering phase. Next phase (Business): 18 Development Plan Â· 19 QA Â· 20 Analytics Â· 21 Customer Support Â· 22 Sales Â· 23 Customer Success.
