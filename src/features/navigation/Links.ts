import {
  GenericLinkSchema,
  NavigationLink,
} from "@/features/navigation/navigation.model"
import {
  EmptyLinkParamsSchema,
  LocationLinkParamsSchema,
  StockLinkParamsSchema,
  TownLinkParamsSchema,
} from "@/features/navigation/urlParams.schema"
import { IconStack2Filled } from "@tabler/icons-react"
import { z } from "zod"

export const PATHS = {
  STOCK_REGION: `/stocks`,
  STOCK_TOWN: `/stocks/:regionId`,
  STOCK_LOCATION: `/stocks/:regionId/:townId`,
  STOCK_DETAIL: `/stocks/:regionId/:townId/:locationId`,
} as const

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLink = <TSchema extends z.ZodObject<any>>(
  path: string,
  label: string,
  _schema: TSchema,
  options?: Partial<Omit<NavigationLink<z.infer<TSchema>>, "href" | "label">>
): NavigationLink<z.infer<TSchema>> => ({
  href: ((params?: z.infer<TSchema>) => {
    if (!params || Object.keys(params).length === 0) return path
    return Object.entries(params as Record<string, string>).reduce(
      (acc, [key, val]) => acc.replace(`:${key}`, val),
      path
    )
  }) as NavigationLink<z.infer<TSchema>>["href"],
  label,
  ...options,
})

export const LINKS = {
  Home: createLink("/", "Home", EmptyLinkParamsSchema),
  Auth: {
    signin: createLink("/auth/signin", "SignIn", EmptyLinkParamsSchema),
    error: createLink("/auth/error", "authError", EmptyLinkParamsSchema, {
      hidden: true,
    }),
  },
  Stock: {
    region: createLink(PATHS.STOCK_REGION, "stocks", EmptyLinkParamsSchema, {
      Icon: IconStack2Filled,
    }),
    town: createLink(PATHS.STOCK_TOWN, "town", TownLinkParamsSchema),
    location: createLink(
      PATHS.STOCK_LOCATION,
      "location",
      LocationLinkParamsSchema
    ),
    detail: createLink(PATHS.STOCK_DETAIL, "detail", StockLinkParamsSchema),
  },
  Legal: {
    terms: createLink("/legal/terms", "Terms", EmptyLinkParamsSchema, {
      disabled: true,
    }),
    privacy: createLink("/legal/privacy", "Privacy", EmptyLinkParamsSchema, {
      disabled: true,
    }),
  },
  Maintenance: createLink(
    "/maintenance",
    "Maintenance",
    EmptyLinkParamsSchema,
    {
      hidden: true,
      disabled: true,
    }
  ),
} satisfies GenericLinkSchema
