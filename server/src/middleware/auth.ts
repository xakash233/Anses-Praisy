import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import prisma from "../utils/prisma";

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
        return;
    }

    try {
        const decoded = verifyToken(token);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, name: true, email: true, role: true }
        });

        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        // Attach user to request object
        (req as any).user = user;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
    if ((req as any).user && (req as any).user.role === "ADMIN") {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};
