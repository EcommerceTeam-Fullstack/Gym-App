import { v } from "convex/values";
import { mutation } from "../_generated/server";
import bcrypt from "bcryptjs";

export const changePassword = mutation({
  args: {
    userId: v.id("users"),
    oldPassword: v.string(),
    newPassword: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(args.oldPassword, user.password);
    if (!match) throw new Error("Incorrect old password");

    const hashedNewPassword = await bcrypt.hash(args.newPassword, 10);
    await ctx.db.patch(args.userId, { password: hashedNewPassword });
    return "Password updated successfully";
  },
});
