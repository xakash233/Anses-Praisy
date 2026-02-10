import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Console",
    description: "Manage users and monitor system status in the Praisy Admin Console.",
};

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
