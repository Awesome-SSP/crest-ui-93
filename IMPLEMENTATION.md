# Implementation Notes

This document summarizes the architecture, important files, and how major
features are implemented in this repository. It is intended to help new
contributors understand the structure and quickly locate relevant code.

## Architecture

- Frontend-only React + TypeScript application scaffolded with Vite.
- Styling with Tailwind CSS and a small set of utility classes (`.card`,
  `.btn`) added on top of shadcn-ui primitives.
- Small in-app state utilities (for example a lightweight toast manager) are
  implemented without external state libraries.

## Key folders

- `src/pages/` — top-level route pages (Timeline, HeatMaps, JudgmentPerformance,
  etc.). Each page is a small React component and may include demo/sample data.
- `src/components/` — reusable UI components (ChartCard, StatsCard, Navbar,
  charts, and shadcn-ui based primitives in `ui/`).
- `src/hooks/` — lightweight hooks such as `use-toast` used for notifications.

## Notable Implementations

- Timeline (`src/pages/Timeline.tsx`)
  - Responsive Recharts LineChart with 3 series.
  - Export CSV and an HTML-based colored `.xls` exporter (function available).
  - Timeline sharing via Web Share API plus clipboard fallback.

- HeatMaps (`src/pages/HeatMaps.tsx`)
  - US choropleth implemented using `react-simple-maps` and a topojson
    source (`us-atlas`).
  - Animated timeline with play/pause and a tooltip showing state values.

- Judgment Performance (`src/pages/JudgmentPerformance.tsx`)
  - Polished dashboard with KPIs, LineChart, AreaChart, PieChart, and
    a Top Cases panel. Includes CSV export and Share behavior.

## Theming and Tokens

- Global CSS variables (HSL-based) live in `src/index.css`. These are used
  both for runtime theming and to style exported assets (the `.xls` export
  reads CSS variables at runtime).

## Toast Notifications

- A small toast manager (`src/hooks/use-toast.ts`) is used together with
  composable Radix-toast primitives (`src/components/ui/toast.tsx`) and
  `Toaster` which should be mounted near the app root to display messages.

## Where to Replace Demo Data

- Many pages use inline sample arrays for quick demos (see TODO markers in
  the source — e.g. `timelineData` in `Timeline.tsx` or `monthly` in
  `JudgmentPerformance.tsx`). Replace those with API calls or props when
  integrating with a backend.

## Development Notes

- Run locally: `npm install` then `npm run dev` (Vite dev server).
- Static checks and TypeScript type checking should be run as part of your
  CI pipeline. The repo uses lightweight helper types; adjust strictness in
  `tsconfig` if needed.

---

If you want, I can add API integration examples, a mock server, or
instructions for adding unit tests for the chart components.
