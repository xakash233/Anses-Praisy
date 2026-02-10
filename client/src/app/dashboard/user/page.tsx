"use client";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, LogOut, BookOpen, Activity, Settings, User, FileText, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function UserDashboard() {
    const { user, loading } = useAuth(true, "USER");
    const router = useRouter();

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    const handleLogout = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { withCredentials: true });
        router.push("/login");
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#09090b] text-white">
            <header className="glass sticky top-0 z-50 px-8 py-4 flex justify-between items-center border-b border-white/5">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <span className="text-white font-bold">P</span>
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Praisy
                    </h1>
                </motion.div>
                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-400">Welcome back, <span className="text-white">{user?.name}</span> 👋</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
                    <p className="text-gray-400">Track your progress and manage your learning journey.</p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                >
                    <motion.div variants={item}>
                        <Card className="glass border-0 transition-all hover:bg-white/5 bg-zinc-900/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Total Notes</CardTitle>
                                <div className="p-2 rounded-full bg-indigo-500/10 text-indigo-400">
                                    <FileText className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">12</div>
                                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    +3 this week
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={item}>
                        <Card className="glass border-0 transition-all hover:bg-white/5 bg-zinc-900/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Pending Homework</CardTitle>
                                <div className="p-2 rounded-full bg-orange-500/10 text-orange-400">
                                    <Clock className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">3</div>
                                <p className="text-xs text-orange-400 mt-1 px-1">Chemistry due tomorrow</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={item}>
                        <Card className="glass border-0 transition-all hover:bg-white/5 bg-zinc-900/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Next Exam</CardTitle>
                                <div className="p-2 rounded-full bg-pink-500/10 text-pink-400">
                                    <Calendar className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">Math</div>
                                <div className="w-full bg-gray-800 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div className="bg-pink-500 h-full rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: '60%' }} />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">In 4 days</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                    <motion.div variants={item}>
                        <Card className="glass border-0 transition-all hover:bg-white/5 bg-zinc-900/50">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Study Streak</CardTitle>
                                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
                                    <Activity className="h-4 w-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-white">5 Days</div>
                                <p className="text-xs text-emerald-400 mt-1">Keep it up! 🔥</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-7"
                >
                    <Card className="col-span-4 glass border-0 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white">Recent Activity</CardTitle>
                            <CardDescription className="text-gray-400">Your latest academic updates.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { title: "Created 'Physics Chapter 4' note", time: "2 hours ago", type: "Note", color: "indigo" },
                                    { title: "Completed Calculus Problem Set", time: "5 hours ago", type: "Homework", color: "emerald" },
                                    { title: "Started History Essay draft", time: "Yesterday", type: "Draft", color: "orange" }
                                ].map((activity, i) => (
                                    <div key={i} className="flex items-center group">
                                        <div className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-${activity.color}-500/50 transition-colors`}>
                                            <div className={`w-2 h-2 rounded-full bg-${activity.color}-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]`} />
                                        </div>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{activity.title}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                        <div className="ml-auto font-medium text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">{activity.type}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 glass border-0 bg-zinc-900/50">
                        <CardHeader>
                            <CardTitle className="text-white">My Profile</CardTitle>
                            <CardDescription className="text-gray-400">Manage your account settings.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 py-2 border-b border-gray-800/50">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                        <span className="text-white font-bold text-lg">{user?.name?.[0]?.toUpperCase()}</span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{user?.name}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">Role</span>
                                        <span className="text-xs font-medium bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded border border-indigo-500/20">{user?.role}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">Status</span>
                                        <span className="text-xs font-medium bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">Active</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-400">Joined</span>
                                        <span className="text-sm text-white">Feb 2026</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-4 bg-white text-black hover:bg-gray-200 font-medium">
                                    Edit Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    );
}
