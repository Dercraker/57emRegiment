import { createEnv } from "@t3-oss/env-nextjs"
import z from "zod"

// import { version } from "@/../../package.json"

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_APP_VERSION: z.string().min(1),
    NEXT_PUBLIC_BETTER_AUTH_URL: z.url(),
  },
  runtimeEnv: {
    // NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  },
})
