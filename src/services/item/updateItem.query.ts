import context from "@/lib/prisma/dbContext"
import { ItemCreate, ItemId } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

/**
 * Met à jour un item existant en base de données.
 *
 * @param id   - L'identifiant de l'item à modifier, conforme à {@link ItemId}.
 * @param item - Les nouvelles données à appliquer, conformes à {@link ItemCreate}.
 * @returns L'item mis à jour tel que retourné par Prisma.
 * @throws Si aucun item ne correspond à l'identifiant (erreur Prisma P2025).
 */
export async function UpdateItemAsync(
  id: ItemId,
  item: ItemCreate
): Promise<ItemModel> {
  return await context.item.update({ where: id, data: item })
}
