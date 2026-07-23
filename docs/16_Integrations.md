# 16_Integrations

> Converted from `16_Integrations.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 16 of 30
16
Integrations
The third-party services Materia plugs into

1 Â· Integration principles
Abstract behind interfaces. Wrap every provider behind an internal interface so any one can be swapped without touching the rest of the app. No hard vendor lock-in.
Every integration is a data processor. Under POPIA, each third party touching personal data is an 'operator' and needs a written data-processing agreement and adequate safeguards (Document 15).
SA-first choices. Prefer providers with strong South African support â€” local payment methods, local rails, in-region options.
Minimise data shared. Send each provider only what it needs; never route identifiable health data to services that don't require it.
2 Â· Payments & billing
Recurring subscriptions (Documents 4, 6) plus once-off institutional invoicing. SA card penetration is high, but instant-EFT and alternative methods matter for reach.
3 Â· Messaging â€” email, SMS & WhatsApp
Email. A transactional + marketing email provider (e.g. Postmark, SendGrid, Resend) for verification, receipts, reminders and (consented) marketing. Marketing email needs POPIA-compliant opt-in.
WhatsApp â€” the SA superpower. WhatsApp is ubiquitous in South Africa; MomConnect reached millions of mothers through it. Via the WhatsApp Business API (through a provider like Twilio or 360dialog), Materia can deliver medication reminders, refill nudges and even lightweight molecule Q&A where users already live. A genuine engagement channel, not an afterthought.
SMS. A fallback for reminders on feature phones or where data is scarce â€” reach over richness.
4 Â· Maps & location
Maps/Places (e.g. Google Places) for 'find the cheapest bioequivalent near me' and pharmacy/stock locators â€” ties the substitution/SEP engine to the real world.
Privacy note: location is personal data â€” collect with consent, use transiently, don't store trails.
5 Â· AI, vision & speech
6 Â· Data feeds (the content pipeline)
These aren't user-facing integrations â€” they're how the medicine graph stays current. Each needs an ingestion pipeline with validation and provenance (Document 13).
SAHPRA medicine register â€” registered products, reg numbers, scheduling (public).
Department of Health SEP database â€” pricing & history (public).
DoH STGs/EML & guidelines â€” clinical reference base (free).
Wholesaler catalogues â€” availability/stock signals (partnership).
Medical-scheme formularies â€” reimbursement data (per-scheme).
Manufacturer assets â€” product images, inserts (obtain/partner).
7 Â· Platform integrations
Auth / SSO â€” identity provider for institutional SSO (SAML/OIDC).
Analytics & crash reporting â€” product analytics + error monitoring (Document 20), privacy-respecting.
CPD / accreditation â€” integration or reporting into SAPC CPD workflows as the accredited-CPD feature matures.
8 Â· Integration register (keep one)

Document 16 of 30 Â· Next: AI Strategy.
