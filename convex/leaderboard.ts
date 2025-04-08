import { ConvexError, v } from "convex/values"
import { internalMutation, mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"

export const deleteUserDetailsFromLeaderboard = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("leaderboard")
      .withIndex("by_userId_type", (q) => q.eq("userId", args.userId))
      .collect()
    if (users) {
      for (let i = 0; i < users.length; i++) {
        await ctx.db.delete(users[i]._id)
      }
    }
  },
})

export const addUserToLeaderboard = internalMutation({
  args: {
    userId: v.string(),
    firstName: v.string(),
    imageUrl: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) => {
    const { firstName, imageUrl, lastName, userId } = args
    await ctx.db.insert("leaderboard", {
      userId,
      xp: 0,
      type: "weekly",
      firstName,
      imageUrl,
      lastName,
    })
    await ctx.db.insert("leaderboard", {
      userId,
      xp: 0,
      type: "all time",
      firstName,
      imageUrl,
      lastName,
    })
  },
})

export const getUsersLeaderboard = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .take(500)

    return leaderboard
  },
})

export const resetWeeklyLeaderboard = internalMutation({
  handler: async (ctx, args) => {
    const weeklyLeaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_type", (q) => q.eq("type", "weekly"))
      .collect()
    for (const user of weeklyLeaderboard) {
      await ctx.db.patch(user._id, {
        xp: 0,
      })
    }
  },
})

export const addXPToUsersLeaderboard = mutation({
  args: {
    xp: v.number(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    const user = await ctx.db
      .query("leaderboard")
      .withIndex("by_userId_type", (q) => q.eq("userId", identity.subject).eq("type", args.type))
      .unique()

    if (!user) {
      return
    }

    await ctx.db.patch(user._id, {
      xp: user.xp + args.xp,
    })
  },
})

export const getUsersLeaderboardDetails = query({
  handler: async (ctx, args) => {
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_type", (q) => q.eq("type", "all-time"))
      .collect()

    return leaderboard
  },
})

export const getUserLeaderboardDetails = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_userId_type", (q) => q.eq("userId", args.userId).eq("type", "all-time"))
      .unique()
    return leaderboard
  },
})
