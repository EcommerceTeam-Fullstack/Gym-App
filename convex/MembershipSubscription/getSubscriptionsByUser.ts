import { v } from "convex/values";
import { query } from "../_generated/server";

export const getSubscriptionsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscriptions = await ctx.db
      .query("memberSubscriptions")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    return {
      success: true,
      count: subscriptions.length,
      data: subscriptions,
    };
  },
});
