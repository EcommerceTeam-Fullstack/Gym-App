import { v } from "convex/values";
import { mutation } from "../_generated/server";



export const updateAvailableSlots = mutation({
  args: {
    trainerId: v.id("trainers"),
    availableSlots: v.record(
      v.string(),
      v.array(
        v.object({
          from: v.string(),
          to: v.string(),
          isBooked: v.boolean(),
        })
      )
    ),
  },

  handler: async (ctx, args) => {
    const trainer = await ctx.db.get(args.trainerId);
    if (!trainer) throw new Error("Trainer not found");

    await ctx.db.patch(args.trainerId, { availableSlots: args.availableSlots });

    return { success: true, message: "Available slots updated successfully" };
  },
});
