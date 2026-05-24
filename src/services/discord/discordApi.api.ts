import { createApiClient } from "@/lib/api/baseApi"
import { env } from "@/lib/env/server"
import {
  DiscordGuildMember,
  DiscordGuildMemberSchema,
} from "@/models/discord/discordGuildMember.schema"
import { DiscordTokenResponse } from "@/services/discord/discordTokenResponse.schema"
import z from "zod"

const discordApiClient = createApiClient(env.DISCORD_API_BASE)

export const fetchDiscordMemberRoles = async (
  token: string
): Promise<string[]> => {
  const path = `/users/@me/guilds/${env.DISCORD_SERVER_ID}/member`
  try {
    const res = await discordApiClient.get<DiscordGuildMember>(path, token)
    const { roles } = z.parse(DiscordGuildMemberSchema, res)

    return roles
  } catch (error) {
    throw new Error(`Discord getRoles failed: ${error}`)
  }
}

export const refreshDiscordAccessToken = async (
  refreshToken: string
): Promise<DiscordTokenResponse> => {
  const endpointPath = "/oauth2/token"
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: env.DISCORD_CLIENT_ID,
    client_secret: env.DISCORD_CLIENT_SECRET,
  })

  try {
    const response = await discordApiClient.post<DiscordTokenResponse>(
      endpointPath,
      undefined,
      body,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )

    return response
  } catch (error) {
    throw new Error(`Discord token refresh failed: ${error}`)
  }
}
