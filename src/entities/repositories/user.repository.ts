import User from "../../database/models/user";
import { generateOTP } from "../../helper/helper";
import emailVerification from "../../notification/email-verification.notification";
import { IUserRepo, UserAttribute, UserInstance } from "../interfaces/user.interface";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import forgotPassword from "../../notification/forgot-password.notification";
import Media from "../../database/models/media";
import { Op } from "sequelize";
import { sequelize } from "../../database/models";

class UserRepo implements IUserRepo {
    private model: any;

    public constructor() {
        this.model = User
    }

    /**
     * 
     * Method to sign user up.
     * 
     * @param userInfo 
     * @param profilePicture 
     * @returns 
     */
    async signUp(userInfo: UserInstance, profilePicture: any): Promise<UserInstance> {
        return await this.model.create({
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            email: userInfo.email,
            phone: userInfo?.phone,
            password: await bcryptjs.hash(userInfo.password, 10),
            token: generateOTP()
        })
    }

    /**
     * 
     * Sign User In
     * @param email 
     * @param password 
     * @returns 
     */
    async signIn(email: string, password: string): Promise<UserInstance> {
        if (! await this.exists(email)) {
            throw 'This account does not exist'
        }
        const user = await this.findByEmail(email);

        const isPasswordMatch = await bcryptjs.compare(password, user.password);

        if (!isPasswordMatch) {
            throw 'invalid credentials';
        }

        const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name }, 'secret', {
            algorithm: "HS256",
            expiresIn: "5000h",
        })

        user.token = token;

        return user;
    }

    /**
     * 
     * Verify email address after a user sign's up.
     * 
     * @param email 
     * @param token 
     * @returns 
     */
    async verifyEmail(email: string, token: number): Promise<UserInstance> {
        if (! await this.exists(email)) {
            throw 'This account does not exist'
        }

        const user = await this.findByEmail(email);

        if (user.email_verified_at) {
            throw 'Email has been verified already'
        }

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
        user.token = null;
        user.save();

        return await user;
    }

    /**
     * 
     * Handle Forgot password request.
     * 
     * @param email 
     * @returns 
     */
    async forgotPassword(email: string): Promise<UserAttribute> {
        if (! await this.exists(email)) {
            throw 'This account does not exist'
        }

        const user = await this.findByEmail(email);

        user.token = generateOTP();
        user.save();

        forgotPassword(email, user.token);

        return await user
    }

    /**
     * 
     * Query to get users based on email.
     * 
     * @param email 
     * @returns 
     */
    async findByEmail(email: string): Promise<any> {
        return await this.model.findOne({ where: { email: email } })
    }

    /**
     * Reset user password.
     * 
     * @param email 
     * @param token 
     * @param password 
     * @returns 
     */
    async resetPassword(email: string, token: number, password: string): Promise<UserInstance> {
        if (! await this.exists(email)) {
            throw 'This account does not exist'
        }

        const user = await this.findByEmail(email);

        if (user.token !== token) {
            throw 'invalid token/otp'
        }

        const lastUpdated = new Date(user.updatedAt);
        const oneHourAgo = new Date(Date.now() - (60 * 60 * 1000));

        if (!(lastUpdated > oneHourAgo)) {
            throw 'token/otp has expired';
        }

        user.token = null;
        user.password = await bcryptjs.hash(password, 10)
        user.save();

        return await user;
    }

    async updateProfile(id: string, userProfile: any): Promise<UserInstance> {

        try {
            const updateProfile = await this.model.update({
                first_name: userProfile.first_name,
                last_name: userProfile.last_name,
                email: userProfile.email,
                phone: userProfile.phone,
                zipcode: userProfile.zipcode,
                address: userProfile.address,
                city: userProfile.city,
                state: userProfile.state,
                country: userProfile.country,
                longitude: userProfile.longitude,
                latitude: userProfile.latitude
            }, {
                where: {
                    id
                }
            })

            await Media.destroy({
                where: {
                    mediaable_type: 'User',
                    mediaable_id: id,
                }
            })

            const userAccount = await this.model.findOne({ where: { id } });

            await userAccount.createMedia({
                file_path: userProfile.avatar.filename,
                type: userProfile.avatar.mimetype,
                folder: userProfile.avatar.destination
            })

            return updateProfile;
        } catch (error) {
            throw error.message
        }
    }

    async fetchNeigbours(id: string, per_page: number, page_no: number): Promise<UserInstance | any> {
        try {
            const latitude = 28.626137;
            const longitude = 79.821602;
            const distance = 20;

            const haversine = `(
                6371 * acos(
                    cos(radians(${latitude}))
                    * cos(radians(latitude::numeric))
                    * cos(radians(longitude::numeric) - radians(${longitude}))
                    + sin(radians(${latitude})) * sin(radians(latitude::numeric))
                )
            )`;

            const neigbours = await this.model.paginate({
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'email',
                    'phone',
                    'address',
                    [sequelize.literal(`round(${haversine}::numeric, 2)`), 'distance']
                ],
                include: ['medias'],
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.literal(haversine), '<=', distance),
                        {
                            email_verified_at: {
                                [Op.ne]: null
                            }
                        },
                        {
                            longitude: {
                                [Op.ne]: null
                            }
                        },
                        {
                            latitude: {
                                [Op.ne]: null
                            }
                        },
                        {
                            id: {
                                [Op.ne]: [id]
                            }
                        }
                    ],
                },
                order: sequelize.col('distance'),
                page: page_no,
                paginate: per_page,
            })

            return neigbours;
        } catch (error) {
            throw error.message
        }

    }

    /**
     * Check if a user count exists
     * @param email 
     * @returns 
     */
    async exists(email: string): Promise<boolean> {
        return await this.findByEmail(email) instanceof User
    }
    delete(t: UserInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * 
     * Get a single user model instance by ID.
     * 
     * @param id 
     * @returns 
     */
    async getById(id: string): Promise<any> {
        try {
            return await this.model.findOne({
                where: { id },
                include: ['medias']
            })
        } catch (error) {
            throw error.message
        }
    }

    save(t: UserInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default UserRepo