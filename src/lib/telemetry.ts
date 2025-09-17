/**
 * telemetry.ts
 * Client telemetry helper for development: captures navigation timing metrics
 * and posts them to the dev server endpoint /__telemetry.
 */

export function sendPageTelemetry() {
  try {
    if (!import.meta.env.DEV) return;

    const doSend = (payload: any) => {
      try {
        // Visible console log so developers can see telemetry activity
        // Keep this as debug/info so it can be filtered easily
        // eslint-disable-next-line no-console
        console.info("[telemetry] send", payload);

        // Prefer sendBeacon for reliability on unload/navigation
        if (navigator && typeof navigator.sendBeacon === "function") {
          try {
            const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
            navigator.sendBeacon("/__telemetry", blob);
            return;
          } catch (e) {
            // fall through to fetch
            // eslint-disable-next-line no-console
            console.warn("[telemetry] sendBeacon failed, falling back to fetch", e);
          }
        }

        fetch("/__telemetry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.error("[telemetry] fetch failed", err);
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[telemetry] send error", e);
      }
    };

    const gather = () => {
      try {
        const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
        const nav = navEntries && navEntries.length ? navEntries[0] : (performance as any).timing;

        const navigationStart = (nav as any).navigationStart ?? (nav as any).startTime ?? 0;
        const domContentLoadedEventEnd = (nav as any).domContentLoadedEventEnd ?? 0;
        const loadEventEnd = (nav as any).loadEventEnd ?? 0;

        let ttfb = undefined;
        if ((nav as any).requestStart && (nav as any).responseStart) {
          ttfb = Math.max(0, Math.round((nav as any).responseStart - (nav as any).requestStart));
        }

        const payload = {
          href: location.href,
          timing: {
            navigationStart,
            domContentLoaded: domContentLoadedEventEnd ? Math.max(0, Math.round(domContentLoadedEventEnd - navigationStart)) : null,
            load: loadEventEnd ? Math.max(0, Math.round(loadEventEnd - navigationStart)) : null,
            ttfb: ttfb ?? null,
          },
          userAgent: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        doSend(payload);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[telemetry] gather error", e);
      }
    };

    if (document.readyState === "complete") {
      // small delay to ensure Performance entries are populated
      setTimeout(gather, 50);
    } else {
      window.addEventListener("load", () => setTimeout(gather, 50), { once: true });
      // as a fallback, try sending after a short timeout in case load never fires
      setTimeout(gather, 5000);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[telemetry] top-level error", e);
  }
}
