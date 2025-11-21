import { internalMutation } from "./_generated/server";

export const seedResources = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Web Development Resources
    await ctx.db.insert("resources", {
      title: "HTML & CSS Fundamentals",
      description: "Learn the basics of HTML and CSS to build beautiful websites",
      url: "https://www.youtube.com/watch?v=mU6anWqZJcc",
      type: "video",
      difficulty: "beginner",
      estimatedMinutes: 120,
      topics: ["web-development", "html", "css"],
      qualityScore: 9.5,
      author: "freeCodeCamp",
    });

    await ctx.db.insert("resources", {
      title: "JavaScript for Beginners",
      description: "Complete JavaScript tutorial for absolute beginners",
      url: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
      type: "video",
      difficulty: "beginner",
      estimatedMinutes: 180,
      topics: ["web-development", "javascript"],
      qualityScore: 9.8,
      author: "freeCodeCamp",
    });

    await ctx.db.insert("resources", {
      title: "React Complete Course",
      description: "Learn React from scratch with hands-on projects",
      url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
      type: "video",
      difficulty: "intermediate",
      estimatedMinutes: 240,
      topics: ["web-development", "react", "javascript"],
      qualityScore: 9.7,
      author: "freeCodeCamp",
    });

    // Data Science Resources
    await ctx.db.insert("resources", {
      title: "Python for Data Science",
      description: "Complete Python programming for data science and machine learning",
      url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
      type: "video",
      difficulty: "beginner",
      estimatedMinutes: 240,
      topics: ["data-science", "python"],
      qualityScore: 9.6,
      author: "freeCodeCamp",
    });

    await ctx.db.insert("resources", {
      title: "Machine Learning Crash Course",
      description: "Introduction to machine learning concepts and algorithms",
      url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
      type: "video",
      difficulty: "intermediate",
      estimatedMinutes: 180,
      topics: ["data-science", "machine-learning"],
      qualityScore: 9.4,
      author: "freeCodeCamp",
    });

    // Digital Marketing Resources
    await ctx.db.insert("resources", {
      title: "Digital Marketing Fundamentals",
      description: "Complete guide to digital marketing strategies",
      url: "https://www.youtube.com/watch?v=nU-IIXBWlS4",
      type: "video",
      difficulty: "beginner",
      estimatedMinutes: 150,
      topics: ["digital-marketing", "seo", "social-media"],
      qualityScore: 9.2,
      author: "Simplilearn",
    });

    console.log("Seed data created successfully");
  },
});
