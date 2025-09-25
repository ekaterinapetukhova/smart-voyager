import { z } from "zod";

export const validAiContentMessage = z.object({
  content: z.string().min(1),
});

export type ValidAiContentMessage = z.output<typeof validAiContentMessage>;
