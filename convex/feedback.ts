import { ConvexError, v } from "convex/values"
import { mutation } from "./_generated/server"

export const submitFeedback = mutation({
  args: {
    feedback: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError("Unauthenticated")
    }

    await ctx.db.insert("feedback", {
      email: user.email!,
      feedback: args.feedback,
      userId: user.subject,
    })
  },
})
