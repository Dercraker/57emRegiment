import context from "@/lib/prisma/dbContext"
import { ItemsFilter } from "@/models/stock/items.schema"
import { ItemModel } from "prisma/generated/models"

/**
 * Récupère tous les items depuis la base de données,
 * avec filtrage optionnel par catégorie et/ou faction.
 *
 * Les filtres non fournis (undefined) sont ignorés — tous les items sont retournés si
 * aucun filtre n'est passé.
 *
 * @param category - Filtre optionnel sur la catégorie de l'item (ex. `"SMALL_ARMS"`).
 * @param faction  - Filtre optionnel sur la faction de l'item (ex. `"WARDEN"`).
 * @returns La liste des items correspondant aux critères fournis.
 */
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
