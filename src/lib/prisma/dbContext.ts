import "dotenv/config"
import { PrismaClient } from "prisma/generated/client"

const context = new PrismaClient()

export { context }
