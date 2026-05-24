import { HeaderBase } from "@/components/layout/headerBase"
import {
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/page/layout"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getError } from "app/auth/error/authErrorMapping"
import Layout from "app/layout"
import Link from "next/link"

export default async function AuthErrorPage(params: PageProps<"/auth/error">) {
  const searchParams = await params.searchParams

  const { errorMessage, error } = getError(searchParams.error)

  return (
    <div className="flex h-full flex-col">
      <HeaderBase />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Authentification Error</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Card>
            <CardHeader>
              <CardDescription>{error}</CardDescription>
              <CardTitle>{errorMessage}</CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center gap-2">
              <Link href="/" className={buttonVariants({ size: "sm" })}>
                Home
              </Link>
              {/* <ContactSupportDialog /> */}
            </CardFooter>
          </Card>
        </LayoutContent>
      </Layout>
    </div>
  )
}
