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
    createdAt: v.string()
  }).index("by_email",["email"])
  .index("by_role",["role"])

});
