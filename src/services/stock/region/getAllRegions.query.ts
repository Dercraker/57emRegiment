import context from "@/lib/prisma/dbContext"
import { RegionModel } from "prisma/generated/models"

export const getAllRegionsAsync = async (): Promise<RegionModel[]> => {
  return await context.region.findMany({ orderBy: { name: "asc" } })
}
