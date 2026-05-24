import z from "zod"

export const EmptyLinkParamsSchema = z.object({}).strict()

export const TownLinkParamsSchema = EmptyLinkParamsSchema.extend({
  regionId: z.string(),
}).strict()
export const LocationLinkParamsSchema = TownLinkParamsSchema.extend({
  townId: z.string(),
}).strict()
export const StockLinkParamsSchema = LocationLinkParamsSchema.extend({
  locationId: z.string(),
}).strict()
