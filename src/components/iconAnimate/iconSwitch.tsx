import type { ComponentProps } from "react"

import type { Icon } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import IconFadeAnimate from "@/components/iconAnimate/iconFadeAnimate"

type IconSwitchProps = ComponentProps<"div"> & {
  icon: Icon
  switchIcon: Icon
  isSwitch: boolean
}

const IconSwitch = ({
  icon,
  switchIcon,
  isSwitch,
  className,
  ...props
}: IconSwitchProps) => {
  return (
    <div className={cn("relative size-6", className)} {...props}>
      <IconFadeAnimate
        icon={icon}
        animation={isSwitch ? "fadeOut" : "fadeIn"}
        className="absolute inset-0 hover:cursor-pointer"
      />
      <IconFadeAnimate
        icon={switchIcon}
        animation={isSwitch ? "fadeIn" : "fadeOut"}
        className="absolute inset-0 hover:cursor-pointer"
      />
    </div>
  )
}

export default IconSwitch
