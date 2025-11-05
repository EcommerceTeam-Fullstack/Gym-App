import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateClass = mutation({
  args: {
    id: v.id("classes"),
    name: v.optional(v.string()),
    capacity: v.optional(v.number()),
    schedule: v.optional(v.string()),
    duration: v.optional(v.number()),
    price: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
  },
});
