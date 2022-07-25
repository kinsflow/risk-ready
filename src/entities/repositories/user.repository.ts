import User from "../../database/models/user";
import { generateOTP } from "../../helper/helper";
import emailVerification from "../../notification/email-verification.notification";
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
            password: userInfo.password,
            token: generateOTP()
        })
    }

    async verifyEmail(email: string, token: number): Promise<UserInstance> {
        if (! await this.exists(email)) {
            throw 'This account does not exist'
        }

        const user = await this.findByEmail(email);

        if (user.token !== token) {
            throw 'invalid token/otp'
        }

        if (user.email_verified_at) {
            throw 'User account has been verified already'
        }

        const lastUpdated = new Date(user.updatedAt);
        const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));

        if (!(lastUpdated > oneHourAgo)) {
            user.token = generateOTP();
            user.save();

            emailVerification(user.email, user.token);

            throw 'token/otp has expired, check you email for the new token that was sent';
        }

        user.email_verified_at = new Date();
        user.save();

        return await user;
    }

    async findByEmail(email: string): Promise<any> {
        return await this.model.findOne({ where: { email: email } })
    }
    async exists(email: string): Promise<boolean> {
        return await this.findByEmail(email) instanceof User
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