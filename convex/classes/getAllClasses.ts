import { query } from "../_generated/server";

export const getAllClasses = query({
  handler: async (ctx, args) => {
    return await ctx.db.query("classes").collect();
  },
});
