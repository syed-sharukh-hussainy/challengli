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
}

export const Categories = {
  title: v.string(),
  description: v.string(),
  image: v.string(),
}

export default defineSchema({
  users: defineTable(User)
    .index("by_userId", ["userId"])
    .index("by_userName", ["userName"])
    .index("by_email", ["email"]),
  categories: defineTable(Categories),
})
