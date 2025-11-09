import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateEquipment = mutation({
  args: {
    id: v.id("equipments"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    purchaseDate: v.optional(v.string()),
    lastMaintenanceDate: v.optional(v.string()),
    status: v.optional(v.string()),
    supplier: v.optional(v.string()),
    warrantyEndDate: v.optional(v.string()),
    notes: v.optional(v.string()),
    nextMaintenanceDate: v.optional(v.string()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Equipment not found");

    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return { success: true, message: "Equipment updated successfully" };
  },
});

