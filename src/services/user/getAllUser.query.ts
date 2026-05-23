import context from "@/lib/prisma/dbContext"
import { UserModel } from "prisma/generated/models"

export const getAllUserAsync = async (): Promise<UserModel[]> => {
  const allUser = await context.user.findMany({})

  return allUser
}

// Sample
// type UserWithPosts = UserGetPayload<{ include: { posts: true } }>
// export const getAllUserWithPostsAsync = async (): Promise<UserWithPosts[]> => {
//   const allUser = await context.user.findMany({ include: { posts: true } })

//   return allUser
// }
