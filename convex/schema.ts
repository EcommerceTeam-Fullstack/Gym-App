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
});
