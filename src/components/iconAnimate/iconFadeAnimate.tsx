import type { ComponentProps } from "react"

import type { Icon } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type IconFadeAnimateProps = ComponentProps<Icon> & {
  icon: Icon
  animation: "fadeIn" | "fadeOut"
}

const IconFadeAnimate = ({
  icon: IconComponent,
  animation,
  className,
  ...props
}: IconFadeAnimateProps) => {
  return (
    <IconComponent
      className={cn(
        "transition-all duration-300 ease-in-out",
        className,
        animation === "fadeOut"
          ? "scale-75 rotate-45 opacity-0"
          : "scale-100 rotate-0 opacity-100"
      )}
      {...props}
    />
  )
}

export default IconFadeAnimate
