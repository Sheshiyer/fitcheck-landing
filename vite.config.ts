import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lightweight dev-only .env loader so the API route can read AWS_REGION,
// DYNAMODB_TABLE, etc. without requiring an extra dependency.
function loadEnv() {
  try {
    const envPath = path.resolve(__dirname, ".env");
    const env = readFileSync(envPath, "utf8");
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.slice(0, eqIndex).trim();
      let value = trimmed.slice(eqIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // No .env file — AWS SDK will use ~/.aws/credentials or env vars already set.
  }
}

loadEnv();

// Dev-only helper: wire /api/lead to the Vercel-style serverless handler
// so `npm run dev` works without needing `vercel dev`.
function apiRoutePlugin() {
  return {
    name: "api-route-plugin",
    configureServer(server) {
      console.log("[api-route-plugin] registering /api/lead handler");
      server.middlewares.use(async (req, res, next) => {
        const pathname = req.url ? req.url.split("?")[0] : "";
        if (pathname !== "/api/lead") return next();

        try {
          const { default: handler } = await import("./api/lead.js");

          if (req.method === "OPTIONS" || req.method === "GET") {
            req.body = {};
            return handler(req, res);
          }

          if (req.method !== "POST") {
            res.writeHead(405, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
            return;
          }

          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              req.body = body ? JSON.parse(body) : {};
            } catch {
              req.body = {};
            }
            handler(req, res);
          });
        } catch (err) {
          console.error("[api-route-plugin] error:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ ok: false, error: "Internal server error" }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiRoutePlugin()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
