import context from "@/lib/prisma/dbContext"
import { ItemId } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

/**
 * Supprime un item en base de données à partir de son identifiant.
 *
 * @param id - L'identifiant UUID de l'item à supprimer, extrait de {@link ItemId}.
 * @returns L'item supprimé tel que retourné par Prisma.
 * @throws Si aucun item ne correspond à l'identifiant (erreur Prisma P2025).
 */
export async function DeleteItemAsync({ id }: ItemId): Promise<ItemModel> {
  return await context.item.delete({ where: { id } })
}
