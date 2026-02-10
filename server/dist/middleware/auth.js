"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jwt_1 = require("../utils/jwt");
const prisma_1 = __importDefault(require("../utils/prisma"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, role: true }
        });
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        // Attach user to request object
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
exports.protect = protect;
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "ADMIN") {
        next();
    }
    else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};
exports.adminOnly = adminOnly;
