import context from "@/lib/prisma/dbContext"
import { UserModel } from "prisma/generated/models"

type getUserByIdQueryProps = {
  userId: string
}
export const getUserByIdAsync = async ({
  userId,
}: getUserByIdQueryProps): Promise<UserModel | null> => {
  const user = await context.user.findUnique({ where: { id: userId } })

  return user
}
