import { ConvexError, v } from "convex/values"
import { internalMutation, mutation, query } from "./_generated/server"
import { paginationOptsValidator } from "convex/server"
import { generateRandomUserName } from "./utils"

export const createUser = internalMutation({
  args: {
    userId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first()

    if (existingUser) {
      throw new Error(`User with email ${args.email} already exists.`)
    }

    const existingUserById = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    if (existingUserById) {
      throw new Error(`User with userId ${args.userId} already exists.`)
    }

    let userName = ""
    let isUserNamePresent
    let attempts = 0

    while (attempts < 10) {
      attempts++
      userName = `${args.firstName.toLowerCase().replaceAll(" ", "")}-${generateRandomUserName(6, 6)}`
      isUserNamePresent = await ctx.db
        .query("users")
        .withIndex("by_userName", (q) => q.eq("userName", userName))
        .first()

      if (!isUserNamePresent) break
    }

    if (isUserNamePresent) {
      userName = `${args.firstName}${Date.now().toString().slice(-6)}`
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      userName,
      followers: [],
      following: [],
      xp: 0,
      currentStreak: 0,
      longestStreak: 0,
      streakDates: [],
    })
    return userId
  },
})

export const deleteUser = internalMutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

      if(user){
        const users = await ctx.db.query("users").collect();
      for (let i = 0; i < users.length; i++) {
        const cUser = users[i];

        if (cUser.followers.includes(user.userName)) {
          const updatedFollowers = cUser.followers.filter((follower) => follower !== user.userName);
          await ctx.db.patch(cUser._id, {
            followers: updatedFollowers,
          });  
        } 
        if (cUser.following.includes(user.userName)) {
          const updatedFollowing = cUser.following.filter((follower) => follower!== user.userName);
          await ctx.db.patch(cUser._id, {
            following: updatedFollowing,
          }); 
        }
      }
      }
    if (user) {
      return await ctx.db.delete(user?._id)
    }
  },
})

export const getUser = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    return user
  },
})

export const updateStreak = mutation({
  args: {
    activityDate: v.string(), // Date in "YYYY-MM-DD"
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    if (!user) {
      throw new ConvexError("User not found")
    }

    const streakDates = user.streakDates || []
    const today = args.activityDate

    // If today’s date is already recorded, return
    if (streakDates.includes(today)) {
      return
    }

    // Get last streak date (if exists)
    const lastDateStr = streakDates.length > 0 ? streakDates[streakDates.length - 1] : null
    const lastDate = lastDateStr ? new Date(lastDateStr) : null
    const currentDate = new Date(today)

    let currentStreak = user.currentStreak || 0
    let longestStreak = user.longestStreak || 0

    // Check if last date was exactly 1 day before today
    if (lastDate) {
      const diffDays = Math.floor(
        (currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
      )

      if (diffDays === 1) {
        // Continue streak
        currentStreak += 1
      } else if (diffDays > 1) {
        // Streak broken, reset to 1
        currentStreak = 1
      }
    } else {
      // First-ever streak day
      currentStreak = 1
    }

    // Update longest streak if current is higher
    longestStreak = Math.max(longestStreak, currentStreak)

    // Save updated values
    await ctx.db.patch(user._id, {
      streakDates: [...streakDates, today],
      currentStreak,
      longestStreak,
    })
  },
})

export const checkStreak = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    if (!user || !user.streakDates?.length) {
      return
    }

    const lastActivityDateStr = user.streakDates.at(-1) // ✅ Get last date safely
    const lastActivityDate = lastActivityDateStr ? new Date(lastActivityDateStr) : null
    const today = new Date()

    if (lastActivityDate) {
      const diffDays = Math.floor(
        (today.getTime() - lastActivityDate.getTime()) / (1000 * 60 * 60 * 24),
      )

      // Reset streak if more than 1 day has passed
      if (diffDays > 1) {
        await ctx.db.patch(user._id, {
          currentStreak: 0,
        })
      }
    }
  },
})

export const updateUserDetails = mutation({
  args: {
    field: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()
    const leaderboard = await ctx.db
      .query("leaderboard")
      .withIndex("by_userId_type", (q) => q.eq("userId", identity.subject))
      .collect()

    if (!user) {
      return
    }

    if (args.field === "First name") {
      await ctx.db.patch(user?._id, {
        firstName: args.value,
      })
      await ctx.db.patch(leaderboard[0]._id, {
        firstName: args.value,
      })
      await ctx.db.patch(leaderboard[1]._id, {
        firstName: args.value,
      })
    } else {
      await ctx.db.patch(user?._id, {
        lastName: args.value,
      })
      await ctx.db.patch(leaderboard[0]._id, {
        lastName: args.value,
      })
      await ctx.db.patch(leaderboard[1]._id, {
        lastName: args.value,
      })
    }
  },
})

export const getAllusers = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    const users = await ctx.db
      .query("users")
      .filter((q) => q.neq(q.field("userId"), identity.subject))
      .paginate(args.paginationOpts)
    return users
  },
})

export const allUsers = query({
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const users = await ctx.db.query("users").collect()
    return users
  },
})

export const updateFollowingFollowers = mutation({
  args: {
    userName: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }

    const me = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    const other = await ctx.db
      .query("users")
      .withIndex("by_userName", (q) => q.eq("userName", args.userName))
      .first()

    if (me && other) {
      const isFollowing = me.following.includes(args.userName)

      if (isFollowing) {
        // Unfollow: Remove the username from the following list
        await ctx.db.patch(me._id, {
          following: me.following.filter((user) => user !== args.userName),
        })

        // Remove the username from the other user's followers list
        await ctx.db.patch(other._id, {
          followers: other.followers.filter((user) => user !== me.userName),
        })
      } else {
        // Follow: Add the username to the following list
        await ctx.db.patch(me._id, {
          following: [...me.following, args.userName],
        })

        // Add the username to the other user's followers list
        await ctx.db.patch(other._id, {
          followers: [...other.followers, me.userName],
        })
      }
    }
  },
})

export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first()

    return user
  },
})

export const addXpToUser = mutation({
  args: {
    xp: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new ConvexError("Unauthenticated")
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first()

    if (!user) {
      throw new ConvexError("No user found")
    }

    await ctx.db.patch(user?._id, {
      xp: user.xp + args.xp,
    })
  },
})

export const getUserFriendsById = query({
  args: {
    friendsIds: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    if (args.friendsIds === undefined) {
      return []
    }
    let friends = []
    for (let i = 0; i < args.friendsIds.length; i++) {
      const friend = await ctx.db
        .query("users")
        .withIndex("by_userName", (q) => q.eq("userName", args.friendsIds![i]))
        .first()
      friends.push(friend)
    }

    return friends
  },
})

export const getLeaderboardUsers = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").paginate(args.paginationOpts)
    return users
  },
})
