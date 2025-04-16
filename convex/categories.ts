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


export const getCategoryById = query({
  args: {
    categoryId: v.optional(v.id("categories")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    return await ctx.db.query('categories').withIndex('by_id', (q) => q.eq('_id', args.categoryId!)).first();
  }
})