import { auth, Session, User } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { unauthorized } from "next/navigation"

export class AuthError extends Error {}

type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>

/**
 * Get the full auth session object (user + session) from BetterAuth
 * @returns AuthSession or null
 */
export const GetCurrentAuthSession = async (): Promise<AuthSession | null> => {
  return auth.api.getSession({ headers: await headers() })
}

/**
 * Get the full auth session object (user + session) from BetterAuth
 * @throws if not authenticated
 * @returns AuthSession
 */
export const GetRequiredAuthSession = async (): Promise<AuthSession> => {
  const authSession = await GetCurrentAuthSession()

  if (!authSession) unauthorized()

  return authSession
}

/**
 * Get from auth provider current authenticated user
 * @returns current authenticated user with typeof UserModel
 */
export const GetCurrentUser = async (): Promise<User | null> => {
  const authSession = await GetCurrentAuthSession()

  if (authSession?.user) return authSession.user satisfies User

  return null
}

/**
 * Get from auth provider current session
 * @returns current session with typeof SessionModel, or null
 */
export const GetCurrentSession = async (): Promise<Session | null> => {
  const authSession = await GetCurrentAuthSession()

  if (authSession?.session) {
    return authSession.session satisfies Session
  }

  return null
}

/**
 * Get from auth provider current session
 * @throws if not authenticated
 * @returns current session with typeof SessionModel
 */
export const GetRequiredSession = async (): Promise<Session> => {
  const session = await GetCurrentSession()

  if (!session) unauthorized()

  return session
}

/**
 * Get from auth provider current authenticated user
 * @throws if not user authenticated
 * @returns current authenticated user with typeof UserModel
 */
export const GetRequiredUser = async (): Promise<User> => {
  const user = await GetCurrentUser()

  if (!user) unauthorized()

  if (!user.id || !user.name)
    throw new AuthError("Invalid session, please sign in again")

  return user
}
