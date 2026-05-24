import { authRoute } from "@/lib/safeRoute"
import { NextResponse } from "next/server"
import { z } from "zod"

const sampleApiQueryschema = z.object({
  paramA: z.string(),
  paramB: z.number(),
})
export const GET = authRoute
  .query(sampleApiQueryschema)
  .handler(async (req, { query }) => {
    try {
      return NextResponse.json({
        paramA: query.paramA,
        paramB: query.paramB,
      })
    } catch (err) {
      return NextResponse.json({ error: err, data: null })
    }
  })
