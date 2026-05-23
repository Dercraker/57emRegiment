"use client"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { clientLogger } from "@/lib/logger"
import { ErrorParams } from "@/type/next"
import { useEffect } from "react"

export default function RouteError({ error, reset }: ErrorParams) {
  useEffect(() => {
    clientLogger.error(error)
  }, [error])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sorry, something went wrong. Please try again later.
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={reset}>Try again</Button>
      </CardFooter>
    </Card>
  )
}
