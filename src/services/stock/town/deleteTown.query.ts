import context from "@/lib/prisma/dbContext"
import { TownId } from "@/models/stock/town.schema"
import { TownModel } from "prisma/generated/models"

export const deleteTownAsync = async ({
  townId: id,
}: TownId): Promise<TownModel> => {
  return await context.town.delete({ where: { id } })
}
