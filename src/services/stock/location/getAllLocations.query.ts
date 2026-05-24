import context from "@/lib/prisma/dbContext"
import { LocationsByTown } from "@/models/stock/location.schema"
import { LocationModel } from "prisma/generated/models"

export const getAllLocationsAsync = async ({
  townId,
}: LocationsByTown): Promise<LocationModel[]> => {
  return await context.location.findMany({
    where: townId ? { townId } : undefined,
  })
}
