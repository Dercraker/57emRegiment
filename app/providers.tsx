"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { getQueryClient } from "@/lib/tanstack/getQueryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { PropsWithChildren, useState } from "react"

export const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          {children}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </NuqsAdapter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
