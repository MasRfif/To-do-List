"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { fullName, email, password } = req.body;
            if (!fullName || !email || !password)
                return res.status(400).json({ error: "Missing required fields" });
            const emailRecord = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            const memberRole = yield prisma.role.findUnique({
                where: {
                    role: "member",
                },
            });
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const user = yield prisma.user.create({
                data: {
                    fullName,
                    email,
                    password: yield (0, bcrypt_1.hash)(password, salt),
                    roleId: memberRole.id,
                },
            });
            return res.status(200).json({ message: "nice" });
        }
        catch (error) {
            next(error);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ error: "Missing required fields" });
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                return res.status(401).json({ error: "Invalid user/email" });
            const isValidPassword = yield (0, bcrypt_1.compare)(password, user.password);
            if (!isValidPassword)
                return res.status(401).json({ error: "Invalid password" });
            const jwtPayload = {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                roleId: user.roleId,
            };
            const token = yield jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET_KEY, {
                expiresIn: "1h",
            });
            return res.cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                sameSite: "none",
                secure: true,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie("token");
            return res.status(200).json({ message: "Logged out successfully" });
        }
        catch (error) {
            next(error);
        }
    });
}
