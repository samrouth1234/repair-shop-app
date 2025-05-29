import { env } from "@/env";

import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

/***
 * @package Do : env
 * @param connectionString This is the PostgreSQL connection URL, typically from .env.local like: postgresql://user:password@localhost:5432/dbname
 * @param max Maximum number of connections in the pool at once. Default: 10, here it's set to 20.
 * @param idleTimeoutMillis How long (in ms) a connection can remain idle in the pool before being closed. 30 seconds here
 * @param connectionTimeoutMillis How long (in ms) to wait for a connection from the pool before throwing an error. 2 seconds here.
 * @param maxUses Maximum number of times a connection can be reused before being closed, default is 7500
 * 
 */
const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  maxUses: 7500,
});

// Error handling for the pool
pool.on("error", (err: any) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export type DbType = NodePgDatabase<typeof schema>;

export const db = drizzle(pool, {
  schema,
  logger: {
    logQuery: (query, params) => {
      console.debug(
        `Query: ${query} ${
          params ? `\nParams: ${JSON.stringify(params)}` : ""
        }`,
        "drizzle"
      );
    },
  },
});
