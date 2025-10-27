import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteInventory = mutation({
    args:{id:v.id("Inventory")},
    handler:async(ctx , args)=>{
       await ctx.db.delete(args.id)
    }
})