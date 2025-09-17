
# crest-ui-93

Modern analytics dashboard UI built with React + TypeScript and Tailwind.

This repository contains a collection of dashboard pages (Timeline, HeatMaps,
Judgment Performance) plus a small UI toolkit based on shadcn-ui and Radix
primitives. The project is scaffolded using Vite.

Quick links
 - IMPLEMENTATION: `IMPLEMENTATION.md` — architecture and implementation notes.
 - VERSION HISTORY: `VERSION_HISTORY.md` — changelog for recent edits.

Live demo
 - There is no public hosting for the latest build. Run locally (instructions
	 below) to preview the app.

Run locally

You need Node.js & npm installed (recommend using nvm).

```powershell
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Enter the project
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start dev server (default http://localhost:8080)
npm run dev
```

Environment
 - The client will use `import.meta.env.VITE_API_URL` when set. For local development you can set it in a `.env` file at the project root, for example:

```text
# .env
VITE_API_URL=http://localhost:3000
```

Security
 - See `SECURITY.md` for important guidance on how to avoid exposing secrets or sensitive endpoints from the client.

What you get
 - Interactive Recharts visualizations (line/area/pie)
 - US choropleth maps (react-simple-maps)
 - Lightweight toast system and export/share utilities

Changelog (recent)
 - See `VERSION_HISTORY.md` for a concise history. The current work adds
	 Timeline, HeatMaps, and Judgment Performance dashboards with export and
	 share features and improved UI tokens.

Contributing
 - Replace inline sample data (TODO markers in files) with API calls or
	 wire the pages to your backend.
 - Add unit tests for chart renderers and utility functions.

Local secure backend example
 - This repo includes a minimal example server under `examples/secure-proxy` that
	 demonstrates a safer pattern: the server sets an httpOnly cookie and exposes
	 an authenticated `/api/status` endpoint. Run it with:

```powershell
cd examples/secure-proxy
npm install
node server.js
```

Using the client API wrapper
 - The frontend includes `src/lib/api.ts` which centralizes API calls and reads
	 the base URL from `VITE_API_URL`. Update `.env` with `VITE_API_URL=http://localhost:3000` to test against
	 the example server.

License & credits
 - Project uses standard open-source libraries (Recharts, react-simple-maps,
	 d3-scale, framer-motion, lucide-react). Verify and add license notices as
	 needed when integrating with proprietary code.

