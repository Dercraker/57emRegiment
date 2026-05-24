import z from "zod"

export const RegionCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
})

export const RegionUpdateSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name is required"),
})

export const RegionIdSchema = z.object({
  regionId: z.uuid(),
})

export type RegionCreate = z.infer<typeof RegionCreateSchema>
export type RegionUpdate = z.infer<typeof RegionUpdateSchema>
export type RegionId = z.infer<typeof RegionIdSchema>
