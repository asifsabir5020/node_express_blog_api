import express from "express";
import { login, me, register, findAllUsers } from "../controllers/authController";
import { authenticate, authorize } from "../middlewares/auth";
const authRouter = express.Router();

authRouter.route("/auth/register").post(register);
authRouter.route("/auth/login").post(login);
authRouter.route("/auth/me").get(authenticate, me);
authRouter.route("/all").get(authenticate, authorize('admin'), findAllUsers);

export { authRouter };

