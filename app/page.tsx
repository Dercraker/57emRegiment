import { AuthButton } from "@/components/auth/AuthButton"
import { SessionActions } from "@/components/auth/SessionActions"
import { Typography } from "@/components/text/typography"
import { GetCurrentAuthSession } from "@/lib/auth/authHelper"

export default async function Page() {
  const authSession = await GetCurrentAuthSession()

  if (!authSession) {
    return (
      <div className="flex items-center justify-center p-8">
        <AuthButton />
      </div>
    )
  }

  const { user, session } = authSession

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <AuthButton />

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="font-semibold">{user.name}</span>
      </div>

      <Typography variant="lead">Roles : </Typography>
      <div className="flex flex-wrap justify-around gap-4">
        {session.discordRoles.map((r) => {
          return <div key={r}>{r}</div>
        })}
      </div>

      <SessionActions />
    </div>
  )
}
