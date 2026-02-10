"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "USER";
}

export function useAuth(requireAuth = true, requiredRole?: "ADMIN" | "USER") {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                    withCredentials: true // Important for httpOnly cookies
                });
                setUser(data);
            } catch (error) {
                setUser(null);
                if (requireAuth) {
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [requireAuth, router]);

    useEffect(() => {
        if (!loading && requiredRole && user && user.role !== requiredRole) {
            if (user.role === "ADMIN") {
                router.push("/dashboard/admin");
            } else {
                router.push("/dashboard/user");
            }
        }
    }, [loading, user, requiredRole, router]);

    return { user, loading };
}
