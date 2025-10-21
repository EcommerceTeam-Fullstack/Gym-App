import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAllUsers = query({
  args: {
    role: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    if (typeof args.role === "string") {
      const users = await ctx.db
        .query("users")
        .withIndex("by_role", (q) => q.eq("role", args.role!))
        .collect();

      return users.map((u) => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone,
        gender: u.gender,
        dateOfBirth: u.dateOfBirth,
        membershipId: u.membershipId,
        createdAt: u.createdAt,
      }));
    }

    const users = await ctx.db.query("users").collect();

    return users.map((u) => ({
      _id: u._id,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone,
      gender: u.gender,
      dateOfBirth: u.dateOfBirth,
      membershipId: u.membershipId,
      createdAt: u.createdAt,
    }));
  },
});
