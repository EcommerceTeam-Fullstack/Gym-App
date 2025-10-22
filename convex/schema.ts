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
});


