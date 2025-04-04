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

export const createChallenge = mutation({
  args: {
    challengeId: v.id("presetChallenges"),
    title: v.string(),
    description: v.string(),
    duration: v.number(),
    image: v.string(),
    categoryId: v.string(),
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
      challengeId,
      startDate,
      challengeActivities,
      description,
      title,
      image,
      duration,
      categoryId,
      color,
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
      challengeId,
      categoryId,
      startDate,
      status: "IN_PROGRESS",
      color: color,
      reminderTime,
    })
  },
})

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

export const updateDayActivityStatus = mutation({
  args: {
    date: v.string(),
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
