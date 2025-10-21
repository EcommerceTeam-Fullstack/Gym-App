import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    password: v.optional(v.string()),
    role: v.optional(v.string()),
    phone: v.optional(v.string()),
    gender: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
    membershipId: v.optional(v.id("memberships")),
  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    await ctx.db.patch(id, updates);
    return "User updated successfully!";
  },
});
