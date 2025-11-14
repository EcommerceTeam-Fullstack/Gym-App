import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const recordCheckIn = mutation({
  args: {
    memberId: v.id("users"),
    classId: v.optional(v.id("classes")),
  },

  handler: async (ctx, args) => {
    const date = new Date().toISOString().split("T")[0];
    const timeIn = new Date().toISOString();

    const existing = await ctx.db
      .query("attendance")
      .filter((q) => q.eq(q.field("memberId"), args.memberId))
      .filter((q) => q.eq(q.field("date"), date))
      .first();

    if (existing) {
      throw new Error("Member already checked in today.");
    }

    const user = await ctx.db.get(args.memberId);

    await ctx.db.insert("attendance", {
      memberId: args.memberId,
      classId: args.classId,
      memberName: user?.name ?? "Unknown",
      date,
      timeIn,
    });

    return { success: true, message: "Check-in recorded successfully." };
  },
});
