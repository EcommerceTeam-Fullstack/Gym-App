import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createBooking = mutation({
  args: {
    classId: v.id("classes"),
    memberId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const bookingDate = Date.now();

    const classData = await ctx.db.get(args.classId);
    if (!classData) throw new Error("Class not found");

    const existingBookings = await ctx.db
      .query("classBookings")
      .withIndex("by_member", (q) => q.eq("memberId", args.memberId))
      .collect();

    const alreadyBooked = existingBookings.find(
      (b) => b.classId === args.classId && b.status === "confirmed"
    );
    if (alreadyBooked) throw new Error("Member already booked this class.");

    const classBookings = await ctx.db
      .query("classBookings")
      .withIndex("by_class", (q) => q.eq("classId", args.classId))
      .collect();

    const confirmedCount = classBookings.filter(
      (b) => b.status === "confirmed"
    ).length;

    if (confirmedCount >= classData.capacity) {
      throw new Error("Class is full. No seats available.");
    }

    await ctx.db.insert("classBookings", {
      ...args,
      bookingDate,
      status: "confirmed",
      attended: false,
    });
  },
});
