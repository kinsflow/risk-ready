import Vault from "../../database/models/vault";
import { IVaultRepo, VaultAttribute, VaultInstance } from "../interfaces/vault.interface";

class VaultRepo implements IVaultRepo {

    private model: any;

    public constructor() {
        this.model = Vault
    }

    /**
     * Create A Vault Instance.
     * 
     * @param vaults 
     * @returns 
     */
    async createVault(vaults: VaultAttribute | any): Promise<VaultInstance> {
        try {
            const createVaults = await this.model.create({
                userId: vaults.userId,
                name: vaults.name,
                type: vaults.type,
                description: vaults.description
            });

            vaults.files.forEach(async file => {
                await createVaults.createMedia({
                    file_path: file.filename,
                    type: file.mimetype,
                    folder: file.destination
                })
            });

            return createVaults
        } catch (error) {
            throw error
        }
    }

    updateVault(vaults: VaultAttribute): Promise<VaultInstance> {
        throw new Error("Method not implemented.");
    }

    /**
     * Fetch all vaults of a user.
     * 
     * @param userId 
     * @param per_page 
     * @param page_no 
     * @returns 
     */
    async fetchAllVault(userId: number, per_page: number, page_no: number): Promise<VaultInstance> {
        return await this.model.paginate({
            where: { userId },
            page: page_no,
            paginate: per_page,
            order: [['updatedAt', 'DESC']],
            include: ['medias']
        })
    }

    /**
     * 
     * Fetch a single vault.
     * 
     * @param vaultId 
     * @returns 
     */
    async fetchAVault(vaultId: string): Promise<VaultInstance> {
        return await this.model.findOne({
            where: {
                id: vaultId
            },
            include: ['medias']
        })
    }

    deleteAVault(vaultId: string): Promise<VaultInstance> {
        return this.model.destroy({
            where: {
                id: vaultId
            }
        })
    }
    exists(t: string | VaultInstance): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(t: VaultInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<VaultInstance> {
        throw new Error("Method not implemented.");
    }
    save(t: VaultInstance): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

export default VaultRepo