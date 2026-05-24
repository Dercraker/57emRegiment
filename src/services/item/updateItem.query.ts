import context from "@/lib/prisma/dbContext"
import { ItemModel } from "prisma/generated/models"
import { ItemCreate, ItemId } from "@/models/stock/items.schema"

export async function UpdateItemAsync(
  { id }: ItemId,
  item: ItemCreate
): Promise<ItemModel> {
  return await context.item.update({ where: { id }, data: item })
}
