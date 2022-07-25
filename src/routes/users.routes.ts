import { Router } from "express";
import SignUpController from "../controllers/user/sign-up.controller";

const userRouter = Router();

userRouter.post('/sign-up', (req, res) => new SignUpController().execute(req, res));

export default userRouter;