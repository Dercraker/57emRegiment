import context from "@/lib/prisma/dbContext"
import { ItemsFIlter } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

export const getAllItemsAsync = async ({
  category,
  faction,
}: ItemsFIlter): Promise<ItemModel[]> => {
  const allItems = await context.item.findMany({
    where: {
      ...(category && { category }),
      ...(faction && { faction }),
    },
  })
  return allItems
}
