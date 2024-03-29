import { Repo } from "./base.interface";

export interface IUserRepo extends Repo<UserInstance> {
    signUp(userInfo: UserAttribute, profilePicture?: any): Promise<UserInstance>;
    verifyEmail(email: string, token: number): Promise<UserInstance>;
    findByEmail(email: string): Promise<any>;
    signIn(email: string, password: string): Promise<UserInstance>;
    forgotPassword(email: string): Promise<any>,
    resetPassword(email: string, token: number, password: string): Promise<UserInstance>
    updateProfile(id: string, userProfile: {}): Promise<UserInstance>
    fetchNeigbours(userId: string, per_page: number, page_no: number): Promise<UserInstance>
}

export interface UserInstance {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    email_verified_at: Date,
    password: string,
    token: number,
    phone: string;
    createdAt?: Date,
    updatedAt: Date,
}

export interface UserAttribute {
    id?: string,
    first_name?: string,
    last_name?: string,
    email?: string,
    email_verified_at?: Date,
    password?: string,
    token?: number,
    phone?: string;
}

export interface UserDTO {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    email_verified_at: Date,
    password: string,
    phone: string;
    token?: number
}