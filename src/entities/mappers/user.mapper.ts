import User from "../../database/models/user";
import { UserDTO, UserInstance } from "../interfaces/user.interface";
import { Mapper } from "./base.mapper";

class UserMap extends Mapper<User>{
    public static toDTO(user: UserInstance): UserDTO {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            email_verified_at: user.email_verified_at,
            password: user.password
        }
    }

    public static toPersistence(user: UserInstance): {} {
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            email_verified_at: user.email_verified_at,
            password: user.password
        }
    }
}

export default UserMap