"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to database");
        app_1.default.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}
main();
