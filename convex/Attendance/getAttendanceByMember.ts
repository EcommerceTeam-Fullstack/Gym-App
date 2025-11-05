import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAttendanceByMember = query({
  args: { memberId: v.id("users") },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("attendance")
      .withIndex("by_memberId", (q) => q.eq("memberId", args.memberId))
      .collect();

    records.sort((a, b) => (a.date < b.date ? 1 : -1));

    return {
      success: true,
      count: records.length,
      data: records,
    };
  },
});
