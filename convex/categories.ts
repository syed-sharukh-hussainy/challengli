import { ConvexError, v } from "convex/values"
import { query } from "./_generated/server"

export const getAllCategories = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    return await ctx.db.query("categories").collect()
  },
})
