import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function NewPath() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createPath = useMutation(api.learningPaths.create);
  const createMilestone = useMutation(api.milestones.create);

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [estimatedWeeks, setEstimatedWeeks] = useState("8");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!title || !goal || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsGenerating(true);
    try {
      const pathId = await createPath({
        title,
        goal,
        description,
        difficulty,
        estimatedWeeks: parseInt(estimatedWeeks),
      });

      // Generate sample milestones based on difficulty
      const milestones = generateMilestones(difficulty, title);
      for (let i = 0; i < milestones.length; i++) {
        await createMilestone({
          pathId,
          title: milestones[i].title,
          description: milestones[i].description,
          order: i,
          estimatedHours: milestones[i].hours,
        });
      }

      toast.success("Learning path created!");
      navigate(`/paths/${pathId}`);
    } catch (error) {
      toast.error("Failed to create path");
      setIsGenerating(false);
    }
  };

  const generateMilestones = (level: string, topic: string) => {
    const beginnerMilestones = [
      { title: "Introduction & Setup", description: `Get familiar with ${topic} basics and set up your learning environment`, hours: 5 },
      { title: "Core Concepts - Part 1", description: `Learn the fundamental building blocks of ${topic}`, hours: 8 },
      { title: "Core Concepts - Part 2", description: `Deepen your understanding of essential ${topic} principles`, hours: 8 },
      { title: "Hands-On Practice", description: "Apply what you've learned through guided exercises", hours: 10 },
      { title: "First Mini Project", description: "Build your first small project to reinforce concepts", hours: 12 },
      { title: "Common Patterns & Techniques", description: "Learn frequently used patterns and best practices", hours: 10 },
      { title: "Debugging & Problem Solving", description: "Develop skills to troubleshoot and solve common issues", hours: 8 },
      { title: "Capstone Project", description: "Complete a comprehensive beginner-level project", hours: 15 },
    ];

    const intermediateMilestones = [
      { title: "Review & Foundation Check", description: `Refresh core ${topic} concepts and identify knowledge gaps`, hours: 6 },
      { title: "Advanced Concepts - Part 1", description: "Explore intermediate-level techniques and methodologies", hours: 12 },
      { title: "Advanced Concepts - Part 2", description: "Master complex patterns and architectural approaches", hours: 12 },
      { title: "Performance & Optimization", description: "Learn to write efficient and optimized code", hours: 10 },
      { title: "Real-World Application", description: "Work on practical, industry-relevant scenarios", hours: 15 },
      { title: "Testing & Quality Assurance", description: "Implement testing strategies and ensure code quality", hours: 10 },
      { title: "Integration Project", description: "Build a project integrating multiple concepts", hours: 18 },
      { title: "Code Review & Refactoring", description: "Learn to review, improve, and refactor existing code", hours: 8 },
      { title: "Final Portfolio Project", description: "Create a comprehensive project for your portfolio", hours: 20 },
    ];

    const advancedMilestones = [
      { title: "Advanced Architecture", description: `Master advanced ${topic} architecture and design patterns`, hours: 15 },
      { title: "System Design Principles", description: "Learn to design scalable and maintainable systems", hours: 12 },
      { title: "Performance Engineering", description: "Deep dive into optimization and performance tuning", hours: 12 },
      { title: "Security Best Practices", description: "Implement security measures and follow industry standards", hours: 10 },
      { title: "Advanced Tooling & DevOps", description: "Master professional development tools and workflows", hours: 10 },
      { title: "Complex Problem Solving", description: "Tackle challenging algorithmic and architectural problems", hours: 15 },
      { title: "Industry Case Studies", description: "Analyze and learn from real-world industry implementations", hours: 10 },
      { title: "Specialized Domain Project", description: "Build a specialized project in your area of interest", hours: 20 },
      { title: "Open Source Contribution", description: "Contribute to open source projects and collaborate", hours: 15 },
      { title: "Master Capstone Project", description: "Create an advanced, production-ready application", hours: 25 },
    ];

    if (level === "beginner") {
      return beginnerMilestones;
    } else if (level === "intermediate") {
      return intermediateMilestones;
    } else {
      return advancedMilestones;
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      <header className="border-b border-[#ffffff15] bg-[#111111]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-[#f5f5f5]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LearnPath AI" className="w-8 h-8" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#00ff88] to-[#0088ff] bg-clip-text text-transparent">
              LearnPath AI
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88] text-sm font-semibold">AI-Powered Path Generation</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Create Your Learning Path</h1>
            <p className="text-[#f5f5f5]/70">Tell us what you want to learn and we'll create a personalized roadmap</p>
          </div>

          <Card className="bg-[#111111] border-[#ffffff15] p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-lg mb-2 block">
                  What do you want to learn?
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Web Development, Data Science, Digital Marketing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#0a0a0a] border-[#ffffff15] text-[#f5f5f5] text-lg p-6"
                />
              </div>

              <div>
                <Label htmlFor="goal" className="text-lg mb-2 block">
                  Your Learning Goal
                </Label>
                <Input
                  id="goal"
                  placeholder="e.g., Build a full-stack web application"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="bg-[#0a0a0a] border-[#ffffff15] text-[#f5f5f5] text-lg p-6"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-lg mb-2 block">
                  Additional Details
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about your background, interests, or specific areas you want to focus on..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-[#0a0a0a] border-[#ffffff15] text-[#f5f5f5] min-h-[120px]"
                />
              </div>

              <div>
                <Label className="text-lg mb-3 block">Difficulty Level</Label>
                <RadioGroup value={difficulty} onValueChange={(v: any) => setDifficulty(v)}>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: "beginner", label: "Beginner", desc: "New to this topic" },
                      { value: "intermediate", label: "Intermediate", desc: "Some experience" },
                      { value: "advanced", label: "Advanced", desc: "Experienced learner" },
                    ].map((level) => (
                      <Card
                        key={level.value}
                        className={`p-4 cursor-pointer transition-all ${
                          difficulty === level.value
                            ? "border-[#00ff88] bg-[#00ff88]/5"
                            : "border-[#ffffff15] hover:border-[#ffffff30]"
                        }`}
                        onClick={() => setDifficulty(level.value as any)}
                      >
                        <RadioGroupItem value={level.value} id={level.value} className="sr-only" />
                        <Label htmlFor={level.value} className="cursor-pointer block">
                          <div className="font-semibold mb-1">{level.label}</div>
                          <div className="text-xs text-[#f5f5f5]/70">{level.desc}</div>
                        </Label>
                      </Card>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="weeks" className="text-lg mb-2 block">
                  Estimated Duration (weeks)
                </Label>
                <Input
                  id="weeks"
                  type="number"
                  min="1"
                  max="52"
                  value={estimatedWeeks}
                  onChange={(e) => setEstimatedWeeks(e.target.value)}
                  className="bg-[#0a0a0a] border-[#ffffff15] text-[#f5f5f5] text-lg p-6"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_20px_rgba(0,255,136,0.3)] text-lg py-6"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Path...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Learning Path
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
