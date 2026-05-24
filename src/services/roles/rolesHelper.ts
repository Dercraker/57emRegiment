import { User } from "@/lib/auth/auth"
import { AuthError, GetRequiredUser } from "@/lib/auth/authHelper"
import { getAccountByUserIdFirstOrThrowAsync } from "@/services/account/getAccount.query"
import { appConfig } from "appConfig"

async function getDiscordAccountId(userId: string): Promise<string> {
  const { accountId } = await getAccountByUserIdFirstOrThrowAsync({
    userId,
    select: { accountId: true },
  })

  if (!accountId) throw new AuthError("invalid session please sign in again")

  return accountId
}

export async function validateUserIsSuperAdminOrThrow(): Promise<User> {
  const user = await GetRequiredUser()
  const accountId = await getDiscordAccountId(user.id)

  if (!appConfig.superAdminDiscordIds.includes(accountId))
    throw new AuthError("Insufficient acces rignts")

  return user
}
