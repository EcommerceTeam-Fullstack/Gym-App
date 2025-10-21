import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteUser = mutation({
  args: { id: v.id("users") },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return "User deleted";
  },
});
