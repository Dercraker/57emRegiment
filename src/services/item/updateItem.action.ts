"use server"
import { superAdminAction } from "@/lib/actions/safeAction"
import { ItemUpdateSchema } from "@/models/stock/items.schema"
import { UpdateItemAsync } from "@/services/item/updateItem.query"

/**
 * Server action réservée aux super-admins permettant de mettre à jour un item existant.
 *
 * L'entrée est validée par {@link ItemUpdateSchema} avant exécution.
 * Le payload attend un objet `{ id: ItemId, item: ItemCreate }`.
 *
 * @example
 * const result = await UpdateItemAction({
 *   id: { id: "550e8400-e29b-41d4-a716-446655440000" },
 *   item: { name: "AK-74 (MAJ)", category: "SMALL_ARMS", ... },
 * })
 *
 * @throws {ActionError} Si l'utilisateur n'est pas super-admin, si la validation échoue,
 *   ou si aucun item ne correspond à l'identifiant fourni.
 * @returns L'item mis à jour.
 */
export const UpdateItemAction = superAdminAction
  .inputSchema(ItemUpdateSchema)
  .action(async ({ parsedInput }) => {
    return await UpdateItemAsync(parsedInput.id, parsedInput.item)
  })
