"use client"

import IconSwitch from "@/components/iconAnimate/iconSwitch"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IconMenu, IconX } from "@tabler/icons-react"
import { VariantProps } from "class-variance-authority"
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { usePathname } from "next/navigation"
import { type PropsWithChildren, useEffect, useState } from "react"

export const HeaderBase = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [size, setSize] =
    useState<VariantProps<typeof buttonVariants>["size"]>("lg")
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 100], ["140px", "92px"])
  const opacity = useTransform(scrollY, [0, 10], [0, 1])
  const bg = useMotionTemplate`rgba(21, 20, 19, ${opacity})` // match with background class

  useMotionValueEvent(scrollY, "change", (latest) => {
    setSize(latest < 100 ? "lg" : "default")
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      <motion.header
        id="fixed-header"
        style={{ height, backgroundColor: bg }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-start justify-center gap-4 overflow-hidden p-4 shadow-md xl:items-center xl:p-7 2xl:gap-8",
          "min-h-18 border-b border-input",
          isOpen
            ? "h-auto! max-h-screen bg-background!"
            : "max-h-18! xl:max-h-35!"
        )}
      >
        <div className="visible relative flex size-10 flex-1 items-center xl:invisible">
          <IconSwitch
            icon={IconMenu}
            switchIcon={IconX}
            onClick={() => setIsOpen(!isOpen)}
            isSwitch={isOpen}
          />
        </div>
        <nav className="flex flex-1 flex-col justify-start gap-4 uppercase xl:flex-row xl:items-center xl:justify-center xl:gap-3 2xl:gap-8">
          {children}
        </nav>
        <div className="flex flex-1 justify-end gap-4">
          <Button
            variant="ghost"
            size={size}
            onClick={() => alert("Todo wait for auth tasks")}
            className="hidden xl:inline"
          >
            Auth
          </Button>
        </div>
      </motion.header>
      {/* Tips for smoother animated header: useTransform + useMotionTemplate */}
      <div className="h-18 xl:h-35" />
    </>
  )
}
