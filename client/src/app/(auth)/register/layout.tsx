import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register",
    description: "Create a Praisy account and start organizing your student life today.",
};

export default function RegisterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
