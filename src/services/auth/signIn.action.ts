"use server"

import { LINKS } from "@/features/navigation/Links"
import { auth } from "@/lib/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function signInWithDiscordAction() {
  const response = await auth.api.signInSocial({
    body: {
      provider: "discord",
      callbackURL: LINKS.Home.href(),
      errorCallbackURL: LINKS.Auth.error.href(),
    },
    headers: await headers(),
  })

  if (response?.url) redirect(response.url)
}
