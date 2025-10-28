import { v } from "convex/values";
import { mutation } from "../_generated/server";

type UpdateTrainerInfoArgs = {
  trainerId: string;
  specialization?: string;
  hourlyRate?: number;
  salary?: number;
  rating?: number;
  totalClients?: number;
};



export const updateTrainerInfo = mutation({
  args: {
    trainerId: v.id("trainers"),
    specialization: v.optional(v.string()),
    hourlyRate: v.optional(v.number()),
    salary: v.optional(v.number()),
    rating: v.optional(v.number()),
    totalClients: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    const trainer = await ctx.db.get(args.trainerId);
    if (!trainer) throw new Error("Trainer not found");

    const updatedData: Partial<Omit<UpdateTrainerInfoArgs, "trainerId">> = {};

    if (args.specialization !== undefined)
      updatedData.specialization = args.specialization;
    if (args.salary !== undefined) updatedData.salary = args.salary;
    if (args.hourlyRate !== undefined) updatedData.hourlyRate = args.hourlyRate;
    if (args.rating !== undefined) updatedData.rating = args.rating;
    if (args.totalClients !== undefined)
      updatedData.totalClients = args.totalClients;

    await ctx.db.patch(args.trainerId, updatedData);

    return { success: true, message: "Trainer info updated successfully" };
  },
});
