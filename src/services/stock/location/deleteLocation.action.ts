"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { LocationIdSchema } from "@/models/stock/location.schema"
import { deleteLocationAsync } from "./deleteLocation.query"

export const DeleteLocationAction = superAdminAction
  .inputSchema(LocationIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await deleteLocationAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error deleting location:", error)
      throw new Error("Failed to delete location")
    }
  })
