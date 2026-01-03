import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Ensure the database is provisioned.");
}

export const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});

export const db = drizzle(client, { schema });
