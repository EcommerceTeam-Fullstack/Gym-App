import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const markAttendance = mutation({
  args: { id: v.id("classBookings"), attended: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { attended: args.attended });
  },
});
