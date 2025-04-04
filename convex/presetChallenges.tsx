import { ConvexError, v } from "convex/values"
import { query } from "./_generated/server"

export const getPresetChallengeById = query({
  args: {
    challengeId: v.id("presetChallenges"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }

    const challenge = await ctx.db
      .query("presetChallenges")
      .withIndex("by_id", (q) => q.eq("_id", args.challengeId))
      .first()
    return challenge
  },
})

export const getPresetChallengesByCatId = query({
  args: {
    categoryId: v.id("categories"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenges = await ctx.db
      .query("presetChallenges")
      .withIndex("by_categoryId", (q) => q.eq("categoryId", args.categoryId))
      .collect()

    return challenges
  },
})
