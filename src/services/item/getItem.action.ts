import { authAction } from "@/lib/actions/safeAction"
import { ItemIdSchema } from "@/models/stock/items.schema"
import { getItemById } from "@/services/item/getItem.query"

/**
 * Server action authentifiée permettant de récupérer un item par son identifiant UUID.
 *
 * L'entrée est validée par {@link ItemIdSchema} avant exécution.
 *
 * @example
 * const result = await GetItemByIdAction({ id: "550e8400-e29b-41d4-a716-446655440000" })
 *
 * @throws {ActionError} Si l'utilisateur n'est pas authentifié ou si la validation échoue.
 * @returns L'item correspondant, ou `null` s'il n'existe pas.
 */
export const GetItemByIdAction = authAction
  .inputSchema(ItemIdSchema)
  .action(async ({ parsedInput }) => {
    return await getItemById(parsedInput)
  })
