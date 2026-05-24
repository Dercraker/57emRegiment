import context from "@/lib/prisma/dbContext"
import { TownId } from "@/models/stock/town.schema"
import { TownModel } from "prisma/generated/models"

export const getTownByIdAsync = async ({
  townId: id,
}: TownId): Promise<TownModel | null> => {
  return await context.town.findUnique({ where: { id } })
}
