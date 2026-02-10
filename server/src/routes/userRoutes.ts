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

router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
        const userId = req.params.id as string;
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "ADMIN") {
            return res.status(403).json({ message: "Cannot delete admin user" });
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
