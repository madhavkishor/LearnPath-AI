import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery, useMutation } from "convex/react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Clock, Target, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function PathView() {
  const { pathId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const path = useQuery(api.learningPaths.getPathWithMilestones, {
    pathId: pathId as Id<"learningPaths">,
  });
  const markComplete = useMutation(api.milestones.markComplete);
  const updateProgress = useMutation(api.learningPaths.updateProgress);
  const deletePath = useMutation(api.learningPaths.deletePath);

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (!path) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#00ff88]">Loading...</div>
      </div>
    );
  }

  const handleMilestoneComplete = async (milestoneId: Id<"milestones">) => {
    try {
      await markComplete({ milestoneId });
      
      // Calculate new progress
      const completedCount = (path.milestones?.filter(m => m.isCompleted).length || 0) + 1;
      const totalCount = path.milestones?.length || 1;
      const newProgress = Math.round((completedCount / totalCount) * 100);
      
      await updateProgress({
        pathId: path._id,
        completionPercentage: newProgress,
      });
      
      toast.success("Milestone completed! 🎉");
    } catch (error) {
      toast.error("Failed to update milestone");
    }
  };

  const handleDeletePath = async () => {
    if (!confirm("Are you sure you want to delete this learning path? This action cannot be undone.")) {
      return;
    }

    try {
      await deletePath({ pathId: path._id });
      toast.success("Learning path deleted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete learning path");
    }
  };

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
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDeletePath}
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Path Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-[#111111] border-[#00ff88] p-8 shadow-[0_0_30px_rgba(0,255,136,0.1)]">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-3">{path.title}</h1>
                <p className="text-lg text-[#f5f5f5]/70 mb-4">{path.description}</p>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-[#00ff88]/10 text-[#00ff88] rounded-full border border-[#00ff88]/30 text-sm font-semibold">
                    {path.difficulty}
                  </span>
                  <div className="flex items-center gap-2 text-[#f5f5f5]/70">
                    <Clock className="w-4 h-4" />
                    <span>{path.estimatedWeeks} weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#f5f5f5]/70">
                    <Target className="w-4 h-4" />
                    <span>{path.goal}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#f5f5f5]/70">Overall Progress</span>
                <span className="font-bold text-[#00ff88] text-lg">{path.completionPercentage}%</span>
              </div>
              <Progress value={path.completionPercentage} className="h-3" />
            </div>
          </Card>
        </motion.div>

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Learning Milestones</h2>
          <div className="space-y-4">
            {path.milestones?.map((milestone, index) => (
              <motion.div
                key={milestone._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 transition-all ${
                    milestone.isCompleted
                      ? "bg-[#00ff88]/5 border-[#00ff88]"
                      : "bg-[#111111] border-[#ffffff15] hover:border-[#0088ff]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {milestone.isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-[#00ff88]" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#ffffff30]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{milestone.title}</h3>
                          <p className="text-[#f5f5f5]/70">{milestone.description}</p>
                        </div>
                        {!milestone.isCompleted && (
                          <Button
                            onClick={() => handleMilestoneComplete(milestone._id)}
                            size="sm"
                            className="bg-[#0088ff] text-[#f5f5f5] hover:bg-[#0088ff]/90"
                          >
                            Mark Complete
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#f5f5f5]/70">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{milestone.estimatedHours}h</span>
                        </div>
                        {milestone.isCompleted && milestone.completedAt && (
                          <span className="text-[#00ff88]">
                            Completed {new Date(milestone.completedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}