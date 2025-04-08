import { ConvexError, v } from "convex/values"
import { internalMutation, mutation, query } from "./_generated/server"
import { checkAndInsertAchievement, getUserById } from "./utils"
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

export const updateAchievement = mutation({
  args: {
    userChallengeId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    const user = await getUserById(ctx, identity.subject)

    const challenge = await ctx.db
      .query("userChallenges")
      .withIndex("by_cid_uid_status", (q) =>
        q.eq("userId", identity?.subject!).eq("challengeId", args.userChallengeId),
      )
      .first()

    if (user === null) {
      return null
    }
    if (challenge === null) {
      return null
    }

    let isChallengeCompleted = true
    for (let i = 0; i < challenge.activities.length; i++) {
      if (challenge.activities[i].status === "IN_PROGRESS") {
        isChallengeCompleted = false
        break
      }
    }

    if (isChallengeCompleted) {
      await ctx.db.patch(challenge._id, {
        status: "COMPLETED",
      })
    }

    const XP_ACHIEVEMENTS = [
      {
        id: "achievement-rising-star",
        name: "Rising Star",
        target: 100,
        xp: 10,
      },
      {
        id: "achievement-pathfinder",
        name: "Pathfinder",
        target: 500,
        xp: 50,
      },
      {
        id: "achievement-milestone-maker",
        name: "Milestone Maker",
        target: 1000,
        xp: 100,
      },
      {
        id: "achievement-momentum-master",
        name: "Momentum Master",
        target: 2000,
        xp: 200,
      },
      {
        id: "achievement-xp-explorer",
        name: "XP Explorer",
        target: 5000,
        xp: 500,
      },
      {
        id: "achievement-level-up-star",
        name: "Level Up Star",
        target: 10000,
        xp: 1000,
      },
      {
        id: "achievement-xp-commander",
        name: "XP Commander",
        target: 15000,
        xp: 1500,
      },
      {
        id: "achievement-elite-achiever",
        name: "Elite Achiever",
        target: 20000,
        xp: 2000,
      },
      {
        id: "achievement-everlasting-energy",
        name: "Everlasting Energy",
        target: 30000,
        xp: 3000,
      },
      {
        id: "achievement-legendary-achiever",
        name: "Legendary Achiever",
        target: 50000,
        xp: 5000,
      },
    ]

    for (let i = 0; i < XP_ACHIEVEMENTS.length; i++) {
      if (user?.xp >= XP_ACHIEVEMENTS[i].target) {
        await checkAndInsertAchievement(
          ctx,
          XP_ACHIEVEMENTS[i].id,
          XP_ACHIEVEMENTS[i].name,
          user.userId,
        )
        break
      }
    }

    const CHALLENGES_ACHIEVEMENTS = [
      {
        id: "achievement-first-step",
        name: "First Step",
        target: 1,
        xp: 10,
      },
      {
        id: "achievement-goal-igniter",
        name: "Goal Igniter",
        target: 5,
        xp: 50,
      },
      {
        id: "achievement-mission-adventurer",
        name: "Mission Adventurer",
        target: 10,
        xp: 100,
      },
      {
        id: "achievement-unyielding-warrior",
        name: "Unyielding Warrior",
        target: 15,
        xp: 150,
      },
      {
        id: "achievement-way-finder",
        name: "Wayfinder",
        target: 20,
        xp: 200,
      },
      {
        id: "achievement-halfway-hero",
        name: "Halfway Hero",
        target: 25,
        xp: 250,
      },
      {
        id: "achievement-achievement-spark",
        name: "Achievement Spark",
        target: 30,
        xp: 300,
      },
      {
        id: "achievement-wellness-wizard",
        name: "Wellness Wizard",
        target: 35,
        xp: 350,
      },
      {
        id: "achievement-challenge-king",
        name: "Challenge king",
        target: 40,
        xp: 400,
      },
      {
        id: "achievement-ultimate-achiever",
        name: "Ultimate Achiever",
        target: 45,
        xp: 450,
      },
      {
        id: "achievement-master-of-transformation",
        name: "Master of Transformation",
        target: 50,
        xp: 500,
      },
    ]

    const challenges = await ctx.db
      .query("userChallenges")
      .withIndex("by_userId_status", (q) =>
        q.eq("userId", identity.subject).eq("status", "COMPLETED"),
      )
      .collect()

    for (let i = 0; i < CHALLENGES_ACHIEVEMENTS.length; i++) {
      if (challenges.length == CHALLENGES_ACHIEVEMENTS[i].target) {
        await checkAndInsertAchievement(
          ctx,
          CHALLENGES_ACHIEVEMENTS[i].id,
          CHALLENGES_ACHIEVEMENTS[i].name,
          user.userId,
        )
        break
      }
    }

    const STREAK_ACHIEVEMENTS = [
      {
        id: "achievement-star",
        name: "Star",
        target: 3,
        xp: 3,
      },
      {
        id: "achievement-superstar",
        name: "Superstar",
        target: 5,
        xp: 5,
      },
      {
        id: "achievement-champion",
        name: "Champion",
        target: 7,
        xp: 7,
      },
      {
        id: "achievement-trailblazer",
        name: "Trailblazer",
        target: 14,
        xp: 14,
      },
      {
        id: "achievement-hall-of-fame",
        name: "Hall of fame",
        target: 21,
        xp: 21,
      },
      {
        id: "achievement-invincible",
        name: "Invincible",
        target: 100,
        xp: 100,
      },
      {
        id: "achievement-enduring-spirit",
        name: "Enduring Spirit",
        target: 250,
        xp: 250,
      },
      {
        id: "achievement-unbreakable",
        name: "Unbreakable",
        target: 300,
        xp: 300,
      },
      {
        id: "achievement-imperial",
        name: "Imperial",
        target: 500,
        xp: 500,
      },
      {
        id: "achievement-the-ultimate",
        name: "The Ultimate",
        target: 1000,
        xp: 1000,
      },
    ]
    for (let i = 0; i < STREAK_ACHIEVEMENTS.length; i++) {
      if (user.currentStreak === STREAK_ACHIEVEMENTS[i].target) {
        await checkAndInsertAchievement(
          ctx,
          STREAK_ACHIEVEMENTS[i].id,
          STREAK_ACHIEVEMENTS[i].name,
          user.userId,
        )
        break
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

export const deleteUserAchievements = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const achievements = await ctx.db
      .query("achievements")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect()
    if (!achievements) {
      return
    }
    for (let i = 0; i < achievements.length; i++) {
      await ctx.db.delete(achievements[i]._id)
    }
  },
})
