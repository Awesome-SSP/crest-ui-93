This project has been updated with several performance and SEO improvements. The changes are non-invasive and focus on reducing the initial bundle size, improving loading responsiveness, and adding basic SEO metadata.

What I changed

- Route-level code splitting: Pages are now loaded with React.lazy + Suspense in `src/App.tsx` so the initial bundle only contains bootstrap code and not every page.
- Lazy-loaded heavy charts on the index page: `PaymentsByBucketChart` and `CostsCollectionsChart` are loaded on demand in `src/pages/Index.tsx`.
- Loading placeholder: `src/components/Loading.tsx` provides a small fallback while routes load.
- index.html: improved meta tags (description, robots, canonical), theme-color, preconnect to fonts, and modulepreload hint.
- Vite build config: `vite.config.ts` now has smarter `manualChunks` splitting for large deps (react, react-dom, recharts, d3, framer-motion) and brotli size reporting.

How this helps

- Smaller initial JS bundle -> faster first contentful paint and interactive time.
- On-demand loading of charts and pages -> CPU and network used only when needed.
- Improved SEO tags -> better indexing and richer previews on social shares.

How to build & verify

Run a production build and check sizes:

# Install deps (if needed)
# npm install

# Build for production
npm run build

# Serve the dist folder locally (example using serve)
# npx serve dist

Open the site in an incognito window and use Lighthouse (in DevTools) to measure improvements in Performance and SEO.

Next steps / recommendations

- Apply the same lazy-loading pattern to other chart-heavy pages: `JudgmentPerformance`, `Dollars`, `InvChartBatches`, `Liquidation`, and `Inventory`.
- Consider using a lightweight charting library or rendering charts on demand (server-side or via canvas) for very large datasets.
- Enable gzip/brotli compression on your production server and set caching headers for static assets.
- Add real OpenGraph images (`/og-image.png`) for better social previews.

If you want, I can continue and lazily load charts on all remaining pages, add SSR using Vite SSR or Next.js for even better SEO, or configure a CI step to run Lighthouse and fail on regressions.