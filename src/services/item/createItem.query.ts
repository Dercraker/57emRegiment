import context from "@/lib/prisma/dbContext"
import { ItemCreate } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

/**
 * Insère un nouvel item en base de données.
 *
 * @param item - Les données de l'item à créer, conformes à {@link ItemCreate}.
 * @returns L'item créé tel que retourné par Prisma.
 */
export async function CreateItemAsync(item: ItemCreate): Promise<ItemModel> {
  return await context.item.create({ data: item })
}
