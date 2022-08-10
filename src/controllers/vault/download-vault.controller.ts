import path from "path";
import { IVaultRepo } from "../../entities/interfaces/vault.interface";
import VaultRepo from "../../entities/repositories/vault.repository";
import { BaseController } from "../base.controller";

class DownloadVaultsController extends BaseController {
    private VaultRepo: IVaultRepo;

    public constructor() {
        super();
        this.VaultRepo = new VaultRepo;
    }

    /**
     * Handle the download of the vault's document.
     * 
     * @returns 
     */
    protected async executeImpl(): Promise<any> {
        try {
            const { params: { vaultId } } = this.req;

            const { medias }: any = await this.VaultRepo.fetchAVault(vaultId);

            const { dataValues: { file_path, folder } } = medias[0]

            this.res.download(path.resolve(folder, file_path));

        } catch (error: any) {
            return this.clientError(error);
        }
    }
}

export default DownloadVaultsController