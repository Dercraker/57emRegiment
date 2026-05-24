import context from "@/lib/prisma/dbContext"
import { TownUpdate } from "@/models/stock/town.schema"
import { TownModel } from "prisma/generated/models"

export const updateTownAsync = async ({
  id,
  name,
  regionId,
}: TownUpdate): Promise<TownModel> => {
  return await context.town.update({
    where: { id },
    data: { name, regionId },
  })
}
