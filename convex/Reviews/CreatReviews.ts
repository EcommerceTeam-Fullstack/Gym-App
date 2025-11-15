
import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createReview = mutation({
  args: {
    memberId: v.string(),
    targetType: v.union(
      v.literal("trainer"),
      v.literal("class")
    ),
    targetId: v.string(),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    return await ctx.db.insert("reviews", {
      memberId: args.memberId,
      targetType: args.targetType,
      targetId: args.targetId,
      rating: args.rating,
      comment: args.comment,
      createdAt: Date.now(),
    });
  },
});
