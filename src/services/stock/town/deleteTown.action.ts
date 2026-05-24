"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { TownIdSchema } from "@/models/stock/town.schema"
import { deleteTownAsync } from "./deleteTown.query"

export const DeleteTownAction = superAdminAction
  .inputSchema(TownIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await deleteTownAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error deleting town:", error)
      throw new Error("Failed to delete town")
    }
  })
