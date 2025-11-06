import { v } from "convex/values";
import { query } from "../_generated/server";

export const FilterWorkoutPlans = query({
args: {
splitType: v.optional(
v.union(
v.literal("Push"),
v.literal("Pull"),
v.literal("Legs"),
v.literal("Full Body"),
v.literal("Arnold Split"),
v.literal("Bro Split")
)
),
trainerId: v.optional(v.string()),
memberId: v.optional(v.string()),
},

handler: async (ctx, args) => {
let plans = await ctx.db.query("workoutPlans").collect();


const allExercises = await ctx.db.query("workoutExercises").collect();  

if (args.splitType) {  
  plans = plans.filter(plan =>  
    allExercises.some(e => e.planId === plan._id && e.splitType === args.splitType)  
  );  
}  

if (args.trainerId) {  
  plans = plans.filter(plan => plan.trainerId === args.trainerId);  
}  

if (args.memberId) {  
  plans = plans.filter(plan => plan.memberId === args.memberId);  
}  

return plans


}
})
