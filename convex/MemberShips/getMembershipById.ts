import { v } from "convex/values";
import { query } from "../_generated/server";

export const getMembershipById = query({
  args: { id: v.id("memberships") },
  handler: async (ctx, args) => {
    const membership = await ctx.db.get(args.id);
    if (!membership) return { success: false, message: "Membership not found" };
    return { success: true, data: membership };
  },
});
