# Version History

This file captures the major edits made during the current development
cycle. Use semantic versioning for future releases (e.g., `v0.1.0`).

## v0.1.2 - 2025-09-17

- Add cross-platform production serve script (`scripts/serve-prod.mjs`) and
  update `package.json` to use `npm run serve:prod` (works on Windows/PowerShell).
- Documentation updates: `README.md`, `IMPLEMENTATION.md`, and `SECURITY.md`.

## v0.1.1 - 2025-09-17 (previous)

- Implemented Timeline dashboard page with:
  - KPI row, animated phase cards, Recharts LineChart
  - Export CSV and theme-colored HTML `.xls` export (function present)
  - Share button using Web Share API with clipboard fallback

- Implemented HeatMaps page:
  - US choropleth using `react-simple-maps` and topojson
  - Timeline play/pause and tooltip

- Implemented Judgment Performance page:
  - KPIs, LineChart, AreaChart, PieChart, Top Cases list
  - Share and CSV export

- Global UI polish:
  - Added font, CSS tokens, spacing variables and utilities (`.card`, `.btn`)
  - Added JSDoc/module comments across key components for clarity

## v0.1.0 - initial

- Initial project scaffold with Vite + React + Tailwind.

---

For more details see `IMPLEMENTATION.md` and the source files' inline
comments and TODOs.
