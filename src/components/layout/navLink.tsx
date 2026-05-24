"use client"

import { Typography } from "@/components/text/typography"
import { buttonVariants } from "@/components/ui/button"
import { NavigationLink } from "@/features/navigation/navigation.model"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLinkProps = {
  link: NavigationLink
  size: VariantProps<typeof buttonVariants>["size"]
}

const NavLink = ({ link, size }: NavLinkProps) => {
  const pathname = usePathname()

  const getNavLinkClasses = (href: string) => {
    const isActive = pathname.startsWith(href)

    return cn(
      buttonVariants({ variant: "default", size }),
      isActive && "active"
    )
  }

  return (
    <>
      {!link.disabled ? (
        <Link href={link.href()} className={getNavLinkClasses(link.href())}>
          {link.label}
        </Link>
      ) : (
        <Typography
          variant="default"
          aria-disabled
          className={getNavLinkClasses(link.href())}
        >
          {link.label}
        </Typography>
      )}
    </>
  )
}

export default NavLink
