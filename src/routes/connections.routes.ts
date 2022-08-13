import { Router } from "express";
import ConnectionActionController from "../controllers/connection/connection-action.controller";
import RetrieveConnectionRequest from "../controllers/connection/retrieve-connections.controller";
import SendConnectionRequest from "../controllers/connection/send-connection-request.controller";

const connectionRouter = Router();

connectionRouter.post('/request', (req, res) => new SendConnectionRequest().execute(req, res));
connectionRouter.post('/:action', (req, res) => new ConnectionActionController().execute(req, res));
connectionRouter.get('/:action', (req, res) => new RetrieveConnectionRequest().execute(req, res));

export default connectionRouter