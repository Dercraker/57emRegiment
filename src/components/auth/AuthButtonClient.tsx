"use client"
import { LoggedInButton } from "@/components/auth/LoggedInButton"
import { SignInButton } from "@/components/auth/SignInButton"
import { useSession } from "@/lib/auth/authClient"

export const AuthButtonClient = () => {
  const authSession = useSession()

  if (authSession.data) {
    return <LoggedInButton user={authSession.data.user} />
  }

  return <SignInButton />
}
