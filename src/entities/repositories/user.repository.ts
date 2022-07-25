import User from "../../database/models/user";
import { IUserRepo, UserAttribute, UserInstance } from "../interfaces/user.interface";

class UserRepo implements IUserRepo {
    private model: any;

    public constructor() {
        this.model = User
    }
    async signUp(userInfo: UserAttribute, profilePicture: any): Promise<UserInstance> {
        return await this.model.create({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            password: userInfo.password
        })
    }
    exists(t: UserInstance): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: UserInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<UserInstance> {
        throw new Error("Method not implemented.");
    }
    save(t: UserInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default UserRepo