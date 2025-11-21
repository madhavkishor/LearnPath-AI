import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

// Log progress
export const logProgress = mutation({
  args: {
    pathId: v.id("learningPaths"),
    milestoneId: v.optional(v.id("milestones")),
    resourceId: v.optional(v.id("resources")),
    hoursSpent: v.number(),
    notes: v.optional(v.string()),
    confidenceLevel: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");

    await ctx.db.insert("progressLogs", {
      userId: user._id,
      pathId: args.pathId,
      milestoneId: args.milestoneId,
      resourceId: args.resourceId,
      hoursSpent: args.hoursSpent,
      notes: args.notes,
      confidenceLevel: args.confidenceLevel,
    });
  },
});

// Get user progress for a path
export const getPathProgress = query({
  args: { pathId: v.id("learningPaths") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return [];

    const logs = await ctx.db
      .query("progressLogs")
      .withIndex("by_user_and_path", (q) => q.eq("userId", user._id).eq("pathId", args.pathId))
      .collect();

    return logs;
  },
});

// Get total hours spent
export const getTotalHours = query({
  args: { pathId: v.id("learningPaths") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return 0;

    const logs = await ctx.db
      .query("progressLogs")
      .withIndex("by_user_and_path", (q) => q.eq("userId", user._id).eq("pathId", args.pathId))
      .collect();

    return logs.reduce((total, log) => total + log.hoursSpent, 0);
  },
});
