import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteMembership = mutation({
  args: { id: v.id("memberships") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) return { success: false, message: "Membership not found" };
    await ctx.db.delete(args.id);
    return { success: true, message: "Membership deleted successfully" };
  },
});
