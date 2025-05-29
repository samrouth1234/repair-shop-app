import { Config, defineConfig } from "drizzle-kit";
import { config } from "dotenv";
import { env } from "./src/env";

// Load environment variables from .env file
config({ path: ".env" });
console.log("Database URL:", env.DATABASE_URL || "Not set, using default");

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations",
    schema: "public",
  },
}) satisfies Config;
