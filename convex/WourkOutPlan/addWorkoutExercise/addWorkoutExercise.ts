import { v } from "convex/values";
import { mutation } from "../../_generated/server";

export const addWorkoutExercise = mutation({
args: v.object({
planId: v.id("workoutPlans"),
exerciseId: v.id("exercises"),
sets: v.number(),
reps: v.number(),
restTime: v.number(),
day: v.string(),
splitType: v.optional(v.string()),
}),
handler: async (ctx, args) => {
return await ctx.db.insert("workoutExercises", {...args,createdAt: Date.now(),updatedAt: undefined,});
}
});