import { z } from "zod";

export const loginDto = z.object({
  email: z.string().trim().email(),
  password: z.string(),
});

export type LoginDto = z.output<typeof loginDto>;
