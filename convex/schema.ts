import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    role: v.string(),
    phone: v.string(),
    gender: v.string(),
    dateOfBirth: v.string(),
    membershipId: v.optional(v.id("memberships")),
    createdAt: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_role", ["role"]),
  // TRAINERS //
  trainers: defineTable({
    userId: v.id("users"),
    specialization: v.optional(v.string()),
    salary: v.optional(v.number()),
    hourlyRate: v.optional(v.number()),

    availableSlots: v.optional(
      v.record(
        v.string(),
        v.array(
          v.object({
            from: v.string(),
            to: v.string(),
            isBooked: v.boolean(),
          })
        )
      )
    ),

    rating: v.optional(v.number()),
    totalClients: v.optional(v.number()),

    createdAt: v.string(),
  }).index("by_userId", ["userId"]),
  // INVENTORY //
  Inventory: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("Supplements"),
      v.literal("Sportswear"),
      v.literal("Sports Equipment")
    ),
    stock: v.number(),
    price: v.number(),
    description: v.optional(v.string()),
    images: v.array(v.string()),
    available: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_availability", ["available"])
    .index("by_price", ["price"]),
 
// WorkOutPlan//
//  جدول أنظمة التدريب (Workout Splits)
workoutSplits: defineTable({
  name: v.string(), 
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

//  جدول تصنيفات التمارين (Chest, Back, Legs, etc.)
exerciseCategories: defineTable({
  name: v.string(), 
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

//  جدول التمارين الأساسية
exercises: defineTable({
  name: v.string(), 
  description: v.optional(v.string()), 
  categoryId: v.id("exerciseCategories"), 
  splitType: v.union(
    v.literal("Push"),
    v.literal("Pull"),
    v.literal("Legs"),
    v.literal("Full Body"),
    v.literal("Arnold Split"),
    v.literal("Bro Split")
  ), // نوع النظام التدريبي اللي التمرين بينتمي له
  imageUrl: v.optional(v.string()), 
  videoUrl: v.optional(v.string()),
  equipment: v.optional(v.string()), 
  difficulty: v.optional(v.string()), 
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

// 🏋️‍♂️ جدول الخطط التدريبية
workoutPlans: defineTable({
  memberId: v.id("users"),
  trainerId: v.id("users"),
  name: v.string(), 
  description: v.optional(v.string()), 
  goal: v.optional(v.string()), 
  durationWeeks: v.optional(v.number()), 
  splitId: v.id("workoutSplits"), 
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

// 💪 جدول التمارين داخل كل خطة تدريب
workoutExercises: defineTable({
  planId: v.id("workoutPlans"), 
  exerciseId: v.id("exercises"),
  sets: v.number(), 
  reps: v.number(), 
  restTime: v.number(), 
  day: v.string(), 
  splitType: v.optional(v.string()), 
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),


})

  classBookings: defineTable({
    classId: v.id("classes"),
    memberId: v.id("users"),
    bookingDate: v.number(),
    status: v.union(v.literal("confirmed"), v.literal("canceled")),
    attended: v.optional(v.boolean()),
  })
    .index("by_member", ["memberId"])
    .index("by_class", ["classId"]),
  
  classes: defineTable({
    name: v.string(),
    trainerId: v.id("users"),
    capacity: v.number(),
    schedule: v.string(),
    duration: v.number(),
    price: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_trainer", ["trainerId"])
    .index("by_name", ["name"]),
  // NUTRATION PALN //
  NutritionPlan: defineTable({
    memberId: v.id("members"),
    trainerId: v.id("trainers"),
    title: v.optional(v.string()),
    meals: v.array(
      v.object({
        name: v.string(),
        time: v.string(),
        quantity: v.string(),
        calories: v.string(),
      })
    ),
    totalCalories: v.number(),
    macros: v.object({
      protein: v.number(),
      carbs: v.number(),
      fat: v.number(),
    }),
    durationDays: v.optional(v.number()),
    notes: v.optional(v.string()),
    isActive: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
  })
    .index("by_member", ["memberId"])
    .index("by_trainer", ["trainerId"])
    .index("by_member_trainer", ["memberId", "trainerId"]),
});
