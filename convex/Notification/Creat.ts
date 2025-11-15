import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createNotification = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    message: v.string(),
    type: v.union(
      v.literal("subscription"),
      v.literal("booking"),
      v.literal("payment"),
      v.literal("system")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", {
      userId: args.userId,
      title: args.title,
      message: args.message,
      type: args.type,
      isRead: false,
      createdAt: Date.now(),
    });
  },
});
