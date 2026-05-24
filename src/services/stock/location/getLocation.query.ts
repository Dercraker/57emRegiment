import context from "@/lib/prisma/dbContext"
import { LocationId } from "@/models/stock/location.schema"
import { LocationModel } from "prisma/generated/models"

export const getLocationByIdAsync = async ({
  id,
}: LocationId): Promise<LocationModel | null> => {
  return await context.location.findUnique({ where: { id } })
}
