import { v } from "convex/values";
import { mutation } from "../_generated/server";



export const updateBookingStatus = mutation({
  args: {
    id: v.id("classBookings"),
    status: v.union(v.literal("confirmed"), v.literal("canceled")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
