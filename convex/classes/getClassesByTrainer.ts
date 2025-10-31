import { v } from "convex/values";
import {  query } from "../_generated/server";

export const getClassesByTrainer = query({
  args: {
    trainerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("classes")
      .withIndex("by_trainer", (q) => q.eq("trainerId", args.trainerId))
      .collect();
  },
});
