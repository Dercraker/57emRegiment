"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { TownsByRegionSchema } from "@/models/stock/town.schema"
import { getAllTownsAsync } from "./getAllTowns.query"

export const GetAllTownsAction = authAction
  .inputSchema(TownsByRegionSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await getAllTownsAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error getting towns:", error)
      throw new Error("Failed to get towns")
    }
  })
