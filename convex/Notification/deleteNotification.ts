// convex/notifications.ts
import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteNotification = mutation({
  args: {
    id: v.id("notifications"),
  },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Notification not found");
    }

    await ctx.db.delete(id);

    return { success: true, message: "Notification deleted successfully" };
  },
});
