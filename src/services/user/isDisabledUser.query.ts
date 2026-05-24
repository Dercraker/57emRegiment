import context from "@/lib/prisma/dbContext"

type isDisabledUserProps = {
  userId: string
}
export const isDisabledUserAsync = async ({
  userId,
}: isDisabledUserProps): Promise<Date | false> => {
  const data = await context.user.findUniqueOrThrow({
    where: { id: userId },
    select: { disabledAt: true },
  })

  return data.disabledAt ?? false
}
