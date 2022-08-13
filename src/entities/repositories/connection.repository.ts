import { Op } from "sequelize";
import Connection from "../../database/models/connection";
import User from "../../database/models/user";
import { ConnectionEnum } from "../../enum/connection.enum";
import { ConnectionInstance, IConnectionRepo } from "../interfaces/connection.interface";

class ConnectionRepo implements IConnectionRepo {
    private model: any;

    public constructor() {
        this.model = Connection
    }

    async isAConnectionAlready(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance> {
        return await this.model.findAll({
            where: {
                [Op.or]: [
                    {
                        first_user: authUserId,
                        second_user: propsectiveConnectionId,
                        status: ConnectionEnum.CONFIRMED_CONNECTION,
                    },
                    {
                        first_user: propsectiveConnectionId,
                        second_user: authUserId,
                        status: ConnectionEnum.CONFIRMED_CONNECTION,
                    }
                ]
            }
        })
    }

    async isConectionBlockedAlready(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance> {
        return await this.model.findAll({
            where: {
                [Op.or]: [
                    {
                        first_user: authUserId,
                        second_user: propsectiveConnectionId,
                        status: ConnectionEnum.BLOCKED_CONNECTION,
                    },
                    {
                        first_user: propsectiveConnectionId,
                        second_user: authUserId,
                        status: ConnectionEnum.BLOCKED_CONNECTION,
                    }
                ]
            }
        })
    }

    async haveISentAConnectionRequest(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance> {
        return await this.model.findAll({
            where: {
                first_user: authUserId,
                second_user: propsectiveConnectionId,
                status: ConnectionEnum.PENDING_CONNECTION,
            }
        })
    }

    async haveIReceivedAConnectionRequest(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance> {
        return await this.model.findAll({
            where: {
                first_user: propsectiveConnectionId,
                second_user: authUserId,
                status: ConnectionEnum.PENDING_CONNECTION
            }
        })
    }

    async sendConnectionRequest(propsectiveConnectionId: string, authUserId: string): Promise<ConnectionInstance> {
        try {
            return await this.model.create({
                first_user: authUserId,
                acted_user: authUserId,
                second_user: parseInt(propsectiveConnectionId),
                status: ConnectionEnum.PENDING_CONNECTION
            })
        } catch (error) {
            throw error
        }
    }

    async retrieveConnections(userId: string, action: string, per_page: number, page_no: number): Promise<ConnectionInstance> {
        return await this.model.paginate({
            where: {
                [Op.or]: [
                    {
                        first_user: userId
                    },
                    {
                        second_user: userId
                    }
                ],
                status: action
            },
            include: [
                {
                    as: 'first_user_model',
                    model: User,
                    attributes: ['first_name', 'last_name', 'email', 'phone', 'address']
                },
                {
                    as: 'second_user_model',
                    model: User,
                    attributes: ['first_name', 'last_name', 'email', 'phone', 'address']
                }
            ],
            page: page_no,
            paginate: per_page,
        })
    }
    approveConnectionRequest(connectionId: string): Promise<ConnectionInstance> {
        throw new Error("Method not implemented.");
    }
    declineConnectionRequest(connectionId: string): Promise<ConnectionInstance> {
        throw new Error("Method not implemented.");
    }
    exists(t: string | ConnectionInstance): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: ConnectionInstance): Promise<any> {
        return await this.model.destroy({
            where: {
                id
            }
        })
    }
    async getById(id: string): Promise<ConnectionInstance> {
        return await this.model.findOne({
            where: {
                id
            },
            include: ['first_user_model', 'second_user_model']
        })
    }
    save(t: ConnectionInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default ConnectionRepo