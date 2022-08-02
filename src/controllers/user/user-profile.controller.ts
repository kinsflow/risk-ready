import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class UserProfileController extends BaseController {

    private UserRepo: IUserRepo;

    public constructor() {
        super();
        this.UserRepo = new UserRepo
    }
    protected async executeImpl(): Promise<any> {
        const req: any = this.req;

        const user: any = await this.UserRepo.getById(req.user.id);

        try {
            return this.ok<UserDTO>(this.res, user, 'Sign in successful');
        }
        catch (error: any) {
            return this.clientError(error);
        }
    }

}

export default UserProfileController