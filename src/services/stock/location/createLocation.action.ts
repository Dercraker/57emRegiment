"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { LocationCreateSchema } from "@/models/stock/location.schema"
import { createLocationAsync } from "./createLocation.query"

export const CreateLocationAction = superAdminAction
  .inputSchema(LocationCreateSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await createLocationAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error creating location:", error)
      throw new Error("Failed to create location")
    }
  })
