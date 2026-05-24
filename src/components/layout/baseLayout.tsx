import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import type { PropsWithChildren } from "react"

export const BaseLayout = (props: PropsWithChildren) => {
  return (
    <div className="relative flex min-h-full flex-col">
      <Header />
      <div className="min-h-full flex-1">{props.children}</div>
      <Footer />
    </div>
  )
}
