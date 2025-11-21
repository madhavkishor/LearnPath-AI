import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Headphones, Eye, Hand } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const completeOnboarding = useMutation(api.onboarding.completeOnboarding);

  const [step, setStep] = useState(1);
  const [learningStyle, setLearningStyle] = useState<string>("");
  const [weeklyHours, setWeeklyHours] = useState<string>("5");
  const [preferredFormats, setPreferredFormats] = useState<string[]>([]);

  const handleComplete = async () => {
    if (!learningStyle || preferredFormats.length === 0) {
      toast.error("Please complete all fields");
      return;
    }

    try {
      await completeOnboarding({
        learningStyle: learningStyle as any,
        weeklyHours: parseInt(weeklyHours),
        preferredFormats: preferredFormats as any,
      });
      toast.success("Profile completed!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to complete onboarding");
    }
  };

  const toggleFormat = (format: string) => {
    setPreferredFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-[#111111] border-[#ffffff15] p-8">
          <div className="mb-8 text-center">
            <img src="/logo.svg" alt="LearnPath AI" className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#00ff88] to-[#0088ff] bg-clip-text text-transparent">
              Welcome to LearnPath AI
            </h1>
            <p className="text-[#f5f5f5]/70">Let's personalize your learning experience</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full transition-all ${
                  s <= step ? "bg-[#00ff88]" : "bg-[#ffffff15]"
                }`}
              />
            ))}
          </div>

          {/* Step 1: Learning Style */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-4">What's your learning style?</h2>
              <p className="text-[#f5f5f5]/70 mb-6">Choose the style that resonates with you most</p>

              <RadioGroup value={learningStyle} onValueChange={setLearningStyle} className="space-y-4">
                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    learningStyle === "visual"
                      ? "border-[#00ff88] bg-[#00ff88]/5"
                      : "border-[#ffffff15] hover:border-[#ffffff30]"
                  }`}
                  onClick={() => setLearningStyle("visual")}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="visual" id="visual" />
                    <Eye className="w-6 h-6 text-[#00ff88]" />
                    <div>
                      <Label htmlFor="visual" className="text-lg font-semibold cursor-pointer">
                        Visual Learner
                      </Label>
                      <p className="text-sm text-[#f5f5f5]/70">Learn best through images, diagrams, and videos</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    learningStyle === "auditory"
                      ? "border-[#0088ff] bg-[#0088ff]/5"
                      : "border-[#ffffff15] hover:border-[#ffffff30]"
                  }`}
                  onClick={() => setLearningStyle("auditory")}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="auditory" id="auditory" />
                    <Headphones className="w-6 h-6 text-[#0088ff]" />
                    <div>
                      <Label htmlFor="auditory" className="text-lg font-semibold cursor-pointer">
                        Auditory Learner
                      </Label>
                      <p className="text-sm text-[#f5f5f5]/70">Learn best through listening and discussions</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    learningStyle === "kinesthetic"
                      ? "border-[#ff0080] bg-[#ff0080]/5"
                      : "border-[#ffffff15] hover:border-[#ffffff30]"
                  }`}
                  onClick={() => setLearningStyle("kinesthetic")}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="kinesthetic" id="kinesthetic" />
                    <Hand className="w-6 h-6 text-[#ff0080]" />
                    <div>
                      <Label htmlFor="kinesthetic" className="text-lg font-semibold cursor-pointer">
                        Kinesthetic Learner
                      </Label>
                      <p className="text-sm text-[#f5f5f5]/70">Learn best through hands-on practice and projects</p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all ${
                    learningStyle === "reading"
                      ? "border-[#00ff88] bg-[#00ff88]/5"
                      : "border-[#ffffff15] hover:border-[#ffffff30]"
                  }`}
                  onClick={() => setLearningStyle("reading")}
                >
                  <div className="flex items-center gap-4">
                    <RadioGroupItem value="reading" id="reading" />
                    <BookOpen className="w-6 h-6 text-[#00ff88]" />
                    <div>
                      <Label htmlFor="reading" className="text-lg font-semibold cursor-pointer">
                        Reading/Writing Learner
                      </Label>
                      <p className="text-sm text-[#f5f5f5]/70">Learn best through reading and taking notes</p>
                    </div>
                  </div>
                </Card>
              </RadioGroup>

              <Button
                onClick={() => setStep(2)}
                disabled={!learningStyle}
                className="w-full mt-6 bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90"
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Time Commitment */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-4">How much time can you dedicate?</h2>
              <p className="text-[#f5f5f5]/70 mb-6">Weekly hours for learning</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="hours" className="text-lg mb-2 block">
                    <Clock className="inline w-5 h-5 mr-2 text-[#0088ff]" />
                    Hours per week
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    min="1"
                    max="40"
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    className="bg-[#0a0a0a] border-[#ffffff15] text-[#f5f5f5] text-lg p-6"
                  />
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[5, 10, 15, 20].map((hours) => (
                    <Button
                      key={hours}
                      variant="outline"
                      onClick={() => setWeeklyHours(hours.toString())}
                      className={`${
                        weeklyHours === hours.toString()
                          ? "border-[#0088ff] bg-[#0088ff]/10 text-[#0088ff]"
                          : "border-[#ffffff15]"
                      }`}
                    >
                      {hours}h
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 border-[#ffffff15]"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#0088ff] text-[#f5f5f5] hover:bg-[#0088ff]/90"
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preferred Formats */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-bold mb-4">Preferred learning formats</h2>
              <p className="text-[#f5f5f5]/70 mb-6">Select all that apply</p>

              <div className="space-y-3">
                {[
                  { value: "video", label: "Video Tutorials", icon: "🎥" },
                  { value: "article", label: "Articles & Blogs", icon: "📝" },
                  { value: "course", label: "Online Courses", icon: "🎓" },
                  { value: "project", label: "Hands-on Projects", icon: "🛠️" },
                  { value: "book", label: "Books & Documentation", icon: "📚" },
                  { value: "interactive", label: "Interactive Exercises", icon: "⚡" },
                ].map((format) => (
                  <Card
                    key={format.value}
                    className={`p-4 cursor-pointer transition-all ${
                      preferredFormats.includes(format.value)
                        ? "border-[#00ff88] bg-[#00ff88]/5"
                        : "border-[#ffffff15] hover:border-[#ffffff30]"
                    }`}
                    onClick={() => toggleFormat(format.value)}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={preferredFormats.includes(format.value)}
                        onCheckedChange={() => toggleFormat(format.value)}
                      />
                      <span className="text-2xl">{format.icon}</span>
                      <Label className="text-lg cursor-pointer flex-1">{format.label}</Label>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 border-[#ffffff15]"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={preferredFormats.length === 0}
                  className="flex-1 bg-[#00ff88] text-[#0a0a0a] hover:bg-[#00ff88]/90 shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                >
                  Complete Setup <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
