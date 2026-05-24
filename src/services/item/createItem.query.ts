import context from "@/lib/prisma/dbContext"
import { ItemModel } from "prisma/generated/models"
import { ItemCreate } from "@/models/stock/items.schema"

export async function CreateItemAsync(item: ItemCreate): Promise<ItemModel> {
  return await context.item.create({ data: item })
}
