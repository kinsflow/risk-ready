import { IUserRepo, UserDTO } from "../../entities/interfaces/user.interface";
import UserRepo from "../../entities/repositories/user.repository";
import { BaseController } from "../base.controller";

class NeigboursController extends BaseController {
    private UserRepo: IUserRepo;

    public constructor() {
        super();
        this.UserRepo = new UserRepo
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { user: { id }, query: { page_no, per_page } }: any = this.req;

            const neigbours = await this.UserRepo.fetchNeigbours(id, per_page, page_no);

            return this.ok<UserDTO>(this.res, neigbours, 'Request successfully');
        } catch (error) {
            return this.clientError(error)
        }
    }
}

export default NeigboursController