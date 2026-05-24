"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { RegionIdSchema } from "@/models/stock/region.schema"
import { deleteRegionAsync } from "./deleteRegion.query"

export const DeleteRegionAction = superAdminAction
  .inputSchema(RegionIdSchema)
  .action(async ({ parsedInput: { regionId } }) => {
    try {
      return await deleteRegionAsync({ regionId })
    } catch (error) {
      serverLogger.error("Error deleting region:", error)
      throw new Error("Failed to delete region")
    }
  })
