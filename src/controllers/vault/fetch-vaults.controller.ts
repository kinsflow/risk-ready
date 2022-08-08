import { IVaultRepo, VaultDTO } from "../../entities/interfaces/vault.interface";
import VaultRepo from "../../entities/repositories/vault.repository";
import { BaseController } from "../base.controller";

class FetchVaultsController extends BaseController {

    private VaultRepo: IVaultRepo;

    public constructor() {
        super();
        this.VaultRepo = new VaultRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const { user, query: { per_page, page_no } }: any = this.req;

            const userVaults = await this.VaultRepo.fetchAllVault(user.id, per_page, page_no);

            return this.ok<VaultDTO>(this.res, userVaults, 'Vaults Returned Successfully');
        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default FetchVaultsController