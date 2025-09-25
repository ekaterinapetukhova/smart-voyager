import { z } from "zod/v4";

export const validAiContentMessage = z.object({
  content: z.string().min(1, "Your trip description must have at least one symbol"),
});

export type ValidAiContentMessage = z.output<typeof validAiContentMessage>;
