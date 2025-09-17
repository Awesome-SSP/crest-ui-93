Security recommendations for this project

Important: client-side code runs in users' browsers and cannot hold secrets. Follow these rules:

1. Do not store secrets in client-side code
   - Never embed API keys, service account credentials, or private tokens in the repository.
   - Use server-side code to perform privileged operations.

2. Use httpOnly, Secure cookies for sessions
   - Prefer server-set cookies with httpOnly and Secure flags instead of storing tokens in localStorage.

3. Require server-side authentication & authorization
   - All API endpoints must validate the request token/session and check permissions.
   - Validate and sanitize all input on the server.

4. CORS & rate-limiting
   - Configure CORS to only allow known origins for production builds.
   - Add rate-limiting and bot protection on sensitive endpoints.

5. Avoid exposing internal URLs
   - Keep internal service addresses and admin endpoints behind server-side proxies that require authentication.

6. Logging & monitoring
   - Do not log sensitive data (PII, tokens). Mask or redact sensitive fields.

7. Use TLS everywhere
   - Serve production over HTTPS and enforce HSTS.

Quick steps to harden this app (developer checklist):
- Move any direct backend operations into server endpoints that enforce auth.
- Add server-side input validation and output sanitization.
- Use httpOnly secure cookies for session tokens.
- Add server middleware to block suspicious IPs and rate-limit.
- Rotate and revoke tokens regularly and have a key-rotation policy.

If you want, I can:
- Add a small example server (Express) that demonstrates secure auth endpoints and proxies external APIs.
- Add a CI step that scans for accidental secrets in commits (git-secrets, truffleHog).
