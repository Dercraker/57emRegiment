import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
export const env = createEnv({
  server: {
    //NextJS
    NODE_ENV: z.literal(["production", "development"]),

    //Prisma
    DATABASE_URL: z.url(),

    //BetterAuth
    BETTER_AUTH_SECRET: z.string().trim().min(32),
    BETTER_AUTH_URL: z.url(),
    DISCORD_SERVER_ID: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),

    //Api
    DISCORD_API_BASE: z.url(),
  },
  experimental__runtimeEnv: process.env,
})
