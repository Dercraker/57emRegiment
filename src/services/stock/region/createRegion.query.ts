import context from "@/lib/prisma/dbContext"
import { RegionCreate } from "@/models/stock/region.schema"
import { RegionModel } from "prisma/generated/models"

export const createRegionAsync = async ({
  name,
}: RegionCreate): Promise<RegionModel> => {
  return await context.region.create({ data: { name } })
}
