import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create resource
export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    url: v.string(),
    type: v.union(
      v.literal("video"),
      v.literal("article"),
      v.literal("course"),
      v.literal("project"),
      v.literal("book"),
      v.literal("interactive")
    ),
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    estimatedMinutes: v.number(),
    topics: v.array(v.string()),
    qualityScore: v.number(),
    thumbnailUrl: v.optional(v.string()),
    author: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const resourceId = await ctx.db.insert("resources", args);
    return resourceId;
  },
});

// Get resources by topic
export const getByTopic = query({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const allResources = await ctx.db.query("resources").collect();
    return allResources.filter((r) => r.topics.includes(args.topic));
  },
});

// Get recommended resources
export const getRecommended = query({
  args: {
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    type: v.optional(v.union(
      v.literal("video"),
      v.literal("article"),
      v.literal("course"),
      v.literal("project"),
      v.literal("book"),
      v.literal("interactive")
    )),
  },
  handler: async (ctx, args) => {
    let resources = await ctx.db
      .query("resources")
      .withIndex("by_difficulty", (q) => q.eq("difficulty", args.difficulty))
      .collect();

    if (args.type) {
      resources = resources.filter((r) => r.type === args.type);
    }

    return resources.sort((a, b) => b.qualityScore - a.qualityScore).slice(0, 10);
  },
});

// Assign resource to milestone
export const assignToMilestone = mutation({
  args: {
    milestoneId: v.id("milestones"),
    resourceId: v.id("resources"),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("milestoneResources", {
      milestoneId: args.milestoneId,
      resourceId: args.resourceId,
      order: args.order,
      isCompleted: false,
    });
  },
});
