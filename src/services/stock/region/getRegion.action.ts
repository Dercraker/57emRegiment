"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { RegionIdSchema } from "@/models/stock/region.schema"
import { getRegionByIdAsync } from "./getRegion.query"

export const GetRegionAction = authAction
  .inputSchema(RegionIdSchema)
  .action(async ({ parsedInput: { regionId } }) => {
    try {
      return await getRegionByIdAsync({ regionId })
    } catch (error) {
      serverLogger.error("Error getting region:", error)
      throw new Error("Failed to get region")
    }
  })
