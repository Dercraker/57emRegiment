import context from "@/lib/prisma/dbContext"
import { ItemId } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

export async function DeleteItemAsync({ id }: ItemId): Promise<ItemModel> {
  return await context.item.delete({ where: { id } })
}
