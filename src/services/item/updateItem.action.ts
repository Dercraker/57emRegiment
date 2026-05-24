"use server"
import { superAdminAction } from "@/lib/actions/safeAction"
import { ItemSchema, ItemUpdateSchema } from "@/models/stock/items.schema"
import { UpdateItemAsync } from "@/services/item/updateItem.query"

export const CreateItemAction = superAdminAction
  .inputSchema(ItemUpdateSchema)
  .action(async ({ parsedInput }) => {
    return await UpdateItemAsync(parsedInput.id, parsedInput.item)
  })
