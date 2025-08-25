import { z } from "zod";

export const validChatMessageSchema = z.object({
  message: z.string().min(1, "Message must have at least one symbol"),
});

export type ChatMessage = z.output<typeof validChatMessageSchema>;
