import { Router } from "express";
import ForgotPasswordController from "../controllers/user/forgot-password.controller";
import NeigboursController from "../controllers/user/neigbours.controller";
import ResetPasswordController from "../controllers/user/reset-password.controller";
import SignInController from "../controllers/user/sign-in.controller";
import SignUpController from "../controllers/user/sign-up.controller";
import UpdateProfileController from "../controllers/user/update-profile.controller";
import UserProfileController from "../controllers/user/user-profile.controller";
import VerifyEmailController from "../controllers/user/verify-email.controller";
import AuthMiddleware from "../middlewares/authenticate.middleware";
import upload from "../multer";

const userRouter = Router();
// const upload  multl
userRouter.post('/sign-up', (req, res) => new SignUpController().execute(req, res));
userRouter.post('/sign-in', (req, res) => new SignInController().execute(req, res));
userRouter.post('/verify', (req, res) => new VerifyEmailController().execute(req, res));
userRouter.post('/forgot-password', (req, res) => new ForgotPasswordController().execute(req, res));
userRouter.post('/reset-password', (req, res) => new ResetPasswordController().execute(req, res));
userRouter.get('/profile', AuthMiddleware, (req, res) => new UserProfileController().execute(req, res));
userRouter.put('/profile', AuthMiddleware, upload.single('avatar'), (req, res) => new UpdateProfileController().execute(req, res));
userRouter.get('/neighbours', AuthMiddleware, (req, res) => new NeigboursController().execute(req, res));

export default userRouter;