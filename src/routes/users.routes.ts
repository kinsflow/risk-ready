import { Router } from "express";
import ForgotPasswordController from "../controllers/user/forgot-password.controller";
import ResetPasswordController from "../controllers/user/reset-password.controller";
import SignInController from "../controllers/user/sign-in.controller";
import SignUpController from "../controllers/user/sign-up.controller";
import VerifyEmailController from "../controllers/user/verify-email.controller";

const userRouter = Router();

userRouter.post('/sign-up', (req, res) => new SignUpController().execute(req, res));
userRouter.post('/sign-in', (req, res) => new SignInController().execute(req, res));
userRouter.post('/verify', (req, res) => new VerifyEmailController().execute(req, res));
userRouter.post('/forgot-password', (req, res) => new ForgotPasswordController().execute(req, res));
userRouter.post('/reset-password', (req, res) => new ResetPasswordController().execute(req, res));

export default userRouter;