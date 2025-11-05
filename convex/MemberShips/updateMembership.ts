import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateMembership = mutation({
  args: {
    id: v.id("memberships"),
    name: v.optional(v.string()),
    durationInDays: v.optional(v.number()),
    price: v.optional(v.number()),
    accessLevel: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return { success: false, message: "Membership not found" };

    if (args.name !== undefined && !args.name.trim())
      throw new Error("Membership name cannot be empty");
    if (args.price !== undefined && args.price < 0)
      throw new Error("Price cannot be negative");
    if (args.durationInDays !== undefined && args.durationInDays <= 0)
      throw new Error("Duration must be greater than zero");

    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: new Date().toISOString() });
    return { success: true, message: "Membership updated successfully" };
  },
});
