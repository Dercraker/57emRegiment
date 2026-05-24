import { DiscordSnowflakeSchema } from "@/models/discord/discordSnowflake.schema"
import { datetime } from "node_modules/zod/v4/core/regexes.cjs"
import z, { string } from "zod"
export const CategoryEnum = z.enum([
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
export const FactionEnum = z.enum(["WARDEN", "COLONIAL", "NEUTRAL"])

export const ItemsFilterSchema = z.object({
  category: CategoryEnum.optional(),
  faction: FactionEnum.optional(),
})

export const SuperClassEnum = z.enum(["MATERIAL", "MAGAZINE"])
export const ClassEnum = z.enum(["REFINED_MATERIAL", "RIFLE_AMMO"])

export const ItemSchema = z.object({
  name: z.string(),
  shortname: z.string().optional(),
  category: CategoryEnum,
  superClass: SuperClassEnum,
  class: ClassEnum,
  faction: FactionEnum.optional(),
  nbByCrate: z.number().int().positive(),
  maxQuantity: z.number().int().positive(),
  icon: z.url().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
})

export const ItemIdFilterSchema = z.object({
  id: z.uuid(),
})

export const ItemUpdateSchema = z.object({
  id: ItemIdFilterSchema,
  item: ItemSchema,
})

export type ItemsFilter = z.infer<typeof ItemsFilterSchema>
export type FactionFilter = z.infer<typeof FactionEnum>
export type ItemCreate = z.infer<typeof ItemSchema>
export type ItemId = z.infer<typeof ItemIdFilterSchema>
export type ItemUpdate = z.infer<typeof ItemUpdateSchema>
