"use server"
import { superAdminAction } from "@/lib/actions/safeAction"
import { ItemCreateSchema } from "@/models/stock/items.schema"
import { CreateItemAsync } from "@/services/item/createItem.query"

/**
 * Server action réservée aux super-admins permettant de créer un nouvel item.
 *
 * L'entrée est validée par {@link ItemCreateSchema} avant exécution.
 *
 * @example
 * const result = await CreateItemAction({ name: "AK-74", category: "SMALL_ARMS", ... })
 *
 * @throws {ActionError} Si l'utilisateur n'est pas super-admin ou si la validation échoue.
 * @returns L'item nouvellement créé.
 */
export const CreateItemAction = superAdminAction
  .inputSchema(ItemCreateSchema)
  .action(async ({ parsedInput }) => {
    return await CreateItemAsync(parsedInput)
  })
