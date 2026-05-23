"use client"

import { Typography } from "@/components/text/typography"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader } from "@/components/ui/loader"
import { LINKS } from "@/features/navigation/Links"
import { useSession } from "@/lib/auth/authClient"
import {
  IconLayoutDashboard,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react"
import { useMutation } from "@tanstack/react-query"
import { signOut } from "better-auth/api"
import Link from "next/link"
import type { PropsWithChildren } from "react"

export const UserDropdown = ({ children }: PropsWithChildren) => {
  const session = useSession()
  const logout = useMutation({
    mutationFn: async () => {
      await signOut()
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <Typography variant="small">{session.data?.user?.name}</Typography>
          <Typography variant="muted">{session.data?.user?.email}</Typography>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={LINKS.Stock.region.href()}>
            <IconLayoutDashboard className="mr-2 size-4" />
            {LINKS.Stock.region.label}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account">
            <IconSettings className="mr-2 size-4" />
            Account Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              logout.mutate()
            }}
          >
            {logout.isPending ? (
              <Loader className="mr-2 size-4" />
            ) : (
              <IconLogout className="mr-2 size-4" />
            )}
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
