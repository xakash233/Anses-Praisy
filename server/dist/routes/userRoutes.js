"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const prisma_1 = __importDefault(require("../utils/prisma"));
const router = express_1.default.Router();
router.get("/", auth_1.protect, auth_1.adminOnly, async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        console.error("Get users error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
router.delete("/:id", auth_1.protect, auth_1.adminOnly, async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await prisma_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role === "ADMIN") {
            return res.status(403).json({ message: "Cannot delete admin user" });
        }
        await prisma_1.default.user.delete({
            where: { id: userId },
        });
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.default = router;
