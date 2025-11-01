import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const deleteWorkoutExercise = mutation({
  args: v.object({ exerciseId: v.id("workoutExercises") }),
  handler: async (ctx, { exerciseId }) => {
    const exercise = await ctx.db.get(exerciseId);
    if (!exercise) {
      throw new Error("Workout exercise not found");
    }

    await ctx.db.delete(exerciseId);

    return { success: true, message: "Workout exercise deleted successfully" };
  }
});
