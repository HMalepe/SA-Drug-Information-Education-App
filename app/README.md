# `/app` — Expo client (Materia)

Scaffolded for Expo (SDK 54/57-compatible structure) with Medicine 360°, search, auth consent, and dosing hub screens.

The Expo app is **not** in the root npm workspaces (Expo peer resolution is heavy on Windows). Install locally:

```bash
cd app
npm install
npx expo start
```

Set `EXPO_PUBLIC_API_BASE_URL` to the API (use your LAN IP for a physical device), default `http://localhost:4000`.

API routes used: `/search`, `/molecules/:slug`, `/ai/ask`, `/auth/stub-session`, `/consent`, `/tools/dose-calculator`.
