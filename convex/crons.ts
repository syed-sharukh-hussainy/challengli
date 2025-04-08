import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"

const crons = cronJobs()

crons.weekly(
  "weekly-leaderboard",
  {
    dayOfWeek: "monday",
    hourUTC: 0,
    minuteUTC: 0,
  },
  internal.leaderboard.resetWeeklyLeaderboard,
  {},
)
export default crons
