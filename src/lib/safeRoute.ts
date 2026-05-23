import { createZodRoute } from "next-zod-route"
import { NextResponse } from "next/server"
import { AuthError, GetRequiredUser } from "./auth/authHelper"

export class RouteError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

export const route = createZodRoute({
  handleServerError: (e: Error) => {
    if (e instanceof RouteError) {
      return NextResponse.json(
        { message: e.message, status: e.status },
        {
          status: e.status,
        }
      )
    }

    if (e instanceof AuthError) {
      return NextResponse.json(
        {
          message: e.message,
        },
        {
          status: 401,
        }
      )
    }

    return NextResponse.json({ message: e.message }, { status: 500 })
  },
})

export const authRoute = route.use(async ({ next }) => {
  const user = await GetRequiredUser()
  return next({ ctx: { user } })
})
