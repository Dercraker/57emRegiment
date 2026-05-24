import { DiscordSnowflakeSchema } from "@/models/discord/discordSnowflake.schema"
import { DiscordUserSchema } from "@/models/discord/discordUser.schema"
import { z } from "zod"

export const DiscordGuildMemberSchema = z.object({
  user: DiscordUserSchema.optional(),
  nick: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  roles: z.array(DiscordSnowflakeSchema),
  joined_at: z.iso.datetime({ offset: true }),
  premium_since: z.iso.datetime({ offset: true }).nullable().optional(),
  deaf: z.boolean(),
  mute: z.boolean(),
  flags: z.number().int(),
  pending: z.boolean().optional(),
  permissions: z.string().optional(),
  communication_disabled_until: z.iso
    .datetime({ offset: true })
    .nullable()
    .optional(),
})

export type DiscordGuildMember = z.infer<typeof DiscordGuildMemberSchema>
