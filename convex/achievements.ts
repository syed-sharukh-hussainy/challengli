import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const getAllUserAchievementsByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("achievements")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()
  },
})

export const claimAchievement = mutation({
  args: {
    id: v.string(),
    xp: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, xp } = args
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    if (!user) {
      throw new ConvexError("No User Found")
    }
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_userId_type", (q) => q.eq("userId", identity.subject))
      .collect()

    const achievement = await ctx.db
      .query("achievements")
      .withIndex("by_cId_userId", (q) => q.eq("userId", identity.subject).eq("cId", id))
      .first()
    if (achievement) {
      await ctx.db.patch(achievement._id, {
        isClaimed: true,
      })

      await ctx.db.patch(user._id, {
        xp: user.xp + xp,
      })

      for (let i = 0; i < leaderboard.length; i++) {
        await ctx.db.patch(leaderboard[i]._id, {
          xp: leaderboard[i].xp + xp,
        })
      }
    }
  },
})

export const getAchievementsByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const achievements = await ctx.db
      .query("achievements")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()
    return achievements
  },
})
