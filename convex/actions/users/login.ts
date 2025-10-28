"use node";

import { v } from "convex/values";
import { action } from "../../_generated/server";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const login = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await (ctx as any).db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", args.email))
      .unique();

    if (!user) throw new Error("Invalid email or password");

    const passwordIsMatch = await bcrypt.compare(args.password, user.password);
    if (!passwordIsMatch) throw new Error("Invalid email or password");

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },
});
