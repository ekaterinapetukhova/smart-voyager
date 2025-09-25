import z from "zod/v4";

export const createChatMessageDtoSchema = z.object({
  content: z.string().min(1),
  recipientId: z.uuid(),
});

export type CreateChatMessageDto = z.output<typeof createChatMessageDtoSchema>;
