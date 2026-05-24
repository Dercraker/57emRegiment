import { z } from "zod"

export const discordRoleSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type discordRole = z.infer<typeof discordRoleSchema>
