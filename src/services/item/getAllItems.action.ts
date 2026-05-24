"use server"

import { authAction } from "@/lib/actions/safeAction"
import { ItemsFilterSchema } from "@/models/stock/items.schema"
import { getAllItemsAsync } from "@/services/item/getAllItems.query"

export const GetAllItemsAction = authAction
  .inputSchema(ItemsFilterSchema)
  .action(async ({ parsedInput }) => {
    return await getAllItemsAsync(parsedInput)
  })
