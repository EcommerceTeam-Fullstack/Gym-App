import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const UpdateInventory = mutation({
  args: {
    id: v.id("Inventory"),
    name: v.string(),
    category: v.union(
      v.literal("Supplements"),
      v.literal("Sportswear"),
      v.literal("Sports Equipment")
    ),
    stock: v.number(),
    price: v.number(),
    description: v.optional(v.string()),
    images: v.array(v.string()),
    available: v.boolean(),
    updatedAt: v.number()

  },

  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    updates.updatedAt = Date.now();
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Product not found");
    }

    await ctx.db.patch(id, updates);

    const updatedItem = await ctx.db.get(id);
    return updatedItem;
  },
})
