import { ConvexError, v } from "convex/values"
import { internalMutation, mutation, query } from "./_generated/server"

type Activity = {
  date: string
  status: string
  day: number
  title: string
  task: string
  pros: string
  tips: string[]
}

export const getUserChallenges = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect()

    return challenges
  },
})

export const getUserInProgressChallenges = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_userId_status", (q) =>
        q.eq("userId", identity.subject).eq("status", "IN_PROGRESS"),
      )
      .collect()

    return challenges
  },
})

export const getChallengeByChallengeId = query({
  args: {
    challengeId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_cid_uid_status", (q) =>
        q.eq("userId", identity.subject).eq("challengeId", args.challengeId),
      )
      .first()

    return challenge
  },
})

export const getChallengeById = query({
  args: {
    challengeId: v.id("userChallenges")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_userId", (q) =>
        q.eq("userId", identity.subject)
      ).filter((q) => q.eq(q.field("_id"), args.challengeId))
      .first()

    return challenge
  },
})

export const getAllChallengesByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const challenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()

    return challenges
  },
})

export const createChallenge = mutation({
  args: {
    challengeId: v.optional(v.id("presetChallenges")),
    title: v.string(),
    description: v.string(),
    duration: v.number(),
    image: v.string(),
    categoryId: v.optional(v.id("categories")),
    isFree: v.boolean(),
    color: v.object({
      primary: v.string(),
      secondary: v.string(),
    }),
    challengeActivities: v.array(
      v.object({
        title: v.string(),
        day: v.number(),
        task: v.string(),
        pros: v.string(),
        tips: v.array(v.string()),
      }),
    ),
    reminderTime: v.object({
      hour: v.number(),
      minutes: v.number(),
      period: v.number(),
    }),
    startDate: v.string(),
  },
  handler: async (ctx, args) => {
    const {
      startDate,
      challengeActivities,
      description,
      title,
      image,
      duration,
      categoryId,
      color,
      isFree,
      reminderTime,
    } = args
    const user = await ctx.auth.getUserIdentity()

    if (!user) {
      throw new ConvexError("Unauthenticated")
    }

    let activities: Activity[] = []
    const length = challengeActivities.length

    for (let i = 0; i < length; i++) {
      const activityDate = new Date(Date.parse(startDate))
      activityDate.setDate(activityDate.getDate() + i)

      let newActivity = {
        title: challengeActivities[i].title,
        day: challengeActivities[i].day,
        task: challengeActivities[i].task,
        status: "IN_PROGRESS",
        date: activityDate.toISOString(),
        tips: challengeActivities[i].tips,
        pros: challengeActivities[i].pros,
      }
      activities.push(newActivity)
    }

    return await ctx.db.insert("userChallenges", {
      userId: user.subject,
      title,
      description,
      duration,
      image,
      activities,
      challengeId: args.challengeId!,
      categoryId,
      startDate,
      status: "IN_PROGRESS",
      color: color,
      reminderTime,
      isFree,
    })
  },
})

export const updateReminderTime = mutation({
  args: {
    challengeId: v.id("userChallenges"),
    reminderTime: v.object({
      hour: v.number(),
      minutes: v.number(),
      period: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_id", (q) => q.eq("_id", args.challengeId))
      .unique()

    if (!challenge) {
      throw new ConvexError("Challenge Not Found")
    }

    const newChallenge = {
      ...challenge,
      reminderTime: args.reminderTime,
    }

    await ctx.db.patch(challenge._id, newChallenge)

    return newChallenge
  },
})

export const updateDayActivityStatus = mutation({
  args: {
    date: v.string(),
    challengeId: v.id("userChallenges"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Not authenticated")
    }
    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_id", (q) =>
        q.eq("_id", args.challengeId),
      )
      .first()

    if (challenge === null) {
      return null
    }

    const activityIndex = challenge?.activities.findIndex((activity) => activity.date === args.date)

    let status
    if (challenge.activities[activityIndex].status === "IN_PROGRESS") {
      status = "COMPLETED"
    } else {
      status = "IN_PROGRESS"
    }
    const newActivity = [...challenge.activities]
    newActivity[activityIndex] = {
      ...newActivity[activityIndex],
      status,
    }

    await ctx.db.patch(challenge._id, {
      activities: newActivity,
    })
  },
})

export const resetChallenge = mutation({
  args: {
    challengeId: v.id("userChallenges"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError("Not authenticated")
    }

    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_id", (q) => q.eq("_id", args.challengeId))
      .unique()

    if (!challenge) {
      throw new ConvexError("Challenge Not Found")
    }

    let activities: Activity[] = []
    const length = challenge.activities.length
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0")

    const formattedDate = `${year}-${month}-${day}`
    const activityDate = new Date(Date.parse(formattedDate))
    for (let i = 0; i < length; i++) {
      const newDate = new Date(activityDate) // Clone the date to avoid modifying the original
      newDate.setDate(newDate.getDate() + i)

      let newActivity = {
        title: challenge.activities[i].title,
        day: challenge.activities[i].day,
        task: challenge.activities[i].task,
        status: "IN_PROGRESS",
        date: newDate.toISOString(),
        tips: challenge.activities[i].tips,
        pros: challenge.activities[i].pros,
      }
      activities.push(newActivity)
    }
    const newChallenge = {
      ...challenge,
      startDate: activityDate.toISOString(),
      activities,
      status: "IN_PROGRESS",
    }

    await ctx.db.patch(challenge._id, newChallenge)

    return newChallenge
  },
})

export const deleteChallenge = mutation({
  args: {
    challengeId: v.id("userChallenges"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError("Not authenticated")
    }

    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_id", (q) => q.eq("_id", args.challengeId))
      .unique()

    if (!challenge) {
      throw new ConvexError("Challenge Not Found")
    }

    await ctx.db.delete(challenge._id)
  },
})

export const deleteUserChallenges = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const challenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()
    if (!challenges) return
    for (let i = 0; i < challenges.length; i++) {
      await ctx.db.delete(challenges[i]._id)
    }
  },
})
