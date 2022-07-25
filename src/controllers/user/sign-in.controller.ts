import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class SignInController extends BaseController {
    private UserRepo: IUserRepo;

    public constructor() {
        super();

        this.UserRepo = new UserRepo
    }
    protected async executeImpl(): Promise<any> {
        try {
            const { email, password } = this.req.body;

            if (!email || !password) {
                throw 'Please compute username and password'
            }

            const signIn = await this.UserRepo.signIn(email, password);

            return this.ok<UserDTO>(this.res, signIn, 'Sign in successful');
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

export default SignInController