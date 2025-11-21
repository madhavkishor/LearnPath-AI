import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Target, TrendingUp, Zap, Users, Award } from "lucide-react";
import { useNavigate } from "react-router";

export default function Landing() {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Navigation */}
      <nav className="border-b border-[#ffffff15] bg-[#111111]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="LearnPath AI" className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#0088ff] bg-clip-text text-transparent">
              LearnPath AI
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/auth")}
                    className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                  >
                    Get Started
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-full">
            <span className="text-[#00ff88] text-sm font-semibold">🚀 AI-Powered Learning</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Personalized
            <br />
            <span className="bg-gradient-to-r from-[#00ff88] via-[#0088ff] to-[#ff0080] bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>
          <p className="text-xl text-[#f5f5f5]/70 mb-8 max-w-2xl mx-auto">
            Generate adaptive learning roadmaps tailored to your goals, style, and schedule. Master any skill with AI-guided paths.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              size="lg"
              className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_30px_rgba(0,255,136,0.4)] text-lg px-8"
            >
              Start Learning <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#ffffff30] text-[#f5f5f5] hover:bg-[#ffffff10] text-lg px-8"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/20 via-[#0088ff]/20 to-[#ff0080]/20 blur-3xl" />
          <Card className="relative bg-[#111111] border-[#ffffff15] p-8 max-w-4xl mx-auto shadow-[0_0_50px_rgba(0,255,136,0.1)]">
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-[#00ff88]/20 rounded" />
                  <div className="h-3 bg-[#0088ff]/20 rounded w-3/4" />
                  <div className="h-3 bg-[#ff0080]/20 rounded w-1/2" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-[#f5f5f5]/70">Everything you need to master any skill</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Brain,
              title: "AI-Powered Paths",
              description: "Generate personalized learning roadmaps based on your goals and learning style",
              color: "#00ff88",
            },
            {
              icon: Target,
              title: "Goal-Oriented",
              description: "Set clear objectives and track your progress with milestone-based learning",
              color: "#0088ff",
            },
            {
              icon: TrendingUp,
              title: "Adaptive Learning",
              description: "Dynamic path adjustments based on your performance and progress",
              color: "#ff0080",
            },
            {
              icon: BookOpen,
              title: "Curated Resources",
              description: "Access high-quality content from videos, courses, articles, and projects",
              color: "#00ff88",
            },
            {
              icon: Zap,
              title: "Real-Time Analytics",
              description: "Track your learning metrics and get insights on your progress",
              color: "#0088ff",
            },
            {
              icon: Users,
              title: "Community Learning",
              description: "Connect with study partners and mentors on similar learning paths",
              color: "#ff0080",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[#111111] border-[#ffffff15] p-6 hover:border-[var(--color)] transition-all group h-full"
                style={{ "--color": feature.color } as any}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-[#f5f5f5]/70">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-[#f5f5f5]/70">Start your learning journey in 3 simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              title: "Set Your Goals",
              description: "Tell us what you want to learn and your current skill level",
              color: "#00ff88",
            },
            {
              step: "02",
              title: "Get Your Path",
              description: "AI generates a personalized roadmap with milestones and resources",
              color: "#0088ff",
            },
            {
              step: "03",
              title: "Track Progress",
              description: "Follow your path, complete milestones, and achieve your goals",
              color: "#ff0080",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold"
                style={{
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                  boxShadow: `0 0 30px ${item.color}40`,
                }}
              >
                {item.step}
              </div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-[#f5f5f5]/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-[#00ff88]/10 via-[#0088ff]/10 to-[#ff0080]/10 border-[#00ff88]/30 p-12 text-center shadow-[0_0_50px_rgba(0,255,136,0.2)]">
            <Award className="w-16 h-16 mx-auto mb-6 text-[#00ff88]" />
            <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-[#f5f5f5]/70 mb-8 max-w-2xl mx-auto">
              Join thousands of learners achieving their goals with personalized AI-powered learning paths
            </p>
            <Button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/auth")}
              size="lg"
              className="bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_30px_rgba(0,255,136,0.4)] text-lg px-12"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#ffffff15] bg-[#111111] py-8">
        <div className="container mx-auto px-4 text-center text-[#f5f5f5]/70">
          <p>© 2024 LearnPath AI. Powered by AI to accelerate your learning journey.</p>
        </div>
      </footer>
    </div>
  );
}