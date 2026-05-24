"use server"

import { authAction } from "@/lib/actions/safeAction"
import { serverLogger } from "@/lib/logger"
import { getAllUserAsync, getAllUserWithPostsAsync } from "./getAllUser.query"

export const GetAllUserAction = authAction.action(async ({}) => {
  try {
    return await getAllUserAsync()
  } catch (error) {
    serverLogger.error("Error getting files:", error)
    throw new Error("Failed to get files")
  }
})

//Sample
// export const GetAllUserWithPostAction = authAction.action(async ({}) => {
//   try {
//     return await getAllUserWithPostsAsync()
//   } catch (error) {
//     serverLogger.error("Error getting files:", error)
//     throw new Error("Failed to get files")
//   }
// })
