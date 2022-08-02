import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class UpdateProfileController extends BaseController {

    private UserRepo: IUserRepo;

    public constructor() {
        super();
        this.UserRepo = new UserRepo
    }

    protected async executeImpl(): Promise<any> {
        try {
            const req: any = this.req;
            const userId = req.user.id;

            await this.UserRepo.updateProfile(userId, this.req.body);

            const updatedProfile: any = await this.UserRepo.getById(userId);

            delete updatedProfile.dataValues.password;
            delete updatedProfile.dataValues.token;

            return this.ok<UserDTO>(this.res, updatedProfile, 'Profile updated successfully');
        } catch (error) {
            return this.clientError(error);
        }
    }
}

export default UpdateProfileController