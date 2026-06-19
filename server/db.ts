import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";

// The database is optional. The public site renders entirely from hardcoded
// fallback content in the React pages, so the API must not crash when
// DATABASE_URL is unset (e.g. on Vercel without a provisioned database).
// Connections are created lazily on first use.

let _pool: pg.Pool | null = null;
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): pg.Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!_pool) {
    _pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
    _pool.on("error", (err) => {
      console.error("Unexpected database pool error:", err);
    });
  }
  return _pool;
}

export function getDb() {
  const pool = getPool();
  if (!pool) return null;
  if (!_db) {
    _db = drizzle(pool, { schema });
  }
  return _db;
}
