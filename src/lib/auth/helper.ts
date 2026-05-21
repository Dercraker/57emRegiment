import { UserModel } from "prisma/generated/models"
import { IsAuthenticated } from "./authConfig"

export class AuthError extends Error {}

/**
 * Get from auth provider current authenticated user
 * @returns current authenticated user with typeof UserModel
 */
export const GetCurrentUser = async (): Promise<UserModel | null> => {
  //TODO : Implement authProvider here
  const session = {
    user: IsAuthenticated
      ? ({
          id: "55",
          email: "cereefa@latpup.ar",
          name: "Carolyn",
        } satisfies UserModel)
      : null,
  }

  if (session?.user) {
    const user = session.user satisfies UserModel
    return user
  }

  return null
}

/**
 * Get from auth provider current authenticated user
 * @throws if not user authenticated
 * @returns current authenticated user with typeof UserModel
 */
export const GetRequiredUser = async (): Promise<UserModel> => {
  const user = await GetCurrentUser()

  if (!user)
    throw new AuthError("You must be authenticated to access this resource")

  if (!user.id || !user.email)
    throw new AuthError("Invalid session, please sign in again")


  return user
}
