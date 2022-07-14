import { Router } from "express";   
import ChatConnectionController from "../controllers/chat-connection.controller";

const chatRouter = Router();

chatRouter.post('/connect', (req, res) => new ChatConnectionController().execute(req, res));

export default chatRouter;