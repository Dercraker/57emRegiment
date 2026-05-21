import { AuthError, GetCurrentUser } from "@/lib/auth/helper"
import { serverLogger } from "@/lib/logger"
import {} from "@prisma/client"
import { createSafeActionClient } from "next-safe-action"
import { UserModel } from "prisma/generated/models"

export class ActionError extends Error {}

type handleServerError = (e: Error) => string

const handleServerError: handleServerError = (e) => {
  if (e instanceof ActionError) {
    serverLogger.info("[DEV] - Action Error", e.message)
    return e.message
  }

  if (e instanceof AuthError) {
    serverLogger.info("[DEV] - Auth Error", e.message)
    return e.message
  }

  serverLogger.info("[DEV] - Unknown Error", e)

  return "An unexpected error occurred."
}

export const action = createSafeActionClient({
  handleServerError,
})

const getUser = async () => {
  const user = await GetCurrentUser()

  if (!user) {
    throw new ActionError("Session not found!")
  }

  if (!user.id || !user.email) {
    throw new ActionError("Session is not valid!")
  }

  return user satisfies UserModel
}

export const authAction = createSafeActionClient({
  handleServerError,
}).use(async ({ next }) => {
  const user = await getUser()

  return next({
    ctx: {
      user: user satisfies UserModel,
    },
  })
})
