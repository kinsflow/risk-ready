import { ChatDTO, ChatInstance } from "../interfaces/chat.interface";
import Chat from "../../database/models/chat";
import { Mapper } from "./base.mapper";

export class ChatMap extends Mapper<Chat> {
    public static async toDomain(raw: any): Promise<typeof Chat> {
        await Chat.create({
            id: raw.id,
            last_connection: raw.last_connection
        });
        return Chat
    }

    public static toPersistence(chat: ChatInstance): any {
        return {
            last_connection: chat.last_connection
        }
    }

    public static toDTO(chat: ChatInstance): ChatDTO {
        return {
            id: chat.id,
            last_connection: chat.last_connection
        }
    }
}