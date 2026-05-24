import z from "zod"
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

export const ItemCreateSchema = z.object({
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

export const ItemIdSchema = z.object({
  id: z.uuid(),
})

export const ItemUpdateSchema = z.object({
  id: ItemIdSchema,
  item: ItemCreateSchema,
})

export type ItemsFilter = z.infer<typeof ItemsFilterSchema>
export type FactionFilter = z.infer<typeof FactionEnum>
export type ItemCreate = z.infer<typeof ItemCreateSchema>
export type ItemId = z.infer<typeof ItemIdSchema>
export type ItemUpdate = z.infer<typeof ItemUpdateSchema>
