"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth-controller");
const router = (0, express_1.default)();
router.route("/register").post(auth_controller_1.register);
router.route("/login").post(auth_controller_1.login);
router.route("/logout").get(auth_controller_1.logout);
exports.default = router;
