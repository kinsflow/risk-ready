import { Router } from "express";   
import ChatConnectionController from "../controllers/chat-connection.controller";
import multer from "multer";

const chatRouter = Router();
const upload = multer({dest: 'uploads'});

chatRouter.post('/connect', upload.single('avatar'), (req, res) => new ChatConnectionController().execute(req, res));

export default chatRouter;