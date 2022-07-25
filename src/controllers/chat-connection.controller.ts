import { ChatDTO, IChatRepo } from "../entities/interfaces/chat.interface";
import ChatRepo from "../entities/repositories/chat.repository";
import { BaseController } from "./base.controller";

class ChatConnectionController extends BaseController {
    private ChatRepo: IChatRepo;

    public constructor() {
        super();
        this.ChatRepo = new ChatRepo;
    }

    protected async executeImpl(): Promise<any> {
        try {
            const createChat = await this.ChatRepo.create({
                last_connection: this.req.body.last_connection
            });

            return this.ok<ChatDTO>(this.res, createChat)
        } catch (err: any) {
            // console.log('kay', err.errors[0].message, this.req.body);
            
            return this.clientError(err);
        }
    }
}

export default ChatConnectionController