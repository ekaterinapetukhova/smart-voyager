import { z } from "zod/v4";

export const loginDtoSchema = z.object({
  email: z.email().trim(),
  password: z.string().trim(),
});
