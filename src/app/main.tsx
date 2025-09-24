import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { sendPageTelemetry } from "@/lib/telemetry";
import { ThemeProvider } from "@/components/common/theme-provider";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <App />
    </ThemeProvider>,
);

// send a telemetry ping in dev to capture load metrics
// call telemetry after the page has loaded to ensure performance entries exist
if (import.meta.env.DEV) {
    try {
        if (document.readyState === "complete") {
            // eslint-disable-next-line no-console
            console.info("[telemetry] page already loaded, sending telemetry");
            sendPageTelemetry();
        } else {
            window.addEventListener("load", () => {
                // eslint-disable-next-line no-console
                console.info("[telemetry] window load fired, sending telemetry");
                sendPageTelemetry();
            }, { once: true });
            // also attempt after a short delay as a fallback
            setTimeout(() => {
                // eslint-disable-next-line no-console
                console.debug("[telemetry] fallback timer, attempting to send telemetry");
                sendPageTelemetry();
            }, 4000);
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error("[telemetry] error scheduling telemetry", e);
    }
}
