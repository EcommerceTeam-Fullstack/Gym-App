import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteTrainer = mutation({
  args: { trainerId: v.id("trainers") },
  handler: async (ctx, args) => {
    const trainer = await ctx.db.get(args.trainerId);
    if (!trainer) throw new Error("Trainer not found");

    await ctx.db.delete(args.trainerId);

    return { success: true, message: "Trainer deleted successfully" };
  },
});
