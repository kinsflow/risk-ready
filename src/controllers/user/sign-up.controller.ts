import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import emailVerification from "../../notification/email-verification.notification";
import { BaseController } from "../base.controller";

class SignUpController extends BaseController {
    private UserRepo: IUserRepo;

    public constructor() {
        super();

        this.UserRepo = new UserRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const userInfo = this.req.body;
            const userProfilePhoto = this.req.file;

            const signUp = await this.UserRepo.signUp(userInfo, userProfilePhoto);

            emailVerification(signUp.email, signUp.token);

            return this.ok<UserDTO>(this.res, signUp, 'Sign up successful, check email for verification code');
        } catch (error: any) {
                return this.clientError(error);
        }
    }
}

export default SignUpController