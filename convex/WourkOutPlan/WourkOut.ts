import { v } from "convex/values";
import { query } from "../_generated/server";

export const FilterWorkoutPlans = query({
  args: {
    splitType: v.optional(
      v.union(
        v.literal("Push"),
        v.literal("Pull"),
        v.literal("Legs"),
        v.literal("Full Body"),
        v.literal("Arnold Split"),
        v.literal("Bro Split")
      )
    ),
    trainerId: v.optional(v.string()),
    memberId: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    let plans = await ctx.db.query("workoutPlans").collect();

    if (args.splitType) {
      const filteredPlans: typeof plans = [];

      for (const plan of plans) {
        const exercises = await ctx.db.query("workoutExercises")
          .filter(q => q.eq(q.field("planId"), plan._id))
          .collect();

        if (exercises.some(e => e.splitType === args.splitType)) {
          filteredPlans.push(plan);
        }
      }

      plans = filteredPlans;
    }

    if (args.trainerId) {
      plans = plans.filter(plan => plan.trainerId === args.trainerId);
    }

    if (args.memberId) {
      plans = plans.filter(plan => plan.memberId === args.memberId);
    }

    return plans;
  }
})
