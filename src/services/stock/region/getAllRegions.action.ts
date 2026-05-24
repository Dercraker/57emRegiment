"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { getAllRegionsAsync } from "./getAllRegions.query"

export const GetAllRegionsAction = authAction.action(async ({}) => {
  try {
    return await getAllRegionsAsync()
  } catch (error) {
    serverLogger.error("Error getting regions:", error)
    throw new Error("Failed to get regions")
  }
})
