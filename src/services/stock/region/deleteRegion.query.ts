import context from "@/lib/prisma/dbContext"
import { RegionId } from "@/models/stock/region.schema"
import { RegionModel } from "prisma/generated/models"

export const deleteRegionAsync = async ({
  regionId: id,
}: RegionId): Promise<RegionModel> => {
  return await context.region.delete({ where: { id } })
}
