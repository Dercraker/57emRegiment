"use server"
import { superAdminAction } from "@/lib/actions/safeAction"
import { , ItemSchema } from "@/models/stock/items.schema"
import { CreateItemAsync } from "@/services/item/createItem.query"
import { getItemById } from "@/services/item/getItem.query"

export const CreateItemAction = superAdminAction
  .inputSchema(ItemSchema)
  .action(async ({ parsedInput }) => {
    return await CreateItemAsync(parsedInput)
  })
