import z from "zod";
import { Gender } from "@prisma/client";

export const createUserDtoSchema = z.object({
  name: z.string().trim(),
  email: z.string().trim().email(),
  birthDate: z.coerce.date(),
  gender: z.nativeEnum(Gender),
  password: z.string().trim().min(8).max(20), // TODO: ADD REGEXP
});

export type CreateUserDto = z.output<typeof createUserDtoSchema>;
