import { env } from "@/lib/env/server"
import { SocialProviders } from "better-auth/types"

export const getSocialProviders = (): SocialProviders => {
  return {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      disableDefaultScope: true,
      scope: ["identify", "email", "guilds.members.read"],
    },
  }
}
