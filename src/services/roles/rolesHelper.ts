import { User } from "@/lib/auth/auth"
import { AuthError, GetRequiredUser } from "@/lib/auth/authHelper"
import { getAccountByUserIdFirstOrThrowAsync } from "@/services/account/getAccount.query"
import { appConfig } from "appConfig"

const getDiscordAccountId = async (userId: string): Promise<string> => {
  const { accountId } = await getAccountByUserIdFirstOrThrowAsync({
    userId,
    select: { accountId: true },
  })

  if (!accountId) throw new AuthError("Invalid session, please sign in again")

  return accountId
}

export const ValidateCurrentIsSuperAdminOrThrow = async (): Promise<User> => {
  const user = await GetRequiredUser()
  const accountId = await getDiscordAccountId(user.id)

  if (!appConfig.superAdminDiscordIds.includes(accountId)) {
    throw new AuthError("Insufficient permissions")
  }

  return user
}
