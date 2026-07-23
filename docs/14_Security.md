# 14_Security

> Converted from `14_Security.docx`. Source of truth for Materia strategy.

MATERIA
Application Building Framework  Â·  Document 14 of 30
14
Security
Protecting health data â€” because POPIA has teeth

1 Â· Security principles
Defence in depth. No single control is trusted alone; layers so that one failure isn't a breach.
Least privilege. Every user, service and staff member gets the minimum access needed â€” nothing more.
POPIA-by-design. Personal and health data is minimised, separated, encrypted and access-logged from the first line of code, not bolted on.
Assume breach. Design so that if something is compromised, the blast radius is small and detection is fast.
Security is a feature, not a phase. In a trust business it's part of the product, funded and maintained continuously.
2 Â· Authentication
Managed auth provider (don't roll your own) â€” hashed credentials, secure sessions, password policies.
MFA required for Professional, admin and institutional accounts; encouraged for all.
SSO for institutions (universities, hospital groups) â€” SAML/OIDC.
Sensible session handling â€” short-lived tokens, refresh, remote sign-out, device management.
3 Â· Authorisation (RBAC)
Access is decided by role Ã— tier Ã— organisation scope. A pharmacist can't see another user's regimen; an institution admin sees only their org's cohorts; nobody sees personal data they don't need.
4 Â· Encryption & data protection
In transit: TLS everywhere; no plaintext anywhere on the wire.
At rest: database and backups encrypted; managed key handling; keys rotated.
Special personal information (health) â€” regimens, adherence, symptom logs â€” separated from general data, encrypted, and access-logged more strictly than the rest.
Data minimisation: collect only what a feature needs; the safest health record is the one never collected.
Secrets management: no credentials in code or repos; a secrets manager; scoped API keys.
5 Â· Audit logging
Comprehensive, tamper-evident logs â€” both a security control and POPIA breach-evidence:
Who accessed which personal/health record, when, and why.
All admin and content-review actions (ties to the review audit, Document 13).
Authentication events, permission changes, data exports.
Logs protected from tampering and retained per policy; monitored for anomalies.
6 Â· Abuse, rate limiting & AI cost protection
Rate limiting on API and especially AI endpoints â€” protects against both abuse and runaway AI spend.
Bot / scraping defence on public molecule pages â€” welcome search crawlers, block content theft.
Input validation everywhere; treat all client input as hostile.
AI prompt-injection awareness â€” untrusted content is never allowed to override the grounding contract or exfiltrate data (Document 17).
7 Â· Application & supply-chain security
Secure coding practices; code review on anything touching auth or personal data.
Automated dependency scanning; patch known vulnerabilities promptly.
Least-privilege service accounts; network segmentation between tiers.
Vendor/processor due diligence â€” every third party touching data is a POPIA 'operator' under a written processing agreement (Documents 15, 16).
8 Â· Incident response (POPIA-aligned)
Breaches are handled, not hoped away. A written, rehearsed plan:
Detect & contain â€” isolate the affected system; stop the bleeding.
Assess â€” what data, whose, how much; preserve logs as evidence.
Notify â€” POPIA requires notifying the Information Regulator and affected data subjects as soon as reasonably possible after a compromise.
Remediate â€” close the hole; verify; post-mortem without blame.
Learn â€” feed findings back into controls and this plan.
9 Â· Verification
Independent penetration testing before any launch that handles personal data, and periodically after.
Security review folded into QA (Document 19), not treated as separate.
A responsible-disclosure channel so researchers can report issues safely.

Document 14 of 30 Â· Sources: POPIA (Act 4 of 2013); Information Regulator guidance; Webber Wentzel & Fasken analyses 2026. Next: Legal & Compliance.
