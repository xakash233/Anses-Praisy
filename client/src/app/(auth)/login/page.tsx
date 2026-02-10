"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data: any) => {
        setError("");
        try {
            const { data: res } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data, {
                withCredentials: true,
            });

            // Start the immersive transition
            setIsLoggingIn(true);

            // Artificial delay to show the beautiful transition
            setTimeout(() => {
                if (res.user.role === "ADMIN") {
                    router.push("/dashboard/admin");
                } else {
                    router.push("/dashboard/user");
                }
            }, 1800);

        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Immersive Login Transition Overlay */}
            <AnimatePresence>
                {isLoggingIn && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col items-center justify-center"
                    >
                        {/* Shimmering Background Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-pink-900/20 animate-pulse" />

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                                opacity: 1
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-32 h-32 mb-8"
                        >
                            <div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-3xl opacity-30 animate-pulse" />
                            <Image
                                src="/favicon.png"
                                alt="Praisy"
                                width={128}
                                height={128}
                                className="relative z-10 rounded-3xl shadow-2xl border border-white/10"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-center relative z-10"
                        >
                            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Syncing your data...</h2>
                            <div className="flex justify-center gap-2">
                                {[0, 1, 2, 3].map((i) => (
                                    <motion.span
                                        key={i}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                                        className="w-2 h-2 bg-indigo-500 rounded-full"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[450px] relative z-10"
            >
                <div className="mb-10 text-center">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <Image
                                src="/favicon.png"
                                alt="Praisy Logo"
                                width={72}
                                height={72}
                                className="relative rounded-2xl shadow-2xl border border-white/5"
                            />
                        </div>
                        <h1 className="text-4xl font-black text-white tracking-tighter">Praisy</h1>
                    </motion.div>
                </div>

                <Card className="glass border-white/5 bg-zinc-900/40 shadow-2xl backdrop-blur-xl">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold tracking-tight text-white">Welcome back</CardTitle>
                        <CardDescription className="text-gray-400">
                            Enter your credentials to access your academic dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        {...register("email")}
                                        placeholder="john@example.com"
                                        className="bg-white/5 border-white/10 text-white pl-11 h-11 focus:border-indigo-500/50 focus:ring-indigo-500/50 transition-all font-sans rounded-xl"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" text-sm font-medium text-gray-300>Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-2xl transition-transform hover:scale-110 active:scale-95 outline-none select-none"
                                        title={showPassword ? "I see you! 👀" : "Hide password 🐵"}
                                    >
                                        <motion.span
                                            key={showPassword ? "peek" : "hide"}
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            {showPassword ? "🙈" : "🐵"}
                                        </motion.span>
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        {...register("password")}
                                        placeholder="••••••••"
                                        className="bg-white/5 border-white/10 text-white pl-11 pr-11 h-11 focus:border-indigo-500/50 focus:ring-indigo-500/50 transition-all font-mono rounded-xl"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-3 text-gray-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-xl text-center"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-12 shadow-lg shadow-indigo-500/25 transition-all rounded-xl mt-2 font-bold"
                                disabled={isSubmitting || isLoggingIn}
                            >
                                {isSubmitting || isLoggingIn ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Authenticating...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-center text-sm">
                            <span className="text-gray-400">Don't have an account? </span>
                            <button
                                onClick={() => router.push("/register")}
                                className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors"
                            >
                                Create Account
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
