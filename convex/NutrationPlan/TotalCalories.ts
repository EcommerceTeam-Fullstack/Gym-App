import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { totalCalories } from "./FunctionTotalCalories";

export const CalcTotalCalories = mutation({
  args: {
    meals: v.array(v.object({
      name: v.string(),
      time: v.string(),
      quantity: v.string(),
      calories: v.string(),
    })),
  },

  handler: async (_ctx, args) => {
    const total = totalCalories(args.meals);

    return { totalCalories: total };
  },
})
