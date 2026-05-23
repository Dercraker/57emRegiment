import "./src/lib/env/client.ts"
import "./src/lib/env/server.ts"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
  },
}

export default nextConfig
