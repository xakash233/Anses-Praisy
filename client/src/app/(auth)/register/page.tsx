"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, UserPlus, ArrowLeft, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Image from "next/image";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["USER", "ADMIN"]),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "USER"
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[500px] relative z-10"
            >
                <div className="mb-6 text-center">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-3 mb-4"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <Image
                                src="/favicon.png"
                                alt="Praisy Logo"
                                width={56}
                                height={56}
                                className="relative rounded-2xl shadow-xl border border-white/5"
                            />
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tighter">Praisy</h1>
                    </motion.div>
                </div>

                <Card className="glass border-white/5 bg-zinc-900/40 shadow-2xl backdrop-blur-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold tracking-tight text-white text-center">Create your account</CardTitle>
                        <CardDescription className="text-gray-400 text-center text-sm">
                            Join thousands of students organizing their academic life
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                        <Input
                                            id="name"
                                            {...register("name")}
                                            placeholder="Name"
                                            className="bg-white/5 border-white/10 text-white pl-11 h-11 focus:border-indigo-500/50 focus:ring-indigo-500/50 transition-all font-sans rounded-xl"
                                        />
                                    </div>
                                    {errors.name && <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            placeholder="Your Email"
                                            className="bg-white/5 border-white/10 text-white pl-11 h-11 focus:border-indigo-500/50 focus:ring-indigo-500/50 transition-all font-sans rounded-xl"
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" text-sm font-medium text-gray-300>Password</Label>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-2xl transition-transform hover:scale-110 active:scale-95 outline-none select-none"
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
                                {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role" className="text-sm font-medium text-gray-300 ml-1">I am a...</Label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-3.5 top-3 h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                                    <select
                                        {...register("role")}
                                        className="flex h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-3 py-2 text-sm text-white focus:border-indigo-500/50 focus:ring-indigo-500/50 transition-all outline-none appearance-none cursor-pointer"
                                    >
                                        <option value="USER" className="bg-zinc-900">Student</option>
                                        <option value="ADMIN" className="bg-zinc-900">Instructor / Admin</option>
                                    </select>
                                    <div className="absolute right-3.5 top-3.5 pointer-events-none text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {errors.role && <p className="text-xs text-red-500 mt-1 ml-1">{errors.role.message}</p>}
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
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-12 shadow-lg shadow-indigo-500/20 transition-all mt-4 rounded-xl font-bold text-base"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="w-5 h-5" />
                                        <span>Register Now</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <button
                            onClick={() => router.push("/login")}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mx-auto font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to Login</span>
                        </button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
