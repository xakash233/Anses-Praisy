"use client";

import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, LogOut, Trash2, Shield, Users, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
    createdAt: string;
}

export default function AdminDashboard() {
    const { user: currentUser, loading } = useAuth(true, "ADMIN");
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, { withCredentials: true });
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users");
            }
        };
        if (currentUser?.role === "ADMIN") {
            fetchUsers();
        }
    }, [currentUser]);

    const handleRowClick = (userId: string) => {
        router.push(`/dashboard/admin/users/${userId}`);
    };


    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, { withCredentials: true });
            setUsers(users.filter((u) => u.id !== id));
        } catch (error) {
            alert("Failed to delete user");
        }
    };

    const handleLogout = async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {}, { withCredentials: true });
        router.push("/login");
    };

    if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen flex flex-col bg-[#09090b] text-white">
            <header className="glass sticky top-0 z-50 px-8 py-4 flex justify-between items-center border-b border-white/5">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex items-center gap-2"
                >
                    <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-200">
                        Admin Console
                    </h1>
                </motion.div>
                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-400">Welcome, <span className="text-white">{currentUser?.name}</span> (Admin) 🛡️</span>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Overview</h2>
                    <p className="text-gray-400">System statistics and user management.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className="glass border-0 bg-zinc-900/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
                            <div className="p-2 rounded-full bg-orange-500/10 text-orange-400">
                                <Users className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">{users.length}</div>
                            <p className="text-xs text-gray-500 mt-1">Registered accounts</p>
                        </CardContent>
                    </Card>
                    <Card className="glass border-0 bg-zinc-900/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-400">Server Status</CardTitle>
                            <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-400">
                                <Activity className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">Online</div>
                            <p className="text-xs text-emerald-400 mt-1">99.9% Uptime</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="glass border-0 bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle className="text-white">User Management</CardTitle>
                        <CardDescription className="text-gray-400">View and manage all registered users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b [&_tr]:border-white/5">
                                    <tr className="border-b transition-colors hover:bg-white/5 data-[state=selected]:bg-white/5">
                                        <th className="h-12 px-4 align-middle font-medium text-gray-400">Name</th>
                                        <th className="h-12 px-4 align-middle font-medium text-gray-400">Email</th>
                                        <th className="h-12 px-4 align-middle font-medium text-gray-400">Role</th>
                                        <th className="h-12 px-4 align-middle font-medium text-gray-400">Joined</th>
                                        <th className="h-12 px-4 align-middle font-medium text-gray-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    <AnimatePresence>
                                        {users.map((u) => (
                                            <motion.tr
                                                key={u.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                onClick={() => handleRowClick(u.id)}
                                                className="border-b border-white/5 transition-colors hover:bg-white/5 data-[state=selected]:bg-white/5 cursor-pointer"
                                            >
                                                <td className="p-4 align-middle font-medium text-white">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-300">
                                                            {u.name[0].toUpperCase()}
                                                        </div>
                                                        {u.name}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle text-gray-300">{u.email}</td>
                                                <td className="p-4 align-middle">
                                                    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${u.role === 'ADMIN'
                                                            ? 'border-orange-500/20 bg-orange-500/10 text-orange-400'
                                                            : 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
                                                        }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle text-gray-500">
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    {u.role !== "ADMIN" && (
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleDelete(u.id);
                                                            }}
                                                            className="h-8 w-8 p-0 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
