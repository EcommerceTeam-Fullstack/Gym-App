

import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const UpdateNutrition = mutation({
  args: {
    planId: v.id("NutritionPlan"), 
    title: v.optional(v.string()),
    meals: v.optional(v.array(v.object({
      name: v.string(),
      time: v.string(),
      quantity: v.string(),
      calories: v.string(),
    }))),
    totalCalories: v.optional(v.number()),
    macros: v.optional(v.object({
      protein: v.number(),
      carbs: v.number(),
      fat: v.number(),
    })),
    durationDays: v.optional(v.number()),
    notes: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId);
    if (!plan) {
      throw new Error("Nutrition plan not found");
    }

    await ctx.db.patch(args.planId, {
      title: args.title ?? plan.title,
      meals: args.meals ?? plan.meals,
      totalCalories: args.totalCalories ?? plan.totalCalories,
      macros: args.macros ?? plan.macros,
      durationDays: args.durationDays ?? plan.durationDays,
      notes: args.notes ?? plan.notes,
      isActive: args.isActive ?? plan.isActive,
      updatedAt: new Date().toISOString(),
    });

    return { success: true, message: "Nutrition plan updated successfully" };
  },
});
