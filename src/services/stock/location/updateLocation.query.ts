import context from "@/lib/prisma/dbContext"
import { LocationUpdate } from "@/models/stock/location.schema"
import { LocationModel } from "prisma/generated/models"

export const updateLocationAsync = async ({
  id,
  type,
  townId,
}: LocationUpdate): Promise<LocationModel> => {
  return await context.location.update({
    where: { id },
    data: { type, townId },
  })
}
