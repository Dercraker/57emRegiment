"use client"

import { AuthButtonClient } from "@/components/auth/AuthButtonClient"
import { SessionActions } from "@/components/auth/SessionActions"
import { Typography } from "@/components/text/typography"
import { useSession } from "@/lib/auth/authClient"

export default function StockPage() {
  const authSession = useSession()

  if (!authSession) {
    return (
      <div className="flex items-center justify-center p-8">
        <AuthButtonClient />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <AuthButtonClient />

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-semibold">{authSession.data?.user.name}</span>
      </div>

      <Typography variant="lead">Roles : </Typography>
      <div className="flex flex-wrap justify-around gap-4">
        {authSession.data?.session.discordRoles.map((r) => {
          return <div key={r}>{r}</div>
        })}
      </div>

      <SessionActions />
    </div>
  )
}
