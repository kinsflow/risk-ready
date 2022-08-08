import { Repo } from "./base.interface";

export interface IVaultRepo extends Repo<VaultInstance>{
    createVault(vaults: VaultAttribute) : Promise<VaultInstance>;
    updateVault(vaults: VaultAttribute) : Promise<VaultInstance>;
    fetchAllVault(userId: number, per_page: number, page_no: number): Promise<VaultInstance>;
    fetchAVault(vaultId: string): Promise<VaultInstance>;
    deleteAVault(vaultId: string): Promise<VaultInstance>;
}

export interface VaultInstance {
    id: string,
    userId: number,
    name: string,
    description: string,
    type: string,
    createdAt?: Date,
    updatedAt: Date,
}

export interface VaultAttribute {
    id?: string,
    userId: number,
    name?: string,
    description?: string,
    type?: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface VaultDTO {
    id?: string,
    userId: number,
    name?: string,
    description?: string,
    type?: string,
    createdAt?: Date,
    updatedAt?: Date,
}