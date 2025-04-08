import { MutationCtx, QueryCtx } from "./_generated/server"

export const generateRandomUserName = (minLength = 6, maxLength = 6) => {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const usernameLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength

  return Array.from({ length: usernameLength }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("")
}
export const checkAndInsertAchievement = async (
  ctx: MutationCtx,
  id: string,
  name: string,
  userId: string,
) => {
  const achievement = await ctx.db
    .query("achievements")
    .withIndex("by_cId_userId", (q) => q.eq("userId", userId).eq("cId", id))
    .first()

  if (!achievement) {
    await ctx.db.insert("achievements", {
      isClaimed: false,
      cId: id,
      name,
      userId,
      status: "COMPLETED",
    })
  }
}
export const getUserById = async (ctx: QueryCtx, userId: string) => {
  const user = await ctx.db
    .query("users")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first()

  return user
}
