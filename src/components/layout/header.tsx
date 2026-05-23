"use client"

import { HeaderBase } from "@/components/layout/headerBase"
import { Button, buttonVariants } from "@/components/ui/button"
import { VariantProps } from "class-variance-authority"
import { useMotionValueEvent, useScroll } from "framer-motion"
import { useState } from "react"

export const Header = () => {
  const [size, setSize] =
    useState<VariantProps<typeof buttonVariants>["size"]>("lg")

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setSize(latest < 100 ? "lg" : "default")
  })

  return (
    <HeaderBase>
      <Button
        variant="ghost"
        size={size}
        onClick={() => alert("Todo wait for auth tasks")}
        className="xl:hidden"
      >
        Auth
      </Button>
    </HeaderBase>
  )
}
