import { env } from "@/lib/env/server"

type RequestOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>
}

const request = async <T>(
  path: string,
  token: string,
  options: RequestOptions = {}
): Promise<T> => {
  const response = await fetch(`${env.DISCORD_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Discord API error ${response.status}: ${await response.text()}`
    )
  }

  return response.json() as Promise<T>
}

export const discordApiClient = {
  get: <T>(path: string, token: string, options?: RequestOptions) =>
    request<T>(path, token, { ...options, method: "GET" }),

  post: <T>(
    path: string,
    token: string,
    body: unknown,
    options?: RequestOptions
  ) =>
    request<T>(path, token, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(
    path: string,
    token: string,
    body: unknown,
    options?: RequestOptions
  ) =>
    request<T>(path, token, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(
    path: string,
    token: string,
    body: unknown,
    options?: RequestOptions
  ) =>
    request<T>(path, token, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(path: string, token: string, options?: RequestOptions) =>
    request<T>(path, token, { ...options, method: "DELETE" }),
}
