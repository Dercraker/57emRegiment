"use client"

import { Button } from "@/components/ui/button"
import { LINKS } from "@/features/navigation/Links"
import { signIn } from "@/lib/auth/authClient"

export const SignInButton = () => {
  return (
    <Button
      onClick={() =>
        signIn.social({
          provider: "discord",
          callbackURL: LINKS.Home.href(),
          errorCallbackURL: LINKS.Auth.error.href(),
        })
      }
    >
      SignIn
    </Button>
  )
}
