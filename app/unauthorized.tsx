import { SignInButton } from "@/components/auth/SignInButton"

export default async function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center p-8">
      <SignInButton />
    </div>
  )
}
