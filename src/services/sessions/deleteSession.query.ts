import context from "@/lib/prisma/dbContext"

type deleteAllSessionByUserIdProps = {
  userId: string
}
export const deleteAllSessionByUserIdAsync = async ({
  userId,
}: deleteAllSessionByUserIdProps) =>
  await context.session.deleteMany({
    where: { userId: userId },
  })
