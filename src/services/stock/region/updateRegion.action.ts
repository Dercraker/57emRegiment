"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { RegionUpdateSchema } from "@/models/stock/region.schema"
import { updateRegionAsync } from "./updateRegion.query"

export const UpdateRegionAction = superAdminAction
  .inputSchema(RegionUpdateSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await updateRegionAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error updating region:", error)
      throw new Error("Failed to update region")
    }
  })
