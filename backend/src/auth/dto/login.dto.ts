import { z } from "zod/v4";

export const loginDto = z.object({
  email: z.email().trim(),
  password: z.string().trim(),
});

export type LoginDto = z.output<typeof loginDto>;
