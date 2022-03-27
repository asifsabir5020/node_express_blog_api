import express from "express";
import { login, me, register, update } from "../controllers/authController";
import { authenticate } from "../middlewares/auth";
const authRouter = express.Router();

authRouter.route("/auth/register").post(register);
authRouter.route("/auth/login").post(login);
authRouter.route("/auth/me").get(authenticate, me);
authRouter.route("/update/:id").put(authenticate, update);


export { authRouter };

