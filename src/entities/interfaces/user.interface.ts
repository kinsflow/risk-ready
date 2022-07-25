import { Repo } from "./base.interface";

export interface IUserRepo extends Repo<UserInstance> {
    signUp(userInfo: UserAttribute, profilePicture?: any): Promise<UserInstance>
}

export interface UserInstance {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    email_verified_at: Date,
    password: string,
}

export interface UserAttribute {
    first_name?: string,
    last_name?: string,
    email?: string,
    email_verified_at?: Date,
    password?: string,
}

export interface UserDTO {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    email_verified_at: Date,
    password: string,
}