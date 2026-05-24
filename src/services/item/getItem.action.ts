import { authAction } from "@/lib/actions/safeAction"
import { ItemIdFilterSchema } from "@/models/stock/items.schema"
import { getAllItemsAsync } from "@/services/item/getAllItems.query"
import { getItemById } from "@/services/item/getItem.query"

export const GetItemAction = authAction
  .inputSchema(ItemIdFilterSchema)
  .action(async ({ parsedInput }) => {
    return await getItemById(parsedInput)
  })
