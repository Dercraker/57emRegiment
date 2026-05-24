"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { TownCreateSchema } from "@/models/stock/town.schema"
import { createTownAsync } from "./createTown.query"

export const CreateTownAction = authAction
  .inputSchema(TownCreateSchema)
  .action(async ({ parsedInput }) => {
    try {
      return await createTownAsync(parsedInput)
    } catch (error) {
      serverLogger.error("Error creating town:", error)
      throw new Error("Failed to create town")
    }
  })
