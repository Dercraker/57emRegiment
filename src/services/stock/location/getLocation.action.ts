"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { LocationIdSchema } from "@/models/stock/location.schema"
import { getLocationByIdAsync } from "./getLocation.query"

export const GetLocationAction = authAction
  .inputSchema(LocationIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await getLocationByIdAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error getting location:", error)
      throw new Error("Failed to get location")
    }
  })
