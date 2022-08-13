import { ConnectionDTO, IConnectionRepo } from "../../entities/interfaces/connection.interface";
import ConnectionRepo from "../../entities/repositories/connection.repository";
import { ConnectionEnum } from "../../enum/connection.enum";
import { BaseController } from "../base.controller";

class ConnectionActionController extends BaseController {
    private ConnectionRepo: IConnectionRepo;

    public constructor() {
        super();
        this.ConnectionRepo = new ConnectionRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { query: { connection_id }, params: { action }, user: { id } }: any = this.req;

            if (!connection_id) {
                return this.clientError('connection_id is required', 422)
            }

            const connection: any = await this.ConnectionRepo.getById(connection_id);

            // remove user password information
            delete connection.dataValues.first_user_model.dataValues.password;
            delete connection.dataValues.second_user_model.dataValues.password;

            // does connection exist?
            if (!connection) {
                return this.clientError('Connection does not exist based in the connection ID passed')
            }

            // is the user associated to conection in question?
            if (connection.first_user !== id && connection.second_user !== id) {
                return this.clientError('Hey!!, this connection is not related to you')
            }

            // decline connection request
            if (action === ConnectionEnum.DECLINED_CONNECTION) {
                if (connection.status !== ConnectionEnum.PENDING_CONNECTION) {
                    return this.clientError('Hey!! you cannot decline a request like this as it is not a pending request')
                }

                await connection.destroy()

                return this.ok<ConnectionDTO>(this.res, connection, 'Conection Declined successfully');
            }

            // confirm connection
            if (action === ConnectionEnum.CONFIRMED_CONNECTION) {
                if (connection.status !== ConnectionEnum.PENDING_CONNECTION) {
                    return this.clientError('Hey!! you had no pending connection with this user')
                }

                connection.status = ConnectionEnum.CONFIRMED_CONNECTION;

                await connection.save();

                return this.ok<ConnectionDTO>(this.res, connection, 'Connection Request Accepted Successfully')
            }

            // block connection
            if (action === ConnectionEnum.BLOCKED_CONNECTION) {
                if (connection.status !== ConnectionEnum.CONFIRMED_CONNECTION) {
                    return this.clientError('Hey!! you cannot block a user you had no connection with before')
                }

                connection.status = ConnectionEnum.BLOCKED_CONNECTION;
                connection.acted_user = id;

                await connection.save();

                return this.ok<ConnectionDTO>(this.res, connection, 'Connection Blocked Successfully')
            }

            // unblock a connection 
            if (action === ConnectionEnum.UNBLOCKED_CONNECTION) {
                if (connection.status !== ConnectionEnum.BLOCKED_CONNECTION) {
                    return this.clientError('Hey!! you cannot unblock a user you had no blocked connection with before')
                }

                if (connection.acted_user !== id) {
                    return this.clientError("Hey!! you did not block this user. hence, you cannot unblock this user");
                }

                connection.status = ConnectionEnum.CONFIRMED_CONNECTION;
                connection.acted_user = id;

                await connection.save();

                return this.ok<ConnectionDTO>(this.res, connection, 'Connection Unblocked Successfully')
            }

            return this.clientError('Be sure of you action, as the system canot process your request. refer to docs')
        } catch (error) {
            return this.clientError(error);
        }
    }
}

export default ConnectionActionController