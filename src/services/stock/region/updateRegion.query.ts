import context from "@/lib/prisma/dbContext"
import { RegionUpdate } from "@/models/stock/region.schema"
import { RegionModel } from "prisma/generated/models"

export const updateRegionAsync = async ({
  id,
  name,
}: RegionUpdate): Promise<RegionModel> => {
  return await context.region.update({ where: { id }, data: { name } })
}
