import { cn } from "@/lib/utils"
import { IconLoader2, IconProps } from "@tabler/icons-react"

export const Loader = ({ className, ...props }: IconProps) => {
  return <IconLoader2 {...props} className={cn(className, "animate-spin")} />
}
