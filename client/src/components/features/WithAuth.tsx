"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function WithAuth(Component: React.ComponentType<any>, requiredRole?: "ADMIN" | "USER") {
    return function ProtectedRoute(props: any) {
        const { user, loading } = useAuth(true, requiredRole);

        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            );
        }

        if (!user) {
            return null; // Redirect logic is in useAuth
        }

        return <Component {...props} user={user} />;
    };
}
