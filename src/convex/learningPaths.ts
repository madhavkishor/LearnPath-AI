import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

// Create a new learning path
export const create = mutation({
  args: {
    title: v.string(),
    goal: v.string(),
    description: v.string(),
    difficulty: v.union(v.literal("beginner"), v.literal("intermediate"), v.literal("advanced")),
    estimatedWeeks: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const pathId = await ctx.db.insert("learningPaths", {
      userId: user._id,
      title: args.title,
      goal: args.goal,
      description: args.description,
      difficulty: args.difficulty,
      estimatedWeeks: args.estimatedWeeks,
      isActive: true,
      completionPercentage: 0,
      startDate: Date.now(),
      targetEndDate: Date.now() + (args.estimatedWeeks * 7 * 24 * 60 * 60 * 1000),
    });

    return pathId;
  },
});

// Get all learning paths for current user
export const getUserPaths = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const paths = await ctx.db
      .query("learningPaths")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    return paths;
  },
});

// Get active learning path
export const getActivePath = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    const path = await ctx.db
      .query("learningPaths")
      .withIndex("by_user_and_active", (q) => q.eq("userId", user._id).eq("isActive", true))
      .first();

    return path;
  },
});

// Get path by ID with milestones
export const getPathWithMilestones = query({
  args: { pathId: v.id("learningPaths") },
  handler: async (ctx, args) => {
    const path = await ctx.db.get(args.pathId);
    if (!path) return null;

    const milestones = await ctx.db
      .query("milestones")
      .withIndex("by_path", (q) => q.eq("pathId", args.pathId))
      .collect();

    return { ...path, milestones };
  },
});

// Update path progress
export const updateProgress = mutation({
  args: {
    pathId: v.id("learningPaths"),
    completionPercentage: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.pathId, {
      completionPercentage: args.completionPercentage,
    });
  },
});

// Toggle path active status
export const toggleActive = mutation({
  args: {
    pathId: v.id("learningPaths"),
  },
  handler: async (ctx, args) => {
    const path = await ctx.db.get(args.pathId);
    if (!path) throw new Error("Path not found");

    await ctx.db.patch(args.pathId, {
      isActive: !path.isActive,
    });
  },
});

// Delete a learning path
export const deletePath = mutation({
  args: {
    pathId: v.id("learningPaths"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");

    const path = await ctx.db.get(args.pathId);
    if (!path) throw new Error("Path not found");
    if (path.userId !== user._id) throw new Error("Unauthorized");

    // Delete all milestones associated with this path
    const milestones = await ctx.db
      .query("milestones")
      .withIndex("by_path", (q) => q.eq("pathId", args.pathId))
      .collect();

    for (const milestone of milestones) {
      // Delete milestone resources
      const milestoneResources = await ctx.db
        .query("milestoneResources")
        .withIndex("by_milestone", (q) => q.eq("milestoneId", milestone._id))
        .collect();
      
      for (const mr of milestoneResources) {
        await ctx.db.delete(mr._id);
      }
      
      await ctx.db.delete(milestone._id);
    }

    // Delete progress logs
    const progressLogs = await ctx.db
      .query("progressLogs")
      .withIndex("by_path", (q) => q.eq("pathId", args.pathId))
      .collect();

    for (const log of progressLogs) {
      await ctx.db.delete(log._id);
    }

    // Finally delete the path
    await ctx.db.delete(args.pathId);
  },
});