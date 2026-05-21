"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import z from "zod"
import { getUserByIdAsync } from "./getUser.query"

const GetUserByIdActionAction = z.object({
  userId: z.string(),
})

export const GetUserByIdAction = authAction
  .inputSchema(GetUserByIdActionAction)
  .action(async ({ parsedInput: { userId } }) => {
    try {
      return await getUserByIdAsync({ userId })
    } catch (error) {
      serverLogger.error("Error getting files:", error)
      throw new Error("Failed to get files")
    }
  })
