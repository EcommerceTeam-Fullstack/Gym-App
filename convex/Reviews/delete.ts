import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteReview = mutation({
  args: { id: v.id("reviews") },
  handler: async (ctx, { id }) => {
    const review = await ctx.db.get(id);
    if (!review) throw new Error("Review not found");

    await ctx.db.delete(id);
    return { success: true };
  },
});
