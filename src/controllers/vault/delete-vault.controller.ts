import { IVaultRepo } from "../../entities/interfaces/vault.interface";
import VaultRepo from "../../entities/repositories/vault.repository";
import { BaseController } from "../base.controller";

class DeleteVaultController extends BaseController {

    private VaultRepo: IVaultRepo;

    public constructor() {
        super();
        this.VaultRepo = new VaultRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { params: { vaultId } } = this.req;

           await this.VaultRepo.deleteAVault(vaultId);

            return this.deleted(this.res)
        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default DeleteVaultController