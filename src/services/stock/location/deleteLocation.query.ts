import context from "@/lib/prisma/dbContext"
import { LocationId } from "@/models/stock/location.schema"
import { LocationModel } from "prisma/generated/models"

export const deleteLocationAsync = async ({
  id,
}: LocationId): Promise<LocationModel> => {
  return await context.location.delete({ where: { id } })
}
