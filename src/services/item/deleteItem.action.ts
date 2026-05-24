"use server"
import { superAdminAction } from "@/lib/actions/safeAction"
import { ItemIdSchema } from "@/models/stock/items.schema"
import { DeleteItemAsync } from "@/services/item/deleteItem.query"

/**
 * Server action réservée aux super-admins permettant de supprimer un item par son identifiant.
 *
 * L'entrée est validée par {@link ItemIdSchema} avant exécution.
 *
 * @example
 * const result = await DeleteItemAction({ id: "550e8400-e29b-41d4-a716-446655440000" })
 *
 * @throws {ActionError} Si l'utilisateur n'est pas super-admin, si la validation échoue,
 *   ou si aucun item ne correspond à l'identifiant fourni.
 * @returns L'item supprimé.
 */
export const DeleteItemAction = superAdminAction
  .inputSchema(ItemIdSchema)
  .action(async ({ parsedInput }) => {
    return await DeleteItemAsync(parsedInput)
  })
