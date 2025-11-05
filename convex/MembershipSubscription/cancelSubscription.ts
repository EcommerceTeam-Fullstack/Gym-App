import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const cancelSubscription = mutation({
  args: { id: v.id("memberSubscriptions") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return { success: false, message: "Subscription not found" };

    await ctx.db.patch(args.id, {
      status: "expired",
      endDate: new Date().toISOString(),
    });

    return { success: true, message: "Subscription canceled" };
  },
});
