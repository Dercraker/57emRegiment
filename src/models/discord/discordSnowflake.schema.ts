import { z } from "zod"

export const DiscordSnowflakeSchema = z
  .string()
  .regex(/^\d{17,19}$/, "Invalid Discord Snowflake")

export type DiscordSnowflake = z.infer<typeof DiscordSnowflakeSchema>
