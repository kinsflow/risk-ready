import { ConnectionDTO, IConnectionRepo } from "../../entities/interfaces/connection.interface";
import ConnectionRepo from "../../entities/repositories/connection.repository";
import { BaseController } from "../base.controller";

class SendConnectionRequest extends BaseController {
    private ConnectionRepo: IConnectionRepo;

    public constructor() {
        super();
        this.ConnectionRepo = new ConnectionRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { query: { user_id }, user: { id } }: any = this.req;

            if (id == user_id) {
                return this.clientError('You cannot send a request to yourself', 403)
            }

            // check if auth user attempted a connection request before
            const sentConnection: any = await this.ConnectionRepo.haveISentAConnectionRequest(user_id, id);

            if (sentConnection.length) {
                return this.conflict('Hey!! you have once sent a friend request to this user, wait while they attend to it')
            }

            // check if auth user have received a connection request before from the prospective user
            const receivedConection: any = await this.ConnectionRepo.haveIReceivedAConnectionRequest(user_id, id);

            if (receivedConection.length) {
                return this.conflict('Hey!! you have a pending friend request from this user, kindly accept or decline on your list of pending friend request')
            }

            // check if a confirmed connection exists before
            const isAConnection: any = await this.ConnectionRepo.isAConnectionAlready(user_id, id);

            if (isAConnection.length) {
                return this.conflict("Hey!! this user is a friend already");
            }

            // check if user connection is blocked.
            const isABlockedConnection: any = await this.ConnectionRepo.isConectionBlockedAlready(user_id, id);

            if (isABlockedConnection.length) {
                return this.conflict("Hey!! you have a blocked connection with this user");
            }

            const sendRequest = await this.ConnectionRepo.sendConnectionRequest(user_id, id);

            return this.ok<ConnectionDTO>(this.res, sendRequest, 'Conection Request Sent successfully');

        } catch (error) {
            return this.clientError(error);
        }
    }

}

export default SendConnectionRequest