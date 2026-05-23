import { LoggedInButton } from "@/components/auth/LoggedInButton"
import { SignInButton } from "@/components/auth/SignInButton"
import { GetCurrentUser } from "@/lib/auth/authHelper"

export const AuthButton = async () => {
  const user = await GetCurrentUser()

  if (user) {
    return <LoggedInButton user={user} />
  }

  return <SignInButton />
}
