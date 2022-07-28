import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class ForgotPasswordController extends BaseController {
    private UserRepo: IUserRepo;
    
    public constructor() {
        super();

        this.UserRepo = new UserRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const { email } = this.req.body;

            if (!email) {
                throw 'Please enter email'
            }

            const forgotPassword = await this.UserRepo.forgotPassword(email);

            delete forgotPassword['password'];

            return this.ok<UserDTO>(this.res, forgotPassword, 'check you email for reset password code');
        } catch (error: any) {
            return this.clientError(error);
        }

    }

}

export default ForgotPasswordController