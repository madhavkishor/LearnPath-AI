import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create milestone
export const create = mutation({
  args: {
    pathId: v.id("learningPaths"),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    estimatedHours: v.number(),
  },
  handler: async (ctx, args) => {
    const milestoneId = await ctx.db.insert("milestones", {
      pathId: args.pathId,
      title: args.title,
      description: args.description,
      order: args.order,
      estimatedHours: args.estimatedHours,
      isCompleted: false,
    });

    return milestoneId;
  },
});

// Get milestones for a path
export const getByPath = query({
  args: { pathId: v.id("learningPaths") },
  handler: async (ctx, args) => {
    const milestones = await ctx.db
      .query("milestones")
      .withIndex("by_path", (q) => q.eq("pathId", args.pathId))
      .collect();

    return milestones.sort((a, b) => a.order - b.order);
  },
});

// Mark milestone as complete
export const markComplete = mutation({
  args: {
    milestoneId: v.id("milestones"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.milestoneId, {
      isCompleted: true,
      completedAt: Date.now(),
    });
  },
});

// Get milestone with resources
export const getWithResources = query({
  args: { milestoneId: v.id("milestones") },
  handler: async (ctx, args) => {
    const milestone = await ctx.db.get(args.milestoneId);
    if (!milestone) return null;

    const milestoneResources = await ctx.db
      .query("milestoneResources")
      .withIndex("by_milestone", (q) => q.eq("milestoneId", args.milestoneId))
      .collect();

    const resources = await Promise.all(
      milestoneResources.map(async (mr) => {
        const resource = await ctx.db.get(mr.resourceId);
        return { ...resource, ...mr };
      })
    );

    return { ...milestone, resources };
  },
});
