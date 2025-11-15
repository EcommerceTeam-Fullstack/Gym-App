import { v } from "convex/values";
import { query } from "../_generated/server";

export const getReviewsForTarget = query({
  args: {
    targetType: v.union(
      v.literal("trainer"),
      v.literal("class")
    ),
    targetId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_target", q =>
        q.eq("targetType", args.targetType).eq("targetId", args.targetId)
      )
      .order("desc")
      .collect();
  },
});
