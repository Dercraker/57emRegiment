import context from "@/lib/prisma/dbContext"
import { ItemId } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

/**
 * Recherche un item en base de données à partir de son identifiant UUID.
 *
 * @param item - Objet contenant l'`id` UUID de l'item recherché, conforme à {@link ItemId}.
 * @returns L'item correspondant, ou `null` s'il n'existe pas.
 */
export const getItemById = async (item: ItemId): Promise<ItemModel | null> => {
  return await context.item.findUnique({ where: { id: item.id } })
}
