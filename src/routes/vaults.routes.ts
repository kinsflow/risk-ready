import { Router } from "express";
import CreateVaultController from "../controllers/vault/create-vault.controller";
import DeleteVaultController from "../controllers/vault/delete-vault.controller";
import FetchVaultController from "../controllers/vault/fetch-vault.controller";
import FetchVaultsController from "../controllers/vault/fetch-vaults.controller";
import upload from "../multer";

const vaultRouter = Router();

vaultRouter.post('/', upload.array('images', 2), (req, res) => new CreateVaultController().execute(req, res));
vaultRouter.get('/', (req, res) => new FetchVaultsController().execute(req, res));
vaultRouter.get('/:vaultId', (req, res) => new FetchVaultController().execute(req, res));
vaultRouter.delete('/:vaultId', (req, res) => new DeleteVaultController().execute(req, res));

export default vaultRouter