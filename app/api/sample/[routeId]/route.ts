import { authRoute } from "@/lib/safeRoute"
import { NextResponse } from "next/server"
import { z } from "zod"

const sampleWithRouteIdApichema = z.object({
  routeId: z.number(),
})
const sampleBodyApichema = z.object({
  name: z.string(),
})
export const POST = authRoute
  .params(sampleWithRouteIdApichema)
  .body(sampleBodyApichema)
  .handler(async (req, { params, body }) => {
    return NextResponse.json({
      routeId: params.routeId,
      name: body.name,
    })
  })
