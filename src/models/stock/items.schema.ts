import { DiscordSnowflakeSchema } from "@/models/discord/discordSnowflake.schema"
import z from "zod"
export const CategorySchema = z.enum([
  "SMALL_ARMS",
  "HEAVY_ARMS",
  "HEAVY_AMMUNITION",
  "UTILITY",
  "MEDICAL",
  "RESSOURCE",
  "UNIFORM",
  "VEHICLE",
  "SHIPPABLE",
])
export const FactionSchema = z.enum(["WARDEN", "COLONIAL", "NEUTRAL"])

export const ItemsFilterSchema = z.object({
  category: CategorySchema.optional(),
  faction: FactionSchema.optional(),
})

export type ItemsFIlter = z.infer<typeof ItemsFilterSchema>
export type FactionFilter = z.infer<typeof FactionSchema>
