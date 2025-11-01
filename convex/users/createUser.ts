import { v } from "convex/values";
import { mutation } from "../_generated/server";
import bcrypt from "bcryptjs";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
    phone: v.string(),
    gender: v.string(),
    dateOfBirth: v.string(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const userId = await ctx.db.insert("users", {
      ...args,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    });

    return userId;
  },
});


