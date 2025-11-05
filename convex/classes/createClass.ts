import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createClass = mutation({
  args: {
    name: v.string(),
    trainerId: v.id("users"),
    capacity: v.number(),
    schedule: v.string(),
    duration: v.number(),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const createdAt = Date.now();
    await ctx.db.insert("classes", { ...args, createdAt });
  },
});
