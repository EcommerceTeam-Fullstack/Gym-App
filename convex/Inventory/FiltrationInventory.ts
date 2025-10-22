import { v } from "convex/values";
import { query } from "../_generated/server";

export const FilterInventory = query({
  args: {
    category: v.optional(
      v.union(
        v.literal("Supplements"),
        v.literal("Sportswear"),
        v.literal("Sports Equipment")
      )
    ),
    minPrice: v.optional(v.number()),
    maxPrice: v.optional(v.number()),
  },

  handler: async (ctx, args) => {
    let products = ctx.db.query("Inventory");

if(args.category){
    products=products.filter((q)=>q.eq(q.field("category"),args.category))
}

if(args.maxPrice !==undefined){
  products=products.filter((q)=>q.eq(q.field("price"),args.maxPrice))
}
if(args.minPrice !==undefined){
    products=products.filter((q)=>q.eq(q.field("price"),args.minPrice))
}

   const result = await products.collect()
   return result
  },
})
