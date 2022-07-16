
export interface IChatRepo extends Repo<ChatInstance> {
    getChatById(chatId: string): Promise<ChatInstance>;
    findAllChatBySenderId(senderId: number): Promise<ChatInstance[]>;
    findAllChatByReceiverId(userId: string): Promise<ChatInstance[]>;
    create(chat: ChatAttribute): Promise<ChatInstance>
  }

  export interface ChatInstance {
    id: string,
    last_connection: Date
  }

  export interface ChatAttribute {
    id?: string,
    last_connection: Date
  }

  export interface ChatDTO {
    id: string,
    last_connection: Date
  }