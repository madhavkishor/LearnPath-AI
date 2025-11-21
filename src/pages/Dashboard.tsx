import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Target, TrendingUp, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const activePath = useQuery(api.learningPaths.getActivePath);
  const allPaths = useQuery(api.learningPaths.getUserPaths);
  const deletePath = useMutation(api.learningPaths.deletePath);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#00ff88]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  if (!user.onboardingCompleted) {
    navigate("/onboarding");
    return null;
  }

  const handleDeletePath = async (pathId: Id<"learningPaths">, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!confirm("Are you sure you want to delete this learning path? This action cannot be undone.")) {
      return;
    }

    try {
      await deletePath({ pathId });
      toast.success("Learning path deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete learning path");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Header */}
      <header className="border-b border-[#ffffff15] bg-[#111111]">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="LearnPath AI" className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#0088ff] bg-clip-text text-transparent">
              LearnPath AI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#f5f5f5]/70">Welcome, {user.name || "Learner"}</span>
            <Button
              variant="outline"
              size="sm"
              className="border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10"
              onClick={() => navigate("/paths/new")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Path
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-[#111111] border-[#ffffff15] p-6 hover:border-[#00ff88] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00ff88]/10 rounded-lg">
                  <Target className="w-6 h-6 text-[#00ff88]" />
                </div>
                <div>
                  <p className="text-sm text-[#f5f5f5]/70">Active Paths</p>
                  <p className="text-2xl font-bold">{allPaths?.filter(p => p.isActive).length || 0}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-[#111111] border-[#ffffff15] p-6 hover:border-[#0088ff] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#0088ff]/10 rounded-lg">
                  <BookOpen className="w-6 h-6 text-[#0088ff]" />
                </div>
                <div>
                  <p className="text-sm text-[#f5f5f5]/70">Total Paths</p>
                  <p className="text-2xl font-bold">{allPaths?.length || 0}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-[#111111] border-[#ffffff15] p-6 hover:border-[#ff0080] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#ff0080]/10 rounded-lg">
                  <Clock className="w-6 h-6 text-[#ff0080]" />
                </div>
                <div>
                  <p className="text-sm text-[#f5f5f5]/70">Weekly Hours</p>
                  <p className="text-2xl font-bold">{user.weeklyHours || 0}h</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-[#111111] border-[#ffffff15] p-6 hover:border-[#00ff88] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#00ff88]/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-[#00ff88]" />
                </div>
                <div>
                  <p className="text-sm text-[#f5f5f5]/70">Avg Progress</p>
                  <p className="text-2xl font-bold">
                    {allPaths && allPaths.length > 0
                      ? Math.round(allPaths.reduce((sum, p) => sum + p.completionPercentage, 0) / allPaths.length)
                      : 0}%
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Active Path */}
        {activePath && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Active Learning Path</h2>
            <Card className="bg-[#111111] border-[#00ff88] p-6 shadow-[0_0_20px_rgba(0,255,136,0.1)]">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{activePath.title}</h3>
                  <p className="text-[#f5f5f5]/70 mb-4">{activePath.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 bg-[#00ff88]/10 text-[#00ff88] rounded-full border border-[#00ff88]/30">
                      {activePath.difficulty}
                    </span>
                    <span className="text-[#f5f5f5]/70">{activePath.estimatedWeeks} weeks</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigate(`/paths/${activePath._id}`)}
                    className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                  >
                    Continue Learning
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleDeletePath(activePath._id, e)}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#f5f5f5]/70">Progress</span>
                  <span className="font-bold text-[#00ff88]">{activePath.completionPercentage}%</span>
                </div>
                <Progress value={activePath.completionPercentage} className="h-2" />
              </div>
            </Card>
          </motion.div>
        )}

        {/* All Paths */}
        <div>
          <h2 className="text-xl font-bold mb-4">All Learning Paths</h2>
          {allPaths && allPaths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allPaths.map((path, index) => (
                <motion.div
                  key={path._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="relative group"
                >
                  <Card
                    className="bg-[#111111] border-[#ffffff15] p-6 hover:border-[#0088ff] transition-all cursor-pointer"
                    onClick={() => navigate(`/paths/${path._id}`)}
                  >
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeletePath(path._id, e)}
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-bold mb-2 pr-8">{path.title}</h3>
                    <p className="text-sm text-[#f5f5f5]/70 mb-4 line-clamp-2">{path.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2 py-1 bg-[#0088ff]/10 text-[#0088ff] rounded border border-[#0088ff]/30">
                        {path.difficulty}
                      </span>
                      <span className="text-xs text-[#f5f5f5]/70">{path.estimatedWeeks} weeks</span>
                    </div>
                    <Progress value={path.completionPercentage} className="h-1.5" />
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="bg-[#111111] border-[#ffffff15] p-12 text-center">
              <p className="text-[#f5f5f5]/70 mb-4">No learning paths yet</p>
              <Button
                onClick={() => navigate("/paths/new")}
                className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90"
              >
                Create Your First Path
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}