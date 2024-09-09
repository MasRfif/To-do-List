import { PrismaClient, Prisma } from "@prisma/client";
import { genSalt, hash } from "bcrypt";

const prisma = new PrismaClient();

async function seed() {
  try {
    const adminRole = await prisma.role.create({
      data: {
        role: "admin",
      },
    });

    const memberRole = await prisma.role.create({
      data: {
        role: "member",
      },
    });

    const salt = await genSalt(32);

    const admin = await prisma.user.create({
      data: {
        fullName: "nigelirwandi",
        email: "nigel@mail.com",
        password: await hash("admin123", salt),
        roleId: adminRole.id,
      },
    });

    const Karisma = await prisma.user.create({
      data: {
        fullName: "karisma mahaya",
        email: "kari.ma@mail.com",
        password: await hash("kanrinma", salt),
        roleId: memberRole.id,
      },
    });

    const lady = await prisma.user.create({
      data: {
        fullName: "lady Smith",
        email: "lady.smith@mail.com",
        password: await hash("lady234", salt),
        roleId: memberRole.id,
      },
    });
    await prisma.task.createMany({
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
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
