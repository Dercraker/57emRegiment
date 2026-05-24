import context from "@/lib/prisma/dbContext"
import { RegionId } from "@/models/stock/region.schema"
import { RegionModel } from "prisma/generated/models"

export const getRegionByIdAsync = async ({
  regionId: id,
}: RegionId): Promise<RegionModel | null> => {
  return await context.region.findUnique({ where: { id } })
}
