import { v } from "convex/values";
import { query } from "../_generated/server";

export const getMyProfile = query({
  args: { trainerId: v.id("trainers") },

  handler: async (ctx, args) => {
    const trainer = await ctx.db.get(args.trainerId);
    if (!trainer) throw new Error("Trainer not found");

    const user = await ctx.db.get(trainer.userId);
    if (!user) throw new Error("User not found");

    return {
      trainerId: args.trainerId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      specialization: trainer.specialization,
      hourlyRate: trainer.hourlyRate,
      salary: trainer.salary,
      rating: trainer.rating,
      totalClients: trainer.totalClients,
      availableSlots: trainer.availableSlots,
      createdAt: trainer.createdAt,
    };
  },
});
