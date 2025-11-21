import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getCurrentUser } from "./users";

// Complete onboarding
export const completeOnboarding = mutation({
  args: {
    learningStyle: v.union(
      v.literal("visual"),
      v.literal("auditory"),
      v.literal("kinesthetic"),
      v.literal("reading")
    ),
    weeklyHours: v.number(),
    preferredFormats: v.array(
      v.union(
        v.literal("video"),
        v.literal("article"),
        v.literal("course"),
        v.literal("project"),
        v.literal("book"),
        v.literal("interactive")
      )
    ),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) throw new Error("Not authenticated");

    await ctx.db.patch(user._id, {
      learningStyle: args.learningStyle,
      weeklyHours: args.weeklyHours,
      preferredFormats: args.preferredFormats,
      onboardingCompleted: true,
    });
  },
});
