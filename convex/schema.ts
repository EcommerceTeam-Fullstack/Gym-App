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
 // NUTRATION PALN // 
NutritionPlan: defineTable({
  memberId: v.id("members"),
  trainerId: v.id("trainers"),
  title: v.optional(v.string()),
  meals: v.array(v.object({
    name: v.string(),
    time: v.string(),
    quantity: v.string(),
    calories: v.string(),
  })),
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
// WorkOutPlan//
//  جدول أنظمة التدريب (Workout Splits)
workoutSplits: defineTable({
  name: v.string(), // Push Pull Legs, Bro Split, Arnold Split, Full Body ...
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

//  جدول تصنيفات التمارين (Chest, Back, Legs, etc.)
exerciseCategories: defineTable({
  name: v.string(), // Chest, Back, Shoulders, Arms, Legs ...
  description: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

//  جدول التمارين الأساسية
exercises: defineTable({
  name: v.string(), // اسم التمرين (Bench Press, Squat ...)
  description: v.optional(v.string()), // وصف أو شرح للتمرين
  categoryId: v.id("exerciseCategories"), // التصنيف العضلي (صدر - ظهر - رجل ...)
  splitType: v.union(
    v.literal("Push"),
    v.literal("Pull"),
    v.literal("Legs"),
    v.literal("Full Body"),
    v.literal("Arnold Split"),
    v.literal("Bro Split")
  ), // نوع النظام التدريبي اللي التمرين بينتمي له
  imageUrl: v.optional(v.string()), // صورة للتمرين
  videoUrl: v.optional(v.string()), // فيديو توضيحي
  equipment: v.optional(v.string()), // Dumbbell / Barbell / Machine / Bodyweight
  difficulty: v.optional(v.string()), // Beginner / Intermediate / Advanced
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

// 🏋️‍♂️ جدول الخطط التدريبية
workoutPlans: defineTable({
  memberId: v.id("users"), // العضو اللي الخطة تخصه
  trainerId: v.id("users"), // المدرب اللي أنشأ الخطة
  name: v.string(), // اسم الخطة (مثلاً "6 Weeks Push Pull Legs")
  description: v.optional(v.string()), // وصف مختصر
  goal: v.optional(v.string()), // الهدف (Bulking, Cutting, Strength...)
  durationWeeks: v.optional(v.number()), // المدة بالأسبوع
  splitId: v.id("workoutSplits"), // النظام التدريبي (PPL, Arnold Split, ...)
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),

// 💪 جدول التمارين داخل كل خطة تدريب
workoutExercises: defineTable({
  planId: v.id("workoutPlans"), // رقم الخطة
  exerciseId: v.id("exercises"), // رقم التمرين
  sets: v.number(), // عدد المجاميع
  reps: v.number(), // عدد العدّات
  restTime: v.number(), // وقت الراحة بالثواني
  day: v.string(), // اليوم (Monday / Day 1 / Upper ...)
  splitType: v.optional(v.string()), // نوع الـ Split داخل الخطة (Push / Pull / Legs ...)
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
}),
equipments: defineTable({
    active: v.boolean(), // هل الجهاز قيد الاستخدام أم تم تعطيله
    name: v.string(), // اسم الجهاز
    category: v.string(), // نوع الجهاز (كارديو - حديد - إلخ)
    purchaseDate: v.string(), // تاريخ الشراء (ISO format)
    lastMaintenanceDate: v.optional(v.string()), // آخر تاريخ صيانة
    status: v.string(), // يعمل – يحتاج صيانة – خارج الخدمة
    supplier: v.optional(v.string()), // اسم المورد (اختياري)
    warrantyEndDate: v.optional(v.string()), // نهاية الضمان (اختياري)
    notes: v.optional(v.string()), // ملاحظات إضافية (مثل ملاحظات الفني)
    nextMaintenanceDate: v.optional(v.string()), // لتحديد الصيانة القادمة
    createdAt: v.number(), // وقت الإنشاء (timestamp)
    updatedAt: v.optional(v.number()) // آخر تحديث
  })



})



