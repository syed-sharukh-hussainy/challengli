import { ConvexError, v } from "convex/values"
import { internalMutation, mutation, query } from "./_generated/server"
import { generateRandomUserName } from "./utils"
import { paginationOptsValidator } from "convex/server"

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

export const addXpToUser = mutation({
  args: {
    xp: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    if (!user) {
      throw new ConvexError("No user found")
    }

    await ctx.db.patch(user?._id, {
      xp: user.xp + args.xp,
    })
  },
})

export const getUser = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    return user
  },
})

export const allUsers = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const users = await ctx.db.query("users").collect()
    return users
  },
})

export const getAllusers = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("userId"), identity.subject))
      .paginate(args.paginationOpts)
    return users
  },
})

export const updateFollowingFollowers = mutation({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const me = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    const other = await ctx.db
      .query("users")
      .withIndex("by_userName", (q) => q.eq("userName", args.userName))
      .first()

    if (me && other) {
      const isFollowing = me.following.includes(args.userName)

      if (isFollowing) {
        await ctx.db.patch(me._id, {
          following: me.following.filter((user) => user !== args.userName),
        })
        await ctx.db.patch(other._id, {
          followers: other.followers.filter((user) => user !== me.userName),
        })
      } else {
        await ctx.db.patch(me._id, {
          following: [...me.following, args.userName],
        })
        await ctx.db.patch(other._id, {
          followers: [...other.followers, me.userName],
        })
      }
    }
  },
})

export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    return user
  },
})
