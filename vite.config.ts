import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: process.env.HOST || "0.0.0.0",
      port: Number(process.env.PORT || 8080),
      hmr: {
        overlay: false,
      },
      // If you want Vite to fail when the port is already in use (instead of
      // switching to a different port), set strictPort to true. Default is false.
      strictPort: false,
    },

    // Keep the React SWC plugin (fast) - no extra dev-only plugins added
    plugins: [react()].filter(Boolean),

    // Prebundle common dependencies and set esbuild targets to speed cold starts
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-router-dom",
        "recharts",
        "d3-scale",
        "lucide-react",
        "framer-motion",
       
      ],
      esbuildOptions: {
        target: "es2020",
      },
    },

    // Use a dedicated cache directory for faster repeated runs
    cacheDir: "node_modules/.vite-cache",

    esbuild: {
      jsx: "automatic",
      target: "es2020",
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      target: "es2020",
      sourcemap: isDev ? "inline" : false,
      minify: isDev ? false : "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },

    // Show info-level logs so Vite prints the Local / Network URLs to the console
    logLevel: "info",
    // warn if not requried to show the urls
    // logLevel: "warn",
  };
});
