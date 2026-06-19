import express from "express";
import { registerRoutes } from "../server/routes.js";

// Vercel serverless entry point. The whole Express API is mounted here and
// exposed at /api/* via the rewrite in vercel.json. The static frontend is
// served separately by Vercel's CDN from the build output (dist/public).
//
// The Vercel Node builder runs this as a native ES module, so relative imports
// in the function's graph use explicit ".js" extensions (the emitted file
// names) — without them Node's ESM loader throws ERR_MODULE_NOT_FOUND.
//
// Body parsing is handled by the Vercel Node runtime (req.body is pre-populated
// from the JSON payload), so we intentionally do NOT add express.json() here —
// doing so would try to re-read an already-consumed request stream.
const app = express();

// Routes register synchronously; the await is belt-and-suspenders for the very
// first invocation in a cold container.
const routesReady = registerRoutes(app);

export default async function handler(
  req: express.Request,
  res: express.Response,
) {
  await routesReady;
  return app(req, res);
}
