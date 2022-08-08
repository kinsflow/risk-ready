import { IVaultRepo, VaultDTO } from "../../entities/interfaces/vault.interface";
import VaultRepo from "../../entities/repositories/vault.repository";
import { BaseController } from "../base.controller";

class FetchVaultController extends BaseController {

    private VaultRepo: IVaultRepo;

    public constructor() {
        super();
        this.VaultRepo = new VaultRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { params: { vaultId } } = this.req;

            const vault = await this.VaultRepo.fetchAVault(vaultId);

            return this.ok<VaultDTO>(this.res, vault, 'Vault Returned Successfully');
        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default FetchVaultController