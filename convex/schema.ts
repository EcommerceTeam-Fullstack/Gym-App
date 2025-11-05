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
