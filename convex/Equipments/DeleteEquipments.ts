import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteEquipment = mutation({
  args: { id: v.id("equipments") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Equipment not found");

    await ctx.db.delete(args.id);
    return { success: true, message: "Equipment deleted successfully" };
  },
});
