"use client";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, ArrowLeft, Mail, Calendar, Shield, Trash2, FileText, Clock, AlertCircle, User } from "lucide-react";
import { motion } from "framer-motion";

interface UserDetails {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    createdAt: string;
}

export default function UserDetailsPage() {
    const { user: currentUser, loading: authLoading } = useAuth(true, "ADMIN");
    const [user, setUser] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const router = useRouter();
    const userId = params?.id as string;

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, { withCredentials: true });
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user details");
                // router.push("/dashboard/admin"); 
            } finally {
                setLoading(false);
            }
        };

        if (currentUser?.role === "ADMIN") {
            fetchUser();
        }
    }, [currentUser, userId, router]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, { withCredentials: true });
            router.push("/dashboard/admin");
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    if (authLoading || loading) return <div className="flex h-screen items-center justify-center bg-[#09090b] text-white"><Loader2 className="animate-spin" /></div>;

    if (!user) return <div className="flex h-screen items-center justify-center bg-[#09090b] text-white">User not found</div>;

    return (
        <div className="min-h-screen flex flex-col bg-[#09090b] text-white">
            <header className="glass sticky top-0 z-50 px-8 py-4 flex items-center gap-4 border-b border-white/5">
                <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/admin")} className="text-gray-400 hover:text-white p-0 hover:bg-transparent">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                </Button>
                <h1 className="text-xl font-bold text-white">User Details</h1>
            </header>

            <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-2xl font-bold text-white">
                            {user.name[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                            <p className="text-gray-400 flex items-center gap-2 mt-1">
                                <Mail className="w-4 h-4" /> {user.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${user.role === 'ADMIN'
                            ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                            }`}>
                            {user.role}
                        </span>
                        {user.role !== "ADMIN" && (
                            <Button variant="destructive" size="sm" onClick={handleDelete} className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20">
                                <Trash2 className="w-4 h-4 mr-2" /> Delete User
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="glass border-0 bg-zinc-900/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Joined Date</CardTitle>
                            <Calendar className="h-4 w-4 text-gray-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{new Date(user.createdAt).toLocaleDateString()}</div>
                            <p className="text-xs text-gray-500 mt-1">Member since</p>
                        </CardContent>
                    </Card>
                    <Card className="glass border-0 bg-zinc-900/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Notes Created</CardTitle>
                            <FileText className="h-4 w-4 text-indigo-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">24</div>
                            <p className="text-xs text-indigo-400 mt-1">Active contributor</p>
                        </CardContent>
                    </Card>
                    <Card className="glass border-0 bg-zinc-900/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Last Active</CardTitle>
                            <Clock className="h-4 w-4 text-emerald-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">2 hours ago</div>
                            <p className="text-xs text-emerald-400 mt-1">Online recently</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Activity (Mocked) */}
                <Card className="glass border-0 bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Student Activity</CardTitle>
                        <CardDescription className="text-gray-400">Logs and actions performed by this user.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { title: "Logged in from new device", time: "2 hours ago", icon: Shield, color: "blue" },
                                { title: "Updated profile picture", time: "1 day ago", icon: User, color: "purple" },
                                { title: "Completed 'Intro to React' homework", time: "3 days ago", icon: FileText, color: "emerald" },
                                { title: "Failed login attempt", time: "5 days ago", icon: AlertCircle, color: "red" },
                            ].map((log, i) => (
                                <div key={i} className="flex items-center group">
                                    <div className={`w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700`}>
                                        <div className={`w-2 h-2 rounded-full bg-${log.color}-500 shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium text-gray-200">{log.title}</p>
                                        <p className="text-xs text-gray-500">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
