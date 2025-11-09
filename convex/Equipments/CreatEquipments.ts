// convex/equipments.ts
import { v } from "convex/values";
import { mutation, query } from "../_generated/server";


// ✅ 1. إنشاء جهاز جديد
export const addEquipment = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    purchaseDate: v.string(),
    lastMaintenanceDate: v.optional(v.string()),
    status: v.string(),
    supplier: v.optional(v.string()),
    warrantyEndDate: v.optional(v.string()),
    notes: v.optional(v.string()),
    nextMaintenanceDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("equipments", {
      ...args,
      active: true,
      createdAt: Date.now(),
    });
  },
});



