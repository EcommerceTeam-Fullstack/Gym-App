import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const updateWorkoutExercise = mutation({
  args: v.object({
    exerciseId: v.id("workoutExercises"),
    sets: v.optional(v.number()),
    reps: v.optional(v.number()),
    restTime: v.optional(v.number()),
    day: v.optional(v.string()),
    splitType: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    const ex = await ctx.db.get(args.exerciseId);
    if (!ex) throw new Error("Exercise not found");

    await ctx.db.patch(args.exerciseId, {
      sets: args.sets ?? ex.sets,
      reps: args.reps ?? ex.reps,
      restTime: args.restTime ?? ex.restTime,
      day: args.day ?? ex.day,
      splitType: args.splitType ?? ex.splitType,
      updatedAt: Date.now(),
    });

    return { success: true, message: "Exercise updated successfully" };
  }
})
