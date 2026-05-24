import context from "@/lib/prisma/dbContext"
import { TownsByRegion } from "@/models/stock/town.schema"
import { TownModel } from "prisma/generated/models"

export const getAllTownsAsync = async ({
  regionId,
}: TownsByRegion): Promise<TownModel[]> => {
  return await context.town.findMany({
    where: regionId ? { regionId } : undefined,
    orderBy: { name: "asc" },
  })
}
