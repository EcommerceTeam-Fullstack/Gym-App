import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createSubscription = mutation({
  args: {
    userId: v.id("users"),
    membershipId: v.id("memberships"),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("expired"),
      v.literal("canceled")
    ),
  },
  handler: async (ctx, args) => {
    const startDate = new Date(args.startDate);
    const endDate = new Date(args.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error("Invalid startDate or endDate");
    }

    if (endDate <= startDate)
      throw new Error("endDate must be after startDate");

    const subscribtionId = await ctx.db.insert("memberSubscriptions", args);

    return {
      success: true,
      message: "Subscription created",
      data: { subscribtionId },
    };
  },
});
