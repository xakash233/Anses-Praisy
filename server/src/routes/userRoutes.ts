import express from "express";
import { protect, adminOnly } from "../middleware/auth";
import prisma from "../utils/prisma";

const router = express.Router();

router.get("/", protect, adminOnly, async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        res.json(users);
    } catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/:id", protect, adminOnly, async (req, res) => {
    try {
        const userId = req.params.id as string;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        const userId = req.params.id as string;
        const currentUserId = (req as any).user.id;
        const currentUserRole = (req as any).user.role;

        // Find the user to be deleted
        const userToDelete = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userToDelete) {
            return res.status(404).json({ message: "User not found" });
        }

        // Authorization logic:
        // 1. User can delete themselves (isSelf)
        // 2. Admin can delete others (isAdmin)
        // 3. Admin cannot delete other admins (protect other admins)

        const isSelf = currentUserId === userId;
        const isAdmin = currentUserRole === "ADMIN";

        if (!isSelf && !isAdmin) {
            return res.status(403).json({ message: "Not authorized to delete this user" });
        }

        if (!isSelf && userToDelete.role === "ADMIN") {
            return res.status(403).json({ message: "Cannot delete other admin users" });
        }

        await prisma.user.delete({
            where: { id: userId },
        });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
