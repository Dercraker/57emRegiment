import z from "zod"

export const DiscordTokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
})

export type DiscordTokenResponse = z.infer<typeof DiscordTokenResponseSchema>
