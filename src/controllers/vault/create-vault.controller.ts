import { IVaultRepo, VaultDTO } from "../../entities/interfaces/vault.interface";
import VaultRepo from "../../entities/repositories/vault.repository";
import { BaseController } from "../base.controller";

class CreateVaultController extends BaseController {
 
    private VaultRepo: IVaultRepo;

    public constructor() {
        super();
        this.VaultRepo = new VaultRepo;
    }

    protected async executeImpl(): Promise<any> {
        try{
            const {body, files, user} :any = this.req;

            body.userId = user.id;
            body.files = files;

            const createVault = await this.VaultRepo.createVault(body);

            return this.created<VaultDTO>(this.res, createVault, 'Vault Added successfully');
        }catch(error){
            return this.clientError(error);
        }
    }
}

export default CreateVaultController