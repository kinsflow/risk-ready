import { ChatDTO, IChatRepo } from "../entities/interfaces/chat.interface";
import ChatRepo from "../entities/repositories/chat.repository";
import { BaseController } from "./base.controller";

class ChatConnectionController extends BaseController {
    private ChatRepo: IChatRepo;

    public constructor() {
        super();
        this.ChatRepo = new ChatRepo();
    }
    protected executeImpl(): any {
        const { ChatRepo } = this;

        const dto: ChatDTO = {last_connection: new Date(), id: '1'};
        return this.ok<ChatDTO>(this.res, dto)

    }

}

export default ChatConnectionController