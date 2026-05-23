import { auth } from "@/lib/auth/auth"
import { env } from "@/lib/env/client"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const { useSession, signOut, signIn, ...authClient } = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [inferAdditionalFields<typeof auth>()],
})
