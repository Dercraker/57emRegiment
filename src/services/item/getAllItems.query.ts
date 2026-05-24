import context from "@/lib/prisma/dbContext"
import { ItemsFilter } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

export const getAllItemsAsync = async ({
  category,
  faction,
}: ItemsFilter): Promise<ItemModel[]> => {
  const allItems = await context.item.findMany({
    where: {
      ...(category && { category }),
      ...(faction && { faction }),
    },
  })
  return allItems
}
