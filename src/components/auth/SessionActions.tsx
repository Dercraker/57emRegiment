"use client"

import { Button } from "@/components/ui/button"
import { LINKS } from "@/features/navigation/Links"
import { signOut } from "@/lib/auth/authClient"
import { useRouter } from "next/navigation"

export const SessionActions = () => {
  const router = useRouter()
  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push(LINKS.Home.href())
              },
            },
          })
        }
      >
        Logout
      </Button>
    </div>
  )
}
