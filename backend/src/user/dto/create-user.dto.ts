import z from "zod/v4";
import { Gender } from "@prisma/client";

export const createUserDtoSchema = z.object({
  name: z.string().trim(),
  email: z.email().trim(),
  birthDate: z.coerce.date(),
  gender: z.enum(Gender),
  password: z.string().trim().min(8).max(20),
  avatar: z.base64(),
});

export type CreateUserDto = z.output<typeof createUserDtoSchema>;
