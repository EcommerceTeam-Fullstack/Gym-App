import { v } from "convex/values";
import { query } from "../_generated/server";




export const getBookingsByMember = query({
  args: { memberId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("classBookings")
      .withIndex("by_member", (q) => q.eq("memberId", args.memberId))
      .collect();
  },
});