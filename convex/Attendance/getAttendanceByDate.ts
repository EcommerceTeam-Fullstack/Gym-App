import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAttendanceByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("attendance")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();

    return {
      success: true,
      count: records.length,
      data: records,
    };
  },
});
