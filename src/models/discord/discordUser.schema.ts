import { DiscordSnowflakeSchema } from "@/models/discord/discordSnowflake.schema"
import z from "zod"

export const DiscordUserSchema = z.object({
  id: DiscordSnowflakeSchema,
  username: z.string(),
  discriminator: z.string(),
  global_name: z.string().nullable(),
  avatar: z.string().nullable(),
  bot: z.boolean().optional(),
  public_flags: z.number().int().optional(),
})

export type DiscordUser = z.infer<typeof DiscordUserSchema>
