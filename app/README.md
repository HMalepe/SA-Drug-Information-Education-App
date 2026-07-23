# `/app` — Expo client (Materia)

Medicine 360°, search, auth consent, and dosing hub. Kept **outside** root npm workspaces (Expo peer resolution is heavy on Windows).

## Setup

```bash
# from repo root — build shared packages first
npm run build -w @materia/design-tokens -w @materia/shared

cd app
npm install
npx expo start
```

`metro.config.js` watches the monorepo root so `@materia/shared` and `@materia/design-tokens` resolve via `file:` links.

## Env

| Variable | Default |
| --- | --- |
| `EXPO_PUBLIC_API_BASE_URL` | `http://localhost:4000` (use LAN IP on a physical device) |

## API used

`/search`, `/molecules` (`?area=`), `/molecules/:slug`, `/ai/ask`, `/auth/stub-session`, `/consent`, `/tools/dose-calculator`
