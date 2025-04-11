import { httpRouter } from "convex/server"
import { internal } from "./_generated/api"
import { httpAction } from "./_generated/server"

const http = httpRouter()

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text()
    const headerPayload = request.headers

    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id"),
      "svix-timestamp": headerPayload.get("svix-timestamp"),
      "svix-signature": headerPayload.get("svix-signature"),
    }

    console.log(svixHeaders)

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: svixHeaders,
      })

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            email: result.data.email_addresses[0].email_address,
            userId: result.data.id,
            firstName: result.data.first_name || "",
            lastName: result.data.last_name || "",
            imageUrl: result.data.image_url,
          })
          await ctx.runMutation(internal.leaderboard.addUserToLeaderboard, {
            userId: result.data.id,
            firstName: result.data.first_name || "",
            lastName: result.data.last_name || "",
            imageUrl: result.data.image_url,
          })
          break
        case "user.deleted":
          await ctx.runMutation(internal.users.deleteUser, {
            userId: result.data.id!,
          });
          await ctx.runMutation(internal.userChallenges.deleteUserChallenges, {
            userId: result.data.id!,
          });
          await ctx.runMutation(
            internal.leaderboard.deleteUserDetailsFromLeaderboard,
            {
              userId: result.data.id!,
            }
          );
          await ctx.runMutation(internal.achievements.deleteUserAchievements, {
            userId: result.data.id!,
          });
          break;
      }
      return new Response(null, {
        status: 200,
      })
    } catch (err) {
      console.log(err)
      return new Response("Webhook Error", {
        status: 400,
      })
    }
  }),
})

export default http
