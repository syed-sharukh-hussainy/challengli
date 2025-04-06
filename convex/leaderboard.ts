import { v } from "convex/values"
import { internalMutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"

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
