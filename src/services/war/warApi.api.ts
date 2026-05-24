import { createApiClient } from "@/lib/api/baseApi"
import { env } from "@/lib/env/server"

const warApiClient = createApiClient(env.WAR_API_BASE)

export const fetchRegions = async (): Promise<string[]> => {
  const path = `/maps`
  try {
    const res = await warApiClient.get<string[]>(path)

    return res
  } catch (error) {
    throw new Error(`Discord getRoles failed: ${error}`)
  }
}

export const fetchTownsInRegions = async (
  regionName: string
): Promise<string[]> => {
  const path = `/maps`
  try {
    const res = await warApiClient.get<string[]>(path)

    return res
  } catch (error) {
    throw new Error(`Discord getRoles failed: ${error}`)
  }
}
