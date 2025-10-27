import { v } from "convex/values";
import { mutation } from "../_generated/server";


export const CreateInventory = mutation({
  args: {
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
  },

  handler: async (ctx, args) => {
    const now = Date.now();
    const inventoryId = await ctx.db.insert("Inventory", {
      name: args.name,
      category: args.category,
      stock: args.stock,
      price: args.price,
      description: args.description,
      images: args.images,
      available: args.available,
      createdAt: now,
      updatedAt: now,
    });
    const newItem = await ctx.db.get(inventoryId);
    return newItem;
  },
});
