"use server"
import { superAdminAction } from "@/lib/actions/safeAction"
import { ItemIdFilterSchema } from "@/models/stock/items.schema"
import { DeleteItemAsync } from "@/services/item/deleteItem.query"

export const CreateItemAction = superAdminAction
  .inputSchema(ItemIdFilterSchema)
  .action(async ({ parsedInput }) => {
    return await DeleteItemAsync(parsedInput)
  })
