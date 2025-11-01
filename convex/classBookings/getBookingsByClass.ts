import { v } from "convex/values";
import { query } from "../_generated/server";


export const getBookingsByClass = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("classBookings")
      .withIndex("by_class", (q) => q.eq("classId", args.classId))
      .collect();
  },
});