import { v } from "convex/values";
import { query } from "../_generated/server";

export const getClassAttendance = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, args) => {
    const records = await ctx.db
      .query("attendance")
      .filter((q) => q.eq(q.field("classId"), args.classId))
      .collect();

    return {
      success: true,
      count: records.length,
      data: records,
    };
  },
});
