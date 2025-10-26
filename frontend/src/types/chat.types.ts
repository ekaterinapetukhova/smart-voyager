import { z } from "zod";
import { userSchema } from "./user.types.ts";

export const chatMessageSchema = z.object({
  id: z.uuid(),
  senderId: z.uuid(),
  recipientId: z.uuid(),
  content: z.string(),
  createdAt: z.date(),
  chatId: z.uuid(),
});

export type ChatMessage = z.output<typeof chatMessageSchema>;

export const chatSchema = z.object({
  id: z.uuid(),
  members: z.array(userSchema),
  chatMessage: z.array(chatMessageSchema),
});

export type Chat = z.output<typeof chatSchema>;
