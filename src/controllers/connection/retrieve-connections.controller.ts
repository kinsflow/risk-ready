import { IConnectionRepo } from "../../entities/interfaces/connection.interface";
import ConnectionRepo from "../../entities/repositories/connection.repository";
import { BaseController } from "../base.controller";

class RetrieveConnectionRequest extends BaseController {
    private ConnectionRepo: IConnectionRepo;

    public constructor() {
        super();
        this.ConnectionRepo = new ConnectionRepo;
    }

    protected async executeImpl(): Promise<any> { 
        try{

        }catch(error){
            return this.clientError(error);
        }
    }
}

export default RetrieveConnectionRequest