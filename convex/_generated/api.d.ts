/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as achievements from "../achievements.js";
import type * as categories from "../categories.js";
import type * as clerk from "../clerk.js";
import type * as http from "../http.js";
import type * as leaderboard from "../leaderboard.js";
import type * as presetChallenges from "../presetChallenges.js";
import type * as userChallenges from "../userChallenges.js";
import type * as users from "../users.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  achievements: typeof achievements;
  categories: typeof categories;
  clerk: typeof clerk;
  http: typeof http;
  leaderboard: typeof leaderboard;
  presetChallenges: typeof presetChallenges;
  userChallenges: typeof userChallenges;
  users: typeof users;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
