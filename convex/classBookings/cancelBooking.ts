import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const cancelBooking = mutation({
  args: { id: v.id("classBookings") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "canceled" });
  },
});
