import { ConvexError, v } from "convex/values"
import { internalMutation, mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { generateRandomUserName } from "./utils"

export const createUser = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()

    if (existingUser) {
      throw new Error(`User with email ${args.email} already exists.`)
    }

    const existingUserById = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (existingUserById) {
      throw new Error(`User with userId ${args.userId} already exists.`)
    }

    let userName = ""
    let isUserNamePresent
    let attempts = 0

    while (attempts < 10) {
      attempts++
      userName = `${args.firstName.toLowerCase().replaceAll(" ", "")}-${generateRandomUserName(6, 6)}`
      isUserNamePresent = await ctx.db
        .query("users")
        .withIndex("by_userName", (q) => q.eq("userName", userName))
        .first()

      if (!isUserNamePresent) break
    }

    if (isUserNamePresent) {
      userName = `${args.firstName}${Date.now().toString().slice(-6)}`
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      userName,
      followers: [],
      following: [],
      xp: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakDates: [],
    })
    return userId
  },
})

export const deleteUser = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()
    if (user) {
      return await ctx.db.delete(user?._id)
    }
  },
})
