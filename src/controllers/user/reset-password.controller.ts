import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class ResetPasswordController extends BaseController {
    private UserRepo: IUserRepo;
    
    public constructor() {
        super();

        this.UserRepo = new UserRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const { email, password, token } = this.req.body;

            if (!email || !password || !token) {
                throw 'Please enter email, password and token'
            }

            const resetPassword = await this.UserRepo.resetPassword(email, token, password);

            return this.ok<UserDTO>(this.res, resetPassword, 'Password reset successfully');
        } catch (error: any) {
            return this.clientError(error);
        }
    }

}

export default ResetPasswordController