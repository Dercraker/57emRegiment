"use server"

import { authAction } from "@/lib/actions/safeAction"
import { ItemsFilterSchema } from "@/models/stock/items.schema"
import { getAllItemsAsync } from "@/services/item/getAllItems.query"

/**
 * Server action authentifiée permettant de récupérer la liste des items,
 * avec filtrage optionnel par catégorie et/ou faction.
 *
 * L'entrée est validée par {@link ItemsFilterSchema} avant exécution.
 *
 * @example
 * const result = await GetAllItemsAction({})
 * const result = await GetAllItemsAction({ category: "SMALL_ARMS", faction: "WARDEN" })
 *
 * @throws {ActionError} Si l'utilisateur n'est pas authentifié ou si la validation échoue.
 * @returns La liste des items correspondant aux filtres fournis.
 */
export const GetAllItemsAction = authAction
  .inputSchema(ItemsFilterSchema)
  .action(async ({ parsedInput }) => {
    return await getAllItemsAsync(parsedInput)
  })
