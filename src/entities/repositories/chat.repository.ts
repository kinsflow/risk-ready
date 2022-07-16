import { Op } from 'sequelize'
import { ChatInstance, IChatRepo } from '../interfaces/chat.interface';
import { ChatMap } from '../mappers/chat.mapper';

class ChatRepo implements IChatRepo {
    private models: any;

    constructor(models: any) {
        this.models = models;
    }

    private createQueryObject(): any {
        const { } = this.models;
        return {
            where: {},
        }
    }

    public async exists(chat: ChatInstance): Promise<boolean> {
        const ChatModel = this.models.Chat;
        const result = await ChatModel.findOne({
            where: { id: chat.id.toString() }
        });
        return !!result === true;
    }

    public delete(chat: ChatInstance): Promise<any> {
        const ChatModel = this.models.Chat;
        return ChatModel.destroy({
            where: { id: chat.id.toString() }
        })
    }

    public async save(chat: ChatInstance): Promise<any> {
        const ChatModel = this.models.Chat;
        const exists = await this.exists(chat);
        const rawChatData = ChatMap.toPersistence(chat);

        if (exists) {
            const sequelizeChat = await ChatModel.findOne({
                where: { id: chat.id }
            });

            try {
                await sequelizeChat.update(rawChatData);
            } catch (err) {
                this.delete(chat);
            }
        } else {
            await ChatModel.create(rawChatData);
        }

        return chat;
    }

    getChatById(chatId: string): Promise<ChatInstance> {
        throw new Error('Method not implemented.');
    }
    findAllChatBySenderId(senderId: number): Promise<ChatInstance[]> {
        throw new Error('Method not implemented.');
    }
    findAllChatByReceiverId(userId: string): Promise<ChatInstance[]> {
        throw new Error('Method not implemented.');
    }
    getById(id: string): Promise<ChatInstance> {
        throw new Error('Method not implemented.');
    }
}

export default ChatRepo