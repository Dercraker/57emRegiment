import { TablerIcon } from "@tabler/icons-react"
import { z } from "zod"

//#region Base Types

export type NavigationGroup = {
  title: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links: NavigationLink<any>[]
}

//#endregion Base Types

//#region Common Schema Parts

const BaseNavigationLinkSchema = z
  .object({
    Icon: z.custom<TablerIcon>().optional(),
    label: z.string(),
    hidden: z.boolean().optional(),
    disabled: z.boolean().optional(),
    target: z.enum(["_self", "_blank", "_parent", "_top"]).optional(),
  })
  .strict()

//#endregion Common Schema Parts

//#region NavigationLink (dynamic href function)

export type NavigationLink<TParams extends object = Record<never, never>> = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  href: {} extends TParams ? () => string : (params: TParams) => string
  label: string
  Icon?: TablerIcon
  hidden?: boolean
  disabled?: boolean
  target?: "_self" | "_blank" | "_parent" | "_top"
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NavigationLinks = NavigationLink<any>[]

export type NavigationLinksGroup = {
  title: string
  links: NavigationLinks
}

export type NavigationLinksGroups = NavigationLinksGroup[]

export type GenericLinkSchema = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: NavigationLink<any> | GenericLinkSchema
}

//#endregion NavigationLink

//#region Generated Schemas (Links with static href string)

export type GeneratedNavigationGroup = {
  title: string
  links: GeneratedNavigationLink[]
}

const GeneratedNavigationLinkSchema = BaseNavigationLinkSchema.extend({
  href: z.string(),
})

const GeneratedNavigationLinksSchema = z.array(GeneratedNavigationLinkSchema)

const GeneratedGenericLinkSchema: z.ZodType = z.lazy(() =>
  z.record(
    z.string(),
    z.union([
      GeneratedNavigationLinkSchema,
      z.lazy(() => GeneratedGenericLinkSchema),
    ])
  )
)

const GeneratedNavigationLinksGroup = z.object({
  title: z.string(),
  links: GeneratedNavigationLinksSchema,
})

const GeneratedNavigationLinksGroups = z.array(GeneratedNavigationLinksGroup)

//#endregion Generated Schemas

//#region Type Exports

export type GeneratedNavigationLink = z.infer<typeof GeneratedNavigationLinkSchema>
export type GeneratedNavigationLinks = z.infer<typeof GeneratedNavigationLinksSchema>
export type GeneratedGenericLinkSchema = z.infer<typeof GeneratedGenericLinkSchema>
export type GeneratedNavigationLinksGroup = z.infer<typeof GeneratedNavigationLinksGroup>
export type GeneratedNavigationLinksGroups = z.infer<typeof GeneratedNavigationLinksGroups>

//#endregion Type Exports

//#region Schema Exports

export {
  BaseNavigationLinkSchema,
  GeneratedGenericLinkSchema,
  GeneratedNavigationLinkSchema,
  GeneratedNavigationLinksGroup,
  GeneratedNavigationLinksGroups,
  GeneratedNavigationLinksSchema,
}

//#endregion Schema Exports
