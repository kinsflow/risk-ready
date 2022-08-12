import { Router } from "express";
import SendConnectionRequest from "../controllers/connection/send-connection-request.controller";

const connectionRouter = Router();

connectionRouter.post('/request', (req, res) => new SendConnectionRequest().execute(req, res));

export default connectionRouter