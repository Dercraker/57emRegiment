"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { LocationsByTownSchema } from "@/models/stock/location.schema"
import { getAllLocationsAsync } from "./getAllLocations.query"

export const GetAllLocationsAction = authAction
  .inputSchema(LocationsByTownSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await getAllLocationsAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error getting locations:", error)
      throw new Error("Failed to get locations")
    }
  })
