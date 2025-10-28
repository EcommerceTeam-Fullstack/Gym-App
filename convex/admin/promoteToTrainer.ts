import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const promoteToTrainer = mutation({
  args: { userId: v.id("users") },

  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    if (user.role === "trainer") {
      throw new Error("User is already a trainer");
    }

    const existingTrainer = await ctx.db
      .query("trainers")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (existingTrainer) {
      throw new Error("Trainer record already exists");
    }

    await ctx.db.patch(args.userId, { role: "trainer" });

    await ctx.db.insert("trainers", {
      userId: args.userId,
      specialization: "",
      hourlyRate: 0,
      salary: 0,
      availableSlots: {},
      rating: 0,
      totalClients: 0,
      createdAt: new Date().toISOString(),
    });

    return { success: true, message: "User promoted to trainer successfully" };
  },
});
