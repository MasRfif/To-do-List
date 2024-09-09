import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ error: "Missing required fields" });

    const emailRecord = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const memberRole = await prisma.role.findUnique({
      where: {
        role: "member",
      },
    });
    const salt = await genSalt(10);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: await hash(password, salt),
        roleId: memberRole!.id,
      },
    });
    return res.status(200).json({ message: "nice" });
  } catch (error) {
    next(error);
  }
}
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Missing required fields" });
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(401).json({ error: "Invalid user/email" });
    const isValidPassword = await compare(password, user!.password);

    if (!isValidPassword)
      return res.status(401).json({ error: "Invalid password" });

    const jwtPayload = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      roleId: user.roleId,
    };

    const token = await Jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );
    return res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      sameSite: "none",
      secure: true,
    });
  } catch (error) {
    next(error);
  }
}
export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
}
