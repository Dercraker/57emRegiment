"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { RegionCreateSchema } from "@/models/stock/region.schema"
import { createRegionAsync } from "./createRegion.query"

export const CreateRegionAction = superAdminAction
  .inputSchema(RegionCreateSchema)
  .action(async ({ parsedInput }) => {
    try {
      await createRegionAsync(parsedInput)
      serverLogger.trace("Region created", parsedInput)
    } catch (error) {
      serverLogger.error("Error creating region:", error)
      throw new Error("Failed to create region")
    }
  })
