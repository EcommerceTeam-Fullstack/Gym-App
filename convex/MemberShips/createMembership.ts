import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createMembership = mutation({
  args: {
    name: v.string(),
    durationInDays: v.number(),
    price: v.number(),
    accessLevel: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.name.trim()) throw new Error("Membership name cannot be empty");
    if (args.price < 0) throw new Error("Price cannot be negative");
    if (args.durationInDays <= 0)
      throw new Error("Duration must be greater than zero");

    const id = await ctx.db.insert("memberships", {
      ...args,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true, message: "Membership created", data: { id } };
  },
});
