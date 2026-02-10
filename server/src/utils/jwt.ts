import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const SECRET = process.env.JWT_SECRET || "default_secret";

export const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET) as { id: string; role: string };
};
