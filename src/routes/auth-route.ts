import express from "express";
import { register, login, logout } from "../controllers/auth-controller";

const router = express();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

export default router;
