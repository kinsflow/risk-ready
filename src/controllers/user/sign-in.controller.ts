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
                throw 'Please compute email and password'
            }

            const signIn = await this.UserRepo.signIn(email, password);

            const signInModified: any = signIn;

            delete signInModified.dataValues.password;

            return this.ok<UserDTO>(this.res, signInModified, 'Sign in successful');
        } catch (error: any) {
                return this.clientError(error, 401);
        }
    }

}

export default SignInController