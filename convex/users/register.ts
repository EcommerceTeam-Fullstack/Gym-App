import { v } from "convex/values";
import { mutation } from "../_generated/server";
import bcrypt from "bcryptjs";

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),

    phone: v.optional(v.string()),
    gender: v.optional(v.string()),
    dateOfBirth: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existingUser) {
      throw new Error("Email already registered");
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(args.password, 10);

    const newUserId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: hashedPassword,
      role: "member",
      phone: args.phone ?? "",
      gender: args.gender ?? "",
      dateOfBirth: args.dateOfBirth ?? "",
      createdAt: new Date().toISOString(),
    });

    // return data without password

    return {
      _id: newUserId,
      name: args.name,
      email: args.email,
      role: "member",
    };
  },
});
