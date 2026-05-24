"use server"

import { superAdminAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { TownUpdateSchema } from "@/models/stock/town.schema"
import { updateTownAsync } from "./updateTown.query"

export const UpdateTownAction = superAdminAction
  .inputSchema(TownUpdateSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await updateTownAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error updating town:", error)
      throw new Error("Failed to update town")
    }
  })
