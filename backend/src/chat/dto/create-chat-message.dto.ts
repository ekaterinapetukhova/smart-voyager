import z from "zod";

export const createChatMessageDtoSchema = z.object({
  content: z.string().min(1),
  recipientId: z.string().uuid(),
});

export type CreateChatMessageDto = z.output<typeof createChatMessageDtoSchema>;
