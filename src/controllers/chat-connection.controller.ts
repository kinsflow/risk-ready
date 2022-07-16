import Chat from "../database/models/chat";
import { ChatDTO, IChatRepo } from "../entities/interfaces/chat.interface";
import ChatRepo from "../entities/repositories/chat.repository";
import { BaseController } from "./base.controller";

class ChatConnectionController extends BaseController {
    private ChatRepo: IChatRepo;

    public constructor() {
        super();
        this.ChatRepo =  new ChatRepo;
    }

    protected async executeImpl(): Promise<any> {
        const createChat = await this.ChatRepo.create({
            last_connection: new Date()
        });

        return this.ok<ChatDTO>(this.res, createChat)
    }
}

export default ChatConnectionController