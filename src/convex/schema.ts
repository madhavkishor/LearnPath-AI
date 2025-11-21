import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

// Learning styles
export const LEARNING_STYLES = {
  VISUAL: "visual",
  AUDITORY: "auditory",
  KINESTHETIC: "kinesthetic",
  READING: "reading",
} as const;

export const learningStyleValidator = v.union(
  v.literal(LEARNING_STYLES.VISUAL),
  v.literal(LEARNING_STYLES.AUDITORY),
  v.literal(LEARNING_STYLES.KINESTHETIC),
  v.literal(LEARNING_STYLES.READING),
);

// Resource types
export const RESOURCE_TYPES = {
  VIDEO: "video",
  ARTICLE: "article",
  COURSE: "course",
  PROJECT: "project",
  BOOK: "book",
  INTERACTIVE: "interactive",
} as const;

export const resourceTypeValidator = v.union(
  v.literal(RESOURCE_TYPES.VIDEO),
  v.literal(RESOURCE_TYPES.ARTICLE),
  v.literal(RESOURCE_TYPES.COURSE),
  v.literal(RESOURCE_TYPES.PROJECT),
  v.literal(RESOURCE_TYPES.BOOK),
  v.literal(RESOURCE_TYPES.INTERACTIVE),
);

// Difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: "beginner",
  INTERMEDIATE: "intermediate",
  ADVANCED: "advanced",
} as const;

export const difficultyValidator = v.union(
  v.literal(DIFFICULTY_LEVELS.BEGINNER),
  v.literal(DIFFICULTY_LEVELS.INTERMEDIATE),
  v.literal(DIFFICULTY_LEVELS.ADVANCED),
);

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
      
      // Learning profile
      learningStyle: v.optional(learningStyleValidator),
      weeklyHours: v.optional(v.number()),
      preferredFormats: v.optional(v.array(resourceTypeValidator)),
      onboardingCompleted: v.optional(v.boolean()),
    }).index("email", ["email"]),

    // Learning paths created by users
    learningPaths: defineTable({
      userId: v.id("users"),
      title: v.string(),
      goal: v.string(),
      description: v.string(),
      difficulty: difficultyValidator,
      estimatedWeeks: v.number(),
      isActive: v.boolean(),
      completionPercentage: v.number(),
      startDate: v.optional(v.number()),
      targetEndDate: v.optional(v.number()),
    })
      .index("by_user", ["userId"])
      .index("by_user_and_active", ["userId", "isActive"]),

    // Milestones within a learning path
    milestones: defineTable({
      pathId: v.id("learningPaths"),
      title: v.string(),
      description: v.string(),
      order: v.number(),
      estimatedHours: v.number(),
      isCompleted: v.boolean(),
      completedAt: v.optional(v.number()),
    })
      .index("by_path", ["pathId"])
      .index("by_path_and_order", ["pathId", "order"]),

    // Learning resources
    resources: defineTable({
      title: v.string(),
      description: v.string(),
      url: v.string(),
      type: resourceTypeValidator,
      difficulty: difficultyValidator,
      estimatedMinutes: v.number(),
      topics: v.array(v.string()),
      qualityScore: v.number(),
      thumbnailUrl: v.optional(v.string()),
      author: v.optional(v.string()),
    })
      .index("by_type", ["type"])
      .index("by_difficulty", ["difficulty"]),

    // Resources assigned to milestones
    milestoneResources: defineTable({
      milestoneId: v.id("milestones"),
      resourceId: v.id("resources"),
      order: v.number(),
      isCompleted: v.boolean(),
      completedAt: v.optional(v.number()),
    })
      .index("by_milestone", ["milestoneId"])
      .index("by_milestone_and_order", ["milestoneId", "order"]),

    // User progress tracking
    progressLogs: defineTable({
      userId: v.id("users"),
      pathId: v.id("learningPaths"),
      milestoneId: v.optional(v.id("milestones")),
      resourceId: v.optional(v.id("resources")),
      hoursSpent: v.number(),
      notes: v.optional(v.string()),
      confidenceLevel: v.optional(v.number()), // 1-5
    })
      .index("by_user", ["userId"])
      .index("by_path", ["pathId"])
      .index("by_user_and_path", ["userId", "pathId"]),

    // Assessments for knowledge checking
    assessments: defineTable({
      pathId: v.id("learningPaths"),
      milestoneId: v.optional(v.id("milestones")),
      title: v.string(),
      questions: v.array(v.object({
        question: v.string(),
        options: v.array(v.string()),
        correctAnswer: v.number(),
      })),
    })
      .index("by_path", ["pathId"])
      .index("by_milestone", ["milestoneId"]),

    // Assessment results
    assessmentResults: defineTable({
      userId: v.id("users"),
      assessmentId: v.id("assessments"),
      score: v.number(),
      totalQuestions: v.number(),
      answers: v.array(v.number()),
      completedAt: v.number(),
    })
      .index("by_user", ["userId"])
      .index("by_assessment", ["assessmentId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;