import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class VerifyEmailController extends BaseController {

    private UserRepo: IUserRepo;

    public constructor() {
        super();

        this.UserRepo = new UserRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const { email, token } = this.req.body;

            if (!email || !token) {
                throw 'Ensure token and password are passed'
            }
            const verifyEmail = await this.UserRepo.verifyEmail(email, token);

            return this.ok<UserDTO>(this.res, verifyEmail, 'User Email Verified Successfully')
        } catch (error: any) {
            if (error?.name == 'SequelizeValidationError') {
                return this.clientError(error, 422);
            }
            else {
                return this.clientError(error);
            }
        }
    }
}
export default VerifyEmailController