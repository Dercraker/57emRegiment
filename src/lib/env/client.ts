import { createEnv } from "@t3-oss/env-nextjs"

// import { version } from "../../../package.json"

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_APP_VERSION: z.string().min(1),
    // NEXT_PUBLIC_SITE_URL: z.url(),
  },
  runtimeEnv: {
    // NEXT_PUBLIC_APP_VERSION: version,
    // NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
})
