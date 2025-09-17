/**
 * api.ts
 * Centralized API helper. Purpose:
 * - Use a single source for the API base URL (VITE_API_URL) so it's easier to change.
 * - Use safe defaults (credentials included for same-site cookies) and consistent JSON handling.
 * - Provide a small auth helper to set an Authorization header when needed.
 *
 * Security notes (important):
 * - Any endpoint the browser calls is visible to users. Do not embed secrets in client-side code.
 * - Enforce authentication, authorization, input validation, rate limiting and CORS on the server.
 * - Prefer httpOnly, Secure cookies for session tokens instead of localStorage.
 */

const BASE = (import.meta.env.VITE_API_URL as string) || "";

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function getBaseUrl() {
  return BASE;
}

type ApiOptions = RequestInit & { json?: any };

async function makeUrl(path: string) {
  // allow callers to send absolute URLs for special cases; otherwise join with BASE
  if (!path) throw new Error("api: empty path");
  if (/^https?:\/\//i.test(path)) return path;
  const base = BASE || window.location.origin;
  // ensure single slash
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export async function apiFetch(path: string, opts: ApiOptions = {}) {
  const url = await makeUrl(path);

  const headers = new Headers(opts.headers || {});
  if (opts.json !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  const init: RequestInit = {
    method: opts.method || (opts.json !== undefined ? "POST" : "GET"),
    credentials: opts.credentials ?? "include", // include cookies by default
    ...opts,
    headers,
  };

  // stringify JSON body if provided
  if (opts.json !== undefined) {
    init.body = JSON.stringify(opts.json);
  }

  // Basic retry for idempotent GET requests (small, controlled)
  const isGet = (init.method || "GET").toUpperCase() === "GET";
  const maxAttempts = isGet ? 2 : 1;
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      const res = await fetch(url, init);

      // bubble unauthorized so host app can react
      if (res.status === 401) {
        // emit a custom event for other code to listen to
        try {
          window.dispatchEvent(new CustomEvent("api:unauthorized", { detail: { url, status: res.status } }));
        } catch {}
      }

      // try to parse JSON, but tolerate empty responses
      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        // not JSON
        data = text;
      }

      if (!res.ok) {
        const err: any = new Error(`api error ${res.status}`);
        err.status = res.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (err) {
      // on failed GET attempt, retry once after short delay
      if (attempt < maxAttempts) {
        await new Promise((r) => setTimeout(r, 250));
        continue;
      }
      throw err;
    }
  }
}

export const api = {
  get: (path: string, opts?: RequestInit) => apiFetch(path, { ...opts, method: "GET" }),
  post: (path: string, body?: any, opts?: RequestInit) => apiFetch(path, { ...opts, method: "POST", json: body }),
  put: (path: string, body?: any, opts?: RequestInit) => apiFetch(path, { ...opts, method: "PUT", json: body }),
  del: (path: string, opts?: RequestInit) => apiFetch(path, { ...opts, method: "DELETE" }),
  setAuthToken,
  getBaseUrl,
};

export default api;
