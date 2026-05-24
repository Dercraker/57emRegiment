import { discordApiClient } from "@/lib/api/baseApi"
import { env } from "@/lib/env/server"
import {
  DiscordGuildMember,
  DiscordGuildMemberSchema,
} from "@/models/discord/discordGuildMember.schema"
import { DiscordTokenResponse } from "@/services/discord/discordTokenResponse.schema"
import z from "zod"

export const fetchDiscordMemberRoles = async (
  token: string
): Promise<string[]> => {
  const path = `/users/@me/guilds/${env.DISCORD_SERVER_ID}/member`
  const res = await discordApiClient.get<DiscordGuildMember>(path, token)
  const { roles } = z.parse(DiscordGuildMemberSchema, res)

  return roles
}

export const refreshDiscordAccessToken = async (
  refreshToken: string
): Promise<DiscordTokenResponse> => {
  const response = await fetch(`${env.DISCORD_API_BASE}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
    }),
  })

  if (!response.ok) {
    throw new Error(`Discord token refresh failed: ${response.status}`)
  }

  return response.json() as Promise<DiscordTokenResponse>
}
