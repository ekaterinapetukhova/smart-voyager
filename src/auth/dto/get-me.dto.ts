import { z } from "zod";

export const getMeDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim(),
  surname: z.string().trim(),
  email: z.string().trim().email(),
});

export type GetMeDto = z.output<typeof getMeDtoSchema>;
