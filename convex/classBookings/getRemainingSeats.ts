import { v } from "convex/values";
import { query } from "../_generated/server";

export const getRemainingSeats = query({
  args: { classId: v.id("classes") },
  handler: async (ctx, args) => {
    const classData = await ctx.db.get(args.classId);
    if (!classData) throw new Error("Class not found");

    const classBookings = await ctx.db
      .query("classBookings")
      .withIndex("by_class", (q) => q.eq("classId", args.classId))
      .collect();

    const confirmedCount = classBookings.filter(
      (b) => b.status === "confirmed"
    ).length;

    return {
      totalCapacity: classData.capacity,
      confirmedCount,
      remainingSeats: classData.capacity - confirmedCount,
    };
  },
});
