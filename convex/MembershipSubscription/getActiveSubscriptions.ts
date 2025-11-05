import { query } from "../_generated/server";

export const getActiveSubscriptions = query({
  args: {},
  handler: async (ctx) => {
    const subscriptions = await ctx.db
      .query("memberSubscriptions")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();

    return { success: true, count: subscriptions.length, data: subscriptions };
  },
});
