import { z } from "zod";

export const validChatMessageSchema = z.object({
  content: z.string().min(1, "Message must have at least one symbol"),
});

export type ValidChatMessage = z.output<typeof validChatMessageSchema>;
