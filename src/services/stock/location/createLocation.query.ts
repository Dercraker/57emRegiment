import context from "@/lib/prisma/dbContext"
import { LocationCreate } from "@/models/stock/location.schema"
import { LocationModel } from "prisma/generated/models"

export const createLocationAsync = async ({
  type,
  townId,
}: LocationCreate): Promise<LocationModel> => {
  return await context.location.create({ data: { type, townId } })
}
