import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const recordCheckOut = mutation({
  args: {
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const date = new Date().toISOString().split("T")[0];
    const timeOut = new Date().toISOString();

    const attendance = await ctx.db
      .query("attendance")
      .filter((q) => q.eq(q.field("memberId"), args.memberId))
      .filter((q) => q.eq(q.field("date"), date))
      .first();

    if (!attendance) throw new Error("No check-in found for today.");

    await ctx.db.patch(attendance._id, { timeOut });
    return { message: "Check-out recorded successfully." };
  },
});
