"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { LocationUpdateSchema } from "@/models/stock/location.schema"
import { updateLocationAsync } from "./updateLocation.query"

export const UpdateLocationAction = superAdminAction
  .inputSchema(LocationUpdateSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await updateLocationAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error updating location:", error)
      throw new Error("Failed to update location")
    }
  })
