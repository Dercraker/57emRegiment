import { Logger } from "tslog"

export const logger = new Logger({
  name: "AppLogger",
  // Don't use `env` here, because we can use the logger in the browser
  minLevel: process.env.NODE_ENV === "production" ? 3 : 0,
})

export const serverLogger = logger.getSubLogger({ name: "ServerLogger" })
