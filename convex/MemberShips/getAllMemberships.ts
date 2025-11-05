import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAllMemberships = query({
  args: {
    accessLevel: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("memberships");
    if (args.accessLevel) {
      q = q.filter((f) => f.eq(f.field("accessLevel"), args.accessLevel));
    }
    const memberships = await q.collect();
    return { success: true, count: memberships.length, data: memberships };
  },
});
