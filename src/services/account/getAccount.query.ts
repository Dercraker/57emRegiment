import context from "@/lib/prisma/dbContext"
import { Prisma } from "prisma/generated/client"
import { AccountModel } from "prisma/generated/models"

type getAccountByUserIdFirstOrThrowProps = {
  userId: string
  select?: Prisma.AccountSelect
}
export const getAccountByUserIdFirstOrThrowAsync = async ({
  userId,
  select,
}: getAccountByUserIdFirstOrThrowProps): Promise<Partial<AccountModel>> =>
  await context.account.findFirstOrThrow({
    where: {
      userId: userId,
      providerId: "discord",
    },
    select: { ...select },
  })
