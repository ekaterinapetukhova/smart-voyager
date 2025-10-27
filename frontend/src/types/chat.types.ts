import { User } from "./user.types.ts";

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: Date;
  chatId: string;
}

export interface Chat {
  id: string;
  members: User[];
  chatMessage: ChatMessage[];
}
