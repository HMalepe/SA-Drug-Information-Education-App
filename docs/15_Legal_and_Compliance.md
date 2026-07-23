# 15_Legal_and_Compliance

> Converted from `15_Legal_and_Compliance.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 15 of 30
15
Legal & Compliance
POPIA, the medical-device line, and staying shippable

1 Â· POPIA â€” the data-protection baseline
The Protection of Personal Information Act (Act 4 of 2013) has been fully enforceable since 1 July 2021, and the Information Regulator is now in active enforcement. It governs everything Materia does with personal data.
Health data is 'special personal information'
Section 26 classifies health information as special personal information â€” its processing is generally prohibited unless a specific exception (ss 27â€“33) applies. Materia's Companion features (regimens, adherence, symptoms) fall squarely here. The practical route is explicit, informed consent from the data subject, plus adherence to all eight lawful-processing conditions regardless.
Useful nuance. The 2026 sector-specific health-data regulations target insurers, medical schemes, administrators and employers. A healthtech app like Materia generally sits outside that specific overlay â€” but remains fully bound by POPIA's general special-personal-information rules. Confirm scope with counsel.
The eight conditions (design against these)
Cross-border transfers (s72) â€” the AI/cloud catch
Penalties. Administrative fines up to R10 million per violation; criminal liability (up to ~10 years) for the most serious offences, including unlawful processing of special personal information. Enforcement is now routine, not theoretical.
2 Â· The medical-device question (SAHPRA)
The highest-leverage regulatory decision in the whole venture. SAHPRA regulates medical devices â€” including software as a medical device (SaMD) â€” under the Medicines and Related Substances Act 101 of 1965, using a four-tier risk classification (Class Aâ€“D, aligned with the international IMDRF framework).
Where the line sits
Materia's regulatory posture
Design to stay on the reference/education side â€” deliberately. Keep features informational and cited; keep a human in the loop; never let the app 'direct treatment' for a specific patient. This is already baked into the grounding contract (Document 12) and the calculator rules below.
The dose calculator is the boundary object. A calculator that shows its working, cites its source, and requires clinical confirmation is a reference aid. One that spits out 'give this patient X mg' as an instruction drifts toward SaMD. Build it as the former; gate and disclaim it (Documents 7, 9).
Get a regulatory read before the calculator ships. A short consult with a SA medical-device regulatory expert on the calculator and any decision-support AI is far cheaper than a misclassification. If Materia ever chooses to build true point-of-care decision support, that's a deliberate decision to pursue SaMD classification â€” establishment licence, ISO 13485/14971, Class C/D pathway â€” with eyes open.
3 Â· Other applicable law
4 Â· Documents & policies to have in place
Privacy Policy â€” plain-language, POPIA-compliant, published before collecting data.
Terms of Service â€” usage, subscriptions, liability limits, acceptable use.
Medical disclaimer â€” prominent, acknowledged: a reference/education tool, not a substitute for professional judgement or emergency care (Documents 8-A10, 9).
Consent flows & logs â€” especially for health data and marketing communications.
Data-processing agreements â€” with every operator (payments, email, AI, cloud, WhatsApp).
Breach-response plan â€” the Document 14 procedure, documented.
5 Â· Intellectual property
Trademark the name. Register 'Materia' (and logo) with CIPC before public launch; secure domains/handles (Document 11).
Own your content. Original, expert-authored medicine content is Materia's core asset and is protected by copyright â€” a deliberate advantage over reproducing licensed references you can't own.
Protect the database. Guard the assembled molecule graph through access controls, terms, and anti-scraping â€” its value is in the assembly, which is expensive to replicate.
6 Â· Compliance checklist & when to get a lawyer

Document 15 of 30 Â· Sources: POPIA (Act 4 of 2013) & Information Regulator; SAHPRA AI/ML medical-device communication (Sept 2025), Classification Guideline SAHPGL-MD-04, Act 101 of 1965; Webber Wentzel/Fasken 2026. Not legal advice. Next: Integrations.
