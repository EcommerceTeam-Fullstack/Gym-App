import { v } from "convex/values";
import { query } from "../_generated/server";

export const getUserNotifications = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("notifications")
      .withIndex("by_userId", q => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});
