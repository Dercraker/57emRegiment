import z from "zod"

export const LocationTypeSchema = z.enum(["STORAGE_DEPOT", "SEAPORT"])

export const LocationCreateSchema = z.object({
  type: LocationTypeSchema,
  townId: z.string().uuid(),
})

export const LocationUpdateSchema = z.object({
  id: z.string().uuid(),
  type: LocationTypeSchema.optional(),
  townId: z.string().uuid().optional(),
})

export const LocationIdSchema = z.object({
  id: z.string().uuid(),
})

export const LocationsByTownSchema = z.object({
  townId: z.string().uuid().optional(),
})

export type LocationCreate = z.infer<typeof LocationCreateSchema>
export type LocationUpdate = z.infer<typeof LocationUpdateSchema>
export type LocationId = z.infer<typeof LocationIdSchema>
export type LocationsByTown = z.infer<typeof LocationsByTownSchema>
