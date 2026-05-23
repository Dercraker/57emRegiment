import { isTokenExpired } from "@/lib/auth/tokenHelper"
import { serverLogger } from "@/lib/logger"
import { sec } from "@/lib/ms/msHelper"
import context from "@/lib/prisma/dbContext"
import { getAccountByUserIdFirstOrThrowAsync } from "@/services/account/getAccount.query"
import {
  fetchDiscordMemberRoles,
  refreshDiscordAccessToken,
} from "@/services/discord/discordClient.api"
import { deleteAllSessionByUserIdAsync } from "@/services/sessions/deleteSession.query"
import { updateAccountByUserIdAsync } from "@/services/sessions/updateAccount.query"
import { isDisabledUserAsync } from "@/services/user/isDisabledUser.query"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { AuthError } from "./authHelper"
import { getSocialProviders } from "./socialProvider"

export const auth = betterAuth({
  database: prismaAdapter(context, {
    provider: "postgresql",
  }),
  socialProviders: getSocialProviders(),
  user: {
    additionalFields: {
      disabledAt: {
        type: "date",
        required: false,
        defaultValue: null,
        input: false,
      },
    },
  },
  session: {
    additionalFields: {
      discordRoles: {
        type: "string[]",
        required: true,
        defaultValue: [],
        input: false,
      },
    },
    expiresIn: sec("6d"),
    updateAge: sec("5s"),
    preserveSessionInDatabase: true,
  },

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          if (!session || !session.userId)
            throw new AuthError("Invalid session, please sign in again")

          const isUserDisabled = await isDisabledUserAsync({
            userId: session.userId,
          })

          if (isUserDisabled)
            throw new AuthError(
              `Your account was disabled on ${isUserDisabled.toLocaleDateString()}. Please contact an administrator.`
            )

          const { accessToken } = await getAccountByUserIdFirstOrThrowAsync({
            userId: session.userId,
            select: { accessToken: true },
          })
          if (!accessToken) throw new AuthError(`Discord account not linked.`)

          try {
            const discordRoles = await fetchDiscordMemberRoles(accessToken)

            return {
              data: {
                ...session,
                discordRoles,
              },
            }
          } catch (error) {
            serverLogger.error(error)
            throw new AuthError("Invalid session, please sign in again")
          }
        },
      },
      update: {
        before: async (session, ctx) => {
          const sessionCtx = ctx?.context?.session
          const userId = sessionCtx?.session?.userId ?? sessionCtx?.user?.id

          if (!userId) return

          const account = await getAccountByUserIdFirstOrThrowAsync({
            userId,
            select: {
              accessToken: true,
              refreshToken: true,
              accessTokenExpiresAt: true,
              refreshTokenExpiresAt: true,
            },
          })

          if (!account) return

          let accessToken = account.accessToken

          if (isTokenExpired(account.accessTokenExpiresAt)) {
            if (isTokenExpired(account.refreshTokenExpiresAt)) {
              await deleteAllSessionByUserIdAsync({ userId })
              throw new AuthError(
                "Your Discord session has expired. Please sign in again."
              )
            }

            try {
              const newTokens = await refreshDiscordAccessToken(
                account.refreshToken!
              )
              await updateAccountByUserIdAsync({ userId, tokens: newTokens })
              accessToken = newTokens.access_token
            } catch (error) {
              await deleteAllSessionByUserIdAsync({ userId })

              serverLogger.error(error)
              throw new AuthError(
                "Your Discord session has expired. Please sign in again."
              )
            }
          }

          if (!accessToken) return

          try {
            const discordRoles = await fetchDiscordMemberRoles(accessToken)
            return { data: { ...session, discordRoles } }
          } catch (error) {
            serverLogger.error(error)
            return
          }
        },
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session.session
export type User = typeof auth.$Infer.Session.user
