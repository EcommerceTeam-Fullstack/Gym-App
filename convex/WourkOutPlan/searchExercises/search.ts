import { v } from "convex/values";
import { query } from "../../_generated/server";

export const searchExercises = query({
  args: v.object({
    name: v.optional(v.string()),
    categoryId: v.optional(v.id("exerciseCategories")),
    splitType: v.optional(v.string()),
    equipment: v.optional(v.string()),
  }),
  handler: async (ctx, args) => {
    let exercises = await ctx.db.query("exercises").collect();

    if (args.name && args.name.trim() !== "") {
      const searchName = args.name.toLowerCase();
      exercises = exercises.filter(e => e.name.toLowerCase().includes(searchName));
    }

    if (args.categoryId) {
      exercises = exercises.filter(e => e.categoryId === args.categoryId);
    }

    if (args.splitType && args.splitType.trim() !== "") {
      exercises = exercises.filter(e => e.splitType === args.splitType);
    }

    if (args.equipment && args.equipment.trim() !== "") {
      exercises = exercises.filter(e => e.equipment === args.equipment);
    }

    return exercises;
  }
});
