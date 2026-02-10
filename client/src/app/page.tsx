"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layout,
  Lock,
  Zap,
  Users,
  Star,
  ChevronRight,
  Play
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Just check if logged in for redirection if needed
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Join the Community",
      desc: "Create your student profile in seconds. Choose your role and join thousands of students worldwide.",
      icon: Users,
      color: "indigo"
    },
    {
      title: "Organize Everything",
      desc: "Input your lecture notes, set homework deadlines, and build your custom study schedule.",
      icon: Layout,
      color: "purple"
    },
    {
      title: "Level Up Success",
      desc: "Track your progress with real-time analytics and maintain your study streak to stay motivated.",
      icon: Trophy,
      color: "pink"
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-indigo-500/30">
      {/* Immersive Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/15 blur-[150px]"
        />
        <motion.div
          animate={{
            y: [0, 50, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-pink-600/10 blur-[120px]"
        />
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative">
              <div className="absolute -inset-1.5 bg-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
              <div className="relative w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">P</span>
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Praisy
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Process</a>
            <a href="#stats" className="hover:text-white transition-colors">Impact</a>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/5 hidden sm:flex"
              onClick={() => router.push("/login")}
            >
              Sign In
            </Button>
            <Button
              className="bg-white text-black hover:bg-gray-200 rounded-full px-6 shadow-[0_0_20px_rgba(255,255,255,0.2)] font-bold"
              onClick={() => router.push("/register")}
            >
              Join Free
            </Button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-44 pb-20 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8"
            >
              <Sparkles className="w-3 h-3 animate-pulse" />
              REVOLUTIONIZING STUDENT PRODUCTIVITY
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10"
            >
              Crush Your Goals. <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Own Your Success.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              The premium academic command center for the modern student.
              Master your notes, dominate your deadlines, and visualize your growth with the world&apos;s most beautiful study suite.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => router.push("/register")}
                className="h-16 px-10 bg-indigo-600 hover:bg-indigo-500 text-lg font-bold rounded-2xl shadow-[0_0_50px_rgba(99,102,241,0.4)] group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <a href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 border-white/10 bg-white/5 hover:bg-white/10 text-lg font-bold rounded-2xl backdrop-blur-xl group"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center mr-3 group-hover:bg-indigo-500/40 transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                  Watch How it Works
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview Mockup */}
        <section className="px-6 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[2.5rem] blur opacity-25" />
              <div className="relative rounded-[2.5rem] border border-white/10 bg-zinc-900 overflow-hidden shadow-2xl">
                <div className="h-10 bg-zinc-800/80 border-b border-white/5 flex items-center px-6 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="p-4 md:p-8">
                  <div className="aspect-video bg-indigo-950/20 rounded-2xl flex flex-col items-center justify-center relative group-hover:bg-indigo-950/40 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="p-12 w-full space-y-8 opacity-20 grayscale pointer-events-none select-none">
                      <div className="h-8 w-1/3 bg-white rounded-lg" />
                      <div className="grid grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/20 rounded-xl" />)}
                      </div>
                      <div className="h-64 bg-white/10 rounded-2xl w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section Title: Features */}
        <section id="features" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Built for High Performers.</h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto">Everything you need to transform your academic results without the burnout.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Hyper-Organized Notes",
                  desc: "Our markdown-powered editor lets you structure lectures with semantic meaning and rich embedding.",
                  icon: BookOpen,
                  color: "indigo"
                },
                {
                  title: "Deadline Domination",
                  desc: "Visual progress trackers for every assignment. Know exactly how much effort is required before you start.",
                  icon: Calendar,
                  color: "pink"
                },
                {
                  title: "Study Performance",
                  desc: "Study success metrics and study streaks that make building consistent habits addictive.",
                  icon: Trophy,
                  color: "emerald"
                }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className="h-full glass border-white/5 p-8 rounded-[2rem] bg-zinc-900/40 hover:bg-zinc-800/50 transition-all duration-500 border border-white/5">
                    <div className={`w-14 h-14 rounded-2xl bg-${f.color}-500/10 flex items-center justify-center mb-8 border border-${f.color}-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <f.icon className={`w-7 h-7 text-${f.color}-400`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{f.desc}</p>
                    <div className="flex items-center text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animated How It Works Section */}
        <section id="how-it-works" className="py-32 px-6 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black tracking-tighter mb-12"
                >
                  How it Works. <br />
                  <span className="text-indigo-500">Simple but Powerful.</span>
                </motion.h2>

                <div className="space-y-8">
                  {steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setActiveStep(i)}
                      className={`cursor-pointer group p-6 rounded-2xl border transition-all duration-500 ${activeStep === i
                        ? `bg-${step.color}-500/10 border-${step.color}-500/30`
                        : "bg-transparent border-transparent hover:bg-white/5"
                        }`}
                    >
                      <div className="flex gap-6 items-start">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${activeStep === i
                          ? `bg-${step.color}-500 text-white`
                          : "bg-zinc-800 text-gray-500 border-white/5"
                          } transition-all duration-500`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`text-xl font-bold mb-2 ${activeStep === i ? "text-white" : "text-gray-400 group-hover:text-gray-300"}`}>
                            {step.title}
                          </h3>
                          <p className={`leading-relaxed ${activeStep === i ? "text-gray-300" : "text-gray-500"}`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/10 blur-[100px] rounded-full" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square glass rounded-[3rem] border border-white/10 bg-zinc-900/50 p-1 flex items-center justify-center overflow-hidden shadow-2xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-${steps[activeStep].color}-500/20 to-transparent opacity-50`} />
                    <div className="relative z-10 p-12 text-center w-full">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="w-32 h-32 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 border border-white/10"
                      >
                        {(() => {
                          const Icon = steps[activeStep].icon;
                          return <Icon className={`w-16 h-16 text-${steps[activeStep].color}-400`} />;
                        })()}
                      </motion.div>
                      <h4 className="text-3xl font-bold mb-4">{steps[activeStep].title}</h4>
                      <p className="text-gray-400 text-lg">{steps[activeStep].desc}</p>
                    </div>

                    {/* Mock Floating Elements */}
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute top-10 right-10 w-20 h-20 bg-indigo-500/20 blur-xl rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, 20, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="absolute bottom-20 left-10 w-16 h-16 bg-pink-500/20 blur-xl rounded-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics / Impact */}
        <section id="stats" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass border border-white/5 rounded-[3rem] bg-indigo-600 p-12 md:p-20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-white opacity-[0.03] rotate-[30deg] translate-x-1/2" />
              <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                {[
                  { label: "Active Students", value: "50k+", icon: Users },
                  { label: "Notes Created", value: "2M+", icon: BookOpen },
                  { label: "Tasks Completed", value: "850k", icon: CheckCircle2 },
                  { label: "Success Rate", value: "98%", icon: Star }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-5xl font-black text-white">{stat.value}</div>
                    <div className="text-indigo-100 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 leading-none">Ready to <span className="text-indigo-500 underline decoration-indigo-500/30">Praisy</span> your potential?</h2>
              <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto">Join the new era of academic success. Zero friction. Total control.</p>
              <Button
                size="lg"
                onClick={() => router.push("/register")}
                className="h-16 px-12 bg-white text-black hover:bg-gray-200 text-xl font-black rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.2)]"
              >
                Get Started Now
              </Button>
              <p className="text-gray-600 text-sm mt-8 flex items-center justify-center gap-2">
                <Lock className="w-3.5 h-3.5" /> No credit card required. Free forever demo.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-black text-xs">P</span>
                </div>
                <span className="text-xl font-bold">Praisy</span>
              </div>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                Empowering students world-wide with high-performance tools and beautiful design.
              </p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Product</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Company</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Legal</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-sm border-t border-white/5 pt-12">
            <p>© 2026 Praisy Inc. Crafted for success.</p>
            <div className="flex gap-8">
              <Zap className="w-5 h-5 opacity-20" />
              <Users className="w-5 h-5 opacity-20" />
              <Star className="w-5 h-5 opacity-20" />
            </div>
          </div>
        </div>
      </footer>

      {/* Global Tailwind Variants for Dynamic Colors */}
      <style jsx global>{`
                .text-indigo-400 { color: #818cf8; }
                .text-purple-400 { color: #c084fc; }
                .text-pink-400 { color: #f472b6; }
                .text-emerald-400 { color: #34d399; }
                .bg-indigo-500 { background-color: #6366f1; }
                .bg-purple-500 { background-color: #a855f7; }
                .bg-pink-500 { background-color: #ec4899; }
                .bg-emerald-500 { background-color: #10b981; }
                .border-indigo-500\/30 { border-color: rgba(99, 102, 241, 0.3); }
                .border-purple-500\/30 { border-color: rgba(168, 85, 247, 0.3); }
                .border-pink-500\/30 { border-color: rgba(236, 72, 153, 0.3); }
                .bg-indigo-500\/10 { background-color: rgba(99, 102, 241, 0.1); }
                .bg-purple-500\/10 { background-color: rgba(168, 85, 247, 0.1); }
                .bg-pink-500\/10 { background-color: rgba(236, 72, 153, 0.1); }
                .bg-emerald-500\/10 { background-color: rgba(16, 185, 129, 0.1); }
            `}</style>
    </div>
  );
}
