import { mutation } from "../_generated/server";




import { v } from "convex/values";

export const DeleteNutrition = mutation({
  args: {
    planId: v.id("NutritionPlan")
  },

  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId);
    if (!plan) {
      throw new Error("Nutrition plan not found");
    }

    await ctx.db.delete(args.planId);

    return { success: true, message: "Nutrition plan deleted successfully" };
  },
})
