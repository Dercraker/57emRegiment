import context from "@/lib/prisma/dbContext"
import { TownCreate } from "@/models/stock/town.schema"
import { TownModel } from "prisma/generated/models"

export const createTownAsync = async ({
  name,
  regionId,
}: TownCreate): Promise<TownModel> => {
  return await context.town.create({ data: { name, regionId } })
}
