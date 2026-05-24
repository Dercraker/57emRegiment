import { ItemsFIlter } from "@/models/stock/items.schema"
import { GetAllItemsAction } from "@/services/item/getAllItems.action"

export default async function ItemsPage({ searchParams }: PageProps<"/items">) {
    const params = await searchParams as ItemsFIlter
    console.log(params)
    const result = await GetAllItemsAction(params)
    if (result?.serverError)
        return <p>erreur:{result.serverError}</p>
    return (
        <>
            <div>
                items list
            </div>
            <ul>
                {result?.data?.map((item) => {
                    return (<li key={item.id}>{item.name}</li>)
                })}
            </ul>
        </>
    )
}