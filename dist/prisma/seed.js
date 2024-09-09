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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminRole = yield prisma.role.create({
                data: {
                    role: "admin",
                },
            });
            const memberRole = yield prisma.role.create({
                data: {
                    role: "member",
                },
            });
            const salt = yield (0, bcrypt_1.genSalt)(32);
            const admin = yield prisma.user.create({
                data: {
                    fullName: "nigelirwandi",
                    email: "nigel@mail.com",
                    password: yield (0, bcrypt_1.hash)("admin123", salt),
                    roleId: adminRole.id,
                },
            });
            const Karisma = yield prisma.user.create({
                data: {
                    fullName: "karisma mahaya",
                    email: "kari.ma@mail.com",
                    password: yield (0, bcrypt_1.hash)("kanrinma", salt),
                    roleId: memberRole.id,
                },
            });
            const lady = yield prisma.user.create({
                data: {
                    fullName: "lady Smith",
                    email: "lady.smith@mail.com",
                    password: yield (0, bcrypt_1.hash)("lady234", salt),
                    roleId: memberRole.id,
                },
            });
            yield prisma.task.createMany({
                data: [
                    {
                        task: "Implement a new feature using React and Redux",
                        userId: Karisma.id,
                    },
                    { task: "Fix a bug in the backend API (Node.js)", userId: lady.id },
                    {
                        task: "Research a new CSS framework for the project",
                        userId: Karisma.id,
                    },
                    {
                        task: "Practice writing clean and maintainable code",
                        userId: lady.id,
                    },
                    {
                        task: "Find a new base for my community in Project Zomboid",
                        userId: lady.id,
                    },
                    { task: "Practice aiming and movement in Valorant", userId: lady.id },
                    {
                        task: "Learn a new programming language (e.g., Python)",
                        userId: Karisma.id,
                    },
                    {
                        task: "Create a personal website using a static site generator",
                        userId: lady.id,
                    },
                    { task: "Contribute to an open-source project", userId: Karisma.id },
                    { task: "Attend a tech conference or meetup", userId: lady.id },
                ],
            });
        }
        catch (error) {
            console.error("Error seeding data:", error);
            process.exit(1);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
seed();
