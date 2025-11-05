import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateSubscriptionStatus = mutation({
  args: {
    id: v.id("memberSubscriptions"),
    status: v.union(
      v.literal("active"),
      v.literal("expired"),
      v.literal("canceled")
    ),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return { success: false, message: "Subscription not found" };

    await ctx.db.patch(args.id, { status: args.status });
    return { success: true, message: "Subscription status updated" };
  },
});
