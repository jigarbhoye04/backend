import Router from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

//path : /api/v1/auth/sign-up etc etc..
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
