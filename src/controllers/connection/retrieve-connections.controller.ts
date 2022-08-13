import { ConnectionDTO, IConnectionRepo } from "../../entities/interfaces/connection.interface";
import ConnectionRepo from "../../entities/repositories/connection.repository";
import { BaseController } from "../base.controller";

class RetrieveConnectionRequest extends BaseController {
    private ConnectionRepo: IConnectionRepo;

    public constructor() {
        super();
        this.ConnectionRepo = new ConnectionRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { params: { action }, user: { id }, query: {page_no, per_page} }: any = this.req;

            let connections: any = await this.ConnectionRepo.retrieveConnections(id, action, per_page, page_no);
            
            return this.ok<ConnectionDTO>(this.res, connections, 'Conections Returned successfully');
        } catch (error) {
            return this.clientError(error);
        }
    }
}

export default RetrieveConnectionRequest