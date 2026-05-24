import z from "zod"

export const TownCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  regionId: z.uuid(),
})

export const TownUpdateSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required").optional(),
  regionId: z.uuid().optional(),
})

export const TownIdSchema = z.object({
  townId: z.uuid(),
})

export const TownsByRegionSchema = z.object({
  regionId: z.uuid().optional(),
})

export type TownCreate = z.infer<typeof TownCreateSchema>
export type TownUpdate = z.infer<typeof TownUpdateSchema>
export type TownId = z.infer<typeof TownIdSchema>
export type TownsByRegion = z.infer<typeof TownsByRegionSchema>
