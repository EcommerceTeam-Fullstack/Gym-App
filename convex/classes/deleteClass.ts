import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteClass = mutation({
  args: { id: v.id("classes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
