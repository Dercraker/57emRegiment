import context from "@/lib/prisma/dbContext"
import { DiscordTokenResponse } from "@/services/discord/discordTokenResponse.schema"

type updateAccountByUserIdProps = {
  userId: string
  tokens: DiscordTokenResponse
}

export const updateAccountByUserIdAsync = async ({
  userId,
  tokens,
}: updateAccountByUserIdProps) =>
  await context.account.updateMany({
    where: { userId, providerId: "discord" },
    data: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      accessTokenExpiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    },
  })
