import { httpRouter } from "convex/server"
import { internal } from "./_generated/api"
import { httpAction } from "./_generated/server"
import { ConvexError } from "convex/values"

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

http.route({
  path: "/revenuecat-subscription",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const secret = process.env.EXPO_PUBLIC_REVENUECAT_WEBHOOK_SECRET!;
    const authHeader = request.headers.get("authorization");

    if (!authHeader || authHeader !== `Bearer ${secret}`) {
      console.error("Unauthorized RevenueCat webhook");
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const payload = await request.json();
      const event = payload.event;

      console.log("RevenueCat Event:", event.type);

      // Ignore anonymous users until aliasing happens
      if (event.app_user_id.startsWith("$RCAnonymousID")) {
        console.log("Skipping anonymous user webhook event.");
        return new Response("OK", { status: 200 });
      }

      const commonData = {
        userId: event.app_user_id,
        productId: event.product_id,
        expirationDate: new Date(event.expiration_at_ms).toISOString(),
        purchaseDate: new Date(event.purchased_at_ms).toISOString(),
      };

      switch (event.type) {
        case "INITIAL_PURCHASE":
        case "RENEWAL":
        case "UNCANCELLATION":
          await ctx.runMutation(internal.users.updateSubscription, {
            ...commonData,
            forceExpired: false, // Allow access until expiration
          });
          break;

        case "CANCELLATION":
          await ctx.runMutation(internal.users.updateSubscription, {
            ...commonData,
            forceExpired: false, // Still allow access until expiration
          });
          break;

        case "EXPIRATION":
        case "BILLING_ISSUE":
          await ctx.runMutation(internal.users.updateSubscription, {
            ...commonData,
            forceExpired: true, // Immediately revoke access
          });
          break;

        default:
          console.log(`Unhandled RevenueCat event: ${event.type}`);
          break;
      }

    } catch (err) {
      console.error("Webhook error:", err);
      return new Response("Webhook Error", { status: 400 });
    }

    return new Response("OK", { status: 200 });
  }),
});



// http.route({
//   path: "/revenuecat-subscription",
//   method: "POST",
//   handler: httpAction(async (ctx, request) => {
//     const secret = process.env.EXPO_PUBLIC_REVENUECAT_WEBHOOK_SECRET!;
//     const authHeader = request.headers.get("authorization");

//     if (!authHeader || authHeader !== `Bearer ${secret}`) {
//       console.error("Unauthorized RevenueCat webhook");
//       return new Response("Unauthorized", { status: 401 });
//     }
//     try {
//       const payload = await request.json();
//       console.log(payload.event.type)
//       switch (payload.event.type) {
//         case "INITIAL_PURCHASE":
//           if (payload.event.app_user_id.startsWith("$RCAnonymousID")) {
//             console.log("Skipping anonymous purchase, waiting for alias...");
//             return new Response("OK", { status: 200 });
//           }
//           await ctx.runMutation(internal.users.updateSubscription, {
//             userId: payload.event.app_user_id,
//             productId: payload.event.product_id,
//             expirationDate: new Date(payload.event.expiration_at_ms).toISOString(),
//             purchaseDate: new Date(payload.event.purchased_at_ms).toISOString(),
//           })
//           break;
//       }
//     } catch (err) {
//       console.log(err)
//       return new Response("Webhook Error", {
//         status: 400,
//       })
//     }
//     return new Response("OK", { status: 200 });
//   }),
// })

export default http
