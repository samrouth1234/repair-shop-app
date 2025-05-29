import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_DOMAIN: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION || !!process.env.CI,
});
