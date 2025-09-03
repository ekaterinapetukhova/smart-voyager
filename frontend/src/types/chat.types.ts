import { z } from "zod";
import { userSchema } from "./user.types.ts";

export const chatMessageSchema = z.object({
  id: z.string().uuid(),
  senderId: z.string().uuid(),
  recipientId: z.string().uuid(),
  content: z.string(),
  createdAt: z.string().datetime(),
  chatId: z.string().uuid(),
});

export type ChatMessage = z.output<typeof chatMessageSchema>;

export const chatSchema = z.object({
  id: z.string().uuid(),
  members: z.array(userSchema),
  chatMessage: z.array(chatMessageSchema),
});

export type Chat = z.output<typeof chatSchema>;
