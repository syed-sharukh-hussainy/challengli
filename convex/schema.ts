import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export const User = {
  email: v.string(),
  userId: v.string(),
  imageUrl: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  userName: v.string(),
  xp: v.number(),
  followers: v.array(v.string()),
  following: v.array(v.string()),
  pushToken: v.optional(v.string()),
  currentStreak: v.number(),
  longestStreak: v.number(),
  streakDates: v.array(v.string()),
  isPro: v.boolean(),
  subscriptions: v.optional(v.object({
    productId: v.string(),
    purchaseDate: v.string(),
    expirationDate: v.string(),
  }))
}

export const Categories = {
  title: v.string(),
  description: v.string(),
  image: v.string(),
}

export const PresetChallenges = {
  title: v.string(),
  description: v.string(),
  image: v.string(),
  color: v.object({
    primary: v.string(),
    secondary: v.string(),
  }),
  isFree: v.boolean(),
  duration: v.number(),
  categoryId: v.id("categories"),
  activities: v.array(
    v.object({
      day: v.number(),
      title: v.string(),
      task: v.string(),
      pros: v.string(),
      tips: v.array(v.string()),
    }),
  ),
}

export const UserChallenges = {
  userId: v.string(),
  challengeId: v.optional(v.string()),
  title: v.string(),
  description: v.string(),
  image: v.string(),
  startDate: v.string(),
  color: v.object({
    primary: v.string(),
    secondary: v.string(),
  }),
  isFree: v.boolean(),
  duration: v.number(),
  categoryId: v.optional(v.id("categories")),
  status: v.string(),
  activities: v.array(
    v.object({
      day: v.number(),
      title: v.string(),
      task: v.string(),
      status: v.optional(v.string()),
      pros: v.string(),
      date: v.optional(v.string()),
      tips: v.array(v.string()),
    }),
  ),
  reminderTime: v.object({
    hour: v.number(),
    minutes: v.number(),
    period: v.number(),
  }),
}

export const Leaderboard = {
  userId: v.string(),
  xp: v.number(),
  imageUrl: v.string(),
  firstName: v.string(),
  lastName: v.string(),
  type: v.string(),
}

export const Achievements = {
  isClaimed: v.boolean(),
  status: v.string(),
  name: v.string(),
  userId: v.string(),
  cId: v.string(),
}

export const Feedback = {
  feedback: v.string(),
  userId: v.string(),
  email: v.string(),
}

export default defineSchema({
  users: defineTable(User)
    .index("by_userId", ["userId"])
    .index("by_userName", ["userName"])
    .index("by_email", ["email"]),
  userChallenges: defineTable(UserChallenges)
    .index("by_cid_uid_status", ["userId", "challengeId", "status"])
    .index("by_userId", ["userId"])
    .index("by_userId_status", ["userId", "status"]),
  presetChallenges: defineTable(PresetChallenges).index("by_categoryId", ["categoryId"]),
  categories: defineTable(Categories),
  leaderboard: defineTable(Leaderboard)
    .index("by_userId_type", ["userId", "type"])
    .index("by_type", ["type"]),
  achievements: defineTable(Achievements)
    .index("by_cId_userId", ["userId", "cId"])
    .index("by_userId", ["userId"]),
  feedback: defineTable(Feedback),
})
