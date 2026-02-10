import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Student Dashboard",
    description: "Manage your notes, homework, and academic progress with Praisy.",
};

export default function UserDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
