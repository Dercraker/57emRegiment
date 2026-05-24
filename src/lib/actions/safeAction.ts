import { AuthError, GetRequiredUser } from "@/lib/auth/authHelper"
import { serverLogger } from "@/lib/logger"
import {} from "@prisma/client"
import { createSafeActionClient } from "next-safe-action"
import { UserModel } from "prisma/generated/models"

export class ActionError extends Error {}

type handleServerError = (e: Error) => string

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    serverLogger.info("Action Error", e.message)
    return e.message
  }

  if (e instanceof AuthError) {
    serverLogger.info("Auth Error", e.message)
    return e.message
  }

  serverLogger.info("Unknown Error", e)

  return "An unexpected error occurred."
}

export const action = createSafeActionClient({
  handleServerError,
})

export const authAction = createSafeActionClient({
  handleServerError,
}).use(async ({ next }) => {
  const user = await GetRequiredUser()

  return next({
    ctx: {
      user: user satisfies UserModel,
    },
  })
})
