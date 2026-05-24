"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { TownIdSchema } from "@/models/stock/town.schema"
import { getTownByIdAsync } from "./getTown.query"

export const GetTownAction = authAction
  .inputSchema(TownIdSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await getTownByIdAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error getting town:", error)
      throw new Error("Failed to get town")
    }
  })
