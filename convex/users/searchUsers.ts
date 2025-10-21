import { v } from "convex/values";
import { query } from "../_generated/server";

export const searchUsers = query({
  args: { keyword: v.string() },

  handler: async (ctx, args) => {
    const keyword = args.keyword.toLowerCase();

    const users = await ctx.db.query("users").collect();

    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );

    return filtered.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  },
});
